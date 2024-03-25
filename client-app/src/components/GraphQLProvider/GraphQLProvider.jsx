import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { useDispatch, useSelector } from 'react-redux';
import { HTTP_API_URL } from '../../constants/url';
import { errorHandler } from '../../helpers/errorHandler';
import { setError } from '../../redux/features/app/appSlice';

const GraphQlProvider = ({ children }) => {
    const token = useSelector((state) => state.app.accessToken);
    const dispatch = useDispatch();

    const uploadLink = createHttpLink({
        uri: HTTP_API_URL,
    });

    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                Authorization: `Bearer ${token}`,
            },
        };
    });
    const httpLinkWithAuth = authLink.concat(uploadLink);

    const errorLink = onError((errorResponse) => {
        console.log(errorResponse);
        const error = errorHandler(errorResponse);
        dispatch(setError(error));
    });

    const client = new ApolloClient({
        link: errorLink.concat(httpLinkWithAuth),
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
