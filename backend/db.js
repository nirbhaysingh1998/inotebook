const mongoose=require('mongoose');
const mongoUri='mongodb://localhost:27017/inotebook';

const connecToMongo =()=>{
    mongoose.connect(mongoUri,()=>{
        console.log("connected to Database");
    })
}


module.exports=connecToMongo;