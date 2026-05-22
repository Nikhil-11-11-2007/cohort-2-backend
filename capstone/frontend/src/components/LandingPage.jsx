import { useState } from 'react';
import { Sparkles, Terminal, Code2, Eye, Loader2, Zap, ArrowRight } from 'lucide-react';

export default function LandingPage({ onSandboxCreated }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const createSandbox = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/sandbox/start', { method: 'POST' });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      onSandboxCreated(data);
    } catch (err) {
      setError(err.message || 'Failed to create sandbox. Is the backend running?');
      setLoading(false);
    }
  };

  const features = [
    {
      icon: <Terminal size={22} />,
      title: 'Live Terminal',
      desc: 'Full shell access via WebSocket, powered by xterm.js',
      color: '#4ade80',
    },
    {
      icon: <Code2 size={22} />,
      title: 'AI Code Gen',
      desc: 'Describe what to build — AI writes and applies the code',
      color: '#7c6aff',
    },
    {
      icon: <Eye size={22} />,
      title: 'Instant Preview',
      desc: 'Live iframe preview refreshes automatically',
      color: '#60a5fa',
    },
    {
      icon: <Zap size={22} />,
      title: 'Hot Reload',
      desc: 'File changes reflect in the browser in milliseconds',
      color: '#fbbf24',
    },
  ];

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* ── Background decorations ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        {/* Glowing orbs */}
        <div
          className="absolute rounded-full blur-[120px] opacity-20 animate-pulse"
          style={{
            width: '560px', height: '560px',
            top: '-100px', left: '-120px',
            background: 'radial-gradient(circle, #7c6aff, transparent 70%)',
            animationDuration: '4s',
          }}
        />
        <div
          className="absolute rounded-full blur-[100px] opacity-15 animate-pulse"
          style={{
            width: '480px', height: '480px',
            bottom: '-80px', right: '-80px',
            background: 'radial-gradient(circle, #a78bfa, transparent 70%)',
            animationDuration: '5s',
            animationDelay: '1.5s',
          }}
        />
        <div
          className="absolute rounded-full blur-[80px] opacity-10 animate-pulse"
          style={{
            width: '320px', height: '320px',
            top: '55%', left: '55%',
            background: 'radial-gradient(circle, #60a5fa, transparent 70%)',
            animationDuration: '6s',
            animationDelay: '3s',
          }}
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center gap-5 text-center px-6 w-full max-w-3xl">

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold tracking-wide uppercase mb-8 animate-fade-in-up"
          style={{
            background: 'rgba(124,106,255,0.12)',
            borderColor: 'rgba(124,106,255,0.35)',
            color: '#a78bfa',
            letterSpacing: '0.06em',
          }}
        >
          <Sparkles size={12} className="shrink-0" />
          <span>AI-Powered Dev Sandbox</span>
        </div>

        {/* Headline */}
        <h1
          className="font-extrabold leading-[1.1] tracking-tight mb-6 animate-fade-in-up animate-fade-in-up-delay-1"
          style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)' }}
        >
          <span
            style={{
              background: 'linear-gradient(135deg, #e8eaf0 0%, #c4c8dc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Build Anything,
          </span>
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #7c6aff 0%, #a78bfa 60%, #60a5fa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Instantly
          </span>
        </h1>

        {/* Sub-headline */}
        <p
          className="leading-relaxed mb-10 max-w-lg animate-fade-in-up animate-fade-in-up-delay-2"
          style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.95rem, 2vw, 1.125rem)' }}
        >
          Spin up an isolated sandbox, chat with AI to generate your frontend,
          and watch it come alive — with a live terminal and instant iframe preview.
        </p>

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 animate-fade-in-up animate-fade-in-up-delay-3">
          <button
            id="create-sandbox-btn"
            onClick={createSandbox}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2.5 rounded-2xl font-semibold transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
            style={{
              background: loading
                ? 'rgba(124,106,255,0.2)'
                : 'linear-gradient(135deg, #7c6aff 0%, #a78bfa 100%)',
              color: '#fff',
              padding: '14px 32px',
              fontSize: '1rem',
              boxShadow: loading ? 'none' : '0 0 48px rgba(124,106,255,0.45), 0 4px 24px rgba(0,0,0,0.3)',
            }}
            onMouseEnter={e => {
              if (!loading) e.currentTarget.style.boxShadow = '0 0 72px rgba(124,106,255,0.65), 0 4px 24px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={e => {
              if (!loading) e.currentTarget.style.boxShadow = '0 0 48px rgba(124,106,255,0.45), 0 4px 24px rgba(0,0,0,0.3)';
            }}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin shrink-0" />
                <span>Creating sandbox…</span>
              </>
            ) : (
              <>
                <Zap size={18} className="shrink-0" />
                <span>Start Sandbox</span>
              </>
            )}
          </button>

          <a
            href="#features"
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-200"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent-hover)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >
            See what's included
            <ArrowRight size={14} className="shrink-0" />
          </a>
        </div>

        {error && (
          <div
            className="mb-8 px-5 py-3 rounded-xl text-sm text-left w-full max-w-sm"
            style={{
              background: 'rgba(248,113,113,0.08)',
              border: '1px solid rgba(248,113,113,0.3)',
              color: 'var(--error)',
            }}
          >
            ⚠ {error}
          </div>
        )}

        {/* ── Feature cards ── */}
        <div id="features" className="grid  grid-cols-2 lg:grid-cols-4 gap-4 w-full animate-fade-in-up animate-fade-in-up-delay-4">
          {features.map(f => (
            <div
              key={f.title}
              className="flex flex-col gap-3 p-5 rounded-2xl text-left transition-all duration-200 group"
              style={{
                background: 'var(--bg-panel)',
                border: '1px solid var(--border)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${f.color}44`;
                e.currentTarget.style.background = `color-mix(in srgb, var(--bg-panel) 95%, ${f.color})`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.background = 'var(--bg-panel)';
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${f.color}18`, color: f.color }}
              >
                {f.icon}
              </div>
              <div>
                <div
                  className="font-semibold text-sm mb-1"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {f.title}
                </div>
                <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {f.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-10 text-xs" style={{ color: 'var(--text-muted)' }}>
          Requires the backend API to be running on{' '}
          <code
            className="px-1.5 py-0.5 rounded"
            style={{ background: 'var(--bg-card)', color: 'var(--text-secondary)' }}
          >
            localhost
          </code>
        </p>
      </div>
    </div>
  );
}
