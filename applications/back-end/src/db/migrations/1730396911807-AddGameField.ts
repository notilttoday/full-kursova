import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGameField1730396911807 implements MigrationInterface {
    name = 'AddGameField1730396911807'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."product_game_enum" AS ENUM('dota', 'the_witcher', 'world_of_warcraft', 'diablo', 'assassins_creed')`);
        await queryRunner.query(`ALTER TABLE "product" ADD "game" "public"."product_game_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "game"`);
        await queryRunner.query(`DROP TYPE "public"."product_game_enum"`);
    }

}
