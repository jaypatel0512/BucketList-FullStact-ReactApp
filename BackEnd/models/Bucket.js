const mongoose = require('mongoose')
const  Schema = mongoose.Schema;

const bucketSchema =  Schema ({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users', 
    },
    name:{
        type: String,
        require: true,
    },
    desc:{
        type: String,
        require: [true,"please add Model"],
    },
    status:{
        type: String,
    },
});

module.exports = mongoose.model('Bucket',bucketSchema);