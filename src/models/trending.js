/**
* @Author: eason
* @Date:   2017-04-12T00:24:12+08:00
* @Email:  uniquecolesmith@gmail.com
 * @Last modified by:   eason
 * @Last modified time: 2017-08-13T23:44:22+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/
import * as services from '../services/trending';

export default {
  namespace: 'trending',
  state: {
    languages: [
      'all',
      'javascript',
      'python',
      'go',
      'shell',
      'css',
      'typescript',
      'vue',
    ],
    trendings: {},

    refreshing: false,
    selectedLanguage: 'javascript',
    selectedType: 'daily',
  },
  reducers: {
    'save/trending'(state, { payload }) {
      return {
        ...state,
        trendings: { ...state.trendings, ...payload },
      };
    },
    'select/language'(state, { payload }) {
      return {
        ...state,
        selectedLanguage: payload,
      };
    },
    'switch/refresh'(state, { payload: refreshing }) {
      return {
        ...state,
        refreshing,
      };
    },
  },
  effects: {
    *'sync/repo'({ payload: { language, type } }, { call, put }) {
      yield put({ type: 'select/language', payload: language });
      const data = yield call(services.fetchRepos, { language, type });
      yield put({ type: 'save/trending', payload: data });
    },
    *'refresh/repo'({ payload: { language, type } }, { call, put }) {
      yield put({ type: 'select/language', payload: language });
      yield put({ type: 'switch/refresh', payload: true });
      const data = yield call(services.fetchRepos, { language, type });
      yield put({ type: 'switch/refresh', payload: false });
      yield put({ type: 'save/trending', payload: data });
    },
    *'sync/select/language'({ payload: language }, { put }) {
      // const currentLanguage = yield select(state => state.trending.selectedLanguage);
      // if (currentLanguage === language) return false;

      // yield put({ type: 'select/language', payload: language });
      yield put({ type: 'sync/repo', payload: { language } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({ type: 'sync/repo', payload: { language: 'javascript', type: 'daily' } });

      history.listen(({ pathname }) => {
        if (pathname.startsWith('/repo/')) {
          const language = /\/repo\/([^?]+)?/.exec(pathname)[1];
          // dispatch({ type: 'sync/select/language', payload: language });
          dispatch({ type: 'sync/repo', payload: { language } });
        }
      });
    },
  },
};
