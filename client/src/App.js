import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks'; 
import ApolloClient from 'apollo-boost';

import SearchBooks from './pages/SearchBooks';

import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

const client = new ApolloClient({
  // instruct our Apollo instance in App.js to retrieve this token every time we make a GraphQL request.
  request: operation => {
    const token = localStorage.getItem('id_token');

    // With this request configuration, we use the .setContext() method to set the HTTP request headers of every 
    // request to include the token, whether the request needs it or not
    // This is fine, since if the request doesn't need the token, our server-side resolver function won't check for it.
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  // To allow this need "proxy": "http://localhost:3001", near top of package.json
  uri: '/graphql'
});

function App() {
  
  return (
    <ApolloProvider client={client}>

      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path='/' component={SearchBooks} />
            <Route exact path='/saved' component={SavedBooks} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
