const user = require("../Models/user")
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken")

exports.register=async(req,res)=>{
    try {
        const {username,email,password,age,phone,photo}=req.body
        const foundUserEmail=await user.find({email})
        if(foundUserEmail[0]){
            res.status(400).send({msg:"email already exists!"})
        }else{
            const foundUserName= await user.find({username})
            if(foundUserName[0]){
            res.status(400).send({msg:"username already exists!"})
            }else{
                const newUser= new user (req.body)
                const saltRounds = 10;
                const hashedPassword= await bcrypt.hash(password,saltRounds)
                newUser.password=hashedPassword
                await newUser.save()
                const token=jwt.sign({_id:newUser._id},process.env.SEKRET_KEY)
                res.status(200).send({msg:"user registred successfully!",newUser,token})
            }
        }
        
    } catch (error) {
        res.status(500).send({msg:"error on register",error})
    }
}

exports.login=async(req,res)=>{
    try {
        const {email,password}=req.body
        const foundUser=await user.find({email})
        if(!foundUser[0]){
            res.status(400).send({msg:"email or password invalid!"})
        }else{
            const checkedPassword=await bcrypt.compare(password,foundUser[0].password)
            if(!checkedPassword){
                res.status(400).send({msg:"email or password invalid!"})
            }else{
                const token=jwt.sign({_id:foundUser[0]._id},process.env.SEKRET_KEY)
                res.status(200).send({msg:"login successfully",foundUser,token})
            }
        }
    } catch (error) {
        res.status(500).send({msg:"error on login",error})
    }
}

exports.deleteUser=async(req,res)=>{
    try {
        const {_id}=req.params
        await user.deleteOne({_id})
        res.status(200).send({msg:"user deleted successfully!"})
    } catch (error) {
        res.status(500).send({msg:"error deleting user",error})
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const { _id } = req.params;
        const { newPassword } = req.body;
        if (!newPassword) {
            console.log(newPassword)
            return res.status(400).send({ msg: "New password is required!" });
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        await user.updateOne({ _id }, { $set: { password: hashedPassword } });
        res.status(200).send({ msg: "Password updated successfully!" });
    } catch (error) {
        res.status(500).send({ msg: "Error on updating password", error });
    }
}

