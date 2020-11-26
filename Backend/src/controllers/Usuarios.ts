import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import UsuariosClass from "../models/Usuarios";
import UsuarioView from '../Views/Usuario_view';
import * as yup from 'yup';


export default{
    async show(request:Request, response:Response){
        const id = request.params;
        const UsuariosRepository = getRepository(UsuariosClass);
        const Usuario = await UsuariosRepository.findOneOrFail(id, {
            relations:['images']
        })
        return response.json(UsuarioView.render(Usuario))
    },
    async index(request: Request, response:Response){
        const UsuariosRepository = getRepository(UsuariosClass);
        const Usuarios = await UsuariosRepository.find({
            relations:['images']
        })
        return response.json(UsuarioView.renderMany(Usuarios));

    },
    async create(request:Request,response:Response){
        const {
            name,
            idade,
            email,
            CPF,
            senha,
        } = request.body;
        const UsuariosRepository = getRepository(UsuariosClass);
        const RequestImage = request.files as Express.Multer.File[];
        const images = RequestImage.map(image => {
            return {path: image.filename}
        });
        const data = {
            name,
            idade,
            email,
            CPF,
            senha,
            images,
        }
        const Usuarios = UsuariosRepository.create(data);
        await UsuariosRepository.save(Usuarios);
        return response.status(201).json(Usuarios)//status 201 é que deu certo a criação;
    }
}