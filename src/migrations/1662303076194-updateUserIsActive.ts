import { MigrationInterface, QueryRunner } from "typeorm";

export class updateUserIsActive1662303076194 implements MigrationInterface {
    name = 'updateUserIsActive1662303076194'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isActive" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isActive" DROP DEFAULT`);
    }

}
