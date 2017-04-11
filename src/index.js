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
import './index.less';

OfflinePluginRuntime.install();

// 1. Initialize
const app = dva({
  onError(err) {
    alert(err.message);
  },
});

app.use(createLoading());

app.model(require('./models/trending'));

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
