import Spotify from 'spotify-web-api-node'
import config from './config'
import getClientAccessToken from './getClientAccessToken.js'

export default new Spotify({
  clientId: config.spotifyClientId,
  clientSecret: config.spotifyClientSecret,
  redirectUri: config.redirectUrl
})

getClientAccessToken()
