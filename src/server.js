import { app } from './app.js'
import { config } from './config.js'
import { connectDatabase } from './db.js'

await connectDatabase()

app.listen(config.port, () => {
  console.log(`APIForge running on http://localhost:${config.port}`)
})
