var jwt = require('jsonwebtoken');

//req request res response next middleware
const fetchuser =(req, res, next)=>{

// get the user from the JWT token and add id to  req onject

const  token = req.header('auth-token');
const JWT_SECRET='mynameisnirbh$ay';
if (!token)
{
    res.status(401).send({error:"no token found"})
}
try {
    const  data= jwt.verify(token,JWT_SECRET);
req.user= data.user;
next()
} catch (error) {
    res.status(401).send({error:"please authenticate using a valid token"})
    
}

}

module.exports= fetchuser;