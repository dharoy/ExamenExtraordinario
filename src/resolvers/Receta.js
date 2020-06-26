import "babel-polyfill";
const Receta = {
    listaIngredientes:async (parent,args,ctx,info) =>{
        const {client} = ctx;
        const {nombre2} = parent;
        const db = client.db("Examen");
        const collection = db.collection("ingredientes");
        const ingredienteEncontrado = await collection.findOne({nombre: nombre2});
        return [ingredienteEncontrado];
    },

}
export {Entrada as default};