/**
 * @Author: eason
 * @Date:   2017-08-08T01:12:35+08:00
 * @Last modified by:   eason
 * @Last modified time: 2017-08-09T01:46:51+08:00
 */
import React from 'react';
import { connect } from 'dva';
import { object } from 'prop-types';

import marked from 'marked';

import AppBar from 'material-ui/AppBar';
import { Card, CardHeader, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';

import NavigationClose from 'material-ui/svg-icons/navigation/close';

import 'assets/markdown.scss';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
});

class Readme extends React.PureComponent {

  static contextTypes = {
    router: object,
  };

  componentDidMount() {
    this.props.dispatch({ type: 'repository/sync', payload: this.props.params.repo });
  }

  render() {
    const { name, author, avatar, stars, forks, content } = this.props;
    return (
      <div
        style={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <AppBar
          title={`${this.props.language}`}
          iconElementLeft={<IconButton><NavigationClose /></IconButton>}
          onLeftIconButtonTouchTap={() => this.context.router.goBack()}
        />
        <div
          style={{ flex: 1, position: 'relative' }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              overflow: 'auto',
            }}
          >
            <Card>
              <CardHeader
                title={name}
                subtitle={author}
                avatar={avatar}
              />
              <CardActions style={{ textAlign: 'right' }}>
                <FlatButton label={`stars(${stars})`} />
                <FlatButton label={`forks(${forks}`} />
              </CardActions>
            </Card>
            <Paper
              className="markdown-body"
              style={{ width: '100vw' }}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapState = ({ repository, readme }) => {
  const { current, data: repositories } = repository;
  const {
    full_name: name,
    forks_count: forks,
    stargazers_count: stars,
    owner = {},
    url,
    created_at: createdAt,
    updated_at: updatedAt,
  } = repositories[current] || {};
  const { avatar_url: avatar, login: author } = owner;
  const { id, content } = readme[current] || {};
  return {
    id,
    name,
    author,
    avatar,
    forks,
    stars,
    url,
    createdAt,
    updatedAt,
    content: content ? marked(decodeURIComponent(escape(atob(content)))) : '', // eslint-disable-line
  };
};

export default connect(mapState)(Readme);
