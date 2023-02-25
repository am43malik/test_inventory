import express from "express";
import itemController from "../Controller/itemController";
import labController from "../Controller/labController";
import loginController from "../Controller/loginController";
import registerController from "../Controller/registerController";

const Router = express.Router();

Router.post("/register", registerController.register);
Router.post("/login",loginController.login)
Router.get("/item", itemController.items);
Router.post("/add", itemController.add);
Router.put("/update/:id", itemController.update);
Router.delete("/delete/:id", itemController.delete);
//------------lab Route-----------------------------//
Router.post("/addlab",labController.addlab);
Router.delete("/deletelab/:id",labController.deletelab);
export default Router;
 //==============previus Report-----------------
 Router.post("/getPrevStockInInfo",itemController.getPrevStockInInfo)