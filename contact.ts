import mongoose from "npm:mongoose@7.6.3"; //npmjs.com/package/mongoose
import { Contacto } from "./types.ts";

const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    dni: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    postal: { type: String, required: true },
    iso: { type: String, required: true },
    place_name: { type: String, required: false},
    pais: { type: String, required: false},
    datetime: { type: String, required: false},
    currentTime: { type: String, required: false},
  },
  { timestamps: true }//para saber cuando se ha creado y cuando actualizado
);

export type ContactModelType = mongoose.Document & Omit<Contacto, "id">;

export default mongoose.model<ContactModelType>("Contact", contactSchema);