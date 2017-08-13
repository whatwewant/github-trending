/**
 * @Author: eason
 * @Date:   2017-08-13T21:11:13+08:00
 * @Last modified by:   eason
 * @Last modified time: 2017-08-14T01:16:24+08:00
 */
/**
 * H5高性能下拉刷新组件
 * <PullRefresh onRefresh={this.onRefresh} container={'id'}/>
 *
 * PullRefresh.defaultProps = {
        moveCount; // 位移系数
        // 临界值：当拖动多高时触发正在刷新
        dragThreshold: 0.3
        // 触发下拉刷新前调用
        beforePull: function(){},
        // 触发下拉刷新后调用  flag：true代表触发了刷新 flag：false代表没有触发下拉刷新只是拉下马又收回去了
        afterPull: function(flag){},
        // 触发下拉刷新回调 可以用来加载数据
        onRefresh: function(){}
    };
 *
 * 1)H5下拉刷新组件在列表较长时性能上不如native下拉刷新 但是提供了beforePull方法和afterPull方法 这些方法在下拉时都知会执行一次
 * 使用者可以在这些方法里面将不需要的dom隐藏，结束后在显示 最大化优化性能
 *
 * author: tennylv
 */
import React, { PureComponent } from 'react';

import './PullRefresh.less';


export default class PullRefresh extends PureComponent {

  static defaultProps = {
    dragThreshold: 0.3,
    moveCount: 200,
    beforePull: () => {},
    afterPull: (flag) => {}, // eslint-disable-line
    onRefresh: () => {},
    state: 0,
    refreshing: false,
    stateText: '刷新成功',
  };

  state = {
    state: this.props.refreshing ? 2 : 0,
    stateText: this.props.stateText,
  };

  componentDidMount() {
    this.container = document.getElementById(this.props.container); // eslint-disable-line
    this.bindEvent();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.refreshing !== this.props.refreshing) {
      this.setState({
        state: nextProps.refreshing ? 2 : 0,
        stateText: nextProps.refreshing ? '正在刷新...' : '刷新成功',
      });
    }
  }

  componentDidUpdate() {
    if (this.state.state === 0) {
      this.clear();
    }
  }

  dragThreshold = this.props.dragThreshold; // 临界值
  moveCount = this.props.moveCount; // 位移系数
  dragStart = null; // 开始抓取标志位
  percentage = 0; // 拖动量的百分比
  changeOneTimeFlag = 0; // 修改dom只执行1次标志位
  joinRefreshFlag = null; // 进入下拉刷新状态标志位
  refreshFlag = 0; // 下拉刷新执行是控制页面假死标志位

  touchStart = (event) => {
    const self = this;
    if (self.refreshFlag) {
      event.preventDefault();
      return;
    }
    event = event.touches[0]; // eslint-disable-line
    self.dragStart = event.clientY;

    self.container.style.webkitTransition = 'none';
    // self.pullIcon.classList.add('none');
  }

  touchMove = (event) => {
    const self = this;
    if (self.dragStart === null) {
      return;
    }

    if (self.refreshFlag) {
      event.preventDefault();
      return;
    }
    const target = event.touches[0];

    self.percentage = (self.dragStart - target.clientY) / window.screen.height; // eslint-disable-line

    // 当且紧当scrolltop是0且往下滚动时才触发
    // if (document.body.scrollTop === 0) { // eslint-disable-line
    if (this.container.scrollTop === 0) {
      if (self.percentage < 0) {
        event.preventDefault();
        if (!self.changeOneTimeFlag) {
          self.props.beforePull();
          self.changeOneTimeFlag = 1;
        }

        const translateX = -self.percentage * self.moveCount;

        self.joinRefreshFlag = true;

        if (Math.abs(self.percentage) > self.dragThreshold) {
          self.setState({
            state: 1,
            stateText: '释放刷新',
          });
        } else {
          self.setState({
            state: -1,
            stateText: '下拉刷新',
          });
        }


        if (self.percentage > 0) {
          self.container.style.webkitTransform = `translate3d(0, ${translateX}px,0)`;
        } else {
          self.container.style.webkitTransform = `translate3d(0, ${translateX}px,0)`;
        }
      } else {
        if (self.joinRefreshFlag == null) { // eslint-disable-line
          self.joinRefreshFlag = false;
        }
      }
    } else {
      if (self.joinRefreshFlag == null) { // eslint-disable-line
        self.joinRefreshFlag = false;
      }
    }
  }

  touchEnd = (event) => {
    const self = this;
    if (self.percentage === 0) {
      return;
    }

    if (self.refreshFlag) {
      event.preventDefault();
      return;
    }

    if (Math.abs(self.percentage) > self.dragThreshold && self.joinRefreshFlag) {
      self.props.onRefresh();

      self.setState({
        state: 2,
        stateText: '正在刷新...',
      });
      // self.pullIcon.classList.remove('none');

      self.container.style.webkitTransition = '330ms';
      self.container.style.webkitTransform = `translate3d(0, ${43}px,0)`;

      // 进入下拉刷新状态
      self.refreshFlag = 1;


      // setTimeout(() => {
      //   self.setState({
      //     state: 0,
      //     stateText: '刷新成功',
      //   });
      //   self.pullIcon.classList.add('none');
      //
      //   self.container.style.webkitTransform = 'translate3d(0,0,0)';
      //
      //   setTimeout(() => {
      //     self.props.afterPull(1);
      //     // 重置标志位
      //     self.refreshFlag = 0;
      //   }, 300);
      // }, 700);
    } else {
      if (self.joinRefreshFlag) { // eslint-disable-line
        self.refreshFlag = 1;
        self.container.style.webkitTransition = '330ms';
        self.container.style.webkitTransform = 'translate3d(0,0,0)';

        setTimeout(() => {
          self.props.afterPull();
          // 重置标志位
          self.refreshFlag = 0;
        }, 300);
      }
    }

    // 重置changeOneTimeFlag
    self.changeOneTimeFlag = 0;

    // 重置joinRefreshFlag
    self.joinRefreshFlag = null;

    // 重置percentage
    self.dragStart = null;


    // 重置percentage
    self.percentage = 0;
  }

  clear = () => {
    setTimeout(() => {
      // this.setState({
      //   state: 0,
      //   stateText: '刷新成功',
      // });
      this.pullIcon.classList.add('none');

      this.container.style.webkitTransform = 'translate3d(0,0,0)';

      setTimeout(() => {
        this.props.afterPull(1);
        // 重置标志位
        this.refreshFlag = 0;
      }, 300);
    }, 700);
  }

  bindEvent = () => {
    const dom = this.container; // 监听touch事件的元素dom

    dom.addEventListener('touchstart', this.touchStart);
    dom.addEventListener('touchmove', this.touchMove);
    dom.addEventListener('touchend', this.touchEnd);
  }

  render() {
    const { refreshing } = this.props;
    const cls = this.state.state === -1
      ? 'elfen elfen-pulldown-circle'
      : this.state.state === 1
      ? 'elfen elfen-pullup-circle'
      // : 'spinner';
      // : 'elfen elfen-loading';
      : '';
    return (
      <div
        className="pull-down-content"
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        {!refreshing ? (<i
          ref={ref => (this.pullIcon = ref)}
          id="pullIcon"
          className={cls}
        />) : (
          <svg
            ref={ref => (this.pullIcon = ref)}
            className="dash" viewBox="25 25 50 50"
          >
            <circle
              cx="50"
              cy="50"
              r="20"
              fill="none"
              stroke="#ccc"
              strokeDasharray="90 150"
              strokeWidth="5"
              strokeLinecap="round"
              className="circle"
            />
          </svg>
        )}
        <span
          ref={ref => (this.pullText = ref)}
          id="pullText"
          style={{ marginLeft: '1rem' }}
        >
          {this.state.stateText}
        </span>
      </div>
    );
  }
}
