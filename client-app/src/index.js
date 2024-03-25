import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import GraphQlProvider from './components/GraphQLProvider/GraphQLProvider';
import { Provider } from 'react-redux';
import store from './redux/store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <GraphQlProvider>
            <App />
        </GraphQlProvider>
    </Provider>
);
