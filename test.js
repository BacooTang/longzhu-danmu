const longzhu_danmu = require('./index')
const roomid = '777777'
const client = new longzhu_danmu(roomid)

client.on('connect', () => {
    console.log(`已连接longzhu ${roomid}房间弹幕~`)
})

client.on('message', msg => {
    switch (msg.type) {
        case 'chat':
            console.log(`[${msg.from.name}]:${msg.content}`)
            break
        case 'gift':
            console.log(`[${msg.from.name}]->赠送${msg.count}个${msg.name}`)
            break
        case 'longdou':
            console.log(`[${msg.from.name}]->赠送${msg.count}个${msg.name}`)
            break
    }
})

client.on('error', e => {
    console.log(e)
})

client.on('close', () => {
    console.log('close')
})

client.start()