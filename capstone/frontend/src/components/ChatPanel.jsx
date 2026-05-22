import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, ChevronDown } from 'lucide-react';

export default function ChatPanel({ sandboxId }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "👋 Hi! I'm your AI assistant. Describe what you'd like me to build or modify in your sandbox and I'll get to work!",
      status: null,
    }
  ]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [statusLines, setStatusLines] = useState([]);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const abortRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, statusLines]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || streaming) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setStreaming(true);
    setStatusLines([]);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch('/api/ai/invoke', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, projectId: sandboxId }),
        signal: controller.signal,
      });

      if (!res.ok) throw new Error(`AI error: ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      const collectedStatus = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split('\n');
        buffer = lines.pop(); // keep incomplete line

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) continue;

          // SSE data line
          const raw = trimmed.startsWith('data:') ? trimmed.slice(5).trim() : trimmed;
          if (raw && raw !== '[DONE]') {
            collectedStatus.push(raw);
            setStatusLines([...collectedStatus]);
          }
        }
      }

      // After stream ends, add a summary assistant message
      const doneMsg = collectedStatus.find(l => l.toLowerCase().includes('success'))
        || collectedStatus[collectedStatus.length - 1]
        || 'Done!';

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '✅ ' + doneMsg,
        statusLines: [...collectedStatus],
      }]);
      setStatusLines([]);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: `❌ Error: ${err.message}`,
        }]);
      }
      setStatusLines([]);
    } finally {
      setStreaming(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full" style={{ background: 'var(--bg-secondary)' }}>
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-b shrink-0 min-w-0"
        style={{ borderColor: 'var(--border)', background: 'var(--bg-panel)' }}>
        <div className="p-1.5 rounded-lg shrink-0" style={{ background: 'var(--accent-dim)' }}>
          <Sparkles size={13} style={{ color: 'var(--accent-hover)' }} />
        </div>
        <span className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>AI Assistant</span>
        {streaming && (
          <div className="ml-auto flex items-center gap-1 text-xs shrink-0 whitespace-nowrap" style={{ color: 'var(--accent-hover)' }}>
            <Loader2 size={11} className="animate-spin shrink-0" />
            <span className="hidden sm:inline">Working…</span>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            {/* Avatar */}
            <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
              style={{
                background: msg.role === 'user' ? 'linear-gradient(135deg, #7c6aff, #a78bfa)' : 'var(--bg-card)',
                border: msg.role === 'assistant' ? '1px solid var(--border)' : 'none',
              }}>
              {msg.role === 'user'
                ? <User size={13} color="#fff" />
                : <Bot size={13} style={{ color: 'var(--accent-hover)' }} />}
            </div>

            {/* Bubble */}
            <div className={`min-w-0 flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`} style={{ maxWidth: 'min(80%, 320px)' }}>
              <div className="px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                style={{
                  background: msg.role === 'user' ? 'linear-gradient(135deg, #7c6aff22, #7c6aff33)' : 'var(--bg-card)',
                  border: '1px solid ' + (msg.role === 'user' ? 'rgba(124,106,255,0.3)' : 'var(--border)'),
                  color: 'var(--text-primary)',
                }}>
                {msg.content}
              </div>

              {/* Collapsed status lines */}
              {msg.statusLines && msg.statusLines.length > 0 && (
                <details className="text-xs mt-1 w-full" style={{ color: 'var(--text-muted)' }}>
                  <summary className="cursor-pointer flex items-center gap-1 hover:text-[var(--text-secondary)]">
                    <ChevronDown size={12} /> {msg.statusLines.length} log lines
                  </summary>
                  <div className="mt-1 px-3 py-2 rounded-lg font-mono space-y-0.5 text-[11px]"
                    style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)' }}>
                    {msg.statusLines.map((l, j) => <div key={j}>{l}</div>)}
                  </div>
                </details>
              )}
            </div>
          </div>
        ))}

        {/* Live streaming status */}
        {streaming && statusLines.length > 0 && (
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <Loader2 size={13} className="animate-spin" style={{ color: 'var(--accent-hover)' }} />
            </div>
            <div className="flex-1 px-4 py-2.5 rounded-2xl text-xs font-mono space-y-0.5"
              style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', color: 'var(--text-secondary)', maxWidth: '80%' }}>
              {statusLines.slice(-6).map((l, i) => (
                <div key={i} className="truncate">{l}</div>
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="shrink-0 px-4 py-3 border-t" style={{ borderColor: 'var(--border)', background: 'var(--bg-panel)' }}>
        <div className="flex items-end gap-2 rounded-2xl px-4 py-2.5"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
          <textarea
            ref={inputRef}
            id="ai-chat-input"
            rows={1}
            value={input}
            onChange={e => {
              setInput(e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
            }}
            onKeyDown={handleKeyDown}
            placeholder="Describe what to build…"
            disabled={streaming}
            className="flex-1 bg-transparent resize-none outline-none text-sm leading-relaxed"
            style={{ color: 'var(--text-primary)', maxHeight: '120px', minHeight: '24px' }}
          />
          <button
            id="send-chat-btn"
            onClick={sendMessage}
            disabled={streaming || !input.trim()}
            className="p-2 rounded-xl transition-all duration-200 disabled:opacity-40"
            style={{ background: 'linear-gradient(135deg, #7c6aff, #a78bfa)', color: '#fff' }}
          >
            <Send size={14} />
          </button>
        </div>
        <p className="text-[11px] mt-1.5 text-center hidden sm:block" style={{ color: 'var(--text-muted)' }}>
          Enter to send · Shift+Enter for newline
        </p>
      </div>
    </div>
  );
}
