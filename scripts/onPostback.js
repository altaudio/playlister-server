import secureString from 'secure-random-string'
import bot from './initialiseBot.js'
import config from './config'
import sendLinkButton from './sendLinkButton.js'

export default (payload) => {
  if (payload.postback.payload === 'GET_STARTED_PAYLOAD') {
    const senderId = payload.sender.id

    bot.getProfile(senderId, (error, profile) => {
      if (error) {
        console.log(error)
      }
      sendLinkButton(senderId, 'Login to Spotify', `Hey ${profile.first_name}, lets get started!`, `https://accounts.spotify.com/authorize/?client_id=${config.spotifyClientId}&response_type=code&redirect_uri=${config.redirectUrl}&scope=playlist-read-private%20playlist-modify-public%20playlist-modify-private%20&state=${secureString()}-${senderId}`) // eslint-disable-line
    })
  }
}
