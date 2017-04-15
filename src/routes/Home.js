/**
* @Author: eason
* @Date:   2017-04-11T13:53:42+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-04-15T16:20:42+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/
import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import Drawer from 'material-ui/Drawer';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import IconStar from '../assets/star.svg';
import IconFork from '../assets/fork.svg';
import IconGithub from '../assets/github.svg';

const getStyles = (props) => {
  return {
    root: {
      overflow: 'hidden',
    },

    link: {
      textDecoration: 'none',
    },

    bar: {
      position: 'absolute',
      top: 0,
      left: 0,
    },

    drawer: {
      // backgroundColor: 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',
      backgroundColor: 'rgba(0, 0, 0, .38)',
    },

    person: {
      width: 100,
      height: 100,
      margin: '16px auto',

      avatar: {
        width: '100%', height: '100%', borderRadius: '50%',
      },
    },

    language: {
      height: 'calc((100% - 166px) - 128px)',
      overflowX: 'hidden',
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch',
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

      loading: {
        transition: 'all .3s ease-in .2s',
        opacity: props.loading ? 1 : 0,
        height: props.loading ? 82 : 0,
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
};

class Home extends React.Component {

  state = {
    open: false,
  };

  // componentWillReceiveProps(nextProps) {
  //   const language = nextProps.params.language;
  //   this.props.loadingRepo(language);
  // }

  render() {
    const styles = getStyles(this.props);
    return (
      <div style={styles.root}>
        <AppBar
          style={styles.bar}
          title={`Trending - ${this.props.language}`}
          iconElementRight={
            <a href="https://github.com/whatwewant/github-trending">
              <img style={{ marginTop: 12, marginRight: 12 }} role="presentation" src={IconGithub} />
            </a>
          }
          onLeftIconButtonTouchTap={() => this.setState({ open: true })}
        />
        <Drawer
          docked={false}
          width={220}
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
          overlayStyle={styles.drawer}
        >
          <Paper style={styles.person} zDepth={3} circle>
            <img style={styles.person.avatar} role="presentation" src="https://avatars2.githubusercontent.com/u/7463687?v=3&u=d54189cd3b238f661873f1aabcd5fc97789cb345&s=400" />
          </Paper>
          <Divider style={{ marginLeft: 8, marginRight: 8 }} />
          <List style={styles.language}>
            {this.props.languages.map((language, index) => (
              <Link
                key={index}
                style={{ textDecoration: 'none' }}
                onClick={() => { this.reposArea.scrollTo(0, 0); this.setState({ open: false }); }}
                to={`/repo/${language}`}
              >
                <ListItem primaryText={`${language[0].toUpperCase()}${language.slice(1)}`} />
              </Link>
            ))}
          </List>
          <Divider style={{ marginLeft: 8, marginRight: 8 }} />
        </Drawer>
        <div ref={ref => (this.reposArea = ref)} style={styles.repo}>
          <List style={{ width: '100%', height: '100%' }}>
            <ListItem style={styles.repo.loading} innerDivStyle={{ display: 'flex', justifyContent: 'center' }}>
              <RefreshIndicator
                size={50}
                left={0}
                top={0}
                loadingColor="#00BCD4"
                status="loading"
                style={{ margin: '0 auto', display: 'inline-block', position: 'relative' }}
              />
            </ListItem>
            {this.props.repos.map((
              { avatar, repo, desc, stars, forks, avatars, repoLink }, index,
            ) => (
              <a key={index} style={styles.link} href={repoLink}>
                <ListItem key={repo}>
                  <Card>
                    <CardHeader
                      avatar={avatar}
                      title={repo}
                      subtitle=""
                    />
                    <Divider style={{ marginLeft: 8, marginRight: 8 }} />
                    <CardText>
                      {desc}
                    </CardText>
                    <Divider style={{ marginLeft: 8, marginRight: 8 }} />
                    <div style={styles.repo.statistics}>
                      <div style={styles.repo.statistics.stars}>
                        <img style={{ marginRight: 4 }} role="presentation" src={IconStar} />
                        <span>{stars}</span>
                      </div>
                      <div style={styles.repo.statistics.forks}>
                        <img style={{ marginRight: 4 }} role="presentation" src={IconFork} />
                        <span>{forks}</span>
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
            ))}
          </List>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ loading, trending }) => {
  const { languages, trendings, selectedLanguage, selectedType } = trending;
  return {
    loading: loading.models.trending,
    language: selectedLanguage,
    languages: languages,
    repos: trendings[`${selectedLanguage}/${selectedType}`] || [],
  };
};

const mapDispatchToProps = dispatch => ({
  loadingRepo(language) {
    // dispatch({ type: 'trending/sync/select/language', payload: language });
    dispatch({ type: 'trending/sync/repo', payload: { language } });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
