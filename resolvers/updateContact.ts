//@ts-ignore //
import { Request, Response } from "npm:express@4.18.2";
import ContactModel from "../contact.ts";

const updateContact = async (req: Request, res: Response) => {
  try {
    const { dni } = req.params;

    const contactExist = await ContactModel.findOne({ dni }).exec();
    if(!contactExist){
        res.status(404).send("No hay nadie con ese dni");
        return;
    }

    const { name, email, postal, iso  } = req.body;
    if (!name || !email || !postal || !iso) {
      res.status(500).send("Faltan datos");
      return;
    }

    const contactUpdate = await ContactModel.findOneAndUpdate(
        { dni },
        { name, email, postal, iso },
        { new: true }
    ).exec();

    if (!contactUpdate) {
        res.status(500).send("Contacto no encontrado");
        return;
    }

    res.status(200).send({
        dni: contactUpdate.dni,
        name: contactUpdate.name,
        email: contactUpdate.email,
        postal: contactUpdate.postal,
        iso: contactUpdate.iso,
        id: contactUpdate._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default updateContact;