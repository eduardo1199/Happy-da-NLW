import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import Orfanatos from './Orfanatos';

@Entity('Imagens')

export default class Imagens{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    @ManyToOne(() => Orfanatos, Orfanato => Orfanato.images)
    @JoinColumn({name: 'Orfanato_id'})
    Orfanato: Orfanatos;
}