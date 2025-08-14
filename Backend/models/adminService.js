import mongoose from "mongoose"

const Serviceschema = new mongoose.Schema({
   name:{type:String},
   link:{type:String},
   createdAt: { type: Date, default: Date.now },

})
export const service = mongoose.model("servicelink",Serviceschema)