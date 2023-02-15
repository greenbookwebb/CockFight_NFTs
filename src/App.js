import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
const Web3 = require("web3");
//const ethers = require('ethers');
//


const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

export const StyledButton = styled.button`
  padding: 10px;
  border-radius: 50px;
  border: none;
  background-color: var(--secondary);
  padding: 10px;
  font-weight: bold;
  color: var(--secondary-text);
  width: 100px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const StyledRoundButton = styled.button`
  padding: 10px;
  border-radius: 100%;
  border: none;
  background-color: var(--primary);
  padding: 10px;
  font-weight: bold;
  font-size: 15px;
  color: var(--primary-text);
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const StyledLogo = styled.img`
  width: 200px;
  @media (min-width: 767px) {
    width: 300px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

export const StyledImg = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
  border: 4px dashed var(--secondary);
  background-color: var(--accent);
  border-radius: 100%;
  width: 200px;
  @media (min-width: 900px) {
    width: 250px;
  }
  @media (min-width: 1000px) {
    width: 300px;
  }
  transition: width 0.5s;
`;

export const StyledLink = styled.a`
  color: var(--secondary);
  text-decoration: none;
`;

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [claimingNftPublic, setClaimingNftPublic] = useState(false);
  const [claimingNftWhitelist, setClaimingNftWhitelist] = useState(false);
  const [feedback, setFeedback] = useState(`Click below to mint:`);
  const [CurrentStatus, setCurrentStatus] = useState(``);
  const [NFTBalance, setNFTBalance] = useState(0);
  const [WhitelistPrice, setWhitelistPrice] = useState("...");
  const [PublicPrice, setPublicPrice] = useState("...");
  const [mintAmount, setMintAmount] = useState(1);
  const [RemainingWhitelist, setRemainingWhitelist] = useState("...");
  const [RemainingPublic, setRemainingPublic] = useState("...");
  const [WhitelistEligibility, setWhitelistEligibility] = useState(0);
  const [TotalMinted, setTotalMinted] = useState(0);
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });

  const web3 = new Web3(new Web3.providers.HttpProvider("https://arb-goerli.g.alchemy.com/v2/Ui-PGUGBVzdWl93ccKGJ6e_9durEWB6q"));
  const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"ApprovalCallerNotOwnerNorApproved","type":"error"},{"inputs":[],"name":"ApprovalQueryForNonexistentToken","type":"error"},{"inputs":[],"name":"BalanceQueryForZeroAddress","type":"error"},{"inputs":[],"name":"MintERC2309QuantityExceedsLimit","type":"error"},{"inputs":[],"name":"MintToZeroAddress","type":"error"},{"inputs":[],"name":"MintZeroQuantity","type":"error"},{"inputs":[],"name":"OwnerQueryForNonexistentToken","type":"error"},{"inputs":[],"name":"OwnershipNotInitializedForExtraData","type":"error"},{"inputs":[],"name":"TransferCallerNotOwnerNorApproved","type":"error"},{"inputs":[],"name":"TransferFromIncorrectOwner","type":"error"},{"inputs":[],"name":"TransferToNonERC721ReceiverImplementer","type":"error"},{"inputs":[],"name":"TransferToZeroAddress","type":"error"},{"inputs":[],"name":"URIQueryForNonexistentToken","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"fromTokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"toTokenId","type":"uint256"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"ConsecutiveTransfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"MAX_PER_TX_PUBLIC","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_PER_TX_WHITELIST","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_PER_WALLET_PUBLIC","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_PER_WALLET_WHITELIST","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_SUPPLY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mintPhase","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mintPricePublic","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mintPriceWhitelist","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"quantity","type":"uint256"}],"name":"publicMintCock","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"publicMints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"remainingpublicmints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"remainingwhitelistmints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"newBaseURI","type":"string"}],"name":"revealTheCocks","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"setMintPricePublic","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"setMintPriceWhitelist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newMintPhase","type":"uint256"}],"name":"setMintingPhase","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAddress","type":"address"}],"name":"setSigningAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"newBaseURI","type":"string"},{"internalType":"string","name":"newBaseURIExtension","type":"string"}],"name":"updateBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"newUnrevealedURI","type":"string"}],"name":"updateUnrevealedURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"quantity","type":"uint256"},{"internalType":"bytes","name":"signature","type":"bytes"}],"name":"whitelistMintCock","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"whitelistMints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];
  const contractAddress = "0xFd357A1C1029EE12809037E5fCbf5c234b4CEc33";
  const contract = new web3.eth.Contract(abi, contractAddress);
  
  let userWalletAddress = blockchain.account;
  let signature;
  let dataLoaded = false;
  let MintPhase;
  let MintPhaseLoaded = false;
  let balance;
  let BalanceLoaded = false;
  let MintPriceWhitelist;
  let MintPriceWhitelistLoaded = false;
  let MintPricePublic;
  let MintPricePublicLoaded = false;
  let remainingwhitelist;
  let remainingwhitelistLoaded = false;
  let remainingpublic;
  let remainingpublicLoaded = false;
  let totalminted;
  let totalmintedLoaded = false;

  //let totalminted;
  //let totalmintedLoaded = false;
  //const [TotalMinted, setTotalMinted] = useState(0);

  const gettotalminted = () => {
    contract.methods.totalSupply()
    .call()
    .then(response => {totalminted = response; totalmintedLoaded = true; console.log(response)})
    .catch(error => {console.error(error);});
  
    const checktotalminted = setInterval(() => {
      if (totalmintedLoaded) {
        setTotalMinted(totalminted);
          console.log("totalminted:", TotalMinted);
          clearInterval(checktotalminted);
      }
  }, 100);
  };


  const checkWhitelistEligibility = () => {
    const whitelist = [
      '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
      '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
      '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65',
      '0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc',
      '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
      '0x339fb5c406ecb3d2384d06ece2cfb3d3bb8271ff',
      '0x11B46Eb52728D805f2F6002f0cBc69286eb90fB4']
    if(whitelist.includes(userWalletAddress)) {
      setWhitelistEligibility(1);
      console.log("Whitelist Eligibility:", WhitelistEligibility);
      console.log(userWalletAddress);
    };
  }

  const claimNFTsWhitelist = () => {
    console.log(WhitelistEligibility);
    const whitelist = [
      '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
      '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
      '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65',
      '0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc',
      '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
      '0x339fb5c406ecb3d2384d06ece2cfb3d3bb8271ff',
      '0x11B46Eb52728D805f2F6002f0cBc69286eb90fB4']
    if(whitelist.includes(userWalletAddress)) {
      //...
      
      
      //const signer = new ethers.Wallet(PRIVATE_KEY);
      //const addressHash = ethers.utils.solidityKeccak256(['address'], [userWalletAddress.toLowerCase()]);
      //const messageBytes = ethers.utils.arrayify(addressHash);
      signer.signMessage(messageBytes).then(response => {signature = response; dataLoaded = true;}).catch(error => {console.error(error);});
    }
    else {
      setFeedback("Sorry - this address is not whitelisted.");
      setClaimingNftWhitelist(false);
    };

    const checkData = setInterval(() => {
      if (dataLoaded) {
          console.log("signature:", signature);
          let cost = CONFIG.WEI_COST_WHITELIST;
          let gasLimit = CONFIG.GAS_LIMIT;
          let totalCostWei = String(cost * mintAmount);
          let totalGasLimit = String(gasLimit * mintAmount);
          console.log("Cost: ", totalCostWei);
          console.log("Gas limit: ", totalGasLimit);
          setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
          setClaimingNftWhitelist(true);
          blockchain.smartContract.methods
            .whitelistMintCock(mintAmount, signature)
            .send({
              gasLimit: String(totalGasLimit),
              to: CONFIG.CONTRACT_ADDRESS,
              from: blockchain.account,
              value: totalCostWei,
            })
            .once("error", (err) => {
              console.log(err);
              setFeedback("Sorry, something went wrong please try again later.");
              setClaimingNftWhitelist(false);
            })
            .then((receipt) => {
              console.log(receipt);
              setFeedback(
                `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
              );
              dataLoaded = false;
              setClaimingNftWhitelist(false);
              dispatch(fetchData(blockchain.account));
            });
            clearInterval(checkData);
      }
    }, 100);
  };

  const claimNFTsPublic = () => {
    console.log(userWalletAddress);
    let cost = CONFIG.WEI_COST_PUBLIC;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmount);
    let totalGasLimit = String(gasLimit * mintAmount);
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNftPublic(true);
    blockchain.smartContract.methods
      .publicMintCock(mintAmount)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNftPublic(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
        );
        setClaimingNftPublic(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 10) {
      newMintAmount = 10;
    }
    setMintAmount(newMintAmount);
  };

  const getData = () => {

    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
      getMintPhase();
      getbalanceOf();
      getWhiteListPrice();
      getPublicPrice();
      checkWhitelistEligibility();
      getremainingwhitelist();
      getremainingpublic();
      gettotalminted();
    }
  };

  const getMintPhase = () => {
    contract.methods.mintPhase()
    .call()
    .then(response => {MintPhase = response; MintPhaseLoaded = true;})
    .catch(error => {console.error(error);});

    const checkMintPhase = setInterval(() => {
      if (MintPhaseLoaded) {
          console.log("MintPhase:", MintPhase);
          if(MintPhase==0) {setCurrentStatus("Whitelist Minting: Not Open.\n Public Minting: Not Open.")};
          if(MintPhase==1) {
            setCurrentStatus("Whitelist Minting: Open. Public Minting: Not Open.");
          };
          if(MintPhase==2) {setCurrentStatus("Whitelist Minting: Open. Public Minting: Open.")}
          clearInterval(checkMintPhase);
      }
  }, 100);
};

  const getPublicPrice = () => {
  contract.methods.mintPricePublic()
  .call()
  .then(response => {MintPricePublic = response; MintPricePublicLoaded = true; console.log(response)})
  .catch(error => {console.error(error);});

  const checkMintPricePublic = setInterval(() => {
    if (MintPricePublicLoaded) {
        setPublicPrice(MintPricePublic/1000000000000000000);
        console.log("MintPrice Public:", MintPricePublic);
        clearInterval(checkMintPricePublic);
    }
}, 100);
};

  const getWhiteListPrice = () => {
  contract.methods.mintPriceWhitelist()
  .call()
  .then(response => {MintPriceWhitelist = response; MintPriceWhitelistLoaded = true; console.log(response)})
  .catch(error => {console.error(error);});

  const checkMintPriceWhitelist = setInterval(() => {
    if (MintPriceWhitelistLoaded) {
        setWhitelistPrice(MintPriceWhitelist/1000000000000000000);
        console.log("MintPrice Whitelist:", MintPriceWhitelist);
        clearInterval(checkMintPriceWhitelist);
    }
}, 100);
};

const getremainingwhitelist = () => {
  contract.methods.remainingwhitelistmints(userWalletAddress)
  .call()
  .then(response => {remainingwhitelist = response; remainingwhitelistLoaded = true; console.log(response)})
  .catch(error => {console.error(error);});

  const checkremainingwhitelist = setInterval(() => {
    if (remainingwhitelistLoaded) {
      if(remainingwhitelist * WhitelistEligibility > -1) {
        setRemainingWhitelist(remainingwhitelist * WhitelistEligibility ); 
      } else {
        setRemainingWhitelist("..." );
      }
        console.log("remainingwhitelist:", RemainingWhitelist);
        clearInterval(checkremainingwhitelist);
    }
}, 100);
};

const getremainingpublic = () => {
  contract.methods.remainingpublicmints(userWalletAddress)
  .call()
  .then(response => {remainingpublic = response; remainingpublicLoaded = true; console.log(response)})
  .catch(error => {console.error(error);});

  const checkremainingpublic = setInterval(() => {
    if (remainingpublicLoaded) {
        setRemainingPublic(remainingpublic);
        console.log("remainingpublic:", RemainingPublic);
        clearInterval(checkremainingpublic);
    }
}, 100);
};

  const getbalanceOf = () => {
    console.log(blockchain.account);
    contract.methods.balanceOf(blockchain.account)
    .call()
    .then(response => {balance = response; BalanceLoaded = true;})
    .catch(error => {console.error(error);});

    const checkBalance = setInterval(() => {
      if (BalanceLoaded) {
          console.log("Balance:", balance);
          setNFTBalance(balance);
          clearInterval(checkBalance);
      }
  }, 100);
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);


  getWhiteListPrice();
  getPublicPrice();
  getMintPhase();
  gettotalminted();


  return (
    <s.Screen>
      <s.TextTitle
          style={{
            textAlign: "center",
            fontSize: 75,
            
            color: "var(--accent-text)",
          }}
        >CockFight NFTs</s.TextTitle>
  
        
        <ResponsiveWrapper flex={1} style={{ padding: 24 }} test>

        <s.Container
            flex={2}
            jc={"center"}
            ai={"center"}
            style={{
              backgroundColor: "var(--accent)",
              padding: 50,
              borderRadius: 24,
              border: "4px dashed var(--secondary)",
              boxShadow: "0px 5px 11px 2px rgba(0,0,0,0.7)"
              
            }}
          >
            <s.TextTitle
          style={{
            textAlign: "center",
            fontSize: 50,
            
            color: "var(--accent-text)",
          }}
        >{CurrentStatus}</s.TextTitle>
        
                
        </s.Container>




        </ResponsiveWrapper>
        <ResponsiveWrapper flex={1} style={{ padding: 24 }} test>
          <s.Container flex={1} jc={"center"} ai={"center"}>
            <StyledImg alt={"example"} src={"https://ipfs.io/ipfs/bafkreigle3r2msllvkfqrodkmwuyovwnbhmmn7tnwmedszkkmr7q45oya4"} />
          </s.Container>
          <s.SpacerLarge />
  <s.Container
            flex={2}
            jc={"center"}
            ai={"center"}
            style={{
              backgroundColor: "var(--accent)",
              padding: 24,
              borderRadius: 24,
              border: "4px dashed var(--secondary)",
              boxShadow: "0px 5px 11px 2px rgba(0,0,0,0.7)",
            }}
          >
            <s.TextTitle
              style={{
                textAlign: "center",
                fontSize: 50,
                
                color: "var(--accent-text)",
              }}
            >
             Total CockFights Minted:
            </s.TextTitle>
            <s.TextTitle
              style={{
                textAlign: "center",
                fontSize: 50,
                
                color: "var(--accent-text)",
              }}
            >
             {TotalMinted} / {CONFIG.MAX_SUPPLY}
            </s.TextTitle>

            <s.TextTitle
              style={{
                textAlign: "center",
                fontSize: 50,
                
                color: "var(--accent-text)",
              }}
            >
                  Your CockFights Minted:
                </s.TextTitle>
                <s.TextTitle
              style={{
                textAlign: "center",
                fontSize: 50,
                
                color: "var(--accent-text)",
              }}
            >
                  {NFTBalance} / {CONFIG.MAX_SUPPLY}
                </s.TextTitle>
                
            
            
            

            
  </s.Container>




          <s.SpacerLarge />
          <s.Container flex={1} jc={"center"} ai={"center"}>
            <StyledImg
              alt={"example"}
              src={"https://ipfs.io/ipfs/bafkreihzsgabowt7jotybzckwalx6tvuyuv7l26ydqlsirz5imnphkvlou"}
              style={{ transform: "scaleX(-1)" }}
            />
          </s.Container>
        </ResponsiveWrapper>

        
        <ResponsiveWrapper flex={1} style={{ padding: 24 }} test>
        <s.Container flex={1} jc={"center"} ai={"center"}>
            <StyledImg alt={"example"} src={"https://ipfs.io/ipfs/bafkreibmaaydcgqsxbkmc7d77cioas4gsiyz7zi336n66yg7kavomkcs5u"} />
          </s.Container>
          <s.SpacerLarge />
        <s.Container
            flex={2}
            jc={"center"}
            ai={"center"}
            style={{
              backgroundColor: "var(--accent)",
              padding: 24,
              borderRadius: 24,
              border: "4px dashed var(--secondary)",
              boxShadow: "0px 5px 11px 2px rgba(0,0,0,0.7)",
            }}
          >{Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
            <>
              <s.TextTitle
                style={{ textAlign: "center", color: "var(--accent-text)" }}
              >
                The sale has ended.
              </s.TextTitle>
              <s.TextDescription
                style={{ textAlign: "center", color: "var(--accent-text)" }}
              >
                You can still find {CONFIG.NFT_NAME} on
              </s.TextDescription>
              <s.SpacerSmall />
              <StyledLink target={"_blank"} href={CONFIG.MARKETPLACE_LINK}>
                {CONFIG.MARKETPLACE}
              </StyledLink>
            </>
          ) : (
            <>
            
              
              
              {blockchain.account === "" ||
              blockchain.smartContract === null ? (
            <s.Container ai={"center"} jc={"center"}>
                  
                  
                  <s.SpacerSmall />
                  <StyledButton style={{ width: "140px", height: "70px",}} 
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(connect());
                      getData();
                      getMintPhase();
                      getWhiteListPrice();
                      
                    }}
                  >
                    CONNECT
                  </StyledButton>
                
                  {blockchain.errorMsg !== "" ? (
                    <>
                      <s.SpacerSmall />
                      <s.TextDescription
                        style={{
                          textAlign: "center",
                          color: "var(--accent-text)",
                        }}
                      >
                        {blockchain.errorMsg}
                      </s.TextDescription>
                    </>
                  ) : null}
            </s.Container>
              ) : (
                <>
                  <s.TextTitle
            style={{
              textAlign: "center",
              fontSize: 20,
              
              color: "var(--accent-text)",
            }}
          >
                    {feedback}
                    </s.TextTitle>
                  <s.SpacerMedium />
            <s.Container ai={"center"} jc={"center"} fd={"row"}>
                    <StyledRoundButton 
                      style={{width: "50px", height: "50px", lineHeight: 0.4 }}
                      disabled={claimingNftPublic ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        decrementMintAmount();
                      }}
                    >
                      -
                    </StyledRoundButton>
                    <s.SpacerMedium />
                    <s.TextTitle
            style={{
              textAlign: "center",
              fontSize: 30,
              color: "var(--accent-text)",
            }}
          >
                      {mintAmount}
                      </s.TextTitle>
                    <s.SpacerMedium />
                    <StyledRoundButton style={{ width: "50px", height: "50px",}}
                      disabled={claimingNftPublic ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        incrementMintAmount();
                      }}
                    >
                      +
                    </StyledRoundButton>
            </s.Container>
                  <s.SpacerSmall />
            <s.Container ai={"center"} jc={"center"} fd={"row"}>
                    <StyledButton
                      disabled={claimingNftWhitelist ? 1 : 0} style={{ width: "150px", height: "75px",}}
                      onClick={(e) => {
                        e.preventDefault();
                        claimNFTsWhitelist();
                        getData();
                      }}
                    >
                      {claimingNftWhitelist ? "MINTING..." : "MINT (Whitelist)"}
                    </StyledButton>
                    <s.SpacerMedium />

                    <StyledButton
                      disabled={claimingNftPublic ? 1 : 0} style={{ width: "150px", height: "75px",}}
                      onClick={(e) => {
                        e.preventDefault();
                        claimNFTsPublic();
                        getData();
                      }}
                    >
                      {claimingNftPublic ? "MINTING..." : "MINT (Public)"}
                    </StyledButton>
            </s.Container>
                </>
              )}
            </>
          )}

                <s.SpacerXSmall />

          </s.Container>
          <s.SpacerLarge />
          <s.Container flex={1} jc={"center"} ai={"center"}>
            <StyledImg
              alt={"example"}
              src={"https://ipfs.io/ipfs/bafkreifoihpcaqhu4qiugjhsnr4jm2bnk2ofegimrtoc6tpleipttehg74"}
              style={{ transform: "scaleX(-1)" }}
            />
          </s.Container>
          </ResponsiveWrapper>
          <s.SpacerMedium />




        <ResponsiveWrapper flex={1} style={{ padding: 24 }} test>
        <s.Container flex={1} jc={"center"} ai={"center"}>
            <StyledImg alt={"example"} src={"https://ipfs.io/ipfs/bafkreia4efem4xspwuyc53k3vwozvajobt4ygjmh4ldw7fdpci533zamhe"} />
          </s.Container>
          <s.SpacerLarge />
        <s.Container
            flex={2}
            jc={"center"}
            ai={"center"}
            style={{
              backgroundColor: "var(--accent)",
              padding: 24,
              borderRadius: 24,
              border: "4px dashed var(--secondary)",
              boxShadow: "0px 5px 11px 2px rgba(0,0,0,0.7)",
              width: "49%"
            }}
          >
            <s.TextTitle
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  {WhitelistEligibility ? "You are eligible for the whitelist" : "You are not eligible for the whitelist."}
                </s.TextTitle>
                <s.SpacerMedium />
                <s.TextTitle
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  Remaining Whitelist Mints: {RemainingWhitelist}
                </s.TextTitle>
                <s.TextTitle
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  Remaining Public Mints: {RemainingPublic}
                </s.TextTitle>
                <s.SpacerMedium />
            <s.TextTitle
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  Whitelist: 1 {CONFIG.SYMBOL} costs {WhitelistPrice}{" "}
                  {CONFIG.NETWORK.SYMBOL}.
                </s.TextTitle>
                <s.SpacerXSmall />
                <s.TextTitle
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  Public: 1 {CONFIG.SYMBOL} costs {PublicPrice}{" "}
                  {CONFIG.NETWORK.SYMBOL}.
                </s.TextTitle>
                <s.SpacerXSmall />

          </s.Container>
          <s.SpacerLarge />
          <s.Container flex={1} jc={"center"} ai={"center"}>
            <StyledImg
              alt={"example"}
              src={"https://ipfs.io/ipfs/bafkreihucxycivrmfbntdlkivtcigx6kosrfuguthp7fkwyd2h5js4fzai"}
              style={{ transform: "scaleX(-1)" }}
            />
          </s.Container>
          </ResponsiveWrapper>
          <s.SpacerMedium />
        
      
      
    </s.Screen>
  );
}

export default App;
