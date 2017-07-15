import Bot from 'messenger-bot'
import config from './config'

export default new Bot({
  token: config.facebookAccessToken,
  verify: config.facebookVerifyToken,
  app_secret: config.facebookAppSecret
})
