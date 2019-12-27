// lib/withApollo.js
import withApollo from 'next-with-apollo';
import {split} from 'apollo-link';
import {HttpLink} from 'apollo-link-http';
import {ApolloClient} from 'apollo-client';
import {WebSocketLink} from 'apollo-link-ws';
import {getMainDefinition} from 'apollo-utilities';
import {InMemoryCache} from 'apollo-cache-inmemory';
import ws from 'ws';

const GRAPHQL_ENDPOINT = 'ws://localhost:8080/v1/graphql';
const config = "http://localhost:8080/v1/graphql";

export default withApollo(
    ({ctx, headers, initialState}): any => {
        let link: any = null;
        if (process.browser) {
            const wsLink = new WebSocketLink({ // if you instantiate in the server, the error will be thrown
                uri: GRAPHQL_ENDPOINT,
                options: {
                    reconnect: true,
                    connectionParams: {
                        cache: new InMemoryCache().restore(initialState || {}),
                        headers: {
                            "x-hasura-admin-secret": "123a4567"
                        }
                    }
                },

            });
            const httpLink = new HttpLink({
                uri: config,
                headers: {
                    "x-hasura-admin-secret": "123a4567"
                }
            });

            link = split(
                // split based on operation type
                ({query}) => {
                    const definition = getMainDefinition(query);
                    return (
                        definition.kind === 'OperationDefinition' &&
                        definition.operation === 'subscription'
                    );
                },
                wsLink,
                httpLink,
            );

        } else {
            link = new HttpLink({
                uri: config,
                headers: {
                    "x-hasura-admin-secret": "123a4567"
                }
            });
        }
        return new ApolloClient({
            cache: new InMemoryCache(),
            link,
            ssrMode: true,
            defaultOptions: {
                watchQuery: {
                    fetchPolicy: 'cache-and-network',
                },
            }
        });
    }
);
