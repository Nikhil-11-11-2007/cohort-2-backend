import { useState } from 'react';
import ChatPanel from './ChatPanel';
import TerminalPanel from './TerminalPanel';
import PreviewPanel from './PreviewPanel';
import FileExplorer from './FileExplorer';
import CodeViewer from './CodeViewer';
import {
  MessageSquare, Terminal, Eye, FolderOpen,
  Copy, CheckCheck, Boxes, PanelLeftClose, PanelLeft,
  PanelBottomClose, PanelBottom,
} from 'lucide-react';

// Mobile tabs
const MOBILE_TABS = [
  { id: 'preview',  label: 'Preview',  Icon: Eye },
  { id: 'chat',     label: 'Chat',     Icon: MessageSquare },
  { id: 'terminal', label: 'Terminal', Icon: Terminal },
  { id: 'files',    label: 'Files',    Icon: FolderOpen },
];

export default function SandboxWorkspace({ sandbox }) {
  const { sandboxId, previewUrl, agentBase } = sandbox;

  // Panel visibility toggles
  const [showSidebar,  setShowSidebar]  = useState(true);
  const [showTerminal, setShowTerminal] = useState(true);
  const [showChat,     setShowChat]     = useState(true);

  // File viewing
  const [selectedFile, setSelectedFile] = useState(null);

  // Mobile active tab
  const [mobileTab, setMobileTab] = useState('preview');

  const [copied, setCopied] = useState(false);

  const copySandboxId = () => {
    navigator.clipboard.writeText(sandboxId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: 'var(--bg-primary)' }}>

      {/* ── Top Navbar ── */}
      <header
        className="flex items-center gap-2 px-3 sm:px-4 py-2 border-b shrink-0 z-20 min-w-0"
        style={{ background: 'var(--bg-panel)', borderColor: 'var(--border)' }}
      >
        {/* Logo */}
        
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #7c6aff, #a78bfa)' }}>
            <Boxes size={13} color="#fff" />
          </div>
          <span className="font-bold text-sm tracking-tight hidden sm:block" style={{ color: 'var(--text-primary)' }}>
            Sandbox<span style={{ color: 'var(--accent-hover)' }}>IDE</span>
          </span>
        </div>

        <div className="w-px h-4 mx-1 shrink-0 hidden sm:block" style={{ background: 'var(--border)' }} />

        {/* Sandbox ID badge */}
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-mono min-w-0 flex-1 sm:flex-none sm:max-w-[220px]"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
          <div className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0" style={{ background: '#4ade80' }} />
          <span className="truncate min-w-0">{sandboxId}</span>
          <button id="copy-sandbox-id-btn" onClick={copySandboxId}
            className="hover:opacity-70 transition-opacity shrink-0 ml-auto" title="Copy ID">
            {copied ? <CheckCheck size={11} style={{ color: '#4ade80' }} /> : <Copy size={11} />}
          </button>
        </div>

        <div className="flex-1 hidden sm:block" />

        {/* Desktop toolbar toggles */}
        <div className="hidden sm:flex items-center gap-1.5">
          <button
            id="toggle-terminal-btn"
            onClick={() => setShowTerminal(s => !s)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-all duration-200"
            style={{
              background: showTerminal ? 'var(--accent-dim)' : 'var(--bg-card)',
              border: `1px solid ${showTerminal ? 'rgba(124,106,255,0.3)' : 'var(--border)'}`,
              color: showTerminal ? 'var(--accent-hover)' : 'var(--text-secondary)',
            }}
            title="Toggle terminal">
            <Terminal size={12} />
            <span>Terminal</span>
          </button>

          <button
            id="toggle-chat-btn"
            onClick={() => setShowChat(s => !s)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-all duration-200"
            style={{
              background: showChat ? 'var(--accent-dim)' : 'var(--bg-card)',
              border: `1px solid ${showChat ? 'rgba(124,106,255,0.3)' : 'var(--border)'}`,
              color: showChat ? 'var(--accent-hover)' : 'var(--text-secondary)',
            }}
            title="Toggle AI Chat">
            <MessageSquare size={12} />
            <span>Chat</span>
          </button>

          <div className="w-px h-4 mx-0.5" style={{ background: 'var(--border)' }} />

          <button id="toggle-sidebar-btn" onClick={() => setShowSidebar(s => !s)}
            className="p-1.5 rounded-lg transition-all duration-200 hover:opacity-80"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
            title={showSidebar ? 'Hide files' : 'Show files'}>
            {showSidebar ? <PanelLeftClose size={14} /> : <PanelLeft size={14} />}
          </button>
        </div>
      </header>

      {/* ══════════════════════════════
          DESKTOP LAYOUT (sm+)
          Left: File Explorer (optional)
          Center: Preview + Terminal (stacked)
          Right: Chat Panel (optional)
         ══════════════════════════════ */}
      <div className="hidden sm:flex flex-1 min-h-0 overflow-hidden">

        {/* File Explorer sidebar */}
        {showSidebar && (
          <div className="w-52 shrink-0 border-r flex flex-col overflow-hidden"
            style={{ borderColor: 'var(--border)' }}>
            <FileExplorer agentBase={agentBase} onFileSelect={setSelectedFile} selectedFile={selectedFile} />
          </div>
        )}

        {/* Code Viewer (opens when a file is selected) */}
        {selectedFile && (
          <div className="w-96 shrink-0 border-r flex flex-col overflow-hidden"
            style={{ borderColor: 'var(--border)' }}>
            <CodeViewer agentBase={agentBase} filePath={selectedFile} onClose={() => setSelectedFile(null)} />
          </div>
        )}

        {/* ── Center column: Preview (top) + Terminal (bottom) ── */}
        <div className="flex-1 min-w-0 flex flex-col overflow-hidden">

          {/* Preview — fills all available space above terminal */}
          <div className="flex-1 min-h-0 overflow-hidden border-b" style={{ borderColor: 'var(--border)' }}>
            <PreviewPanel previewUrl={previewUrl} />
          </div>

          {/* Terminal — fixed height at bottom of center column */}
          {showTerminal && (
            <div className="shrink-0 overflow-hidden" style={{ height: '240px', borderColor: 'var(--border)' }}>
              <TerminalPanel agentBase={agentBase} />
            </div>
          )}
        </div>

        {/* ── Right column: AI Chat ── */}
        {showChat && (
          <div className="w-80 shrink-0 border-l flex flex-col overflow-hidden"
            style={{ borderColor: 'var(--border)' }}>
            <ChatPanel sandboxId={sandboxId} />
          </div>
        )}
      </div>

      {/* ══════════════════════════════
          MOBILE LAYOUT (< sm)
          Full-screen single panel + bottom tab bar
         ══════════════════════════════ */}
      <div className="flex sm:hidden flex-1 min-h-0 overflow-hidden flex-col">
        <div className="flex-1 min-h-0 overflow-hidden">
          <div className="h-full" style={{ display: mobileTab === 'preview'  ? 'flex' : 'none', flexDirection: 'column' }}>
            <PreviewPanel previewUrl={previewUrl} />
          </div>
          <div className="h-full" style={{ display: mobileTab === 'chat'     ? 'flex' : 'none', flexDirection: 'column' }}>
            <ChatPanel sandboxId={sandboxId} />
          </div>
          <div className="h-full" style={{ display: mobileTab === 'terminal' ? 'flex' : 'none', flexDirection: 'column' }}>
            <TerminalPanel agentBase={agentBase} />
          </div>
          <div className="h-full" style={{ display: mobileTab === 'files'    ? 'flex' : 'none', flexDirection: 'column' }}>
            {selectedFile ? (
              <CodeViewer agentBase={agentBase} filePath={selectedFile} onClose={() => setSelectedFile(null)} />
            ) : (
              <FileExplorer agentBase={agentBase} onFileSelect={setSelectedFile} selectedFile={selectedFile} />
            )}
          </div>
        </div>

        {/* Bottom tab bar */}
        <nav className="flex shrink-0 border-t"
          style={{ background: 'var(--bg-panel)', borderColor: 'var(--border)' }}>
          {MOBILE_TABS.map(({ id, label, Icon }) => {
            const active = mobileTab === id;
            return (
              <button
                key={id}
                id={`mobile-tab-${id}-btn`}
                onClick={() => setMobileTab(id)}
                className="flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-medium transition-colors duration-150"
                style={{ color: active ? 'var(--accent-hover)' : 'var(--text-muted)' }}>
                <Icon size={16} className="shrink-0" />
                <span>{label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
