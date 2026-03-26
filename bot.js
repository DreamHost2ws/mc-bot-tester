const mineflayer = require('mineflayer')

const config = {
  host: 'YOUR_SERVER_IP',
  port: 25565,
  botCount: 10
}

function createBot(id) {
  const bot = mineflayer.createBot({
    host: config.host,
    port: config.port,
    username: 'Bot_' + id
  })

  bot.on('spawn', () => {
    console.log(`Bot_${id} joined`)

    setInterval(() => {
      const actions = ['forward', 'back', 'left', 'right', 'jump']
      const action = actions[Math.floor(Math.random() * actions.length)]

      bot.setControlState(action, true)

      setTimeout(() => {
        bot.setControlState(action, false)
      }, 1000)

    }, 2000)
  })

  bot.on('error', err => console.log(`Bot_${id} error`, err))
  bot.on('end', () => console.log(`Bot_${id} disconnected`))
}

// spawn bots
for (let i = 0; i < config.botCount; i++) {
  setTimeout(() => createBot(i), i * 1000)
}
