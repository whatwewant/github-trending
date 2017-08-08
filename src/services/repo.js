/**
 * @Author: eason
 * @Date:   2017-08-09T01:08:10+08:00
 * @Last modified by:   eason
 * @Last modified time: 2017-08-09T01:10:21+08:00
 */
import fetch from 'dva/fetch';

export async function fetchRepo(repo) {
  return fetch(`https://api.github.com/repos/${repo.replace('@', '/')}`)
    .then(res => res.json());
}
