const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const fetchUser = require('../middleware/fetchUser.js');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'ernw832@9y4098nf$n';

//Create User Route
router.post('/createuser', [
    body('firstName', 'Enter a valid First Name').isLength({min: 3}),
    body('lastName', 'Enter a valid Surname').isLength({min: 3}),
    body('email', 'Enter a valid Email').isEmail(),
    body('dateOfBirth', 'Enter a valid Date of Birth').isDate().custom((value) => {
        const dob = new Date(value);
        const today = new Date();
        const ageDiff = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        const dayDiff = today.getDate() - dob.getDate();
        let age = ageDiff;
        if(monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)){ age--; }
        if(age < 18){ throw new Error("You must be atleast 18 years old to register!"); }
        return true;
    }),
    body('zipCode', 'Enter a valid Zip Code').isLength(6),
    body('password', 'Password must be atleast 9 characters').isLength({min: 9}),
], async (req, res)=>{
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        let user = await User.findOne({email: req.body.email});
        if(user){return res.status(400).json({ success, error: "Sorry, an Account with this Email already exists. Please try again with another Email Id" })}

        const secPass = await bcrypt.hash(req.body.password, 12);

        user = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            dateOfBirth: req.body.dateOfBirth,
            zipCode: req.body.zipCode,
            password: secPass
        });

        const data = {
            user:{
                id: user.id
            }
        }

        const auth_token = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, auth_token});

        // .then(user => res.json(user)).catch(err => {console.log(err); res.json({error: 'Please Enter a Unique Value for Email', message: err.message})})

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//Login Route
router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password cannot be left blank!').exists()
], async (req, res)=>{
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if(!user){return res.status(400).json({success, error: "Sorry, Incorrect Credentials Entered" })}
        const passwordComp = await bcrypt.compare(password, user.password);
        if(!passwordComp){return res.status(400).json({success, error: "Sorry, Incorrect Credentials Entered" })}

        const data = {
            user:{
                id: user.id
            }
        }

        const auth_token = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, auth_token});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//Get User Details Route
router.get('/getuser', fetchUser, async (req, res)=>{
    try {
        const userId = req.user.id;
        const user = await User.findById(`${userId}`).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//Edit User Details Route
router.put('/edituser', fetchUser, [
    body('firstName', 'Enter a valid First Name').isLength({min: 3}),
    body('lastName', 'Enter a valid Surname').isLength({min: 3}),
    body('dateOfBirth', 'Enter a valid Date of Birth').isDate().custom((value) => {
        const dob = new Date(value);
        const today = new Date();
        const ageDiff = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        const dayDiff = today.getDate() - dob.getDate();
        let age = ageDiff;
        if(monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)){ age--; }
        if(age < 18){ throw new Error("You must be atleast 18 years old to register!"); }
        return true;
    }),
    body('zipCode', 'Enter a valid Zip Code').isLength(6)
], async (req, res)=>{
   try {
       const {firstName, lastName, dateOfBirth, zipCode} = req.body;
       const newUser = {};
       if(firstName){newUser.firstName = firstName}
       if(lastName){newUser.lastName = lastName}
       if(dateOfBirth){newUser.dateOfBirth = dateOfBirth}
       if(zipCode){newUser.zipCode = zipCode}

       //Find the User to be Updated then update it
       const userId = req.user.id;
       let user = await User.findById(`${userId}`).select("-password");
       if(!user){return res.status(404).send("Sorry, User Not Found" )}
       if(user._id.toString() !== req.user.id){return res.status(401).send("Access Denied!")}
       user = await User.findByIdAndUpdate(req.user.id, {$set: newUser}, {new: true});
       res.json({user});

   } catch (error) {
       console.error(error.message);
       res.status(500).send("Internal Server Error");
   }
});

//Delete User Account Route
router.delete('/deleteuser', fetchUser, async (req, res)=>{
    try {
        const userId = req.user.id;
        let user = await User.findById(`${userId}`);
        if(!user){return res.status(404).send("Sorry, User Not Found" )}
        if(user._id.toString() !== req.user.id){return res.status(401).send("Access Denied!")}
        user = await User.findByIdAndDelete(req.user.id);
        res.json({"Success": "User has been Deleted", user: user});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;