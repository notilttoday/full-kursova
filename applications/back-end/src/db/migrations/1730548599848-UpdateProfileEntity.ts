import { type MigrationInterface, type QueryRunner } from 'typeorm'

export class UpdateProfileEntity1730548599848 implements MigrationInterface {
  name = 'UpdateProfileEntity1730548599848'

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "profile" ADD "statusText" character varying`)
    await queryRunner.query(
      `CREATE TYPE "public"."profile_favgames_enum" AS ENUM('dota', 'the_witcher', 'world_of_warcraft', 'diablo', 'assassins_creed')`,
    )
    await queryRunner.query(`ALTER TABLE "profile" ADD "favGames" "public"."profile_favgames_enum" array`)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "favGames"`)
    await queryRunner.query(`DROP TYPE "public"."profile_favgames_enum"`)
    await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "statusText"`)
  }
}
