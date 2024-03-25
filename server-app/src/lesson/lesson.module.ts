import { Module } from '@nestjs/common';
import { GraphQLConfigModule } from 'src/config/graphql/config.module';
import { MongoConfigModule } from 'src/config/mongo/config.module';
import { LessonFeatureConfigModule } from 'src/config/mongo/features/lesson-feature.config.module';
import { LessonRepository } from 'src/data/repository/lesson-repository';
import { LessonResolver } from './lesson.resolver';
import { LessonService } from './lesson.service';

@Module({
    imports: [GraphQLConfigModule, MongoConfigModule, LessonFeatureConfigModule],
    providers: [LessonResolver, LessonService, LessonRepository],
})
export class LessonModule {}
