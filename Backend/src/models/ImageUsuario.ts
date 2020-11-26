import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import usuario from './Usuarios';

@Entity('imageUsuario')
export default class Image{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    @ManyToOne(()=> usuario, usuario => usuario.images)
    @JoinColumn({
        name: 'Usuario_id'
    })
    usuario: usuario;
}