import { useState, useEffect } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { GetSolBalance } from "./GetSolBalance";

export function SolanaWallet({ mnemonic }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wallets, setWallets] = useState([]);

  const addWallet = async () => {
    const seed = await mnemonicToSeed(mnemonic);
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);

    setCurrentIndex(currentIndex + 1);

    // Fetch balance for the new wallet
    const newWallet = {
      publicKey: keypair.publicKey.toBase58(),
      balance: 0 // Initial balance, will be updated by GetSolBalance
    };
    setWallets([...wallets, newWallet]);
  };

  return (
    <div>
      <button onClick={addWallet}>Add wallet</button>
      
      {wallets.map((wallet, index) => (
        <div key={index}>
          <div>Public Key: {wallet.publicKey}</div>
          <GetSolBalance publicKey={wallet.publicKey} setWallets={setWallets} index={index} />
        </div>
      ))}
    </div>
  );
}
