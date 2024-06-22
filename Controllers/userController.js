import User from "../Models/userSchema.js";
import bcryptjs from "bcryptjs";

export const registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const hashPassword = await bcryptjs.hash(password, 10);
    // console.log(hashPassword);
    const newUser = new User({ userName, email, password: hashPassword });
    await newUser.save();
    res
      .status(200)
      .json({ message: "User Registered Successfully", Result: newUser });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Registration Failed Internal Server Error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDetails = await User.findOne({ email });
    if (!userDetails) {
      return res.status(404).json({ message: "User Not Fount" });
    }
    const passwordMatch = await bcryptjs.compare(
      password,
      userDetails.password
    );
    if (!passwordMatch) {
      return res.status(404).json({ message: "Invalid password" });
    }
    res.status(200).json({ message: "User Logged In Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Login Failed Internal Server Error" });
  }
};
