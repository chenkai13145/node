const mongoose=require('mongoose')
const Schema=mongoose.Schema

const Common=new Schema({
        user:{
        type:Schema.Types.ObjectId,
        ref:'users'
        },
        text:{
            type:String,
            required:true
        },
        comment:[
            {
                user:{
                    type:Schema.Types.ObjectId,
                    ref:'users'
                    },
                time:{
                    type:Date,
                    default:Date.now()
                },
                name:{
                    type:String
                },
                text:{
                    type:String
                }
            }
        ],
        time:{
            type:Date,
            default:Date.now()
        },
        name:{
            type:String,
            require:true
        },
        userid:{
            type:String,
            required:true
        },
        paiming:{
            type:Number,
            require:true
        }
   
    
})

module.exports=mongoose.model('common',Common)