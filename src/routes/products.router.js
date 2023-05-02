import { Router } from "express";
import ProductsManager from "../managers/ProductsManager.js"

const router = Router();
const productsServices = new ProductsManager();

router.get ("/", async ( req, res)=>{
    try {

    const products = await productsServices.getProducts();
    res.send({status: "Success", payload: products}); 		 
    } catch (error) {
        res.status(500).send({status:"error", error: "Error al obtener producto "})
    }
});

//asegurarme de los errores.(a la hora del envio)
router.post("/", async(req,res)=>{
    const {title, description, code} = req.body;
    if(!title||!description||!code){
      return  res.status(400).send({status:"error", error:"valores incompletos"});
      const product= {
        title,
        description,
        code
      }
      const result = await productsServices.createProduct(product);
      res.status(201).send({status:"Sucess", payload_result})

    }
})
export default router;