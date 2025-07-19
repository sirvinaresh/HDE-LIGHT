const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    cat: { type: String, required: true },
    catSlug: { type: String, required: true },
    scat: { type: String },
    scatSlug: { type: String }, 
    lname: { type: String },
    model: { type: String },
    width: { type: String },
    height: { type: String },
    dimension: { type: String },
    cct: { type: String },
    watt: { type: String },
    lumens: { type: String },
    pfactor: { type: String },
    ip: { type: String },
    cout: { type: String },
    wvolt: { type: String },
    clayer: { type: String },
    bcolor: { type: String },
    colour: { type: String },
    body: { type: String },
    pdemsion: { type: String },
    size: { type: String },
    holder: { type: String },
    material: { type: String },
    dmeter: { type: String },
    pdmeter: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
