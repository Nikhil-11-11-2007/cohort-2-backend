import { useRef, useState } from 'react';
import { Eye, RefreshCw, ExternalLink, Maximize2 } from 'lucide-react';

export default function PreviewPanel({ previewUrl }) {
  const iframeRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [key, setKey] = useState(0);

  const refresh = () => {
    setLoading(true);
    setKey(k => k + 1);
  };

  const openExternal = () => {
    window.open(previewUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col h-full" style={{ background: 'var(--bg-primary)' }}>
      {/* Header / toolbar */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b shrink-0 min-w-0"
        style={{ borderColor: 'var(--border)', background: 'var(--bg-panel)' }}>
        <Eye size={13} className="shrink-0" style={{ color: 'var(--accent-hover)' }} />
        <span className="text-sm font-semibold shrink-0" style={{ color: 'var(--text-primary)' }}>Preview</span>

        {/* URL bar — must truncate, not grow unbounded */}
        <div className="flex-1 min-w-0 mx-1.5 px-2 py-1 rounded-lg text-xs font-mono overflow-hidden"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
          <span className="block truncate">{previewUrl}</span>
        </div>

        {/* Loading dot */}
        {loading && (
          <div className="w-2 h-2 rounded-full animate-pulse shrink-0" style={{ background: 'var(--warning)' }} />
        )}

        <button id="preview-refresh-btn" onClick={refresh}
          className="p-1.5 rounded-lg transition-all duration-200 hover:opacity-80 shrink-0"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
          title="Refresh preview">
          <RefreshCw size={12} />
        </button>

        <button id="preview-external-btn" onClick={openExternal}
          className="p-1.5 rounded-lg transition-all duration-200 hover:opacity-80 shrink-0"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
          title="Open in new tab">
          <ExternalLink size={12} />
        </button>
      </div>

      {/* Iframe */}
      <div className="flex-1 relative min-h-0">
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10"
            style={{ background: 'var(--bg-primary)' }}>
            <div className="w-8 h-8 rounded-full border-2 animate-spin mb-3"
              style={{ borderColor: 'var(--border)', borderTopColor: 'var(--accent)' }} />
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Loading preview…</p>
          </div>
        )}
        <iframe
          key={key}
          ref={iframeRef}
          src={previewUrl}
          id="sandbox-preview-iframe"
          title="Sandbox Preview"
          className="w-full h-full border-0"
          style={{ background: '#fff' }}
          onLoad={() => setLoading(false)}
          allow="same-origin"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
        />
      </div>
    </div>
  );
}
