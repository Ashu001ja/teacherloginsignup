
const UserSechema=require('../model/model');
const bcrypt = require('bcrypt');



const UserSignup=async(req,res)=>{
    try{
    const {name,dephead,depheadname,joindate,exmonth,exyear,depID,email,country,state,city,password,permission}=req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const isExist=await UserSechema.findOne({email});
    if(isExist) return res.status(400).json({message:"User already exist"});
    const user=new UserSechema({name,dephead,depheadname,joindate,exmonth,exyear,depID,email,country,state,city,password:hashedPassword,permission});
    await user.save();
    res.json({message:"User Created Successfully"});
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

const getAllUser=async(req,res)=>{
    try {
        const users=await UserSechema.find({permission:false});
        res.json(users);
    } catch (error) {
        console.log(error);
    }
};

const UserLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const user = await UserSechema.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User  not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }
        if (!user.permission) {
            return res.status(403).json({ message: "Access Denied" });
        }

        res.json({ message: "Login Successfully" });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const updatePassword = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Hash the new password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Find and update the user's password
        const user = await UserSechema.findOneAndUpdate(
            { email },
            { password: hashedPassword },
            { new: true }
        );

        // Check if user was found
        if (!user) {
            return res.status(404).json({ message: "User  not found" });
        }

        // Respond with the updated user information (excluding the password for security)
        res.status(200).json({ message: "Password updated successfully", user: { email: user.email } });

    } catch (error) {
        console.error("Update password error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const findeUser=async(req,res)=>{
    try {
        const {email}=req.body;
        const user=await UserSechema.findOne({email});
        if(!user) return res.status(404).json({message:"User not found"});
        res.json({
            message:"User Found",
        });
    } catch (error) {
        console.log(error);
    }
}

const deleteUser=async(req,res)=>{
    try {
        const {email}=req.body;
        const user=await UserSechema.findOneAndDelete({email});
        if(!user) return res.status(404).json({message:"User not found"});
        res.json({
            message:"User deleted successfully",
        });
    } catch (error) {
        console.log(error);
    }
}

const updateuserpermission=async(req,res)=>{
    try {
        const {email,permission}=req.body;
      const  newPermission=true;
        const user=await UserSechema.findOneAndUpdate({email},{permission:newPermission}, {new: true});
        if(!user) return res.status(404).json({message:"User not found"});
        res.json({
            message:"User permission updated successfully",
        });
    } catch (error) {
        console.log(error);
    }
};

const GetUser  = async (req, res) => {
    try {
        // Ensure that you're using an object to query
        const user = await UserSechema.findOne({ email: req.params.email });
        
        if (!user) {
            return res.status(404).json({ message: "User  not found" });
        }
        
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const changePassword=async(req,res)=>{
    try {
        const {email,oldpassword,newpassword}=req.body;
        const user=await UserSechema.findOne({email});
        if(!user) return res.status(404).json({message:"User not found"});
        const isMatch = await bcrypt.compare(oldpassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid old password" });
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newpassword, saltRounds);
        const updatedUser=await UserSechema.findOneAndUpdate({email},{password:hashedPassword}, {new: true});
        res.json({
            message:"Password changed successfully",
        });
    } catch (error) {
        console.log(error);
    }
 };

module.exports = {UserSignup,getAllUser,UserLogin,updatePassword,findeUser,updateuserpermission,deleteUser,GetUser,changePassword};