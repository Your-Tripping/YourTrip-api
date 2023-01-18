import { MigrationInterface, QueryRunner } from "typeorm";

export class createLikes1673980057403 implements MigrationInterface {
    name = 'createLikes1673980057403'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "likes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "postId" uuid, "userId" uuid, CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_e2fe567ad8d305fefc918d44f50" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_e2fe567ad8d305fefc918d44f50"`);
        await queryRunner.query(`DROP TABLE "likes"`);
    }

}
