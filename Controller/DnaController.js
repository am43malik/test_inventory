import Joi from "joi";

import Dna from '../Model/Dna'
const date = require("date-and-time");
const DnaController = {
  async itemsDna(req, res, next) {
    let item;
    try {
      item = await Dna.find();
      if (!item) {
        return next(new Error("items not found!"));
      }
    } catch (error) {
      return next(error);
    }
    res.json(item);
  },

  async getPrevStockInInfo(req, res) {
    let pre;
    // if (!req.body.from || !req.body.to) {
    //   console.log(req.body.to, "jkbjkb");
    //   res.status(400).send("Bad Request");
    // } else {
      let d1 = date.parse(req.body.to, "YYYY/MM/DD");
      let d2 = date.parse(req.body.from, "YYYY/MM/DD"); //format - '2023/01/10'
      try {
        pre = await Dna.find({
          name: req.body.name,
          requiredTest: req.body.requiredTest,
          sampleType: req.body.sampleType,
          $and: [{ to: { $gt: d1 } }, { from: { $lt: d2 } }],
        });
      } catch (error) {
        return next(error);
      }
// res.json(pre)
      res.status(200).send({ msg: "success", pre });
      console.log(pre);
    
  },

  async addDna(req, res, next) {
    const productsSchema = Joi.object({
      name: Joi.string().required(),
      workOder: Joi.string().required(),
      noofSample: Joi.string().required(),
      requiredTest: Joi.string().required(),
      sampleType: Joi.string().required(),
      date: Joi.date().required(),
      RequiredAnalysis:Joi.string().required(),
    });
    const { error } = productsSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    const { name, workOder, noofSample, requiredTest, sampleType, date,RequiredAnalysis } =
      req.body;

    let product;
    try {
      product = await Dna.create({
        name,
        workOder,
        noofSample,
        requiredTest,
        sampleType,
        date,
        RequiredAnalysis,
      });

      if (!product) {
        return next(new Error("Product Not Add"));
      }
    } catch (error) {
      return next(error);
    }
    res.json(product);
  },

  async updateDna(req, res, next) {
    // const updateSchema = Joi.object({
    //   name: Joi.string(),
    //   workOder: Joi.number(),
    //   noofSample: Joi.number(),
    //   requiredTest: Joi.string(),
    //   sampleType: Joi.string(),
    //   date: Joi.date(),
    // });
    // const { error } = updateSchema.validate(req.body);
    // if (error) {
    //   return next(error);
    // }
    const { name, workOder, noofSample, requiredTest, sampleType, date ,RequiredAnalysis} =
      req.body;
 console.log(req.body,'reqbody')
    let product;
    try {
      product = await Dna.findByIdAndUpdate(
        { _id:req.params.id },
        {
          name,
          workOder,
          noofSample,
          requiredTest,
          sampleType,
          date,
          RequiredAnalysis,
        },{new: true}
      );
console.log(product,'product')
console.log(req.params.id,'id')
      
    } catch (error) {
      return next(error);
    }
    res.json(product);
  },

  async deleteDna(req, res, next) {
    let product;
    try {
      product = await Dna.findByIdAndRemove({ _id: req.params.id });
      if (!product) {
        return next(new Error("Noting to delete"));
      }
    } catch (error) {
      return next(error);
    }
    res.json(product);
  },
};
export default DnaController;
