import { MigrationInterface, QueryRunner } from "typeorm";

export class ChngTblOrdersUser1710956280981 implements MigrationInterface {
    name = 'ChngTblOrdersUser1710956280981'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD "ordersId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastPasswordChangedAt" SET DEFAULT '"2024-03-20T17:38:01.749Z"'`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_3b69e6cef8beb5c18429ceebe27" FOREIGN KEY ("ordersId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_3b69e6cef8beb5c18429ceebe27"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastPasswordChangedAt" SET DEFAULT '2024-03-20 17:04:09.619'`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "ordersId"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "userId"`);
    }

}
