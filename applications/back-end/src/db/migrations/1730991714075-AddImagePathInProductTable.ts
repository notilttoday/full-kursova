import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImagePathInProductTable1730991714075 implements MigrationInterface {
    name = 'AddImagePathInProductTable1730991714075'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "imagePath" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "imagePath"`);
    }

}
