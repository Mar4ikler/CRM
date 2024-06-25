import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { useDispatch, useSelector } from 'react-redux';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { HTTP_API_URL, WS_API_URL } from '../../constants/url';
import { errorHandler } from '../../helpers/errorHandler';
import { setError } from '../../redux/features/app/appSlice';
import { getMainDefinition } from '@apollo/client/utilities';

const GraphQlProvider = ({ children }) => {
    const token = useSelector((state) => state.app.accessToken);
    const dispatch = useDispatch();

    const uploadLink = createHttpLink({
        uri: HTTP_API_URL,
    });

    const wsLink = new GraphQLWsLink(
        createClient({
            url: WS_API_URL,
            connectionParams: {
                authToken: `Bearer ${token}`,
            },
        })
    );

    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                Authorization: `Bearer ${token}`,
            },
        };
    });
    const httpLinkWithAuth = authLink.concat(uploadLink);

    const splitLink = split(
        ({ query }) => {
            const definition = getMainDefinition(query);
            return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
        },
        wsLink,
        httpLinkWithAuth
    );

    const errorLink = onError((errorResponse) => {
        console.log(errorResponse);
        const error = errorHandler(errorResponse);
        dispatch(setError(error));
    });

    const client = new ApolloClient({
        link: errorLink.concat(splitLink),
        cache: new InMemoryCache({
            addTypename: false,
        }),
        headers: {
            authorization: `Bearer ${token}`,
        },
        defaultOptions: {
            query: {
                errorPolicy: 'all',
            },
            mutate: {
                errorPolicy: 'all',
            },
        },
    });

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default GraphQlProvider;
