/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'abcdefgh#$i';


//ROUTE 1: Create a user using: POST "/api/auth/createuser"
router.post('/createuser', [
    body('name', 'Enter a Valid name').isLength({ min: 3 }), 
    body('email', 'Enter a valid E-mail').isEmail(), 
    body('password', 'Password must be alteast 5 characters').isLength({ min: 5 })
], async(req,res)=>{
    let success = false;

    //If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    
    // Check whether the user with this email exists already
    try{
        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({success, error: "Sorry a user with this email already exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash( req.body.password, salt);
        //Create a  user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })
        const data = {
            user:{
                id: user.id
            }
        }
        // res.json(user);

        const authtoken = jwt.sign(data, JWT_SECRET);
        success=true;
        res.json({success,authtoken})
        

    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


//ROUTE 2: Authenticate a user using: POST "/api/auth/login"
router.post('/login', [ 
    body('email', 'Enter a valid E-mail').isEmail(), 
    body('password', 'Password cannot be blank').exists()
], async(req,res)=>{
   
    let success = false;
    //If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    

    const {email,password} = req.body;
    try {
        let user =  await User.findOne({email});
        if(!user){
           return res.status(400).json({success, error: "Please try to login with Correct credentials"});
        }

       const passwordCompare = await bcrypt.compare(password, user.password)
       if(!passwordCompare){
         return res.status(400).json({success, error: "Please try to login with Correct credentials"});
       }

       const data = {
            user:{
                id: user.id
            }
        }
    
        const authtoken = jwt.sign(data, JWT_SECRET);
        success=true;
        res.json({success, authtoken})


    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


//ROUTE 3: Get logined user details using: POST "/api/auth/getuser". Login required
router.post('/getuser',fetchuser, async(req,res)=>{
    
    try {

        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        success=true;
        res.json({success, user});
        // res.send(user);
        

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router