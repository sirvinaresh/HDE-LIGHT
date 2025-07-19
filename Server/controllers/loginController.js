const user = require("../model/registrationModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

exports.loginUser = async (req, res) => {
  try {
    var data = await user.find({ "email": req.body.email });
    if (data.length == 1) {
        bcrypt.compare(req.body.password,data[0].password,async function(err,result){
            if(result==true){
                if(data[0].Isadmin){
                    var token = await jwt.sign({id:data[0]._id},process.env.JWT_SECRET,{expiresIn:'60s'})
                    res.status(200).json({
                        message:'Admin login successful',
                        name:data[0].fname, 
                        token
                    })
                }else{
                    res.status(403).json({ message: "Access denied: not an admin" });
                }
            }
            else{
                res.status(400).json({message:'Invalid email and password'})
            }
        })
    } else {
      res.status(400).json({ message: "Invalid email and password" });
    }
  } catch (error) {
    res.status(500).json({error:error.message})
  }
};


exports.forgotPass = async (req, res) => {
  try {
    const data = await user.find({ email: req.body.email });

    if (data.length === 1) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      await user.findByIdAndUpdate(data[0]._id, { password: hashedPassword });

      res.status(200).json({ message: "Password updated successfully" });
    } else {
      res.status(400).json({ message: "Invalid email" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
