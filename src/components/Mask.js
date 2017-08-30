import React from 'react';

export default function Mask({ children, ...props }) {
  const { style, others } = getStyle(props);
  return (
    <div>
      <div style={style.mask} {...others} />
      <div style={style.container}>{children}</div>
    </div>
  );
}

function getStyle(props) {
  const { active, style, maskColor, ...others } = props;
  return {
    style: {
      mask: {
        position: 'fixed',
        height: '100%',
        width: '100%',
        top: 0,
        left: active ? 0 : '-100%',
        opacity: active ? 1 : 0,
        backgroundColor: maskColor || 'rgba(0, 0, 0, 0.38)',
        WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
        willChange: 'opacity',
        transform: 'translateZ(0px)',
        transition: active
          ? 'left 0ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, opacity 400ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
          : 'left 0ms cubic-bezier(0.23, 1, 0.32, 1) 400ms, opacity 400ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        zIndex: 1200,
        pointerEvents: active ? 'auto' : 'none',
      },
      container: Object.assign({
        position: 'fixed',
        height: '100%',
        width: '100%',
        top: 0,
        left: 0, // active ? 0 : '-100%',
        opacity: active ? 1 : 0,
        WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
        willChange: 'opacity',
        pointerEvents: active ? 'auto' : 'none',
        // transform: active ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
        transition: 'opacity 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        zIndex: 1300,
        overflow: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }, style),
    },
    others,
  };
}
