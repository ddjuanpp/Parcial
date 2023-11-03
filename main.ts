import mongoose from "npm:mongoose@7.6.3";
import express from "npm:express@4.18.2";

import {load} from "https://deno.land/std@0.204.0/dotenv/mod.ts"
import listaContact from "./resolvers/listaContact.ts";
import infoContact from "./resolvers/infoContact.ts";
import createContact from "./resolvers/createContact.ts";
import updateContact from "./resolvers/updateContact.ts";
import deleteContact from "./resolvers/deleteContact.ts";


const env = await load();
const URL_MONGO = env.MONGO_URL || Deno.env.get("MONGO_URL"); //si no existe el MI_MONGO_URL en el archivo env, leo las variables del S.O

if (!URL_MONGO) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

await mongoose.connect(URL_MONGO);
const app = express();
app.use(express.json());

app.get("/api/contactos", listaContact)
   .get("/api/contactos/:dni", infoContact)
   .post("/api/contactos", createContact)
   .put("/api/contactos/:dni", updateContact)
   .delete("/api/contactos/:dni", deleteContact)

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});