/**
* @Author: eason
* @Date:   2017-04-11T13:53:42+08:00
* @Email:  uniquecolesmith@gmail.com
 * @Last modified by:   eason
 * @Last modified time: 2017-08-13T23:48:44+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Link } from 'dva/router';

import Loadable from 'react-loadable';
import FlipMove from 'react-flip-move';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';

import Select from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import QRCode from 'qrcode.react';

import IconGithub from '../assets/github.svg';

import Loading from '../components/Loading';
// import Repo from '../components/Repo';

import PullRefresh from '../components/PullRefresh';

const Repo = Loadable({
  loader: () => import('../components/Repo.js'),
  loading: () => null,
});


const getStyles = (props) => {
  return {
    root: {
      overflow: 'hidden',
    },

    link: {
      textDecoration: 'none',
    },

    menuItem: {
      color: '#000',
      display: 'block',
      textDecoration: 'none',
      fontSize: 16,
      padding: 16,
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
      // height: 'calc(100% - 80px)',
      height: 'calc(100% - 64px)',
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
    },
  };
};

class Home extends React.Component {

  /* eslint-disable */
  static propTypes = {
    loading: PropTypes.bool,

    language: PropTypes.string,

    languages: PropTypes.arrayOf(PropTypes.string),

    repos: PropTypes.arrayOf(PropTypes.shape({
      avatar: PropTypes.string,
      repo: PropTypes.string,
      desc: PropTypes.string,
      stars: PropTypes.string,
      forks: PropTypes.string,
      avatars: PropTypes.array,
      repoLink: PropTypes.string,
    })),
  };
  /* eslint-enable */

  state = {
    open: false,

    languages: [],
  };

  // componentWillReceiveProps(nextProps) {
  //   const language = nextProps.params.language;
  //   this.props.loadingRepo(language);
  // }

  // componentDidMount() {
  //   console.log(this.reposArea);
  // }

  onRefresh = () => {
    this.props.handleRefresh(this.props.language);
  }


  handleLanguageChange = (event, index) => {
    this.props.handleLanguageChange(this.props.languages[index]);
  };

  render() {
    const { language, refreshing } = this.props;
    const styles = getStyles(this.props);
    return (
      <div style={styles.root} className="home transition-item">
        <AppBar
          style={styles.bar}
          title={`Trending - ${language}`}
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
            {this.props.menus.map((menu, index) => (
              Object.prototype.hasOwnProperty.call(menu, 'href')
                ? (<a href={menu.href} style={styles.menuItem}>{menu.label}</a>)
                : (
                  <Link
                    key={index}
                    style={{ textDecoration: 'none' }}
                    onClick={() => {
                      this.setState({ open: false });
                      this.reposArea.scrollTo(0, 0);
                    }}
                    to={`${typeof menu === 'string' ? menu : menu.path}`}
                  >
                    {typeof menu === 'string'
                      ? (<ListItem primaryText={`${menu[0].toUpperCase()}${menu.slice(1)}`} />)
                      : (<ListItem primaryText={`${menu.label}`} />)}
                  </Link>)
                ))}
          </List>
          <Divider style={{ marginLeft: 8, marginRight: 8 }} />
          <div style={{ width: '100%', textAlign: 'center', marginTop: '1rem' }}>
            <QRCode value="http://moeover.com/github-trending" />
          </div>
        </Drawer>

        <PullRefresh refreshing={refreshing} onRefresh={this.onRefresh} container={'repo'} />
        <div
          id="repo"
          style={styles.repo}
          ref={ref => (this.reposArea = ref)}
        >
          <div
            style={{
              width: '100%',
              height: '3rem',
              display: 'flex',
              justifyContent: 'flex-end',
              padding: '0',
            }}
          >
            <div style={{ width: '10rem' }}>
              <Select
                labelStyle={{ textAlign: 'right' }}
                iconStyle={{ textAlign: 'right' }}
                underlineStyle={{ width: 0 }}
                value={language}
                onChange={this.handleLanguageChange}
                fullWidth
              >
                {this.props.languages.map((lang, index) => (
                  <MenuItem key={index} value={lang} primaryText={lang} />
                ))}
              </Select>
            </div>
          </div>
          <List>
            <Loading loading={!this.props.refreshing && this.props.loading} />
            <FlipMove
              staggerDelayBy={150}
              appearAnimation="accordionVertical"
              enterAnimation="accordionVertical"
              leaveAnimation="accordionVertical"
            >
              {this.props.repos.map((
                { avatar, repo, repoAt, desc, stars, forks, avatars, repoLink },
              ) => (
                <Repo
                  key={repo}
                  loading={this.props.loading}
                  avatar={avatar}
                  repo={repo}
                  desc={desc}
                  stars={stars}
                  forks={forks}
                  avatars={avatars}
                  repoAt={repoAt}
                  repoLink={repoLink}
                />
              ))}
            </FlipMove>
          </List>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ loading, trending }) => {
  const { languages, trendings, refreshing, selectedLanguage, selectedType } = trending;
  return {
    menus: [
      'trending',
      'stars',
      'resposities',
      // {
      //   href: 'http://github.com/login/oauth/authorize?client_id=9435aabf393cb270054b&redirect_uri=http://localhost:8000&scope=public_repo',
      //   label: 'SignIn',
      // },
    ],
    refreshing,
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
  handleLanguageChange(language) {
    dispatch({ type: 'trending/sync/repo', payload: { language } });
  },
  handleRefresh(language) {
    dispatch({ type: 'trending/refresh/repo', payload: { language } });
  },
});

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(Home);
