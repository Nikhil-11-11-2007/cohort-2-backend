import { useState } from 'react';
import LandingPage from './components/LandingPage';
import SandboxWorkspace from './components/SandboxWorkspace';
import './index.css';

export default function App() {
  const [sandbox, setSandbox] = useState(null); // { sandboxId, previewUrl, agentBase }

  const handleSandboxCreated = (data) => {
    const agentBase = `http://${data.sandboxId}.agent.127.0.0.1.nip.io`;
    setSandbox({ ...data, agentBase });
  };

  return sandbox
    ? <SandboxWorkspace sandbox={sandbox} />
    : <LandingPage onSandboxCreated={handleSandboxCreated} />;
}
