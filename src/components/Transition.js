/**
 * @Author: eason
 * @Date:   2017-08-09T21:29:58+08:00
 * @Last modified by:   eason
 * @Last modified time: 2017-08-09T21:40:23+08:00
 */
import React, { cloneElement, PureComponent } from 'react';

export default class Transition extends PureComponent {

  state = {
    prev: this.props.children,
    current: this.props.children,
  };

  componentWillReceiveProps({ children }) {
    this.setState({
      prev: this.props.children,
      current: children,
    });
  }

  render() {
    const { prev, current } = this.state;

    if (prev === current) {
      return current;
    }

    return (
      <div>
        {cloneElement(prev, { style: { transition: 'all .3s ease', width: 0 } })}
        {cloneElement(current, { style: { transition: 'all .3s ease', width: '100%' } })}
      </div>
    );
  }
}
