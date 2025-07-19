const regi = require("../model/registrationModel");
const bcrypt = require("bcrypt");

exports.createRegi = async (req, res) => {
  try {

    const exist = await regi.findOne({email:req.body.email})
    if(exist){
        return res.status(400).json({message:'Email already exists'});
    }
    
    var b_pass = await bcrypt.hash(req.body.password, 10);
    req.body.password = b_pass;
    var data = await regi.create(req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRegis = async (req, res) => {
  try {
    var data = await regi.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRegi = async (req, res) => {
  try {
    var data = await regi.findById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.UpdateRegi = async (req, res) => {
  try {
    var data = await regi.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.DeleteRegi = async (req, res) => {
  try {
    var data = await regi.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "successfully delete" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
