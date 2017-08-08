/**
 * @Author: eason
 * @Date:   2017-08-08T00:57:35+08:00
 * @Last modified by:   eason
 * @Last modified time: 2017-08-09T01:07:30+08:00
 */
import fetch from 'dva/fetch';

export async function fetchReadme(repo) {
  const {
    content,
    encoding,
    size,
    sha,
  } = await fetch(`https://api.github.com/repos/${repo.replace('@', '/')}/readme`).then(res => res.json());

  return { id: repo, repo, content, encoding, size, sha };
}
