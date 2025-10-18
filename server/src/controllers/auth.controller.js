import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt  from "bcryptjs"
import cloudinary from "../lib/cloudinary.js";
export const signup = async (req, res) => {
    const { fullName, email, password, adminSecret } = req.body;
    console.log('Signup request:', { fullName, email, password, adminSecret }); // Debug log
    try {
        if( !fullName || !email || !password) {
            console.log('Validation failed: Missing fields');
            return res.status(400).json ({ message: "Please fill all fields" });
        }

        if (password.length < 6){
            console.log('Validation failed: Password too short');
            return res.status(400).json({ message: "Password must be at least 6 characters"});
        }

        const user = await User.findOne({ email });
        console.log('Existing user check:', user ? 'Found' : 'Not found');

        if (user) {
            console.log('Validation failed: Email exists');
            return res.status(400).json({ message: "Email already exists" });
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const isAdmin = adminSecret === process.env.ADMIN_SECRET;
        console.log('Is admin:', isAdmin);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            isAdmin,
        })

        if(newUser){
            generateToken(newUser._id,res)
            await newUser.save();
            console.log('User created successfully');

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
                isAdmin: newUser.isAdmin,
            });
        }else{
        res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({ message: "Invalid email or password" });
        }

        generateToken(user._id,res)

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
            isAdmin: user.isAdmin,
            token: generateToken(user._id,res), // Return the token
        })
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt","", {maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateProfile = async (req, res) => {
    try {
      const { profilePic } = req.body;
      const userId = req.user._id;
  
      if (!profilePic) {
        return res.status(400).json({ message: "Profile pic is required" });
      }
  
      const uploadResponse = await cloudinary.uploader.upload(profilePic);
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePic: uploadResponse.secure_url },
        { new: true }
      );
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.log("error in update profile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}