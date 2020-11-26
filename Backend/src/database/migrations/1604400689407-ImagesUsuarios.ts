import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class ImagesUsuarios1604400689407 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'imageUsuario',
            columns:[
                {
                    name: 'id',//id do orfanato
                    type:'integer',//tipo inteiro
                    unsigned:true,//sempre positivo
                    isPrimary:true,//chave única de cada usuario
                    isGenerated:true,//gerar coluna automaticamente
                    generationStrategy:'increment',//incrementar numero automaticamente
                },
                {
                    name:'path',
                    type:'varchar',
                },
                {
                    name:'Usuario_id',
                    type:'interger',
                },
            ],
            foreignKeys:[
                {
                    name:'UsuarioImage',
                    columnNames:['Usuario_id'],
                    referencedTableName:'Usuarios',
                    referencedColumnNames:['id'],
                    onUpdate:'CASCADE',
                    onDelete:'CASCADE',
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('imageUsuario')
    }

}
