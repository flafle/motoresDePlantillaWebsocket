import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import __dirname from "./utils/utils.js";

import ProductManager from "./managers/ProductsManager.js";
const encuadernacion = new ProductManager()

//conecto ambos router
import viewsRouter from "./routes/views.router.js";
import productsRouter from "./routes/products.router.js";


const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen (PORT,()=> console.log(`listening on ${PORT}`));

//vistas
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views `)
app.set("view engine", "handlebars");


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/", viewsRouter); //ruta base
app.use("/api/products", productsRouter)// ruta api/products

// -------------


export default function socketProducts(socketServer){
    socketServer.on('connection', async socket => {
    
    const data = await encuadernacion.getProducts()
  
    socket.emit('products', { data } )

    socket.on('product', async data => {

        try {        
            const valueReturned = await encuadernacion.addProduct(data)
          
            socket.emit('message', valueReturned)
        }
        catch (err) {
            console.log(err);
        }

    });

    socket.on('delete', async data => {

        const result = await encuadernacion.deleteProduct(data)
        
        socket.emit('delete', result)
    });

    
});
};