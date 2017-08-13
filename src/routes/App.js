/**
* @Author: eason
* @Date:   2017-04-11T13:44:05+08:00
* @Email:  uniquecolesmith@gmail.com
 * @Last modified by:   eason
 * @Last modified time: 2017-08-09T22:19:33+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/
import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PageTransition from 'react-router-page-transition';

import './style.scss';

injectTapEventPlugin();

export default function ({ children }) {
  return (
    <MuiThemeProvider>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
        <PageTransition timeout={500}>
          { children }
        </PageTransition>
      </div>
    </MuiThemeProvider>
  );
}
