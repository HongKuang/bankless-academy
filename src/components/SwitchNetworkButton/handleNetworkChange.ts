import networks from 'constants/networks'
import { Dispatch, SetStateAction } from 'react'

const setActiveNetwork = (chainId, setNetwork) => {
  const children = Object.keys(networks)
  for (let i = 0; i < children.length; i++) {
    if (networks[children[i]].chainId === Number(chainId)) {
      return setNetwork(networks[children[i]])
    }
  }
}

const handleNetworkChange = (
  metamask: { on: any; networkVersion?: string; 'net-workVersion'?: string },
  setNetwork: Dispatch<
    SetStateAction<{
      name: string
      image: string
      chainId: number
      rpcUrl: string
      blockExplorer: string
    }>
  >
): void => {
  setActiveNetwork(
    metamask.networkVersion
      ? metamask.networkVersion
      : metamask['net-workVersion'],
    setNetwork
  )
  metamask.on('chainChanged', (chainId) => {
    setActiveNetwork(chainId, setNetwork)
  })
}

export default handleNetworkChange
