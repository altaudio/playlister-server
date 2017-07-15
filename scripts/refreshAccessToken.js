import request from 'superagent'
import firebase from './initialiseFirebase.js'
import config from './config'

export default (facebookUserId, refreshToken) => {
  request
   .post('https://accounts.spotify.com/api/token')
   .set('Content-Type', 'application/x-www-form-urlencoded')
   .send({
     grant_type: 'refresh_token',
     refresh_token: refreshToken,
     client_id: config.spotifyClientId,
     client_secret: config.spotifyClientSecret
   })
   .end((error, refreshData) => {
     if (error) {
       console.log(error)
     }
     firebase.database().ref(`users/${facebookUserId}`).update({
       accessToken: refreshData.body.access_token
     })
   })
}
