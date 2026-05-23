import { useState, useEffect } from 'react';
import { Folder, FolderOpen, FileCode, FileText, RefreshCw, ChevronRight, ChevronDown, Loader2 } from 'lucide-react';

function buildTree(files) {
  const root = {};
  for (const f of files) {
    const parts = f.split('/');
    let node = root;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (!node[part]) node[part] = i === parts.length - 1 ? null : {};
      if (i < parts.length - 1) node = node[part];
    }
  }
  return root;
}

function getFileIcon(name) {
  const ext = name.split('.').pop()?.toLowerCase();
  const color = {
    jsx: '#61dafb', tsx: '#61dafb', js: '#f7df1e', ts: '#3178c6',
    css: '#264de4', html: '#e34f26', json: '#fbbf24', md: '#e8eaf0',
    svg: '#ff9800', png: '#ff9800', jpg: '#ff9800',
  }[ext] || '#9098b4';
  const Icon = ['jsx', 'tsx', 'js', 'ts', 'css', 'html'].includes(ext) ? FileCode : FileText;
  return <Icon size={13} style={{ color }} className="shrink-0" />;
}

function TreeNode({ name, node, depth = 0, onSelect, selectedFile, path = '' }) {
  const fullPath = path ? `${path}/${name}` : name;
  const isDir = node !== null && typeof node === 'object';
  const [open, setOpen] = useState(depth < 2);

  if (isDir) {
    return (
      <div>
        <button
          onClick={() => setOpen(o => !o)}
          className="flex items-center gap-1.5 w-full rounded-md text-left transition-colors duration-150 hover:bg-white/5 text-xs"
          style={{ paddingLeft: `${8 + depth * 14}px`, paddingTop: '3px', paddingBottom: '3px', color: 'var(--text-secondary)' }}>
          {open
            ? <ChevronDown size={11} className="shrink-0 opacity-60" />
            : <ChevronRight size={11} className="shrink-0 opacity-60" />}
          {open
            ? <FolderOpen size={13} className="shrink-0" style={{ color: '#fbbf24' }} />
            : <Folder size={13} className="shrink-0" style={{ color: '#fbbf24' }} />}
          <span className="truncate">{name}</span>
        </button>
        {open && (
          <div>
            {Object.entries(node).sort(([, a], [, b]) => {
              const aDir = a !== null && typeof a === 'object';
              const bDir = b !== null && typeof b === 'object';
              if (aDir !== bDir) return aDir ? -1 : 1;
              return 0;
            }).map(([childName, childNode]) => (
              <TreeNode key={childName} name={childName} node={childNode}
                depth={depth + 1} onSelect={onSelect} selectedFile={selectedFile} path={fullPath} />
            ))}
          </div>
        )}
      </div>
    );
  }

  const filePath = '/' + fullPath;
  const isSelected = selectedFile === filePath;

  return (
    <button
      onClick={() => onSelect(filePath)}
      className="flex items-center gap-1.5 w-full rounded-md text-left transition-colors duration-150 text-xs"
      style={{
        paddingLeft: `${8 + depth * 14}px`, paddingTop: '3px', paddingBottom: '3px',
        background: isSelected ? 'var(--accent-dim)' : 'transparent',
        color: isSelected ? 'var(--accent-hover)' : 'var(--text-secondary)',
        border: isSelected ? '1px solid rgba(124,106,255,0.2)' : '1px solid transparent',
      }}>
      {getFileIcon(name)}
      <span className="truncate">{name}</span>
    </button>
  );
}

export default function FileExplorer({ agentBase, onFileSelect, selectedFile }) {
  const [tree, setTree] = useState({});
  const [loading, setLoading] = useState(true);

  const loadFiles = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${agentBase}/list-files`);
      const data = await res.json();
      setTree(buildTree(data.files || []));
    } catch (e) {
      console.error('Failed to list files', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadFiles(); }, [agentBase]);

  return (
    <div className="flex flex-col h-full" style={{ background: 'var(--bg-secondary)' }}>
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-b shrink-0"
        style={{ borderColor: 'var(--border)', background: 'var(--bg-panel)' }}>
        <Folder size={13} style={{ color: 'var(--accent-hover)' }} />
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
          Explorer
        </span>
        <button id="file-refresh-btn" onClick={loadFiles}
          className="ml-auto p-1 rounded transition-opacity hover:opacity-70"
          style={{ color: 'var(--text-muted)' }} title="Refresh">
          <RefreshCw size={11} />
        </button>
      </div>

      {/* Tree */}
      <div className="flex-1 overflow-y-auto py-2 px-1 min-h-0">
        {loading ? (
          <div className="flex items-center gap-2 px-3 py-4 text-xs" style={{ color: 'var(--text-muted)' }}>
            <Loader2 size={12} className="animate-spin" /> Loading…
          </div>
        ) : (
          Object.entries(tree).sort(([, a], [, b]) => {
            const aDir = a !== null && typeof a === 'object';
            const bDir = b !== null && typeof b === 'object';
            if (aDir !== bDir) return aDir ? -1 : 1;
            return 0;
          }).map(([name, node]) => (
            <TreeNode key={name} name={name} node={node} depth={0}
              onSelect={onFileSelect} selectedFile={selectedFile} path="" />
          ))
        )}
      </div>
    </div>
  );
}
