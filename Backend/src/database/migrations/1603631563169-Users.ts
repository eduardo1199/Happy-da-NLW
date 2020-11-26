import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Users1603631563169 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name:'Usuarios',
            columns:[
                {
                    name:'id', //id do usuário
                    type:'integer',
                    unsigned:true,
                    isPrimary:true,
                    isGenerated:true,
                    generationStrategy:'increment'
                },
                {
                    name:'name', //nome do usuário
                    type:'varchar'
                },
                {
                    name:'idade',
                    type:'interger',
                },
                {
                    name:'email',
                    type:'varchar',
                },
                {
                    name:'CPF',
                    type:'varchar',
                },
                {
                    name:'senha',
                    type:'varchar',
                },
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Usuarios');
    }

}
