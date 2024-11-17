import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrderTables1731801784611 implements MigrationInterface {
    name = 'AddOrderTables1731801784611'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userGid" uuid, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_244fa515ffe576697f07952956" ON "order" ("userGid") `);
        await queryRunner.query(`CREATE INDEX "IDX_7bb07d3c6e225d75d8418380f1" ON "order" ("createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_23db16cabddb9d10a73b5287bf" ON "order" ("updatedAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_00f95000fd14f568c8ee6b11ad" ON "order" ("deletedAt") `);
        await queryRunner.query(`CREATE TABLE "order_to_product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "orderId" uuid NOT NULL, "productId" uuid NOT NULL, "quantity" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_eb70cc26d5787b1735fa4dda322" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3e918511a5f968387c92e33d62" ON "order_to_product" ("orderId") `);
        await queryRunner.query(`CREATE INDEX "IDX_860f23d5d0ea5583e57344e907" ON "order_to_product" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1909d817e781c4545f9fa06ff5" ON "order_to_product" ("createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_f107c00660ff708e10dcf312b4" ON "order_to_product" ("updatedAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_634d7cfab2b6ff69888c93068c" ON "order_to_product" ("deletedAt") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_deb7c17b2fc953289e132d0376" ON "order_to_product" ("orderId", "productId") `);
        await queryRunner.query(`ALTER TABLE "order_to_product" ADD CONSTRAINT "FK_3e918511a5f968387c92e33d62c" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_to_product" ADD CONSTRAINT "FK_860f23d5d0ea5583e57344e9071" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_to_product" DROP CONSTRAINT "FK_860f23d5d0ea5583e57344e9071"`);
        await queryRunner.query(`ALTER TABLE "order_to_product" DROP CONSTRAINT "FK_3e918511a5f968387c92e33d62c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_deb7c17b2fc953289e132d0376"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_634d7cfab2b6ff69888c93068c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f107c00660ff708e10dcf312b4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1909d817e781c4545f9fa06ff5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_860f23d5d0ea5583e57344e907"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3e918511a5f968387c92e33d62"`);
        await queryRunner.query(`DROP TABLE "order_to_product"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_00f95000fd14f568c8ee6b11ad"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_23db16cabddb9d10a73b5287bf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7bb07d3c6e225d75d8418380f1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_244fa515ffe576697f07952956"`);
        await queryRunner.query(`DROP TABLE "order"`);
    }

}
