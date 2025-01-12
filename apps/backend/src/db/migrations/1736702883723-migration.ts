import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1736702883723 implements MigrationInterface {
  name = 'Migration1736702883723';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "GROUP" (id, name) VALUES (1, 'admin')`,
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
      'INSERT INTO "GROUP_RULES_RULE" (groupid, ruleid) VALUES (1, 1)',
    );
    await queryRunner.query(
      'INSERT INTO "GROUP_RULES_RULE" (groupid, ruleid) VALUES (1, 2)',
    );
    await queryRunner.query(
      'INSERT INTO "GROUP_RULES_RULE" (groupid, ruleid) VALUES (1, 3)',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "GROUP_RULES_RULE" WHERE groupid =1 and ruleid in (1,2,3)`,
    );
    await queryRunner.query(`DELETE FROM "GROUP" WHERE id in (1,2)`);
    await queryRunner.query(`DELETE FROM "RULE" WHERE id in(1,2,3,4)`);
  }
}
