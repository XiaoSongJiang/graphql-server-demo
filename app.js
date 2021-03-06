const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')
const gServer = require('./app/graphql');
const connect = require('./app/database/con');
app.model = connect().model;
app.use(async (ctx, next) => {
  if (!ctx.model) {
    ctx.model = app.model;
  }
  await next()
});

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// auth
app.use(require('./app/middlewares/auth.js'))
// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes())
app.use(index.allowedMethods())
app.use(users.routes())
app.use(users.allowedMethods())

gServer.applyMiddleware({ app });
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
