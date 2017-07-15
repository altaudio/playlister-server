import sendPlaylist from './sendPlaylist.js'

export default (payload) => {
  const requestedStation = payload.message.text
  const facebookId = payload.sender.id
  sendPlaylist(facebookId, requestedStation)
}
