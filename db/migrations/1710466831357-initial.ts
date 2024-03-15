import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1710466831357 implements MigrationInterface {
  name = 'Initial1710466831357';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."users_roles_enum" AS ENUM('ADMIN', 'USER')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "lastPasswordChangedAt" TIMESTAMP NOT NULL DEFAULT '"2024-03-15T01:40:31.730Z"', "roles" "public"."users_roles_enum" array NOT NULL DEFAULT '{USER}', "activationToken" character varying, "isActive" boolean NOT NULL DEFAULT false, "isDeactivated" boolean, "isDeleted" boolean, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_roles_enum"`);
  }
}
