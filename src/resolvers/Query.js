import "babel-polyfill";
import * as uuid from 'uuid';
const Query = {
    test:async(parent,args,ctx,info) => {
        return "hola";
    },
    listarIngrediente:async(parent,args,ctx,info) =>{
        const {nombre, descripcion} = args;
        const {client} = ctx;

        const db = client.db("Examen");
        const ingredientes = db.collection("ingredientes");
        const recetas = db.collection("recetas");
        

        return ingredientes.find().toArray();
    },
    listarReceta:async(parent,args,ctx,info) =>{
        const {titulo, descripcion1} = args;
        const {client} = ctx;

        const db = client.db("Examen");
        const ingredientes = db.collection("ingredientes");
        const recetas = db.collection("recetas");
        
        
        return recetas.find({ingredientes}).toArray();
    },
    listarRecetaEspecifica:async(parent,args,ctx,info) =>{
        const {id,titulo,descripcion1} = args;
        const {client} = ctx;

        const db = client.db("Examen");
        const ingredientes = db.collection("ingredientes");
        const recetas = db.collection("recetas");        

        return recetas.findOne({id:ObjectID(id)});
    },
    listarRecetaIngrediente:async(parent,args,ctx,info) =>{
        const {id,titulo,descripcion1,listaIngredientes} = args;
        const {client} = ctx;

        const db = client.db("Examen");
        const ingredientes = db.collection("ingredientes");
        const recetas = db.collection("recetas");        
        
        return recetas.findOne({listaIngredientes});
    }
}
export {Query as default};