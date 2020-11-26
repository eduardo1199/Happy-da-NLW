import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from 'typeorm';
import ImageUsuario from './ImageUsuario';

@Entity('Usuarios')
export default class Usuarios{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    idade: number;

    @Column()
    email: string;

    @Column()
    CPF: string;

    @Column()
    senha: string;

    @OneToMany(() => ImageUsuario, image => image.usuario,{
        cascade: ['insert', 'update']
    })
    @JoinColumn({name: 'Usuario_id'})
    images: ImageUsuario[];
}