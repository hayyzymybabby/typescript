import express, { Request, Response, NextFunction } from 'express'
import router from './router'

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use((req: Request, res: Response, next: NextFunction) => {
  req.teacherName = 'dell'
  next()
})
app.use(router)

app.listen(7001, () => {
  console.log('server is running')
})
