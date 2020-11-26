import {Router} from 'express';
import OrfanatosControl from './controllers/Orfanatos';
import UsuariosControl from './controllers/Usuarios';
import multer from 'multer';
import configUpload from './config/upload';


const router = Router();
const upload = multer(configUpload);

/**Arquitetura MVC
 * 
 * M = model é a representatividade da aplicação
 * V = views é como as informações são vistas pelo usuario ou dados mostrados
 * C = controllers são os gerencimento de cada campo e utilidade do código
 */

router.get('/listOrfanatos/:id', OrfanatosControl.show);
router.get('/listOrfanatos', OrfanatosControl.index);
router.get('/listUsuario/:id', UsuariosControl.show);
router.get('/listUsuario', UsuariosControl.index);
router.post('/cadOrfanatos', upload.array('images'), OrfanatosControl.create);
router.post('/cadUsuario', upload.array('images'),UsuariosControl.create);

export default router;