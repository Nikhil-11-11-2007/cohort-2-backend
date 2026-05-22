import { useState } from 'react';
import ChatPanel from './ChatPanel';
import TerminalPanel from './TerminalPanel';
import PreviewPanel from './PreviewPanel';
import FileExplorer from './FileExplorer';
import {
  MessageSquare, Terminal, Eye, FolderOpen,
  Copy, CheckCheck, Boxes, PanelLeftClose, PanelLeft
} from 'lucide-react';

// Mobile bottom tabs (all 4 panels)
const MOBILE_TABS = [
  { id: 'chat',     label: 'Chat',     Icon: MessageSquare },
  { id: 'preview',  label: 'Preview',  Icon: Eye },
  { id: 'terminal', label: 'Terminal', Icon: Terminal },
  { id: 'files',    label: 'Files',    Icon: FolderOpen },
];

// Desktop right-pane tabs
const DESKTOP_TABS = [
  { id: 'preview',  label: 'Preview',  Icon: Eye },
  { id: 'terminal', label: 'Terminal', Icon: Terminal },
];

export default function SandboxWorkspace({ sandbox }) {
  const { sandboxId, previewUrl, agentBase } = sandbox;
  const [rightTab, setRightTab]     = useState('preview');
  const [mobileTab, setMobileTab]   = useState('chat');
  const [showSidebar, setShowSidebar] = useState(true);
  const [copied, setCopied]         = useState(false);

  const copySandboxId = () => {
    navigator.clipboard.writeText(sandboxId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: 'var(--bg-primary)' }}>

      {/* ── Top Navbar ── */}
      <header className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 border-b shrink-0 z-20 min-w-0"
        style={{ background: 'var(--bg-panel)', borderColor: 'var(--border)' }}>

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

        {/* Divider */}
        <div className="w-px h-4 hidden sm:block shrink-0" style={{ background: 'var(--border)' }} />

        {/* Sandbox ID badge — truncated, never overflows */}
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-mono min-w-0 flex-1 sm:flex-none sm:max-w-[220px]"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
          <div className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0" style={{ background: 'var(--success)' }} />
          <span className="truncate min-w-0">{sandboxId}</span>
          <button id="copy-sandbox-id-btn" onClick={copySandboxId}
            className="hover:opacity-70 transition-opacity shrink-0 ml-auto" title="Copy sandbox ID">
            {copied
              ? <CheckCheck size={11} style={{ color: 'var(--success)' }} />
              : <Copy size={11} />}
          </button>
        </div>

        {/* Spacer */}
        <div className="flex-1 hidden sm:block" />

        {/* Sidebar toggle — desktop only */}
        <button id="toggle-sidebar-btn" onClick={() => setShowSidebar(s => !s)}
          className="p-1.5 rounded-lg transition-all duration-200 hover:opacity-80 hidden sm:flex items-center justify-center shrink-0"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
          title={showSidebar ? 'Hide file explorer' : 'Show file explorer'}>
          {showSidebar ? <PanelLeftClose size={14} /> : <PanelLeft size={14} />}
        </button>
      </header>

      {/* ── Desktop layout (sm+) ── */}
      <div className="hidden sm:flex flex-1 min-h-0 overflow-hidden">

        {/* File Explorer sidebar */}
        {showSidebar && (
          <div className="w-52 shrink-0 border-r overflow-hidden flex flex-col"
            style={{ borderColor: 'var(--border)' }}>
            <FileExplorer agentBase={agentBase} />
          </div>
        )}

        {/* Chat panel */}
        <div className="w-72 lg:w-80 shrink-0 border-r overflow-hidden flex flex-col"
          style={{ borderColor: 'var(--border)' }}>
          <ChatPanel sandboxId={sandboxId} />
        </div>

        {/* Right pane: Preview + Terminal */}
        <div className="flex-1 min-w-0 flex flex-col overflow-hidden">

          {/* Tab bar */}
          <div className="flex items-center gap-1 px-3 py-1.5 border-b shrink-0"
            style={{ background: 'var(--bg-panel)', borderColor: 'var(--border)' }}>
            {DESKTOP_TABS.map(({ id, label, Icon }) => {
              const active = rightTab === id;
              return (
                <button
                  key={id}
                  id={`tab-${id}-btn`}
                  onClick={() => setRightTab(id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap"
                  style={{
                    background: active ? 'var(--accent-dim)' : 'transparent',
                    color: active ? 'var(--accent-hover)' : 'var(--text-muted)',
                    border: active ? '1px solid rgba(124,106,255,0.25)' : '1px solid transparent',
                  }}>
                  <Icon size={12} className="shrink-0" />
                  {label}
                </button>
              );
            })}
          </div>

          {/* Panel content */}
          <div className="flex-1 min-h-0 overflow-hidden">
            <div className="h-full" style={{ display: rightTab === 'preview' ? 'flex' : 'none', flexDirection: 'column' }}>
              <PreviewPanel previewUrl={previewUrl} />
            </div>
            <div className="h-full" style={{ display: rightTab === 'terminal' ? 'flex' : 'none', flexDirection: 'column' }}>
              <TerminalPanel agentBase={agentBase} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile layout (< sm) ── */}
      <div className="flex sm:hidden flex-1 min-h-0 overflow-hidden flex-col">

        {/* Active panel */}
        <div className="flex-1 min-h-0 overflow-hidden">
          <div className="h-full" style={{ display: mobileTab === 'chat'     ? 'flex' : 'none', flexDirection: 'column' }}>
            <ChatPanel sandboxId={sandboxId} />
          </div>
          <div className="h-full" style={{ display: mobileTab === 'preview'  ? 'flex' : 'none', flexDirection: 'column' }}>
            <PreviewPanel previewUrl={previewUrl} />
          </div>
          <div className="h-full" style={{ display: mobileTab === 'terminal' ? 'flex' : 'none', flexDirection: 'column' }}>
            <TerminalPanel agentBase={agentBase} />
          </div>
          <div className="h-full" style={{ display: mobileTab === 'files'    ? 'flex' : 'none', flexDirection: 'column' }}>
            <FileExplorer agentBase={agentBase} />
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
                className="flex-1 flex flex-col items-center justify-center gap-1 py-2 text-[10px] font-medium transition-colors duration-150"
                style={{ color: active ? 'var(--accent-hover)' : 'var(--text-muted)' }}>
                <Icon size={16} className="shrink-0" />
                <span className="leading-none">{label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
