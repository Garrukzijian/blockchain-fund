import { useEffect } from 'react';
import './App.css';
import { ethers } from 'ethers';
import contract from './contracts/abi.json';
import {useState} from "react";
import {Container, Message, Card, Icon, Statistic, Button} from 'semantic-ui-react'


const contractAddress = "0x189B019C876b65D9a266d76898b8d98bD6bD3BB1";
const abi = contract;

const extra = (
    <a>
      <Icon name='user' />
      16 Friends
    </a>
)
function App() {

  const [currentAccount, setCurrentAccount] = useState(null);

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
      const {ethereum}=window;
      if(ethereum){
        const provider =new ethers.providers.Web3Provider(ethereum);
        const signer =provider.getSigner();
        const nftContract =new ethers.Contract(contractAddress,abi,signer);
        console.log("Initialize payment");
      }else {
        console.log("Ethereum object does not exist!")
      }
    }catch (err){
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
        <button onClick={mintNftHandler} className='cta-button mint-nft-button'>
          Mint NFT
        </button>
    )
  }

  useEffect(() => {
    checkWalletIsConnected();
  }, [])

  return (
      <div className='main-app'>
        <h1>Scrappy Squirrels Tutorial</h1>
        <div>
          {currentAccount ? mintNftButton() : connectWalletButton()}
        </div>
        <Container>
          <br/>
          <Message info>
            <Message.Header>Was this what you wanted?</Message.Header>
            <p>Did you know it's been a while?</p>
          </Message>

          <Card.Group>
            <Card>
              <Card
                  image='./images/logo.jpg'
                  header='Water Found'
                  meta='Funder'
                  description='Water drop, which goes by Shuidihuzhu in China (translated as “water drop mutual help”).'
                  extra={extra}
              />
              <Statistic color='red'>
                <Statistic.Value>27</Statistic.Value>
                <Statistic.Label>funder</Statistic.Label>
              </Statistic>
              <Button animated='fade'>
                <Button.Content visible>Click to Fund</Button.Content>
                <Button.Content hidden>1 eth to save life</Button.Content>
              </Button>
            </Card>
            <Card>
              <Card
                  image='./images/logo.jpg'
                  header='Water Found'
                  meta='Funder'
                  description='Water drop, which goes by Shuidihuzhu in China (translated as “water drop mutual help”).'
                  extra={extra}
              />
              <Statistic color='red'>
                <Statistic.Value>20</Statistic.Value>
                <Statistic.Label>funder</Statistic.Label>
              </Statistic>
              <Button animated='fade'>
                <Button.Content visible>Click to Fund</Button.Content>
                <Button.Content hidden>1 eth to save life</Button.Content>
              </Button>
            </Card>
        </Card.Group>
        </Container>
      </div>
  )
}

export default App;
