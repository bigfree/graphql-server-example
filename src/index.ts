import { Customer } from "./entities/customer/Customer";
import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import * as path from "path";
import { buildSchema } from 'type-graphql';
import { GraphQLSchema } from "graphql";
import { ApolloServerPluginInlineTrace } from "apollo-server-core";
import { Connection, createConnection, useContainer } from "typeorm";
import { Container as TypeDiContainer } from 'typeorm-typedi-extensions';

import { CustomerAddress } from "./entities/customer/CustomerAddress";
import { CustomerResolver } from "./resolvers/customer/CustomerResolver";
import { User } from "./entities/user/User";
import { UserSignInToken } from "./entities/user/UserSignInToken";
import { AuthorizeResolver } from "./resolvers/authorize/AuthorizeResolver";

require('dotenv').config();

useContainer(TypeDiContainer);

/**
 * Start server
 * @returns {Promise<void>}
 */
async function startApolloServer() {
    /**
     * Create and connect Postgre DB
     */
    const connection: Connection = await createConnection({
        type: 'postgres',
        synchronize: true,
        cache: true,
        url: `postgres://${ process.env.POSTGRES_USER }:${ process.env.POSTGRES_PASSWORD }@postgres:5432/${ process.env.POSTGRES_DB }`,
        logger: "advanced-console",
        logging: ['query', 'error'],
        entities: [
            User,
            UserSignInToken,
            Customer,
            CustomerAddress,
        ]
    });

    /**
     * Create GraphQL schema
     * https://typegraphql.com
     */
    const schema: GraphQLSchema = await buildSchema({
        resolvers: [AuthorizeResolver, CustomerResolver],
        dateScalarMode: "isoDate",
        emitSchemaFile: path.resolve(__dirname, "schema.gql"),
        container: TypeDiContainer,
    });

    // noinspection TypeScriptValidateTypes
    /**
     * Create ApolloServer
     */
    const server: ApolloServer = new ApolloServer({
        schema,
        plugins: [
            ApolloServerPluginInlineTrace()
        ],
    });

    const { url } = await server.listen(process.env.PORT || 4000);

    console.log(`🚀 Server ready at ${ url }`);
    console.log(`Try your health check at: ${ url }.well-known/apollo/server-health`);
}

startApolloServer().catch(console.error);