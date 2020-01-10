const express=require('express')
const exprence=express.Router()
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './public/upload')
//     },
//     filename: function (req, file, cb) {
//       var str = file.originalname.split('.')
//       cb(null, Date.now() + '.' + str[1])
//     }
//   })
//   var upload = multer({storage: storage})
const Exprence=require('../../model/exprence')

/*********
//添加主要点滴
//@params  title 唯一标题  desc 描述  imgurl 图片
 POST
********/
exprence.post('/uploaddata',upload.array('photos', 12),(req, res, next)=>{
    Exprence.findOne({title:req.body.title})
            .then(data=>{
                if(data){
                    return res.json({msg:'已有该点滴记录',success:true})
                }
                let datas=new Exprence({
                    title:req.body.title,
                    desc:req.body.desc,
                    imgurl:req.body.imgurl
                })
                datas.save()
                     .then(res=>{
                         if(res){
                             return res.json({msg:'添加成功',success:true})
                         }
                     })
                     .catch(err=>{
                         return res.json({msg:'添加失败',success:true})
                     })
            })
})

/*********
//获取单个详情
//@params  title 唯一标题 
 POST
********/
exprence.post('/info',(req,res)=>{
     Exprence.findOne({title:req.body.title})
            .then(ress=>{
                if(ress){
                  return res.json({msg:'成功',data:ress,success:true})
                }
            })
            .catch(err=>{
                return res.json({msg:'查找异常',success:true})
            })
})
/*********
//获取单个详情
//@params  id 唯一id 
 POST
********/
exprence.post('/infoid',(req,res)=>{
    Exprence.findOne({_id:req.body.id})
           .then(ress=>{
               if(ress){
                 return res.json({msg:'成功',data:ress,success:true})
               }
           })
           .catch(err=>{
               return res.json({msg:'查找异常',success:true})
           })
})

/*********
//添加详情步骤
//@params  title 唯一标题 sort 唯一顺序
 POST
********/
exprence.post('/addinfo',(req,res)=>{
    Exprence.findOne({title:req.body.idtitle})
            .then(ress=>{
                if(ress){
                    let childdata={
                        destitle:req.body.destitle,
                        desctitle:req.body.desctitle.split('。')
                    }
                    let data={
                        futitle:req.body.futitle,
                        daima:req.body.daima,
                        desccenter:childdata,
                        sort:req.body.sort
                    }
                    
                    ress.descobj.arr.push(data)
                    ress.descobj.arr.sort((a,b)=>{
                        return Number(a.sort)-Number(b.sort) 
                    })
                    ress.save()
                        .then(datas=>{
                            return res.json({msg:datas})
                        })
                }else{
                    return res.json({msg:"请输入正确标题",success:true})
                }
             
            })
            .catch(err=>{
                return res.json({msg:'异常',success:true})
            })
})

/*********
//获取点滴列表
//@params  title 唯一标题 
size  一页显示多少条
page 第几页
 POST
********/
exprence.get('/alldi',(req,res)=>{
    Exprence.find({})
            .sort({time:-1})
            .then(ress=>{
                   let size=req.query.size
                   let page=req.query.page
                   let dats=ress.splice(size*page,size)
                  return res.json({success:true,data:dats})
            })
            .catch(err=>{
                return res.json({msg:'查询异常'})
            })
})

//修改主要点滴
exprence.post('/editmain',upload.array('photos', 12),(req,res)=>{
    console.log(req.body)
      Exprence.findOne({title:req.body.title})
              .then(ress=>{
                  if(ress){
                    for(let key in req.body){
                        if(req.body[key]!='null'&&req.body[key]&&key!='title'){
                            ress[key]=req.body[key]
                        }
                    }
                    ress.save()
                         .then(re=>{
                              return res.json({msg:'修改成功',success:true,data:re})
                         })
                  }else{
                    return res.json({msg:'没有该标题',success:true})
                  }
              })
              .catch(err=>{
                  return res.json({msg:'修改异常',success:true})
              })
})

//修改点滴详情
exprence.post('/editinfo',(req,res)=>{
   Exprence.findOne({title:req.body.idtitle})
           .then(ress=>{
               if(!ress){
                  return res.json({msg:'请输入正确标题',success:true})
               }
               ress.descobj.arr.forEach((element,index) => {
                   console.log(element)
                    if(element.sort==req.body.sort){
                        for(let key in req.body){
                            if(key!='idtitle'&&key!='sort'&&req.body[key]!=null&&req.body[key]){
                                if(key==='destitle'){
                                    ress.descobj.arr[index].desccenter[key]=req.body[key]

                                }else if(key==='desctitle'){
                                    ress.descobj.arr[index].desccenter[key]=req.body[key].split('。')
                                  
                                }else{
                                 ress.descobj.arr[index][key]=req.body[key]   

                                }
                            }
                        }
                    }
                
               });
               ress.save()
                    .then(datas=>{
                        return res.json({msg:'修改成功',success:true,data:datas})
                    })
           })
           .catch(err=>{
               return res.json({msg:'异常',success:true})
           })
})

//删除主要点滴
exprence.post('/delmain',(req,res)=>{
    Exprence.deleteOne({title:req.body.title})
            .then(ress=>{
                return res.json({msg:'删除成功',success:true})
            })
            .catch(err=>{
                return res.json({msg:'删除异常',success:true})
            })
})

//删除次要点滴详情步骤
exprence.post('/delinfo',(req,res)=>{
    Exprence.findOne({title:req.body.idtitle})
            .then(ress=>{
                if(ress){
                   let indexs=ress.descobj.arr.findIndex(item=>{
                       return item.sort==req.body.sort
                   })
                  if(indexs>=0){
                    ress.descobj.arr.splice(indexs,1)
                    ress.save()
                        .then(resss=>{
                            if(resss){
                                return res.json({msg:'删除成功',success:true})
                            }
                        })
                  }else{
                      return res.json({msg:'没有该sort步骤',success:true})
                  }
                }else{
                    return res.json({msg:"请输入正确的标题",success:true})
                }
            })
            .catch(err=>{
                return res.json({msg:'删除异常',success:true})
            })
})

module.exports=exprence