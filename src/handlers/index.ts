import User from "../models/User";
import {  validationResult } from "express-validator";
import type { Request, Response} from "express"; 
import slug from "slug";
import { checkPassword, hashPassword } from "../utils/auth";

//Royner garcia
export const createAccount = async (req: Request, res: Response) => {

   

     const {email, password}= req.body;
     
     const userExist= await User.findOne({email})
     if(userExist){
        const error= new Error("El email ya esta registrado");
         res.status(409).json({message: error.message});
         return;
     }

     const handle= slug(req.body.handle, '')
     const handleExist= await User.findOne({handle})
     if(handleExist){
        const error= new Error("Nombre de usuario ya existe");
         res.status(409).json({message: error.message});
         return;
     }
     
     const user = new User(req.body);
     user.password= await hashPassword(password);
     user.handle= handle;

    await user.save();
    res.status(201).send('Registro exitoso');
};

export const login = async (req: Request, res: Response) => {
    let errors= validationResult(req);
    if(!errors.isEmpty()){
         res.status(400).json({errors: errors.array()});
         return;
    }

    const {email, password}= req.body;
    const user= await User.findOne({email});
    if(!user){
        const error= new Error("Usuario no encontrado");
        res.status(404).json({error: error.message});
        return;
    }
  
  
    const isPasswordCorrect = await checkPassword(password, user.password);
    if(!isPasswordCorrect){
        const error= new Error("Password incorrecto");
        res.status(401).json({error: error.message});
        return;
    }
    res.send('autenticado...')
} 


