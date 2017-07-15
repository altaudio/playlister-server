import _ from 'lodash'
import firebase from './initialiseFirebase.js'


const maximumNumberOfTracks = 20

const removeOldestSong = (snapshot, station, reference) => {
  const tracks = snapshot.val()
  const numberOfTracks = _.size(tracks)

  if (numberOfTracks > maximumNumberOfTracks) {
    const oldestTimestamp = _.chain(tracks)
    .map((track) => _.toNumber(track.timeStamp))
    .min()
    .value()

    _.mapKeys(tracks, (value, key) => {
      if (_.toNumber(value.timeStamp) === oldestTimestamp) {
        const oldestTrackKey = key
        reference.child(oldestTrackKey).remove()
      }
    })
  }
}

export default (station, trackId, trackData) => {
  const reference = firebase.database().ref(`/stations/${station}/tracks`)
  reference.once('value')
  .then((snapshot) => {
    reference.update({ [trackId]: trackData })
    removeOldestSong(snapshot, station, reference)
  })
}
