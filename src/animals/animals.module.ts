import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalsController } from './animals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from './entities/animal.entity';
import { AnimalsResolver } from './animals.resolver';
import { Species } from '../species/entities/species.entity';
import { Breed } from '../breeds/entities/breed.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Animal, Species, Breed])],
  controllers: [AnimalsController],
  providers: [AnimalsService, AnimalsResolver],
  exports: [AnimalsService]
})
export class AnimalsModule {}
