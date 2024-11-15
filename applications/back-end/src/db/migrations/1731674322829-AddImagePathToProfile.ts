import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImagePathToProfile1731674322829 implements MigrationInterface {
    name = 'AddImagePathToProfile1731674322829'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" ADD "imagePath" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "imagePath"`);
    }

}
