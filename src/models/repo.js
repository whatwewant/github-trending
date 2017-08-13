/**
 * @Author: eason
 * @Date:   2017-08-09T01:10:36+08:00
 * @Last modified by:   eason
 * @Last modified time: 2017-08-13T21:03:35+08:00
 */
import * as services from '../services/repo';

export default {
  namespace: 'repository',
  state: {
    current: null,
    data: {},
  },
  reducers: {
    save({ data, ...others }, { payload: repo }) {
      return {
        ...others,
        data: {
          ...data,
          ...repo,
        },
      };
    },
    'set/current'(state, { payload: current }) {
      return { ...state, current };
    },
  },
  effects: {
    *sync({ payload: repo }, { select, call, put }) {
      yield put({ type: 'set/current', payload: repo });
      const repositories = yield select(state => state.repository.data);

      if (repositories[repo]) return false;

      const data = yield call(services.fetchRepo, repo);

      yield put({ type: 'readme/sync', payload: repo });

      yield put({ type: 'save', payload: { [repo]: data } });
    },
  },
  subscriptions: {},
};
