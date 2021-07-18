const jwt=require("jsonwebtoken");
const client= require('../configs/db');

exports.verifyToken=(req,res,next)=>{
    const token=req.headers.authorization;;
    jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
        if(err)
        {
            res.status(400).json({
                message:"token me kuch gadbad h",
            })
        }
        else
        {
            // console.log(decoded);
            // next();
            const email=decoded.email;
            // console.log(email);
            client.query(`SELECT * FROM users WHERE email = '${email}' ;`)
            .then(data=>{
            let isValid=data.rows;
            if(isValid.length==0)
            {
                 res.status(400).json({
                 error: "user not exits, sign up kr be phele",
             })
             }
            else
            {
                req.email=email;
                // console.log(req.email);
                 next(); 
            }
            })
           .catch(err=>{
           console.log(err);
            })
        }
    })
};


// const email=decoded.email;
// client.query(`SELECT * FROM users WHERE email = '${email}' ;`)
// .then(data=>{
//    let isValid=data.rows;
//    if(isValid.length==0)
//    {
//        res.status(400).json({
//            error: "user not exits, sign up kr be phele",
//        })
//    }
//    else
//    {
//        next();
//        res.status(400).json({
//            error: "shi h",
//        });
      
//    }
// })
// .catch(err=>{
//     console.log(err);
// })