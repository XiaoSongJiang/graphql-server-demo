module.exports = async function (ctx, next) {
    // 注意，在真实场景中，需要在这里获取请求头部的用户签名，比如：token
    // 并根据用户 token 获取用户信息，然后将用户信息挂载到 ctx 上
    ctx.user = { name: 'xiaoming', age: Math.random() }
    await next()
}
