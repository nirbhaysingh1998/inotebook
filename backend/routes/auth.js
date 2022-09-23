const express= require('express');
const router= express.Router();
const User= require('../models/Users');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET='mynameisnirbh$ay';
// create a user using POST "api/auth does not required auth no login required
router.post('/createuser',[
body('name','enter a valid name').isLength({ min: 3 }),
body('email', 'enter a valid email').isEmail(),
body('password').isLength({ min: 5 })
,]
,async (req, res)=>{
    // if error return bad request with error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
// check weather the user with  same email is present or not

try{
let user=await User.findOne({email:req.body.email});
if (user){
    return res.status(404).json({error:"sorry user already exist"})
}// create a new user

const salt=await bcrypt.genSalt(10);
const Secpass=await bcrypt.hash(req.body.password, salt)
     user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password:Secpass,
      });
// data ek object hai 
      const data={
user:{
    id:user.id
}
      }
const authToken = jwt.sign(data,JWT_SECRET);
     // console.log(authToken);
      //.then(user => res.json(user))
      //.catch(err=> {console.log(err)
 res.json({authToken:authToken})
    }
    catch(error){
        console.error(error); 
        res.status(500).send("some error occured");
    } 
})

module.exports= router