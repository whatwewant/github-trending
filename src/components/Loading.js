/**
 * @Author: eason
 * @Date:   2017-08-02T20:00:23+08:00
 * @Last modified by:   eason
 * @Last modified time: 2017-08-02T21:05:01+08:00
 */
import React from 'react';

import { ListItem } from 'material-ui/List';
import RefreshIndicator from 'material-ui/RefreshIndicator';

const getStyle = (props = {}) => ({
  loading: {
    transition: 'opacity .3s ease-in .2s',
    opacity: props.loading ? 1 : 0,
    height: props.loading ? 82 : 0,
  },
});

export default (props) => {
  const styles = getStyle(props);

  return (
    <ListItem style={styles.loading} innerDivStyle={{ display: 'flex', justifyContent: 'center' }}>
      <RefreshIndicator
        size={50}
        left={0}
        top={0}
        loadingColor="#00BCD4"
        status="loading"
        style={{ margin: '0 auto', display: 'inline-block', position: 'relative' }}
      />
    </ListItem>
  );
};
