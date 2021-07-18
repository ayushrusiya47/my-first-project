const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const client= require('../configs/db');




exports.signUp=(req,res)=>
{
    const {name,email,password}=req.body;
    // res.send("sab shi nhi  h ");
    console.log(name," ",email," ",password);
    let f=0;

  client.query(`SELECT * FROM users WHERE email = '${email}' ;`).then((data)=>{
      let isValid=data.rows;
      if(isValid.length!=0)
      {
          res.status(400).json({
              error: "user already exits",
          })
      }
      else
      {
            bcrypt.hash(password,10, (err, hash)=>{
                if(err)
                {
                    res.status(500).json({
                        error:"internal server error",
                    }) ;
                }
                else
                {
                    const User={
                        name,
                        email,
                        password:hash
                    }
                    client.query(`INSERT INTO users (name, email, password) VALUES('${User.name}', '${User.email}', '${User.password}') ;`)
                    .then((data)=>{
                        console.log(data);
                        const token = jwt.sign({ email:email },process.env.SECRET_KEY);
                        // console.log(token);
                        res.status(200).json({
                            message:"User added to database successfully",
                            token,
                        });
                    })
                    .catch(err=>{
                        res.status(500).json({
                            error:"internal server error",
                        })
                    })
                   
                }
              
           }); 
      }
  }).catch(err=>{
    res.status(500).json({
        error:"internal server error",
    })
  })

       
}

exports.signIn=(req,res)=>
{
    const {email,password}=req.body;
    // res.send("sab shi nhi  h ");
    console.log(email," ",password);
    client.query(`SELECT * FROM users WHERE email = '${email}' ;`).then((data)=>{
      let isValid=data.rows;
      if(isValid.length==0)
      {
          res.status(400).json({
              error: "user not exits, sign up kr be phele",
          })
      }
      else
      {
        bcrypt.compare(password, isValid[0].password,(err, result)=> {
            if(err)
                {
                    res.status(500).json({
                        error:"internal server error",
                    }) ;
                }
            else if(result===true)
            {
                const token = jwt.sign({ email:email },process.env.SECRET_KEY);
                res.status(200).json({
                    message:"shi h bhai",
                    token
                })
            }
            else
            {
                res.status(200).json({
                    message:"shi password dalo bahi",
                })
            }
        });
      }
  }).catch(err=>{
    res.status(500).json({
        error:"internal server error",
    })
  })
}
