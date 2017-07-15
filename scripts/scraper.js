import scraperjs from 'scraperjs'
import moment from 'moment'
import writeTracksToFirebase from './writeTracksToFirebase'
import spotify from './initialiseSpotify.js'

const addSpotifyId = (station, track) => {
  spotify.searchTracks(`track:${track.title} artist:${track.artist}`, { limit: 1 })
    .then((trackData) => {
      if (trackData.body.tracks.items[0]) {
        track.spotifyId = trackData.body.tracks.items[0].id
        writeTracksToFirebase(station, track.title, track)
      } else {
        console.log(`Spotify could not find ${track.title} by ${track.artist}`)
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

export default (url, station, titleSelector, artistSelector) => {
  scraperjs.StaticScraper.create(url)
    .scrape(($) => {
      return {
        title: $(titleSelector).first().text(),
        artist: $(artistSelector).first().text(),
        timeStamp: moment().format('DDHmmss')
      }
    })
    .then((track) => {
      console.log(track)
      addSpotifyId(station, track)
    })
}

