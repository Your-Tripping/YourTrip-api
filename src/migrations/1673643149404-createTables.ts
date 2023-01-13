import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1673643149404 implements MigrationInterface {
    name = 'createTables1673643149404'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ADD "status" character varying NOT NULL DEFAULT 'active'`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "status"`);
    }

}
