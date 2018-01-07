# longzhu-danmu

longzhu-danmu 是Node.js版本龙珠TV弹幕监听模块。

简单易用，使用三十行左右代码，你就可以使用Node.js基于弹幕进一步开发。

## Installation

可以通过本命令安装 longzhu-danmu:

```bash
npm install longzhu-danmu --save
```

## Simple uses

通过如下代码，可以初步通过Node.js对弹幕进行处理。

```javascript
const longzhu_danmu = require('longzhu-danmu')
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
```

## API

### 开始监听弹幕

```javascript
const longzhu_danmu = require('longzhu-danmu')
const roomid = 'xuxubaobao'
const client = new longzhu_danmu(roomid)
client.start()
```

### 使用socks5代理监听

```javascript
const longzhu_danmu = require('longzhu-danmu')
const roomid = '666666'
const proxy = 'socks://name:pass@127.0.0.1:1080'
const client = new longzhu_danmu({roomid,proxy})
client.start()
```

### 停止监听弹幕

```javascript
client.stop()
```

### 监听事件

```javascript
client.on('connect', () => {
    console.log('connect')
})

client.on('message', msg => {
    console.log('message',msg)
})

client.on('error', e => {
    console.log('error',e)
})

client.on('close', () => {
    console.log('close')
})
```

### msg对象

msg对象type有chat,gift,longdou五种值
分别对应聊天内容、礼物、龙豆礼物

#### chat消息
```javascript
    {
        type: 'chat',
        time: '毫秒时间戳,Number',
        from: {
            name: '发送者昵称,String',
            rid: '发送者rid,String',
            level: '发送者等级,Number',
            plat: '发送者平台(android,ios,pc_web),String'
        },
        id: '消息唯一id,String',
        content: '聊天内容,String'
    }
```

#### gift消息
```javascript
    {
        type: 'gift',
        time: '毫秒时间戳,Number',
        name: '礼物名称,String',
        from: {
            name: '发送者昵称,String',
            rid: '发送者rid,String',
            level: '发送者等级,Number'
        },
        id: '消息唯一id,String',
        count: '礼物数量,Number',
        price: '礼物总价值(单位龙币),Number',
        earn: '礼物总价值(单位元),Number'
    }
```

#### longdou消息
```javascript
    {
        type: 'longdou',
        time: '毫秒时间戳,Number',
        name: '礼物名称,String',
        from: {
            name: '发送者昵称,String',
            rid: '发送者rid,String',
            level: '发送者等级,Number'
        },
        id: '消息唯一id,String',
        count: '礼物数量,Number'
    }
```