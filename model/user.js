const mongoose=require('mongoose')
const Schema=mongoose.Schema

const User=Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    bgcolor:{
        type:String,
        require:true
    }
})

module.exports=mongoose.model('user',User)