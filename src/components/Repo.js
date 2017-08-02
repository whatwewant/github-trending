/**
 * @Author: eason
 * @Date:   2017-08-02T20:00:23+08:00
 * @Last modified by:   eason
 * @Last modified time: 2017-08-02T20:54:01+08:00
 */
import React from 'react';

import { Card, CardHeader, CardText } from 'material-ui/Card';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';

import IconStar from '../assets/star.svg';
import IconFork from '../assets/fork.svg';

function getStyle(props) {
  return {
    link: {
      textDecoration: 'none',
    },
    repo: {
      position: 'absolute',
      top: 64,
      left: 0,
      width: '100%',
      height: 'calc(100% - 80px)',
      overflowX: 'hidden',
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch',
      backgroundColor: 'rgba(255, 255, 255, 1)', // for hiding react pull to refresh icon

      loading: {
        transition: 'opacity .3s ease-in .2s',
        opacity: props.loading
          ? 1
          : 0,
        height: props.loading
          ? 82
          : 0,
      },

      statistics: {
        padding: 8,
        display: 'flex',
        alignItems: 'center',

        stars: {
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          marginRight: 4,
        },

        forks: {
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          marginRight: 4,
        },

        members: {
          flex: 2,
          // height: '50%',
        },
      },
    },
  };
}

export default({
  avatar,
  repo,
  desc,
  stars,
  forks,
  avatars,
  repoLink,
  loading,
}) => {
  const styles = getStyle({ loading });

  return (
    <a style={styles.link} href={repoLink}>
      <ListItem key={repo}>
        <Card>
          <CardHeader
            avatar={avatar}
            title={repo}
            subtitle=""
          />
          <Divider
            style={{
              marginLeft: 8,
              marginRight: 8,
            }}
          />
          <CardText>
            {desc}
          </CardText>
          <Divider
            style={{
              marginLeft: 8,
              marginRight: 8,
            }}
          />
          <div style={styles.repo.statistics}>
            <div style={styles.repo.statistics.stars}>
              <img
                style={{
                  marginRight: 4,
                }}
                role="presentation"
                src={IconStar}
              />
              <span>
                {stars}
              </span>
            </div>
            <div style={styles.repo.statistics.forks}>
              <img
                style={{
                  marginRight: 4,
                }}
                role="presentation"
                src={IconFork}
              />
              <span>
                {forks}
              </span>
            </div>
            <div style={styles.repo.statistics.members}>
              {avatars.map((e, i) => (
                <Avatar key={i} size={20} src={e} />
              ))}
            </div>
          </div>
        </Card>
      </ListItem>
    </a>
  );
};
