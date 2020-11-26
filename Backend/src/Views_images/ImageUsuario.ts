import images from '../models/ImageUsuario';

export default{
    render(image:images){
        return{
            id: image.id,
            url:`http://localhost:3333/uploads/${image.path}`
        }
    },
    renderMany(image:images[]){
        return image.map(image => this.render(image))
    }
}