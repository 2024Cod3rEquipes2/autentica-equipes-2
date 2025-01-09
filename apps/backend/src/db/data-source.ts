import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './db/database.sqlite',
  synchronize: false, // Desativa a sincronização automática do banco
  entities: [__dirname + '/entities/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*-migration{.ts,.js}'],
  migrationsRun: false, // Desativa a execução automática das migrações
  logging: false, // Habilita o logging para ver SQL gerado
});
