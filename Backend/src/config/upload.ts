
import multer from 'multer'; //Biblioteca que lida com upload de imagem e arquivos
import path from 'path'; //lidar com caminhos no node

export default{
    storage:multer.diskStorage({ //storege: storage é onde as imagens e arquivos são salvos, no disco , em nuvem etc.
        destination: path.join(__dirname, '..', '..','uploads'), //destination : em que pasta são salvas // path: como lidar com caminhos 
        filename: (request,file, cb) => { //filename: função que dar um nome do arquivo
            const filename = `${Date.now()}-${file.originalname}`;
            cb(null , filename)
        },
    })
};
