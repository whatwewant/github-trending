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

import App from './routes/App';
import Home from './routes/Home';

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
