import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  firstName: {  
     type: String, 
     required: true,
     trim: true,
     lowercase: true,
     valid:{
         validator: function(v) {
            return /^[a-zA-Z]{2,20}$/.test(v);
         },
         message: `Name must be 2-20 characters long and contain only letters!`
     }
    },

    lastName: {  
        type: String, 
        required: true,
        trim: true,
        lowercase: true,
        valid:{
            validator: function(v) {
               return /^[a-zA-Z]{2,20}$/.test(v);
            },
            message: `Name must be 2-20 characters long and contain only letters!`
        }
       },

    email: {    
        type: String, 
        required: [true, 'Email is required'],
        unique: [true, 'Email already exists'],
        validate: [validator.isEmail, 'Please fill a valid email address'],
        trim: true,
        lowercase: true,
    },

    password: {  
        type: String, 
        required: [true, 'Password is required'],
        trim: true,
        minlength: [6, 'Password must be at least 6 characters long'],
        maxlength: [16, 'Password must be at most 16 characters long'],
        validate: [validator.isStrongPassword, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'],
        select: false, // Exclude password from query results by default
    },

    confirmPassword: {  
        type: String, 
        required: [true, 'Confirm Password is required'],
        trim: true,
        validate: {
            validator: function(v) {
                return v === this.password;
            },
            message: 'Passwords do not match!'
        }
    },

    phone: {  
        type: String, 
        required: [true, 'Phone number is required'],
        trim: true,
        unique: [true, 'Phone number already exists'],
        validate: {
            validator: function(v) {
                return /^0[7-9][01][0-9]{8}/.test(v);
            },
            message: 'Phone number must be 10 digits long!'
        }
    },

    gender:{
        type: String,
        required: [true, 'Gender is required'],
        trim: true,
        lowercase: true,
        enum: {
            values: ['male','female'],
            message: 'Gender must male or female'
        }
    },

    role: {
        type: string,
        required: [true, 'User role is required'],
        enum:{
            values: ['user'],
            message: 'Only allowed user role'
        }
    },

    active:{
        type: Boolean,
        default: true
    }

});

const User = mongoose.model('User', userSchema);

export {User};