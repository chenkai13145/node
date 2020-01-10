const express=require('express')
const common=express.Router()
const passport=require('passport')
const Common=require('../../model/common')

//评论
common.post('/post',passport.authenticate('jwt',{session:false}),(req,res)=>{
    if(req.body.id){
        Common.findById({_id:req.body.id})
        .then(data=>{
            if(data){
                let comdata={
                    text:req.body.text,
                    name:req.body.name,
                    userid:req.body.userid
                }
                data.comment.push(comdata)
                data.save()
                    .then((datas)=>{
                        return res.json({status:200,msg:"ok",data:datas})
                    })
            }else{
                Common.find()
                      .then(all=>{
                        const com=new Common({
                            text:req.body.text,
                            name:req.body.name,
                            userid:req.body.userid,
                            paiming:all.length+1
                        });
                        com.save()
                           .then((data)=>{
                              return res.json({status:200,data})
                           })
                      })
              
            }
        })
    }else{
        Common.find()
              .then(all=>{
                const com=new Common({
                    text:req.body.text,
                    name:req.body.name,
                    userid:req.body.userid,
                    paiming:all.length+1
                });
                com.save()
                   .then((data)=>{
                      return res.json({status:200,data})
                   })
              })
     
    }
   
   
})

//获取所有评论
common.get('/all',(req,res)=>{
    console.log(req.query)
    Common.find()
          .then(data=>{
              data.reverse()
              let start=req.query.page*req.query.size
              console.log(start)
              let da= data.splice(start,req.query.size)
              console.log(data)
              return res.json({status:200,da})
          })
})

//删除自己的评论
common.post('/delete',(req,res)=>{
    Common.deleteOne({_id:req.body.id})
          .then(data=>{
            return res.json({msg:'删除成功',success:true})
          })
})

module.exports=common
