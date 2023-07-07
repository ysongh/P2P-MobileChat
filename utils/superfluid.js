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