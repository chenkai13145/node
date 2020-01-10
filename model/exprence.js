const mongoose=require('mongoose')
const Schema=mongoose.Schema

const Exprence=new Schema({
    title:{
        type:String,
        required:true
    },
    time:{
        type:Date,
        default:Date.now()
    },
    imgurl:{
        type:String
    },
    desc:{
        type:String
    },
    descobj:{
         arr:[
             {
                futitle:{
                    type:String
                },
                desccenter:{
                    destitle:{
                      type:String
                  },
                  desctitle:[String]
                },
                daima:{
                    type:String
                },
                sort:{
                    type:Number,
                    required:true
                }
             }
         ]
    }
})

module.exports=mongoose.model('exprence',Exprence)