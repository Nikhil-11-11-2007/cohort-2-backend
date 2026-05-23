import { useEffect, useState, useRef } from 'react';
import { FileCode, Loader2, Copy, CheckCheck, X, ChevronLeft, ChevronRight } from 'lucide-react';

// Very lightweight token colorizer
function tokenize(code, ext) {
  if (!code) return [];
  const lines = code.split('\n');

  const keywords = /\b(import|export|from|default|const|let|var|function|return|if|else|for|while|class|extends|new|this|typeof|instanceof|async|await|try|catch|finally|throw|true|false|null|undefined|=>|of|in|break|continue|switch|case)\b/g;
  const strings = /(["'`])(?:(?!\1)[^\\]|\\.)*?\1/g;
  const comments = /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm;
  const numbers = /\b(\d+\.?\d*)\b/g;
  const tags = /(<\/?[A-Za-z][A-Za-z0-9.]*)/g;
  const attrs = /\s([a-zA-Z-]+)=/g;
  const functions = /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g;

  return lines.map((line, idx) => ({ line, idx }));
}

function CodeLine({ line, lineNumber, ext }) {
  // Simple regex-based coloring
  const isJSX = ['jsx', 'tsx', 'js', 'ts'].includes(ext);
  const isCSS = ['css', 'scss'].includes(ext);

  let html = line
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  if (isJSX) {
    html = html
      // strings
      .replace(/(&#39;|&quot;|`)(.*?)\1/g, '<span style="color:#a5d6a7">$1$2$1</span>')
      // comments
      .replace(/(\/\/.*)/g, '<span style="color:#546e7a;font-style:italic">$1</span>')
      // keywords
      .replace(/\b(import|export|from|default|const|let|var|function|return|if|else|for|while|class|extends|new|typeof|async|await|true|false|null|undefined)\b/g,
        '<span style="color:#ce93d8">$1</span>')
      // numbers
      .replace(/\b(\d+\.?\d*)\b/g, '<span style="color:#80cbc4">$1</span>')
      // JSX tags
      .replace(/(&lt;\/?[A-Z][a-zA-Z]*)/g, '<span style="color:#80deea">$1</span>')
      .replace(/(&lt;\/?[a-z][a-z0-9]*)/g, '<span style="color:#ef9a9a">$1</span>');
  } else if (isCSS) {
    html = html
      .replace(/(\/\*.*?\*\/)/g, '<span style="color:#546e7a;font-style:italic">$1</span>')
      .replace(/([a-zA-Z-]+)\s*:/g, '<span style="color:#80deea">$1</span>:')
      .replace(/(#[0-9a-fA-F]{3,8})/g, '<span style="color:#a5d6a7">$1</span>')
      .replace(/(\d+\.?\d*(?:px|em|rem|%|vh|vw|s|ms)?)/g, '<span style="color:#80cbc4">$1</span>');
  }

  return (
    <div className="flex hover:bg-white/5 group">
      <span className="select-none text-right pr-4 shrink-0 w-10"
        style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '11px' }}>
        {lineNumber + 1}
      </span>
      <span
        className="flex-1 whitespace-pre"
        style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '11px' }}
        dangerouslySetInnerHTML={{ __html: html || ' ' }}
      />
    </div>
  );
}

export default function CodeViewer({ agentBase, filePath, onClose }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const ext = filePath?.split('.').pop()?.toLowerCase() || '';

  useEffect(() => {
    if (!filePath || !agentBase) return;
    setLoading(true);
    setContent('');
    fetch(`${agentBase}/read-files?files=${encodeURIComponent(filePath)}`)
      .then(r => r.json())
      .then(data => {
        const obj = data.files?.[0];
        if (obj) setContent(Object.values(obj)[0] || '');
      })
      .catch(() => setContent('// Error loading file'))
      .finally(() => setLoading(false));
  }, [filePath, agentBase]);

  const copyCode = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = content.split('\n');

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b shrink-0 min-w-0"
        style={{ borderColor: 'var(--border)', background: 'var(--bg-panel)' }}>
        <FileCode size={13} className="shrink-0" style={{ color: 'var(--accent-hover)' }} />
        <span className="text-xs font-mono truncate flex-1 min-w-0" style={{ color: 'var(--text-secondary)' }}>
          {filePath || 'No file selected'}
        </span>
        {content && (
          <button onClick={copyCode} title="Copy code"
            className="p-1.5 rounded-lg hover:opacity-80 transition-opacity shrink-0"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
            {copied ? <CheckCheck size={11} style={{ color: '#4ade80' }} /> : <Copy size={11} />}
          </button>
        )}
        {onClose && (
          <button onClick={onClose} title="Close code view"
            className="p-1.5 rounded-lg hover:opacity-80 transition-opacity shrink-0"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
            <X size={11} />
          </button>
        )}
      </div>

      {/* Code area */}
      <div className="flex-1 overflow-auto min-h-0">
        {loading ? (
          <div className="flex items-center gap-2 p-4 text-xs" style={{ color: 'var(--text-muted)' }}>
            <Loader2 size={12} className="animate-spin" /> Loading file…
          </div>
        ) : !filePath ? (
          <div className="flex flex-col items-center justify-center h-full gap-3"
            style={{ color: 'var(--text-muted)' }}>
            <FileCode size={32} className="opacity-20" />
            <p className="text-xs text-center px-4">Select a file from the explorer to view its code</p>
          </div>
        ) : (
          <div className="font-mono py-2" style={{ fontFamily: '"JetBrains Mono", "Fira Code", monospace' }}>
            {lines.map((line, idx) => (
              <CodeLine key={idx} line={line} lineNumber={idx} ext={ext} />
            ))}
          </div>
        )}
      </div>

      {/* Footer: line count */}
      {content && !loading && (
        <div className="shrink-0 px-3 py-1.5 border-t flex items-center gap-3 text-[10px]"
          style={{ borderColor: 'var(--border)', background: 'var(--bg-panel)', color: 'var(--text-muted)' }}>
          <span>{lines.length} lines</span>
          <span>{content.length} chars</span>
          <span className="ml-auto uppercase">{ext || 'txt'}</span>
        </div>
      )}
    </div>
  );
}
