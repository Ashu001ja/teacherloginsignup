const mongoose = require('mongoose');

const SignUpShemam=mongoose.Schema({
    name:{
        type: String,
        reuired: true,
    },
    dephead:{
        type: String,
    },
    depheadname:{
        type: String,
    },
    joindate:{
        type: String,
        reuired: true,
    },
    exmonth:{
        type: String,
        reuired: true,
    },
    exyear:{
        type: String,
        reuired: true,
    },
    depID:{
        type: String,
        reuired: true,
    },
    email:{
        type: String,
        reuired: true,
    },
    country:{
        type: String,
        reuired: true,
    },
    state:{
        type: String,
        reuired: true,
    },
    city:{
        type: String,
        reuired: true,
    },
    password:{
        type: String,
        reuired: true,
    },
    permission:{
        type:Boolean,
        default: false,
    }
});      

module.exports= mongoose.model('TeacherRegister', SignUpShemam);