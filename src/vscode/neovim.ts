import { onCreateVim, onSwitchVim } from '../messaging/worker-client'
import SessionTransport from '../messaging/session-transport'
import SetupRPC from '../messaging/rpc'
import Neovim from '../neovim/api'

const { send, connectTo, switchTo, onRecvData } = SessionTransport()
const { onData, ...rpcAPI } = SetupRPC(send)

onRecvData(([ type, d ]) => onData(type, d))
onCreateVim(connectTo)
onSwitchVim(switchTo)

export default Neovim({ ...rpcAPI, onCreateVim, onSwitchVim })
