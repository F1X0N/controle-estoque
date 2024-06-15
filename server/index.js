const express = require('express')
require('dotenv').config()
const cors = require('cors')
const dadosRouter = require('./routes/dados')
const authRouter = require('./routes/auth')

const app = express()
const port = 3000

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}

app.use(cors(corsOptions))

app.use(express.json())

app.use('/dados', dadosRouter)
app.use('/auth', authRouter)

app.get('/', (req, res) => {
  res.send('Servidor funcionando!')
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})
