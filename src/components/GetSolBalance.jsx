import React, { useState, useEffect } from 'react';
import axios from "axios";

export function GetSolBalance({ publicKey, setWallets, index }) {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (publicKey) {
      const data = {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "getAccountInfo",
        "params": [publicKey, { "encoding": "jsonParsed" }]
      };

      axios.post(`https://solana-mainnet.g.alchemy.com/v2/MTkNKqjggvUZOqpNHt1i47X-xmjB1SOG`, data)
        .then(res => {
          const lamports = res.data.result.value.lamports;
          setBalance(lamports);

          // Update balance in parent component's state
          setWallets(prevWallets => {
            const updatedWallets = [...prevWallets];
            updatedWallets[index].balance = lamports;
            return updatedWallets;
          });
        })
        .catch(err => {
          console.error("Error fetching balance:", err);
        });
    }
  }, [publicKey, setWallets, index]);

  return (
    <div>
      Balance: {balance} lamports
    </div>
  );
}
