import { useState } from "react";
import "./App.css";
import { SolanaWallet } from "./components/SolanaWallet.jsx";
import { EthWallet } from "./components/EthWallet.jsx";
import { generateMnemonic } from "bip39";

function App() {
  const [count, setCount] = useState(0);
  const [mnemonic, setMnemonic] = useState("");
  return (
    <>
      <input
        type="text"
        value={mnemonic}
        onChange={(event) => setMnemonic(event.target.value)}
      ></input>
      <button
        onClick={async function () {
          const mn = await generateMnemonic();
          setMnemonic(mn);
        }}
      >
        Create Seed Phrase
      </button>
      <SolanaWallet></SolanaWallet>
      <EthWallet></EthWallet>
    </>
  );
}

export default App;
