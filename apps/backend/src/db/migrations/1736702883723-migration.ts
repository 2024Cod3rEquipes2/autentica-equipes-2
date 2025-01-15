import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1736702883723 implements MigrationInterface {
  name = 'Migration1736702883723';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "GROUP" (id, name) VALUES (1, 'admin');`,
    );
    await queryRunner.query(
      `INSERT INTO "GROUP" (id, name) VALUES (2, 'Guest')`,
    );

    await queryRunner.query(
      `INSERT INTO "RULE" (id, name) VALUES (1, 'add-group')`,
    );
    await queryRunner.query(
      `INSERT INTO "RULE" (id, name) VALUES (2, 'edit-group')`,
    );
    await queryRunner.query(
      `INSERT INTO "RULE" (id, name) VALUES (3, 'get-all-groups')`,
    );
    await queryRunner.query(
      `INSERT INTO "RULE" (id, name) VALUES (4, 'delete-groups')`,
    );
    await queryRunner.query(
      `INSERT INTO "RULE" (id, name) VALUES (5, 'get-all-rules')`,
    );
    await queryRunner.query(
      `INSERT INTO "RULE" (id, name) VALUES (6, 'get-user')`,
    );
    await queryRunner.query(
      `INSERT INTO "RULE" (id, name) VALUES (7, 'get-all-users')`,
    );
    await queryRunner.query(
      'INSERT INTO "GROUP_RULES_RULE" (groupid, ruleid) SELECT 1, id from "RULE"',
    );
    await queryRunner.query(
      'INSERT INTO "USER_GROUPS_GROUP" (userid, groupid) VALUES (1, 1)',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "GROUP_RULES_RULE"`);
    await queryRunner.query(`DELETE FROM "GROUP" `);
    await queryRunner.query(`DELETE FROM "RULE"`);
    await queryRunner.query(`DELETE FROM "USER_GROUPS_GROUP"`);
  }
}
