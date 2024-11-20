import { MigrationInterface, QueryRunner } from "typeorm";

export class FixPaymentStatusEnum1732126773519 implements MigrationInterface {
    name = 'FixPaymentStatusEnum1732126773519'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."order_paymentstatus_enum" RENAME TO "order_paymentstatus_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."order_paymentstatus_enum" AS ENUM('pending', 'processing', 'paid', 'completed', 'failed', 'expired', 'refunded', 'on_hold')`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "paymentStatus" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "paymentStatus" TYPE "public"."order_paymentstatus_enum" USING "paymentStatus"::"text"::"public"."order_paymentstatus_enum"`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "paymentStatus" SET DEFAULT 'pending'`);
        await queryRunner.query(`DROP TYPE "public"."order_paymentstatus_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."order_paymentstatus_enum_old" AS ENUM('pending', 'processing', 'paid', 'completed', 'failed', 'assassins_creed', 'refunded', 'on_hold')`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "paymentStatus" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "paymentStatus" TYPE "public"."order_paymentstatus_enum_old" USING "paymentStatus"::"text"::"public"."order_paymentstatus_enum_old"`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "paymentStatus" SET DEFAULT 'pending'`);
        await queryRunner.query(`DROP TYPE "public"."order_paymentstatus_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."order_paymentstatus_enum_old" RENAME TO "order_paymentstatus_enum"`);
    }

}
