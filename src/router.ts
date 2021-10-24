import { Router, Request, Response } from 'express'
import Crowller from './crowller'
import DellAnalyzer from './dellAnalyzer'

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined
  }
}

const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.send(`
    <html>
      <body>
        <form method="post" action="/getData">
          <input type="password" name="password"></input>
          <button>提交</button>
        </form>
      </body>
    </html>
  `)
})

router.post('/getData', (req: RequestWithBody, res: Response) => {
  const { password } = req.body
  if (password === '123') {
    const secret = 'x3b174jsx'
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`
    const analyzer = DellAnalyzer.getInstance()
    new Crowller(url, analyzer)
    res.send('getData success')
  } else {
    res.send(`${req.teacherName} password error`)
  }
})

export default router
