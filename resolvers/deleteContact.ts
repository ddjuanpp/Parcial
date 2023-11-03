//@ts-ignore //
import { Request, Response } from "npm:express@4.18.2";
import ContactModel from "../contact.ts";

const deleteContact = async (req: Request, res: Response) => {
  try {
    const { dni } = req.params;
    const person = await ContactModel.findOneAndDelete({ dni }).exec();
    if (!person) {
      res.status(404).send("No existe el contacto");
      return;
    }
    res.status(200).send("Contacto borrado");
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default deleteContact;