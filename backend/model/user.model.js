import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jsonwebtoken from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First Name must be 3 characters long"],
    },
    lastname: {
      type: String,
      minlength: [3, "Last Name must be 3 characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique:true,
    minlength: [5, "Email must be 5 characters long"],
  },
  password: {
    type: String,
    required: true,
  },
  socketId: {
    type: String,
  },
},{timestamps:true})
UserSchema.methods.generateAuth = function () {
  return jsonwebtoken.sign(
    { id: this._id, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" } // Optional: Set token expiration
  );
};


UserSchema.methods.ComparePasswords = async (password)=>{
    return await bcrypt.compare(password,this.password);
}
UserSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};


const userModel = mongoose.model('User',UserSchema);

export default userModel;