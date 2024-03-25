import { Module } from '@nestjs/common';
import { GraphQLConfigModule } from 'src/config/graphql/config.module';
import { MongoConfigModule } from 'src/config/mongo/config.module';
import { ExerciseFeatureConfigModule } from 'src/config/mongo/features/exercise-feature.config.module';
import { ExerciseRepository } from 'src/data/repository/exercise-repository';
import { ExerciseResolver } from './exercise.resolver';
import { ExerciseService } from './exercise.service';

@Module({
    imports: [GraphQLConfigModule, MongoConfigModule, ExerciseFeatureConfigModule],
    providers: [ExerciseResolver, ExerciseService, ExerciseRepository],
})
export class ExerciseModule {}
