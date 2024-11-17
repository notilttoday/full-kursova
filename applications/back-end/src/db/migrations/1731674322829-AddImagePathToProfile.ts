import { type MigrationInterface, type QueryRunner } from 'typeorm'

export class AddImagePathToProfile1731674322829 implements MigrationInterface {
  name = 'AddImagePathToProfile1731674322829'

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "profile" ADD "imagePath" text`)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "imagePath"`)
  }
}
