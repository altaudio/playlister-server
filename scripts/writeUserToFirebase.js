import request from 'superagent'
import firebase from './initialiseFirebase.js'
import bot from './initialiseBot.js'

const getSpotifyId = (accessToken) => {
  return request
   .get('https://api.spotify.com/v1/me')
   .set('Authorization', `Bearer ${accessToken}`)
}

export default (facebookUserId, response) => {
  const parsedResponse = JSON.parse(response.text)
  const accessToken = parsedResponse.access_token

  getSpotifyId(accessToken)
    .end((error, returnedSpotifyId) => {
      if (error) {
        console.log(error)
      }
      const spotifyId = returnedSpotifyId.body.id

      firebase.database().ref(`/users/${facebookUserId}`).update({
        facebookUserId: facebookUserId,
        accessToken: parsedResponse.access_token,
        refreshToken: parsedResponse.refresh_token,
        expiresIn: parsedResponse.expires_in,
        tokenType: parsedResponse.token_type,
        scope: parsedResponse.scope,
        spotifyId: spotifyId,
      })
      .then(() => {
        bot.sendMessage(facebookUserId, { text: 'Thanks for signing in to Spotify!' })
      })
      .catch((addUserError) => {
        console.log(addUserError)
        bot.sendMessage(facebookUserId, { text: 'Looks like something went wrong and ou weren\'t added to our user base :(' })
      })
    })
}
