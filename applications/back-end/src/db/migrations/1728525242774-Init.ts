import { type MigrationInterface, type QueryRunner } from 'typeorm'

export class Init1728525242774 implements MigrationInterface {
  name = 'Init1728525242774'

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."profile_roles_enum" AS ENUM('user', 'admin')`)
    await queryRunner.query(
      `CREATE TABLE "profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "password" character varying NOT NULL, "roles" "public"."profile_roles_enum" array NOT NULL DEFAULT '{user}', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_3825121222d5c17741373d8ad13" UNIQUE ("email"), CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(`CREATE INDEX "IDX_3b983631651f08d8b5b66a4e1f" ON "profile" ("createdAt") `)
    await queryRunner.query(`CREATE INDEX "IDX_d32cdbff673d9f7be9f263229f" ON "profile" ("updatedAt") `)
    await queryRunner.query(
      `CREATE TABLE "refresh_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userGid" character varying(64) NOT NULL, "refreshedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "expiresAt" TIMESTAMP WITH TIME ZONE NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_b575dd3c21fb0831013c909e7fe" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(`CREATE INDEX "IDX_d2d81f72d235d7e5cf60d5e846" ON "refresh_token" ("userGid") `)
    await queryRunner.query(`CREATE INDEX "IDX_c03a9271901099da2a840b0312" ON "refresh_token" ("expiresAt") `)
    await queryRunner.query(`CREATE INDEX "IDX_6f83e7d97f3565799a21ade4d4" ON "refresh_token" ("createdAt") `)
    await queryRunner.query(`CREATE INDEX "IDX_db8bd0996c076e20953a62d762" ON "refresh_token" ("updatedAt") `)
    await queryRunner.query(`CREATE TYPE "public"."settings_type_enum" AS ENUM('mock')`)
    await queryRunner.query(
      `CREATE TABLE "settings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."settings_type_enum" NOT NULL, "value" json NOT NULL, CONSTRAINT "UQ_b99ecb7dd618e87685bdde69402" UNIQUE ("type"), CONSTRAINT "PK_0669fe20e252eb692bf4d344975" PRIMARY KEY ("id"))`,
    )
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "settings"`)
    await queryRunner.query(`DROP TYPE "public"."settings_type_enum"`)
    await queryRunner.query(`DROP INDEX "public"."IDX_db8bd0996c076e20953a62d762"`)
    await queryRunner.query(`DROP INDEX "public"."IDX_6f83e7d97f3565799a21ade4d4"`)
    await queryRunner.query(`DROP INDEX "public"."IDX_c03a9271901099da2a840b0312"`)
    await queryRunner.query(`DROP INDEX "public"."IDX_d2d81f72d235d7e5cf60d5e846"`)
    await queryRunner.query(`DROP TABLE "refresh_token"`)
    await queryRunner.query(`DROP INDEX "public"."IDX_d32cdbff673d9f7be9f263229f"`)
    await queryRunner.query(`DROP INDEX "public"."IDX_3b983631651f08d8b5b66a4e1f"`)
    await queryRunner.query(`DROP TABLE "profile"`)
    await queryRunner.query(`DROP TYPE "public"."profile_roles_enum"`)
  }
}
