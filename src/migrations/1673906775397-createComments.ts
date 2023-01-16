import { MigrationInterface, QueryRunner } from "typeorm";

export class createComments1673906775397 implements MigrationInterface {
    name = 'createComments1673906775397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), "content" character varying(280) NOT NULL, "postId" uuid, "userId" uuid, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f"`);
        await queryRunner.query(`DROP TABLE "comments"`);
    }

}
