/**
* @Author: eason
* @Date:   2017-04-12T00:14:46+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-04-12T02:37:13+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/

import request from '../utils/request';

import { prefix, repo } from '../meta';

export async function fetchRepos({ language = 'javascript', type = 'daily' } = {}) {
  const url = `${prefix}${repo}/${language}/?since=${type}`;
  const { data } = await request(url);

  return {
    [`${language}/${type}`]: data.map(e => ({ ...e, avatar: e.avatars[0], repoLink: e.repo_link })),
  };
}
