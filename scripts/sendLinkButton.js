import bot from './initialiseBot.js'

export default (facebookUserId, title, text, url) => {
  bot.sendMessage(
    facebookUserId,
    {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'button',
          text: text,
          buttons: [
            {
              type: 'web_url',
              url: url,
              title: title
            }
          ]
        }
      }
    },
    (error, info) => {
      console.log(error)
      console.log(info)
    }
  )
}
