import { MigrationInterface, QueryRunner } from "typeorm";

export class updateScheduleHour1662314208223 implements MigrationInterface {
    name = 'updateScheduleHour1662314208223'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" RENAME COLUMN "time" TO "hour"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" RENAME COLUMN "hour" TO "time"`);
    }

}
