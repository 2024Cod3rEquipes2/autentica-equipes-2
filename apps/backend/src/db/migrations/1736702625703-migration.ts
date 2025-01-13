import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1736702625703 implements MigrationInterface {
  name = 'Migration1736702625703';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "rule" ("id" integer PRIMARY KEY NOT NULL, "name" varchar NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "group" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "group_rules_rule" ("groupId" integer NOT NULL, "ruleId" integer NOT NULL, PRIMARY KEY ("groupId", "ruleId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9bef27715f9ef8cb6b5aedaae6" ON "group_rules_rule" ("groupId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_be81de848f91627fb9b9e3e3f7" ON "group_rules_rule" ("ruleId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "user_groups_group" ("userId" integer NOT NULL, "groupId" integer NOT NULL, PRIMARY KEY ("userId", "groupId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_84ff6a520aee2bf2512c01cf46" ON "user_groups_group" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8abdfe8f9d78a4f5e821dbf620" ON "user_groups_group" ("groupId") `,
    );
    await queryRunner.query(`DROP INDEX "IDX_9bef27715f9ef8cb6b5aedaae6"`);
    await queryRunner.query(`DROP INDEX "IDX_be81de848f91627fb9b9e3e3f7"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_group_rules_rule" ("groupId" integer NOT NULL, "ruleId" integer NOT NULL, CONSTRAINT "FK_9bef27715f9ef8cb6b5aedaae62" FOREIGN KEY ("groupId") REFERENCES "group" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_be81de848f91627fb9b9e3e3f72" FOREIGN KEY ("ruleId") REFERENCES "rule" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("groupId", "ruleId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_group_rules_rule"("groupId", "ruleId") SELECT "groupId", "ruleId" FROM "group_rules_rule"`,
    );
    await queryRunner.query(`DROP TABLE "group_rules_rule"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_group_rules_rule" RENAME TO "group_rules_rule"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9bef27715f9ef8cb6b5aedaae6" ON "group_rules_rule" ("groupId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_be81de848f91627fb9b9e3e3f7" ON "group_rules_rule" ("ruleId") `,
    );
    await queryRunner.query(`DROP INDEX "IDX_84ff6a520aee2bf2512c01cf46"`);
    await queryRunner.query(`DROP INDEX "IDX_8abdfe8f9d78a4f5e821dbf620"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_user_groups_group" ("userId" integer NOT NULL, "groupId" integer NOT NULL, CONSTRAINT "FK_84ff6a520aee2bf2512c01cf462" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_8abdfe8f9d78a4f5e821dbf6203" FOREIGN KEY ("groupId") REFERENCES "group" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("userId", "groupId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_user_groups_group"("userId", "groupId") SELECT "userId", "groupId" FROM "user_groups_group"`,
    );
    await queryRunner.query(`DROP TABLE "user_groups_group"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_user_groups_group" RENAME TO "user_groups_group"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_84ff6a520aee2bf2512c01cf46" ON "user_groups_group" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8abdfe8f9d78a4f5e821dbf620" ON "user_groups_group" ("groupId") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_8abdfe8f9d78a4f5e821dbf620"`);
    await queryRunner.query(`DROP INDEX "IDX_84ff6a520aee2bf2512c01cf46"`);
    await queryRunner.query(
      `ALTER TABLE "user_groups_group" RENAME TO "temporary_user_groups_group"`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_groups_group" ("userId" integer NOT NULL, "groupId" integer NOT NULL, PRIMARY KEY ("userId", "groupId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "user_groups_group"("userId", "groupId") SELECT "userId", "groupId" FROM "temporary_user_groups_group"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_user_groups_group"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_8abdfe8f9d78a4f5e821dbf620" ON "user_groups_group" ("groupId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_84ff6a520aee2bf2512c01cf46" ON "user_groups_group" ("userId") `,
    );
    await queryRunner.query(`DROP INDEX "IDX_be81de848f91627fb9b9e3e3f7"`);
    await queryRunner.query(`DROP INDEX "IDX_9bef27715f9ef8cb6b5aedaae6"`);
    await queryRunner.query(
      `ALTER TABLE "group_rules_rule" RENAME TO "temporary_group_rules_rule"`,
    );
    await queryRunner.query(
      `CREATE TABLE "group_rules_rule" ("groupId" integer NOT NULL, "ruleId" integer NOT NULL, PRIMARY KEY ("groupId", "ruleId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "group_rules_rule"("groupId", "ruleId") SELECT "groupId", "ruleId" FROM "temporary_group_rules_rule"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_group_rules_rule"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_be81de848f91627fb9b9e3e3f7" ON "group_rules_rule" ("ruleId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9bef27715f9ef8cb6b5aedaae6" ON "group_rules_rule" ("groupId") `,
    );
    await queryRunner.query(`DROP INDEX "IDX_8abdfe8f9d78a4f5e821dbf620"`);
    await queryRunner.query(`DROP INDEX "IDX_84ff6a520aee2bf2512c01cf46"`);
    await queryRunner.query(`DROP TABLE "user_groups_group"`);
    await queryRunner.query(`DROP INDEX "IDX_be81de848f91627fb9b9e3e3f7"`);
    await queryRunner.query(`DROP INDEX "IDX_9bef27715f9ef8cb6b5aedaae6"`);
    await queryRunner.query(`DROP TABLE "group_rules_rule"`);
    await queryRunner.query(`DROP TABLE "group"`);
    await queryRunner.query(`DROP TABLE "rule"`);
  }
}
