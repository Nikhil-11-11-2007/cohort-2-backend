import { useEffect } from 'react';
import './App.css';
import Healthcare from './HealthCare';

function App() {

  useEffect(() => {
    const connectWallet = async () => {
      if(!window.ethereum) {
        alert("download metaMask wallet")
        return
      }
    }

    connectWallet()
  },[])

  return (
    <div className="App">
      <Healthcare />
    </div>
  );
}

export default App;
