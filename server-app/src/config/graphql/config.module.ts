import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            path: '/api',
            autoSchemaFile: join(process.cwd(), 'schema.gql'),
            sortSchema: true,
        }),
    ],
})
export class GraphQLConfigModule {}
