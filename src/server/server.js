import express from 'express'
import Router from '../routes/routes.js'
import dotenv from 'dotenv'
import * as middle from '../middleware/middleware.js'

dotenv.config()
const PORT = process.env.PORT ?? 3000

const app = express()
app.use(middle.corsMiddleware)
app.use(middle.jsonMiddleware)
app.use(middle.loggerMiddleware)

app.use('/', Router)

app.listen(PORT, () => {
  console.log(`Server corriendo en el port ${PORT}`)
})

export default app
