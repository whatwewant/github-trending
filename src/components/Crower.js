/**
 * @Author: eason
 * @Date:   2017-08-02T21:58:39+08:00
 * @Last modified by:   eason
 * @Last modified time: 2017-08-02T22:27:39+08:00
 */
import React from 'react';

import Avatar from 'material-ui/Avatar';

import IconStar from '../assets/star.svg';
import IconFork from '../assets/fork.svg';

export default () => (
  <ul
    style={{
      width: '100%',
      height: '8rem',
      listStyle: 'none',
      padding: 0,
      display: 'flex',
    }}
  >
    {this.props.repos.slice(0, 3).map(
      ({ avatar, repo, desc, stars, forks, avatars, repoLink }, index) => (
        <li
          key={index}
          style={{
            width: '100%',
            height: '100%',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            borderTop: '1px solid #ccc',
            borderBottom: '1px solid #ccc',
            padding: '1rem',
          }}
        >
          <Avatar style={{ flexShrink: 0, marginRight: '1rem' }} src={avatar} size={64} />
          <div
            style={{
              flex: 1,
            }}
          >
            <div style={{ lineHeight: '1.7rem' }}>{repo.split('/').pop()}</div>
            <div style={{ fontSize: '.75rem' }}>{desc}</div>
          </div>
          <div
            style={{
              // height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ flex: 1, dispay: 'flex', marginBottom: '.5rem' }}>
              <img
                style={{
                  marginRight: 4,
                  flex: 1,
                }}
                role="presentation"
                src={IconStar}
              />
              <span style={{ flex: 3, textAlign: 'right' }}>{stars}</span>
            </div>
            <div style={{ flex: 1, display: 'flex' }}>
              <img
                style={{
                  marginRight: 4,
                  flex: 1,
                }}
                role="presentation"
                src={IconFork}
              />
              <span style={{ flex: 3, textAlign: 'right' }}>{forks}</span>
            </div>
          </div>
        </li>
      ),
    )}
  </ul>
);
