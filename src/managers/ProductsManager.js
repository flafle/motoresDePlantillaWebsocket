import fs from "fs";
import __dirname from "../utils.js";

export default class ProductsManager {

    constructor ( ) {
        this.path = `${__dirname}/files/product.json`;
        this.init();
    }

    init = async()=>{
        if (!fs.existsSync(this.path)){
            await fs.promises.writeFile(this.path, JSON.stringify([]));

        }
    }
    readMeeting = async ()=> {
        const data = await fs.promises.readFile(this.path , "utf-8");
        return JSON.parse(data);
    }
    getProduct = ()=> {
        return this.readProduct();
    }
    createProduct = async(product) => {
        const product = await this.readProducts();
        product.id = product.length === 0 ? 1 : product[product.length - 1].id + 1;
        
        product.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(product, null, " \t"));
        return product
    };

};









const prod = new ProductsManager();

prod.addProduct("Zapatillas", "Zapatillas de actividad fisica", 12000, "zapatilla.jpg", 123, 4);

prod.addProduct("remera", "remeras de verano",1321, "remera.jpg", 343, 3);

prod.addProduct ("short" , "Bermudas y short de verano", 300, "short.jpg", 546, 98);

prod.getProducts()

prod.getProductsById(1);

module.exports = ProductsManager;