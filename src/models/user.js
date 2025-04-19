import { mongoose } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z]{2,20}$/.test(v);
        },
        message: `Name must be 2-20 characters long and contain only letters!`,
      },
    },

    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z]{2,20}$/.test(v);
        },
        message: `Name must be 2-20 characters long and contain only letters!`,
      },
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "The email has been used."],
      validate: [validator.isEmail, "Please enter a valid email address"],
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
      validate: [
        validator.isStrongPassword,
        "Weak password. Example: 1Ag$ up 8 characters long.",
      ],
      select: false,
    },

    confirmPassword: {
      type: String,
      required: [true, "Please comfirm password."],
      trim: true,
      validate: {
        validator: function (v) {
          return v === this.password;
        },
        message: "Passwords do not match!",
      },
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      unique: [true, "Phone number already exists"],
      validate: {
        validator: function (v) {
          return /^0[7-9][01][0-9]{8}/.test(v);
        },
        message: "Please enter a valid Nigeria phone number!",
      },
    },

    gender: {
      type: String,
      required: [true, "Gender is required"],
      trim: true,
      lowercase: true,
      enum: {
        values: ["male", "female"],
        message: "Gender must male or female",
      },
    },

    role: {
      type: String,
      required: [true, "User role is required"],
      enum: {
        values: ["user"],
        message: "Only allowed user role",
      },
      default: "user",
    },

    active: {
      type: Boolean,
      default: true,
    },

    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordTokenExpires: Date,
  },
  { timestamps: true, select: false }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.validatePassword = async function (
  rawPassword,
  encryptedPassword
) {
  return await bcrypt.compare(rawPassword, encryptedPassword);
};

const User = mongoose.model("User", userSchema);

export { User };
