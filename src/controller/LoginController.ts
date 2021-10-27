import 'reflect-metadata'
import { Router, Request, Response, NextFunction } from 'express'

interface BodyRequest extends Request {
  body: {
    [key: string]: string | undefined
  }
}

function controller(target: any) {
  for (let key in target.prototype) {
    console.log(Reflect.getMetadata('path', target.prototype, key))
  }
}

function get(path: string) {
  return function (target: any, key: string) {
    Reflect.defineMetadata('path', path, target, key)
  }
}

@controller
class LoginController {
  @get('/login')
  login() {}

  @get('/')
  home(req: BodyRequest, res: Response) {
    const isLogin = req.session ? req.session.login : false
    if (isLogin) {
      res.send(`
      <html>
        <body>
          <a href='/getData'>爬取内容</a>
          <a href='/showData'>展示内容</a>
          <a href='/logout'>退出</a>
        </body>
      </html>
    `)
    } else {
      res.send(`
      <html>
        <body>
          <form method="post" action="/login">
            <input type="password" name="password"></input>
            <button>登录</button>
          </form>
        </body>
      </html>
    `)
    }
  }
}
