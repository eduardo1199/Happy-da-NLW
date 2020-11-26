import {Request, Response} from 'express';
import {getRepository, Index} from 'typeorm';
import OrfanatosClass from "../models/Orfanatos";
import Orfanatos_view from '../Views/Orfanatos_view';
import * as yup from 'yup';

export default{
    async show(request:Request, response:Response){
        const {id} = request.params;
        const OrfanatosRepository = getRepository(OrfanatosClass);
        const Orfanato = await OrfanatosRepository.findOneOrFail(id, {
            relations:['images']
        });
        response.json(Orfanatos_view.render(Orfanato));
    },
    async index(request:Request, response:Response){
        const OrfanatosRepository = getRepository(OrfanatosClass);
        const Orfanatos = await OrfanatosRepository.find({
            relations:['images']
        });
        response.json(Orfanatos_view.renderMany(Orfanatos));
    },
    async create(request:Request, response:Response){
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening,
            openorfanato,
        } = request.body;
        const OrfanatosRepository = getRepository(OrfanatosClass);
        const Requestimage = request.files as Express.Multer.File[];
        const images = Requestimage.map(image => {
            return {path: image.filename}
        })
        const data ={
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening,
            openorfanato,
            images,
        }
        const schema = yup.object().shape({
            name: yup.string().required(),
            latitude:yup.number().required(),
            longitude:yup.number().required(),
            about:yup.string().required().max(300),
            instructions:yup.string().required(),
            opening:yup.string().required(),           
            openorfanato: yup.boolean().required(),
            images:yup.array(
                yup.object().shape({
                path:yup.string().required()
                })
            )
        })
        await schema.validate(data, {
            abortEarly: false,
        });
        const Orfanatos = OrfanatosRepository.create(data);
        await OrfanatosRepository.save(Orfanatos);
        return response.status(201).json(Orfanatos); //status 201 é que deu certo a criação
    }
}
 