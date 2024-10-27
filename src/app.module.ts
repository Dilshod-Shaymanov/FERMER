import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/entities/admin.entity';
import { AuthModule } from './auth/auth.module';
import { WorkersModule } from './workers/workers.module';
import { Worker } from './workers/entities/worker.entity';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/entities/role.entity';
import { WorkerRoleModule } from './worker_role/worker_role.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MilkingModule } from './milking/milking.module';
import { SpeciesModule } from './species/species.module';
import { BreedsModule } from './breeds/breeds.module';
import { AnimalsModule } from './animals/animals.module';
import { DiagnosisModule } from './diagnosis/diagnosis.module';
import { TreatmentModule } from './treatment/treatment.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      playground: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
      logging: false,
    }),

    AdminModule,
    AuthModule,
    WorkersModule,
    RolesModule,
    WorkerRoleModule,
    SpeciesModule,
    MilkingModule,
    BreedsModule,
    AnimalsModule,
    DiagnosisModule,
    TreatmentModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
