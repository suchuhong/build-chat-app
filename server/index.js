import express from "express"
import { Server } from "socket.io"
import path from 'path'
import { fileURLToPath } from 'url'

// 使用 fileURLToPath 方法获取当前模块的文件路径和目录名
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT || 3500

const app = express()

// 设置静态文件目录为 "public" 目录
app.use(express.static(path.join(__dirname, "public")))

const expressServer = app.listen(PORT, () => {
  console.log(`listen on port ${PORT}`)
})

const io = new Server(expressServer, {
  // 跨域
  cors: {
    origin: process.env.NODE_ENV === "production" ?
      false :
      [
        // live server 端口
        "http://localhost:3500",
        "http://127.0.0.1:3500",
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

