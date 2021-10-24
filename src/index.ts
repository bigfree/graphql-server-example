import { Customer } from "./entities/customer/Customer";
import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import * as path from "path";
import { buildSchema } from 'type-graphql';
import { GraphQLSchema } from "graphql";
import { ApolloServerPluginInlineTrace } from "apollo-server-core";
import { Connection, createConnection, useContainer } from "typeorm";
import { Container as TypeDiContainer } from 'typeorm-typedi-extensions';

import { User } from "./entities/User";
import { CustomerAddress } from "./entities/customer/CustomerAddress";
import { CustomerResolver } from "./resolvers/customer/CustomerResolver";

require('dotenv').config();

useContainer(TypeDiContainer);

/**
 * Start server
 * @returns {Promise<void>}
 */
async function startApolloServer() {
    const connection: Connection = await createConnection({
        type: 'postgres',
        synchronize: true,
        cache: true,
        url: `postgres://${ process.env.POSTGRES_USER }:${ process.env.POSTGRES_PASSWORD }@postgres:5432/${ process.env.POSTGRES_DB }`,
        logger: "advanced-console",
        logging: ['query', 'error'],
        entities: [
            User,
            Customer,
            CustomerAddress,
        ]
    });

    const schema: GraphQLSchema = await buildSchema({
        resolvers: [CustomerResolver],
        dateScalarMode: "isoDate",
        emitSchemaFile: path.resolve(__dirname, "schema.gql"),
        container: TypeDiContainer,
    });

    // noinspection TypeScriptValidateTypes
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