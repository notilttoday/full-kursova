import { type MigrationInterface, type QueryRunner } from 'typeorm'

export class AddImagePathInProductTable1730991714075 implements MigrationInterface {
  name = 'AddImagePathInProductTable1730991714075'

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" ADD "imagePath" text`)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "imagePath"`)
  }
}
