import { Module } from '@nestjs/common';
import { GraphQLConfigModule } from 'src/config/graphql/config.module';
import { MongoConfigModule } from 'src/config/mongo/config.module';
import { TaskFeatureConfigModule } from 'src/config/mongo/features/task-feature.config.module';
import { TaskRepository } from 'src/data/repository/task-repository';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';
import { UserFeatureConfigModule } from 'src/config/mongo/features/user-feature.config.module';
import { UserRepository } from 'src/data/repository/user-repository';

@Module({
    imports: [GraphQLConfigModule, MongoConfigModule, TaskFeatureConfigModule, UserFeatureConfigModule],
    providers: [TaskResolver, TaskService, TaskRepository, UserRepository],
})
export class TaskModule {}
