//@ts-ignore //
import { Request, Response } from "npm:express@4.18.2";
import ContactModel from "../contact.ts";

const listaContact = async (_req: Request, res: Response) => {
  try {
    const contactos = await ContactModel.findOne().exec();
    if(!contactos){
        res.status(404).send("No hay contactos");
        return;
    }
    const info = contactos.name + ", " +contactos.dni
    return{
        info
    }
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default listaContact;