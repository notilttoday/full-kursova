import { type MigrationInterface, type QueryRunner } from 'typeorm'

export class AddProductTable1729969524228 implements MigrationInterface {
  name = 'AddProductTable1729969524228'

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" text NOT NULL, "price" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(`CREATE INDEX "IDX_6b71c587b0fd3855fa23b759ca" ON "product" ("createdAt") `)
    await queryRunner.query(`CREATE INDEX "IDX_41bde09db7136dcee687c2b1f0" ON "product" ("updatedAt") `)
    await queryRunner.query(`CREATE INDEX "IDX_0ecd68edfbccce0c85cef5c03a" ON "product" ("deletedAt") `)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_0ecd68edfbccce0c85cef5c03a"`)
    await queryRunner.query(`DROP INDEX "public"."IDX_41bde09db7136dcee687c2b1f0"`)
    await queryRunner.query(`DROP INDEX "public"."IDX_6b71c587b0fd3855fa23b759ca"`)
    await queryRunner.query(`DROP TABLE "product"`)
  }
}
