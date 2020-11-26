import Usuarios from '../models/Usuarios';
import images from '../Views_images/ImageUsuario';

export default{
    render(usuario:Usuarios){
        return{
            id: usuario.id,
            name: usuario.name,
            idade: usuario.idade,
            email: usuario.email,
            CPF: usuario.CPF,
            senha: usuario.senha,
            images: images.renderMany(usuario.images)
        }
    },
    renderMany(usuario:Usuarios[]){
        return usuario.map(usuarios => this.render(usuarios));
    }
}