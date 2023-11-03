//@ts-ignore //
import { Request, Response } from "npm:express@4.18.2";
import ContactModel from "../contact.ts";

const infoContact = async (req: Request, res: Response)=>{ //muestra el personaje por ID y lo mete en la memoria interna
    try{
        const { dni } = req.params;

        const contactExist = await ContactModel.findOne({ dni }).exec();
        if(!contactExist){
            res.status(404).send("No hay nadie con ese dni");
            return;
        }
        const name = contactExist.name;
        const email = contactExist.email;
        const postal = contactExist.postal;
        const iso = contactExist.iso;
        
        //Ciudad:
        /*const ciudad = "https://zip-api.eu/api/v1/info/";
        const urlCiudad = `${ciudad}/${contactExist.iso}-${contactExist.postal}`;
        const dataCiudad = await fetch(urlCiudad);
        const json = await dataCiudad.json();
        const place_name = json.place_name;
        //Continente y pais:
        const continente = "https://restcountries.com/v3.1/alpha/";
        const urlContinente = `${continente}${contactExist.iso}`;
        const dataContinente = await fetch (urlContinente);
        const json1 = await dataContinente.json();
        const pais = json1.name.common;
        const region = json1.region;
        //Hora
        const hora = "http://worldtimeapi.org/api/timezone/Europe/Madrid";
        const urlHora = `${hora}${region}/${place_name}`;
        const dataHora = await fetch (urlHora);
        const json2 = await dataHora.json();
        const datetime = json2.datetime;
        //Tiempo
        const urlTiempo = "https://api.weatherapi.com/v1/current.json?key=d16041fe10d7440580f120855230311&q=";
        const urlTiempo2 = "&aqi=no";
        const urlFinalTiempo = `${urlTiempo}${place_name}${urlTiempo2}`;
        const dataTiempo = await fetch (urlFinalTiempo);
        const json3 = await dataTiempo.json();
        const currentTime = json3.current.condition.text;*/
        res.status(200).send({
            dni, 
            name, 
            email, 
            postal,
            iso,
            id: contactExist._id.toString(),
            /*place_name,
            pais,
            datetime,
            currentTime,*/
          });
    }catch(error){
        res.status(500).send(error.message)
    }
}

export default infoContact;