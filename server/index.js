import { createServer } from "http"
import { Server } from "socket.io"

const httpServer = createServer()

const io = new Server(httpServer, {
  // 跨域
  cors: {
    origin: process.env.NODE_ENV === "production" ?
      false :
      [
        // live server 端口
        "http://localhost:8136",
        "http://127.0.0.1:8136",
      ]
  }
})

// 监听事件
io.on('connection', socket => {

  console.log(`User ${socket.id} connected`)

  socket.on('message', message => {

    console.log(`${socket.id.substring(0, 5)}: ${message}`)
    io.emit('message', `${socket.id.substring(0, 5)}: ${message}`)

  })
})

httpServer.listen(3500, () => console.log('listen on port 3500'))
