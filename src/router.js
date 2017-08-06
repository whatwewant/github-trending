/**
* @Author: eason
* @Date:   2016-12-15T13:47:54+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-04-12T01:23:53+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/

import React from 'react';
import { IndexRoute, Router, Route } from 'dva/router';
import Loadable from 'react-loadable';

import SpinLoading from 'respinner/lib/spin';

// import App from './routes/App';
// import Home from './routes/Home';

const App = Loadable({
  loader: () => new Promise(resolve => setTimeout(() => resolve(import('./routes/App')), 1000)),
  delay: 10000,
  loading: () => (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <SpinLoading fill="#00BCD4" borderRadius={2} count={10} />
    </div>
  ),
});


const Home = Loadable({
  loader: () => import('./routes/Home'),
  loading: () => null,
});

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="repo" component={Home} />
        <Route path="repo/:language" component={Home} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
