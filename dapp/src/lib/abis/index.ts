import dacredRouterABI from './dacredRouter.json';
import leanRouterABI from './leanRouter.json';

const ABIS = {
  dacredRouterABI: dacredRouterABI.abi,
  leanRouter: leanRouterABI.output.abi,
};

export default ABIS;
