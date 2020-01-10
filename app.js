const express=require('express')
const app=express()
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const passport=require('passport')
const db=require('./config/index').mongDBURl
mongoose.connect(db)
        .then(()=>{console.log('数据库连接成功')})
        .catch((err)=>{console.log(err)})


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
//路由映入
const user=require('./route/api/user')
const common=require('./route/api/common')
const exprence=require('./route/api/exprence')
app.get('/',(req,res)=>{
   res.json({msg:'撒顶火箭撒谎的'})
})
//初始化passport
app.use(passport.initialize());
require('./config/passport')(passport)
//中间件
app.use('/api',user)
app.use('/api',common)
app.use('/api',exprence)
const port=process.env.PORT || 3008;

//监听端口
app.listen(port,()=>{
    console.log(`Is Running ${port}`)
})