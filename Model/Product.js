
import mongoose from "mongoose";

const Schema=mongoose.Schema;
const productSchema= new Schema({
    name:{type:String,require:true},
    workOder:{type:Number,require:true},
    noofSample:{type:Number,require:true},
    requiredTest:{type:String,require:true},
    sampleType:{type:String,require:true},
    date:{type:Date,require:true},
    





    

},{timestamps:true})

export default mongoose.model('product',productSchema,'products')