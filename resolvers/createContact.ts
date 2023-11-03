//@ts-ignore //
import { Request, Response } from "npm:express@4.18.2";
import ContactModel from "../contact.ts";

const createContact = async (req: Request, res: Response) => {
  try {
    const { dni, name, email, postal, iso } = req.body;
    if (!dni || !name || !email || !postal || !iso) {
      res.status(500).send("Faltan datos");
      return;
    }
    const contactExist = await ContactModel.findOne({ dni }).exec();
    if(contactExist){
        res.status(400).send("Ya existe alguien con ese DNI");
        return;
    }

    const newContact = new ContactModel({ dni, name,email, postal, iso });
    await newContact.save();

    res.status(200).send({
      dni: newContact.dni, 
      name: newContact.name, 
      email: newContact.dni, 
      postal: newContact.postal,
      iso: newContact.iso,
      id: newContact._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default createContact;