const Product = require("../model/productModel");
const slugify = require('slugify');

exports.createPro = async (req, res) => {
  try {
    const image = req.file?.path || null;
    const catSlug = slugify(req.body.cat, { lower: true });
    const scatSlug = req.body.scat ? slugify(req.body.scat, { lower: true }) : null;

    var data = await Product.create({ ...req.body, image, catSlug, scatSlug });
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.pagination = async (req, res) => {
  try {
    const limit = 10;
    var pageNo = req.query.pageNo || 1;
    var start = (pageNo-1) * limit;
    
    const search = req.query.search || ''
    const regex = new RegExp(search,'i');
    const query = {
      $or:[
        {cat:regex},
        {scat:regex},
        {lname:regex},
        {model:regex}
      ]
    }
    var totalRecoard = await Product.countDocuments(query);
    var totalpage = Math.ceil(totalRecoard/limit);
    
    var data = await Product.find(query).limit(limit).skip(start).sort({_id:-1});
    res.status(200).json({data,totalpage,totalRecoard,pageNo});
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    var data = await Product.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    var data = await Product.findById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
};

exports.updatePro = async(req,res)=>{
  try {
    const image = req.file?.path || null;
    const catSlug = slugify(req.body.cat, { lower: true });
    const scatSlug = req.body.scat ? slugify(req.body.scat, { lower: true }) : null;
    const updateData = { ...req.body,catSlug,scatSlug };

    if (image) {
      updateData.image = image; // Only set if a new image is uploaded
    }
    
    var data = await Product.findByIdAndUpdate(req.params.id,updateData)
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    var data = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      staus:'successfully delete record'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get products by type (Indoor/Outdoor)
exports.getByType = async (req, res) => {
  try {
    const data = await Product.find({ type: req.params.type });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getByCategory = async (req, res) => {
  const { type, catSlug } = req.params;
  const data = await Product.find({ type, catSlug });
  res.json(data);
};

exports.getBySubCategory = async (req, res) => {
  const { type, catSlug, scatSlug } = req.params;
  const data = await Product.find({ type, catSlug, scatSlug });
  res.json(data);
};

