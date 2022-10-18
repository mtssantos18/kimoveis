import { MigrationInterface, QueryRunner } from "typeorm";

export class createProperties1662139735523 implements MigrationInterface {
    name = 'createProperties1662139735523'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "properties" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sold" boolean NOT NULL DEFAULT false, "value" numeric(12,2) NOT NULL, "size" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2d83bfa0b9fcd45dee1785af44d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "properties"`);
    }

}
