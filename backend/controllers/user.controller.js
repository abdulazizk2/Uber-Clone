import userModel from "../model/user.model.js";
import createUser from "../services/user.service.js"; 
import { validationResult } from "express-validator";

export const registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    const { fullname, email, password } = req.body;

    try {
        const user = await createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password,
        });

    const token = user.generateAuth();
    return res.status(200).json({ token, data: user });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

export const LoginUser =async (req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    const {email, password } = req.body;
    if(!email || !password ){
        return res.status(400).json({sucess:false,message:"Enter All feilds"})
    }
    const user = await userModel.findOne({email}).select('+password');
    if(!user){
        return res.status(401).json({message:"Invalid Email or Password"});
    }
    const isMatch = await user.comparePassword(password);
    console.log(isMatch)
    if(!isMatch){
        return res.status(401).json({message:"Invalid Email or Password"});
    }
    const token = user.generateAuth();
    return res.status(200).json({token,data: user})

};