import mongoose from "mongoose";

const msgSchema = new mongoose.Schema({
    msg:{
        required : true 
    },
    from:{
        required : true
    },
    to:{
        required : true
    },
    time : {
        required : true
    }
})

export default mongoose.model("msg" , msgSchema);