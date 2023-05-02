import { Router } from "express";

const router = Router();

router.get ( "/", ( req, res ) =>  {
    res.send ("home");
});

router.get("/api/products", (req,res)=>{
    res.render("realTimeProducts");
});

export default router;