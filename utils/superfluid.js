import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from 'ethers';

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