const express=require('express')
const user=express.Router()
const bcrypt=require('bcryptjs')
const User=require('../../model/user')
const jwt=require('jsonwebtoken')
const skey=require('../../config/index').skey
user.post('/logReg',(req,res)=>{
 User.findOne({email:req.body.email})
     .then((user)=>{
          if(user){
            bcrypt.compare(req.body.password, user.password).then((ress) => {
                if(ress){
                    const rule={id:user.id,name:user.name,bgcolor:user.bgcolor}
                    jwt.sign(rule,skey,{expiresIn:3600000},(err,token)=>{
                        if(err) throw err;
                        return res.json({
                            success:true,
                            token:'Bearer '+token
                        })
                    })
                }else{
                    return res.json({msg:'密码错误'})
                }
            });
          }
          const users=new User({
              name:req.body.name,
              email:req.body.email,
              password:req.body.password,
              bgcolor:'#'+Math.random().toString(16).substring(2,8)
          })
          bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(users.password, salt, function(err, hash) {
                if(err) throw err;
                users.password=hash
                users.save()
                    .then((data)=>{
                        const rule={id:data.id,name:data.name,bgcolor:data.bgcolor}
                        jwt.sign(rule,skey,{expiresIn:3600000},(err,token)=>{
                            if(err) throw err;
                            return res.json({
                                success:true,
                                token:'Bearer '+token
                            })
                        })
                    })
            });
          });
     })
})

module.exports=user