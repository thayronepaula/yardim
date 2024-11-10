import express from 'express'
import cors from 'cors'
const PORT = 3331
const app = express()
import { json2csv } from './services/json2csv.service.js'

app.use(cors())
app.use(express.json())
app.post('/convert', async (request, response) => {
  const body = request.body

  if (!body?.json)
    return response.status(400).json({ error: 'campo "json" é obrigatório' })

  const transform = await json2csv(
    body.json
  )

  return response.status(201).json({
    csv: transform || '',
  })
})

app.listen(`${PORT}`, () => {
  console.log(`Server is running on port ${PORT}`)
})
