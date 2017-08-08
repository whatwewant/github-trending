/**
 * @Author: eason
 * @Date:   2017-08-08T01:04:42+08:00
 * @Last modified by:   eason
 * @Last modified time: 2017-08-09T01:22:35+08:00
 */
import * as services from '../services/readme';

export default {
  namespace: 'readme',
  state: {},
  reducers: {
    save(state, { payload: readme }) {
      return { ...state, ...readme };
    },
  },
  effects: {
    *sync({ payload: repo }, { select, call, put }) {
      const readmes = yield select(state => state.readme);

      if (readmes[repo]) {
        return false;
      }

      const repoD = yield call(services.fetchReadme, repo);

      yield put({ type: 'save', payload: { [repo]: repoD } });
    },
  },
};
