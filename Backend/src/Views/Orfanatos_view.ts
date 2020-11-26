import Orfanatos from '../models/Orfanatos';
import ImagesView from '../Views_images/Image';

export default{
    render(Orfanato: Orfanatos){
        return({
            id: Orfanato.id,
            name: Orfanato.name,
            latitude: Orfanato.latitude,
            longitude: Orfanato.longitude,
            about: Orfanato.about,
            instructions: Orfanato.instructions,
            opening: Orfanato.opening,
            openorfanato: Orfanato.openorfanato,
            images: ImagesView.renderMany(Orfanato.images)
        });
    },
    renderMany(Orfanatos: Orfanatos[]){
        return Orfanatos.map(orfanatos => this.render(orfanatos))
    }

}