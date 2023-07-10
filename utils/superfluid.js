import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from 'ethers';
import { daiABI } from "./daiABI";

const DAI_ADDRESS = "0x15F0Ca26781C3852f8166eD2ebce5D18265cceb7";
const DAIX_ADDRESS = "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f";

export const initializingSuperfluid = async (p) => {
  try{
    const provider = new ethers.providers.Web3Provider(p);
    const signer = provider.getSigner();
    const sf = await Framework.create({
      chainId: 80001,
      provider: signer
    });

    return sf;
  }
  catch(error){
    console.error(error);
  }
}

export const getDAIBalance = async (p, address) => {
  try{
    const provider = new ethers.providers.Web3Provider(p);
    const signer = provider.getSigner();

    const DAI = new ethers.Contract(
      DAI_ADDRESS,
      daiABI,
      signer
    );

    const balance = await DAI.balanceOf(address);
    console.log(balance);
    return (balance / 10 ** 18);
  }
  catch(error){
    console.error(error);
  }
}


export const getfDAIxBalance = async (p, address) => {
  try{ 
    const provider = new ethers.providers.Web3Provider(p);
    const signer = provider.getSigner();

    const sf = await initializingSuperfluid(p);
   
    const daix = await sf.loadSuperToken("fDAIx");

    const balance = await daix.balanceOf({
      account: address,
      providerOrSigner: signer
    });

    return (balance / 10 ** 18);
  }
  catch(error){
    console.error(error);
  }
}

export async function approveDAITokens(p, amount) {
  const provider = new ethers.providers.Web3Provider(p);
  const signer = provider.getSigner();

  const sf = await initializingSuperfluid(p);
  const superSigner = sf.createSigner({ signer: signer });

  console.log(signer);
  console.log(await superSigner.getAddress());
  const DAI = new ethers.Contract(
    DAI_ADDRESS,
    daiABI,
    signer
  );
  console.log(amount)
  try {
    console.log("approving DAI spend");
    await DAI.approve(
      DAIX_ADDRESS,
      ethers.utils.parseEther(amount.toString())
    ).then(function (tx) {
      console.log(
        `Congrats, you just approved your DAI spend. You can see this tx at https://mumbai.polygonscan.com/tx/${tx.hash}`
      );
    });
  } catch (error) {
    console.log(
      "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
    );
    console.error(error);
  }
}



export const upgradeDAIToDAIx = async (p, amount) => {
  const provider = new ethers.providers.Web3Provider(p);
  const signer = provider.getSigner();

  const sf = await initializingSuperfluid(p);
  const superSigner = sf.createSigner({ signer: signer });

  console.log(signer);
  console.log(await superSigner.getAddress());
  const daix = await sf.loadSuperToken("fDAIx");

  console.log(daix);

  try {
    const upgradeOperation = daix.upgrade({
      amount: ethers.utils.parseEther(amount.toString())
    });

    console.log("Upgrading...");

    await upgradeOperation.exec(signer);

    console.log(
      `Congrats - you've just upgraded your tokens to an Index!
         Network: Mumbai
         Super Token: DAIx
         Amount: ${amount}         
      `
    );

    console.log(
      `Congrats - you've just distributed to your index!
    `
    );
  } catch(error){
    console.error(error);
  }
}

export const streamDAIx = async (p, from, to, flowRate) => {
  const provider = new ethers.providers.Web3Provider(p);
  const signer = provider.getSigner();

  const sf = await initializingSuperfluid(p);
  const superSigner = sf.createSigner({ signer: signer });

  console.log(signer);
  console.log(await superSigner.getAddress());
  const daix = await sf.loadSuperToken("fDAIx");

  console.log(daix);

  try {
    const createFlowOperation = sf.cfaV1.createFlow({
      sender: from,
      receiver: to,
      flowRate: flowRate,
      superToken: daix.address,
    });

    console.log("Creating your stream...");
    console.log(createFlowOperation);

    const result = await createFlowOperation.exec(signer);
    console.log(result);
    console.log(`See your stream at https://app.superfluid.finance/?view=${to}`);
  } catch(error){
    console.error(error);
  }
}

export const calculateFlowRate = (amount) => {
  if (Number(amount) === 0) {
    return 0;
  }
  const amountInWei = ethers.BigNumber.from(amount);
  const monthlyAmount = ethers.utils.formatEther(amountInWei.toString());
  const calculatedFlowRate = monthlyAmount * 3600 * 24 * 30;
  return calculatedFlowRate;
}
