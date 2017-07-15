import later from 'later'
import _ from 'lodash'
import scraper from './scraper.js'
import refreshAccessTokens from './refreshAllUsersAccessTokens.js'
import stations from './stations.js'

const scraperInterval = 3
const refreshAccessTokenInterval = 50

const stationWatcher = (stationUrl, stationName, trackSelector, artistSelector) => {
  const schedule = later.parse.recur().every(scraperInterval).minute()
  later.setInterval(
    () => { scraper(stationUrl, stationName, trackSelector, artistSelector) },
    schedule
  )
}

const refreshAccessTokenWatcher = () => {
  const schedule = later.parse.recur().every(refreshAccessTokenInterval).minute()
  later.setInterval(
    () => {
      refreshAccessTokens()
    },
    schedule
  )
}

_.forEach(stations, (station) => {
  stationWatcher(station.url, station.name, station.trackSelector, station.artistSelector)
})

refreshAccessTokenWatcher()
