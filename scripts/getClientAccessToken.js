import request from 'superagent'
import config from './config'
import spotify from './initialiseSpotify'

export default () => {
  request
   .post('https://accounts.spotify.com/api/token')
   .set('Content-Type', 'application/x-www-form-urlencoded')
   .send({
     grant_type: 'client_credentials',
     client_id: config.spotifyClientId,
     client_secret: config.spotifyClientSecret
   })
   .end((error, accessToken) => {
     if (error) {
       console.log(error)
     }
     spotify.setAccessToken(accessToken.body.access_token)
   })
}
