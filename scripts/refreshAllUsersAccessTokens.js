import _ from 'lodash'
import firebase from './initialiseFirebase.js'
import refreshAccessToken from './refreshAccessToken'

export default () => {
  firebase.database().ref('users').once('value')
    .then((returnedUsers) => {
      const users = returnedUsers.val()
      _.forEach(users, (user) => {
        refreshAccessToken(user.facebookUserId, user.refreshToken)
      })
    })
    .catch((error) => {
      if (error) {
        console.log(error)
      }
    })
}
