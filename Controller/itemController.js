import Joi from "joi";
import Item from "../Model/Item";
import Product from "../Model/Product";

const itemController = {
  async items(req, res, next) {
    let item;
    try {
      item = await Item.find();
      if (!item) {
        return next(new Error("items not found!"));
      }
    } catch (error) {
      return next(error);
    }
    res.json(item);
  },

  async add(req, res, next) {
    const productsSchema = Joi.object({
      name: Joi.string().required(),
      workOder: Joi.number().required(),
      noofSample: Joi.number().required(),
      requiredTest: Joi.string().required(),
      sampleType: Joi.string().required(),
      date: Joi.date().required(),
      

     
    });
    const { error } = productsSchema.validate(req.body);
    if(error){
        return next(new Error('All filed are required.'))
    }
    const { name, workOder, noofSample,requiredTest,sampleType,date} = req.body;

    let product;
    try {
      product = await Product.create({
        name,
        workOder,
        noofSample,
        requiredTest,
        sampleType,
        date,
       
      });

      if (!product) {
        return next(new Error("Product Not Add"));
      }
    } catch (error) {
      return next(error);
    }
    res.json(product);
  },

  async update(req, res, next) {
    const productsSchema = Joi.object({
      name: Joi.string().required(),
      workOder: Joi.number().required(),
      noofSample: Joi.number().required(),
      requiredTest: Joi.string().required(),
      sampleType: Joi.string().required(),
      date: Joi.date().required(),
     
    });
    const { error } = productsSchema.validate(req.body);
    if(error){
        return next(new Error('All filed are required.'))
    }
    const { name, workOder, noofSample,requiredTest,sampleType,date} = req.body;

    let product;
    try {
      product = await Product.findByIdAndUpdate({_id:req.params.id},{
        name,
        workOder,
        noofSample,
        requiredTest,
        sampleType,
        date,
      
      });

      if (!product) {
        return next(new Error("Product Not Add"));
      }
    } catch (error) {
      return next(error);
    }
    res.json(product);
  },

  async delete(req,res,next){
   let product;
   try{
    product= await Product.findByIdAndRemove({_id:req.params.id})
    if(!product){
        return next(new Error('Noting to delete'))
    }

   }catch(error){
    return next(error)
   }
   res.json(product)


  }
};
export default itemController;