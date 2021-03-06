import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUser1616858158186 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'userId',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'emailAddress',
            type: 'varchar',
          },
          {
            name: 'passwordCurrent',
            type: 'varchar',
          },
          {
            name: 'passwordOld',
            type: 'varchar',
          },
          {
            name: 'indexPassword',
            type: 'boolean',
          },
          {
            name: 'createdAt',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'status',
            type: 'varchar',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
