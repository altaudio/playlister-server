import _ from 'lodash'
import moment from 'moment'
import firebase from './initialiseFirebase.js'
import spotify from './initialiseSpotify'
import bot from './initialiseBot.js'


export default (facebookId, requestedStation) => {
  firebase.database().ref(`users/${facebookId}`).once('value')
  .then((user) => {
    const userAccessToken = user.val().accessToken
    const userSpotifyId = user.val().spotifyId

    spotify.setAccessToken(userAccessToken)

    return spotify.createPlaylist(userSpotifyId, `${requestedStation}/${moment().format('DDMMHHmm')}`, { public: false })
      .then((playlist) => {
        const playlistId = playlist.body.id

        return firebase.database().ref(`stations/${requestedStation}`).once('value')
          .then((tracks) => {
            const tracksFromStation = tracks.val()
            const tracksToPlaylist = _.map(tracksFromStation, (track) => {
              if (track.spotifyId) {
                return `spotify:track:${track.spotifyId}`
              }
                // Curly black and kinky
              return 'spotify:track:4SqOVebclQiYEVo63QdIux'
            })

            return spotify.addTracksToPlaylist(userSpotifyId, playlistId, tracksToPlaylist)
              .then(() => {
                bot.sendMessage(facebookId, { text: 'Your playlist has been sent to Spotify!' })
              })
          })
      })
  })
  .catch((error) => {
    console.log(`Error: ${error}`)
    bot.sendMessage(facebookId, { text: 'Uh oh, looks like there was a problem creating your playlist :(' })
  })
}

