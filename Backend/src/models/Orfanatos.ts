import {Entity, Column, PrimaryGeneratedColumn, OneToMany /**Relação de 1 orfanato para muitos */, JoinColumn} from 'typeorm';
import Images from './Images';


@Entity('Orfanatos') //referencia a entidade class Orfanatos em relação a tabela
export default class Orfanatos{ //representação da tabela orfanato em forma de classe
    @PrimaryGeneratedColumn('increment')//primary collum
    id: number;
    @Column()//referenciado essa coluna com a coluna da tabela
    name: string;
    @Column()
    latitude: number;
    @Column()
    longitude: number;
    @Column()
    about: string;
    @Column()
    instructions: string;
    @Column()
    opening: string;
    @Column()
    openorfanato: boolean;
    
    @OneToMany(() => Images, image => image.Orfanato, { //relacionando 1 orfanato para muitas imagens
        cascade: ['insert' ,'update'] //atualizar as imagens  
    })
    @JoinColumn({name: 'Orfanato_id'})
    images: Images[];
}