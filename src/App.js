import React, {useEffect, useState} from 'react';
import './App.css';
import { ethers } from 'ethers';
import contract from './contracts/abi.json';
import {Container, Message, Card, Statistic, Button, Input, Label,Form} from 'semantic-ui-react'

const contractAddress = "0x48183520A6f2d4487E68777A28D086e1A4ffC68b";
const abi = contract;


function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [moneyRequire,setMoneyRequire] =useState('');
  const [moneyDonate,setMoneyDonate] = useState('');
  const [firstname,setFirstname] = useState('');
  const [lastname,setLastname] = useState('');
  const [email,setEmail] = useState('');
  const [detail,setDetail] = useState('');
  const [donateNumber,setDonateNumber] = useState('');
  const [numberCheck,setNumberCheck] = useState('');

  const checkWalletIsConnected = async () => {
    const {ethereum}=window;
    if(!ethereum){
      console.log("Make sure you have Metamask!");
      return
    }else {
      console.log("Wallet found!");
    }
    const accounts =await ethereum.request({method:'eth_requestAccounts'});
    if(accounts.length !==0){
      const account = accounts[0];
      console.log("Found an authorized account",account);
      setCurrentAccount(account);
    }else {
      console.log("No authorized account");
    }

  }

  const connectWalletHandler = async () => {
    const {ethereum}=window;
    if(!ethereum){
      alert("Please install Metamask!");
    }
    try {
      const accounts =await ethereum.request({method:'eth_requestAccounts'});
      console.log("Found an account!Address:",accounts[0]);
      setCurrentAccount(accounts[0]);
    }catch (err){
      console.log(err);
    }
  }

  const mintNftHandler = async () => {
    try {
      const {ethereum} = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi, signer);
        console.log("Initialize payment");
        console.log(nftContract);
        const accounts = await ethereum.request({method: 'eth_requestAccounts'});
        const account = accounts[0];
        console.log(account);
        console.log(moneyRequire);
        let overrides = {
          value: moneyDonate,
        };
        let nftTxn = await nftContract.contribute(account, numberCheck,overrides);
        console.log("Please wait");
        await nftTxn.wait();
        console.log("Successful");
      } else {
        console.log("Ethereum object does not exist!")
      }
    } catch (err) {
      console.log(err);
    }
  }

  const getProjectRefresh =async ()=>{
    try {
      const {ethereum}=window;
      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const Contract = new ethers.Contract(contractAddress, abi, signer);
        let nftT = await Contract.test(numberCheck);
        setMoneyRequire(nftT[4].toNumber());
        setDonateNumber(nftT[6].toNumber());
        setFirstname(nftT[0]);
        setLastname(nftT[1]);
        setDetail(nftT[2]);
        setEmail(nftT[3]);
        console.log(nftT);
        console.log("moneyRequire",moneyRequire);
      }else{
        console.log("Ethereum object does not exist!")
      }
    }catch (err) {
      console.log(err);
    }
  }

  const connectWalletButton = () => {
    return (
        <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
          Connect Wallet
        </button>
    )
  }

  const mintNftButton = () => {
    return (
          <button onClick={getProjectRefresh} className='cta-button mint-nft-button'>
          Get all project
        </button>
    )
  }

  useEffect(() => {
    checkWalletIsConnected();
  }, [])


  const handleMessageChange = ( e ) => {
    setMoneyDonate(e.target.value );
  };

  const numberCheckMessageChange = ( e ) => {
    setNumberCheck( e.target.value );
  };


  return (
      <div className='main-app'>
        <div>
          <Input labelPosition='right' type='text' placeholder='Amount'>
            <input type="number" placeholder="Please enter the donate you want to check" value={numberCheck} onChange={numberCheckMessageChange}/>
          </Input>
        </div>
        <div>
          {currentAccount ? mintNftButton() : connectWalletButton()}
        </div>
        <Container>
          <br/>
          <Message info>
            <Message.Header>One little step can help others.</Message.Header>
            <p>Kindness helps</p>
          </Message>

          <Card.Group>
            <Card>
              <Card
                  image='./images/logo.jpg'
                  header='Water Found'
                  meta={email}
                  description={detail}
                  extra={firstname+"  "+lastname}
              />
              <Statistic color='red'>
                <Statistic.Value>{moneyRequire}</Statistic.Value>
                <Statistic.Label>Need</Statistic.Label>
              </Statistic>
              <Statistic color='yellow'>
                <Statistic.Value>{donateNumber}</Statistic.Value>
                <Statistic.Label>founder</Statistic.Label>
              </Statistic>
              <Form>
                <Input labelPosition='right' type='text' placeholder='Amount'>
                  <Label basic>Wei</Label>
                  <input type="number" placeholder="Please enter money you want to donate" value={moneyDonate} onChange={handleMessageChange}/>
                </Input>
                <Button animated='fade' onClick={mintNftHandler}>
                  <Button.Content visible>Click to Fund</Button.Content>
                  <Button.Content hidden>1 eth to save life</Button.Content>
                </Button>
              </Form>
            </Card>
        </Card.Group>
        </Container>
      </div>
  )
}

export default App;
