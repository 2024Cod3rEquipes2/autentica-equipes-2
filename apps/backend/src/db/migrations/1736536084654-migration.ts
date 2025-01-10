import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736536084654 implements MigrationInterface {
    name = 'Migration1736536084654'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO "user" (id, name, email, password) VALUES (1, 'admin', 'admin@admin.com','$2b$10$zBnu5pyyonxYSnAlckwiH.2NHO4bS3AT7Z.I6NGwj8g7ReWaAJ/EK')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "user" WHERE id = 1`);
    }

}
