import {MongoClient, ObjectID} from "mongodb";
import {GraphQLServer} from "graphql-yoga";
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import * as uuid from 'uuid';
import "babel-polyfill";


const usr = "dharoy";
const pwd = "1qaz2wsx3edc";
const url = "cluster0-lpg05.mongodb.net/test?retryWrites=true&w=majority";
const connectToDb = async function(usr, pwd, url) {
    const uri = `mongodb+srv://${usr}:${pwd}@${url}`;
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  
    await client.connect();
    return client;
};

const runGraphQLServer = function(context){
    const resolvers = {
       
        Query,
        Receta,
        Mutation,
        
    }
    const server = new GraphQLServer({ typeDefs: './src/schema.graphql', resolvers, context });
  const options = {
    port: 8000
  };

  try {
    server.start(options, ({ port }) =>
      console.log(
        `Server started, listening on port ${port} for incoming requests.`
      )
    );
  } catch (e) {
    console.info(e);
    server.close();
  }
};

const runApp = async function() {
  const client = await connectToDb(usr, pwd, url);
  console.log("Connect to Mongo DB");
  try {
    runGraphQLServer({ client });
  } catch (e) {
      console.log(e)
    client.close();
  }
};

runApp();