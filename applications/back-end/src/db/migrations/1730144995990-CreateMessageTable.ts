import { type MigrationInterface, type QueryRunner } from 'typeorm'

export class CreateMessageTable1730144995990 implements MigrationInterface {
  name = 'CreateMessageTable1730144995990'

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "contact_message" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "message" text NOT NULL, "userId" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "profileId" uuid, CONSTRAINT "PK_1476ca9a6265a586f618ea918fd" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(`CREATE INDEX "IDX_31cb5461c1985ac872130b0b34" ON "contact_message" ("createdAt") `)
    await queryRunner.query(`CREATE INDEX "IDX_2c3de1d49f264b361cebf071c3" ON "contact_message" ("updatedAt") `)
    await queryRunner.query(`CREATE INDEX "IDX_400364fa4692b760b4d82db3c8" ON "contact_message" ("deletedAt") `)
    await queryRunner.query(
      `ALTER TABLE "contact_message" ADD CONSTRAINT "FK_9a9251f3d3d40dda2161c1488d9" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "contact_message" DROP CONSTRAINT "FK_9a9251f3d3d40dda2161c1488d9"`)
    await queryRunner.query(`DROP INDEX "public"."IDX_400364fa4692b760b4d82db3c8"`)
    await queryRunner.query(`DROP INDEX "public"."IDX_2c3de1d49f264b361cebf071c3"`)
    await queryRunner.query(`DROP INDEX "public"."IDX_31cb5461c1985ac872130b0b34"`)
    await queryRunner.query(`DROP TABLE "contact_message"`)
  }
}
