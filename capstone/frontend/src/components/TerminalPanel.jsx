import { useEffect, useRef, useState } from 'react';
import { Terminal as TermIcon, Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { WebLinksAddon } from '@xterm/addon-web-links';
import { io } from 'socket.io-client';

export default function TerminalPanel({ agentBase }) {
  const containerRef = useRef(null);
  const termRef = useRef(null);
  const fitRef = useRef(null);
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [reconnecting, setReconnecting] = useState(false);

  const initTerminal = () => {
    // Cleanup existing
    if (termRef.current) {
      termRef.current.dispose();
      termRef.current = null;
    }
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    // Create terminal
    const term = new Terminal({
      theme: {
        background: '#0d0e14',
        foreground: '#e8eaf0',
        cursor: '#7c6aff',
        cursorAccent: '#0d0e14',
        black: '#1a1b26',
        red: '#f87171',
        green: '#4ade80',
        yellow: '#fbbf24',
        blue: '#60a5fa',
        magenta: '#c084fc',
        cyan: '#34d399',
        white: '#e8eaf0',
        brightBlack: '#565d7a',
        brightRed: '#fca5a5',
        brightGreen: '#86efac',
        brightYellow: '#fde68a',
        brightBlue: '#93c5fd',
        brightMagenta: '#d8b4fe',
        brightCyan: '#6ee7b7',
        brightWhite: '#f9fafb',
      },
      fontFamily: '"JetBrains Mono", "Fira Code", "Cascadia Code", monospace',
      fontSize: 13,
      lineHeight: 1.5,
      cursorStyle: 'block',
      cursorBlink: true,
      allowTransparency: true,
      scrollback: 2000,
    });

    const fit = new FitAddon();
    const webLinks = new WebLinksAddon();
    term.loadAddon(fit);
    term.loadAddon(webLinks);
    term.open(containerRef.current);
    fit.fit();

    termRef.current = term;
    fitRef.current = fit;

    term.writeln('\x1b[1;35m╔══════════════════════════════════════╗\x1b[0m');
    term.writeln('\x1b[1;35m║  Sandbox Terminal — Connecting…      ║\x1b[0m');
    term.writeln('\x1b[1;35m╚══════════════════════════════════════╝\x1b[0m');
    term.writeln('');

    // Socket.IO connection
    const socket = io(agentBase, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1500,
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      setConnected(true);
      setReconnecting(false);
      term.writeln('\x1b[1;32m✔ Connected to sandbox shell\x1b[0m');
      term.writeln('');
    });

    socket.on('disconnect', () => {
      setConnected(false);
      term.writeln('\x1b[1;31m✖ Disconnected from shell\x1b[0m');
    });

    socket.on('connect_error', (err) => {
      setReconnecting(true);
      term.writeln(`\x1b[1;33m⚠ Connection error: ${err.message}\x1b[0m`);
    });

    socket.on('terminal-output', (data) => {
      term.write(typeof data === 'string' ? data : new Uint8Array(data));
    });

    // Terminal input → socket
    term.onData(data => {
      if (socket.connected) {
        socket.emit('terminal-input', data);
      }
    });

    // Resize observer
    const ro = new ResizeObserver(() => {
      try { fit.fit(); } catch (_) {}
    });
    ro.observe(containerRef.current);

    return () => {
      ro.disconnect();
      socket.disconnect();
      term.dispose();
    };
  };

  useEffect(() => {
    const cleanup = initTerminal();
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agentBase]);

  const handleReconnect = () => {
    initTerminal();
  };

  return (
    <div className="flex flex-col h-full" style={{ background: 'var(--bg-primary)' }}>
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b shrink-0 min-w-0"
        style={{ borderColor: 'var(--border)', background: 'var(--bg-panel)' }}>
        <TermIcon size={13} className="shrink-0" style={{ color: 'var(--accent-hover)' }} />
        <span className="text-sm font-semibold shrink-0" style={{ color: 'var(--text-primary)' }}>Terminal</span>

        <div className="ml-auto flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1 text-xs whitespace-nowrap"
            style={{ color: connected ? 'var(--success)' : 'var(--error)' }}>
            {connected ? <Wifi size={11} className="shrink-0" /> : <WifiOff size={11} className="shrink-0" />}
            <span className="hidden sm:inline">
              {reconnecting ? 'Reconnecting…' : connected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
          <button id="terminal-reconnect-btn" onClick={handleReconnect}
            className="p-1.5 rounded-lg transition-all duration-200 hover:opacity-80 shrink-0"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
            title="Reconnect terminal">
            <RefreshCw size={12} />
          </button>
        </div>
      </div>

      {/* Xterm container */}
      <div ref={containerRef} className="flex-1 min-h-0 p-1" style={{ background: '#0d0e14' }} />
    </div>
  );
}
