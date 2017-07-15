import _ from 'lodash'
import queryString from 'query-string'
import request from 'superagent'
import config from './config'
import writeUserToFirebase from './writeUserToFirebase.js'

export default (requestData) => {
  const parsedQuery = queryString.parse(requestData.url.slice(2))

  const facebookUserId = _.chain(parsedQuery.state)
    .split('-')
    .last()
    .value()

  if (_.has(parsedQuery, 'code')) {
    request
     .post('https://accounts.spotify.com/api/token')
     .set('Content-Type', 'application/x-www-form-urlencoded')
     .send({
       grant_type: 'authorization_code',
       code: parsedQuery.code,
       redirect_uri: config.redirectUrl,
       client_id: config.spotifyClientId,
       client_secret: config.spotifyClientSecret
     })
     .end((error, accessData) => {
       if (error) {
         console.log(error)
       }
       writeUserToFirebase(facebookUserId, accessData)
     })
  }
}
