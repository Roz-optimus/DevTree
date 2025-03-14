import { Router } from "express";
import {body} from "express-validator";
import { createAccount, login } from "./handlers"; 
import { handleInputErros } from "./middleware/validation";
const router = Router();

//rutas

router.post('/auth/register',
    body('handle').notEmpty().withMessage('El nombre de usuario es requerido'),
    body('name').notEmpty().withMessage('El nombre es requerido'),
    body('email').isEmail().withMessage('El email es requerido'),
    body('password').isLength({min:6}).withMessage('La contraseña debe tener al menos 6 caracteres'),
    handleInputErros,
    createAccount
); 
    
router.post('/auth/login', 
    body('email').isEmail().withMessage('El email es requerido'),
    body('password').isLength({min:6}).withMessage('La contraseña es requerida'),
    handleInputErros,
    login
)    
export default router;