import validator from "validator"
import bcrypt, { hash } from "bcrypt"
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js";


const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

// Route for user login
const loginUser = async (req, res) => {
    try {

        const {email,password} = req.body;

        const user = await userModel.findOne({email});

        if(!user) {
            return res.json({success:false, message:"user dosen't exists"})
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(isMatch) {

            const token = createToken(user._id)
            res.json({success:true,token})

        }
        else {
            res.json({success:false, message: 'Invalid credentials'})
        }
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

// Route for user register
const registerUser = async (req,res) => {
    try{

        const { name, email, password } = req.body;

        // cheaking user already exists or not
        const exists = await userModel.findOne({email})
        if(exists) {
            return res.json({success:false, message:"user already exists"})
        }

        // validating email format & strong password
        if(!validator.isEmail(email)) {
            return res.json({success:false, message:"Please enter a valid email"})
        }
        if(password.length < 8) {
            return res.json({success:false, message:"Please enter a strong password"})
        }

        // hasing user password
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name,
            email,
            password:hashedpassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({success:true,token})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

// Route for admin login
const adminLogin = async (req,res) => {
    try {
        
        const {email,password} = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true,token})
        } else {
            res.json({success:false,message:"invalid credentials"})
        }

    } catch (error) {
        console.log(error);
        res.json({ success:false, message: error.message })
    }
}

// Get logged-in user's profile
const getUserProfile = async (req, res) => {
    try {
        const userId = req.body.userId;

        const user = await userModel
            .findById(userId)
            .select('-password -cartData');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            user
        });

    } catch (error) {
        console.error('Get profile error:', error);

        res.status(500).json({
            success: false,
            message: 'Unable to fetch profile'
        });
    }
};


// Update logged-in user's name
const updateUserProfile = async (req, res) => {
    try {
        const userId = req.body.userId;
        const { name } = req.body;

        if (typeof name !== 'string' || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: 'Name is required'
            });
        }

        const user = await userModel.findByIdAndUpdate(
            userId,
            { name: name.trim() },
            {
                new: true,
                runValidators: true
            }
        ).select('-password -cartData');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            message: 'Profile updated successfully',
            user
        });

    } catch (error) {
        console.error('Update profile error:', error);

        res.status(500).json({
            success: false,
            message: 'Unable to update profile'
        });
    }
};
export {
    loginUser,
    registerUser,
    adminLogin,
    getUserProfile,
    updateUserProfile
};