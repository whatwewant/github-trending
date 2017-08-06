/**
* @Author: eason
* @Date:   2017-01-04T17:00:03+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-04-12T02:53:27+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/

import dva from 'dva';
import createLoading from 'dva-loading';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import request from './utils/request';
import './index.less';

OfflinePluginRuntime.install();

// 1. Initialize
const app = dva({
  onError(err) {
    if (process.env.NODE_ENV === 'production') {
      request('http://121.42.156.153:59438/api/v1/bugs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: window.location.href, // eslint-disable-line
          title: err.title || 'unnamed',
          message: err.message,
          tag: ['github-trending'],
        }),
      });
    } else {
      console.log(err);
    }
  },
});

app.use(createLoading());

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));
import('./models/trending').then(
  model => app.model(model),
);

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
