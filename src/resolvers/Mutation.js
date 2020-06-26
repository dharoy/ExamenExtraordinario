import "babel-polyfill";
const Mutation={
    addIngrediente:async(parent,args,ctx,info) =>{
        const {nombre, descripcion} = args;

        const  {client} = ctx;

        const db = client.db("Examen");
        const collection = db.collection("ingredientes");

        if(await collection.findOne({nombre})){
            throw new Error('El ingrediente ya está guardado.');
        }
        const result = await collection.insertOne(
            {
                nombre,
                descripcion
            }
        )
        return result.ops[0];
    },

    addReceta:async(parent,args,ctx,info) =>{
        const {client} = ctx;
        const {titulo, descripcion1} = args;
        var {pasos, listaIngredientes} = args;

        const db = client.db("Examen");
        const recetas = db.collection("recetas");
        const collection = db.collection("ingredientes");

        if(await recetas.findOne({titulo})){
            throw new Error('Esta receta ya está guardada.');
        }

        const result = await recetas.insertOne({titulo,descripcion1,pasos,listaIngredientes});
        return {
            titulo,
            descripcion1,
            pasos,
            listaIngredientes,
            id: result.ops[0].id
        }

    },
}
export {Mutation as default}; 