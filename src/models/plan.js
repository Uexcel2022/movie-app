import {mongoose} from 'mongoose';

const planSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        enum:{
           values : ['basic', 'premium', 'enterprise'],
              message: 'subscription must be either basic, premium or enterprise!'
        }
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    duration: {
        type: String,
        enum: ['monthly', 'yearly'],
        required: true,
    },
    features: {
        type: [String],
        required: true,
    },
},{timestamps:true});

const Plan = mongoose.model('Plan', planSchema);    

export {Plan};