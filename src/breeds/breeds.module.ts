import { Module } from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { BreedsController } from './breeds.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Breed } from './entities/breed.entity';
import { Species } from '../species/entities/species.entity';
import { BreedsResolver } from './breeds.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Breed, Species])],
  controllers: [BreedsController],
  providers: [BreedsService, BreedsResolver],
  exports: [BreedsService],
})
export class BreedsModule {}
