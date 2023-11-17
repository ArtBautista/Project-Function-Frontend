import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [count, setCount] = useState(0);

  const [transactionHistory, setTransactionHistory] = useState([]);
  const [transactionCount, setTransactionCount] = useState(0);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({method: "eth_accounts"});
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log ("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
 
    setATM(atmContract);
  }

  const getBalance = async() => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  }

  const deposit = async() => {
    if (atm) {
      let tx = await atm.deposit(count);
      await tx.wait()
      getBalance();
      setTransacCount("Deposit", count);

    }
  }
  const withdraw = async() => {
    if (atm) {
      let tx = await atm.withdraw(count);
      await tx.wait()
      getBalance();
      setTransacCount("Withdraw", count);
    }
  }

  const setTransacCount = (status, amount) => {
    const counter = transactionCount;

    const transaction = [amount, status];
    const transacHistoryTemp = transactionHistory;
    transacHistoryTemp.push(transaction);
    setTransactionHistory(transacHistoryTemp);

    const transacCount = transactionCount + 1;
    setTransactionCount(transacCount);
  };

  const showTransactionHistory = () => {
    if (transactionHistory.length === 0) {
      return <p>No transaction has been made today.</p>;
    } else {
      return (
        <div>
        <h2>Transaction History</h2>
        {transactionHistory.map((transaction, index) => (
          <div key={index}>
            <p>{transaction[1]}: {transaction[0]} ETH</p>
            <br />
          </div>
        ))}
      </div>
      );
    }
  };


  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>
    }

    if (balance == undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance}</p>
        <p>Your Count: {count}</p>
        <br></br>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setCount(count - 1)}>Decrement</button>
        <button onClick={() => setCount(0)}>Reset</button>
        <br></br>
        <button onClick={deposit}>Deposit ETH</button>
        <button onClick={withdraw}>Withdraw ETH</button>
        
        {showTransactionHistory()}
      </div>
    )
  }

  useEffect(() => {getWallet();}, []);

  return (
    <main className="container">
      <header><h1>Welcome to the Metacrafters ATM!</h1></header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center
        }
      `}
      </style>
    </main>
  )
}