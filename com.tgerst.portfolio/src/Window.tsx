import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useClickOutEvent } from './Utils'
import WinMan from './WindowManager';
import './Window.css'

interface Props {
  title?: string;
  active?: boolean;
  content?: any;
  width?: string;
  height?: string;
  startingX?: string;
  startingY?: string;
  startInBackground?: boolean;
  showing?: boolean;
  windowId: any;
}

export const Window: React.FC<Props> = (props) => {
  const [windowState, setWindowState] = useState({ top: 22, left: 0, dragging: false, rel: {top: 0, left: 0 } });
  const TitleBarRef = useRef(null);

  const onMouseMove = (e: any) => {
    if (!windowState.dragging) return;
    const topDiff = e.pageY - windowState.rel.top;
    const leftDiff = e.pageX - windowState.rel.left;
    // console.log('e.pageY: ', e.pageY);
    // console.log('windowState.rel.top: ', topDiff);
    // console.log('top: topDiff >= 0 ? topDiff : 0', topDiff >= 0 ? topDiff : 0);
    setWindowState({top: topDiff >= 22 ? topDiff : 22, left: leftDiff, dragging: windowState.dragging, rel: { top: windowState.rel.top, left: windowState.rel.left }});
    // console.log('onMouseMove windowState:', windowState);
    e.stopPropagation();
    e.preventDefault();
  }

  const onMouseDown = (e: any) => {
    if (e.button !== 0) return
    if (TitleBarRef.current) {
      const topDiff = e.pageY - windowState.rel.top;
      const leftDiff = e.pageX - windowState.rel.left;
      const { clientWidth } = TitleBarRef.current;
      var computedStyle = window.getComputedStyle(TitleBarRef.current);
      var pos = { top: parseInt(computedStyle.top), left: parseInt(computedStyle.left) };
      // console.log('clientWidth: ', clientWidth);
      // console.log('mouseDown pos:', pos);
      // console.log('computed style: ', pos);
      setWindowState({ top: windowState.top, left: windowState.left, dragging: true, rel: { top: e.pageY - pos.top, left: e.pageX - pos.left } });
    } else {
      //title bar didnt render for some reason, maybe your toaster of a workstation ran out of resources
    }
    e.stopPropagation();
    e.preventDefault();
  }

  const onMouseUp = (e: any) => {
    setWindowState( { top: windowState.top, left: windowState.left, dragging: false, rel: { top: windowState.rel.top, left: windowState.rel.left } });
    e.stopPropagation();
    e.preventDefault();
  }
  
  return <div style={{}}><div className="DesktopWindow" style={{
      width: props.width,
      transform: "translate(50%, 0)",
      height: props.height,
      left: windowState.left,
      top: windowState.top,
    }}>
    <div className="WindowTitleBar" ref={ TitleBarRef } onMouseMove={ onMouseMove} onMouseDown={ onMouseDown } onMouseUp={ onMouseUp } style={{ left: windowState.left, top: windowState.top}}>
      <div className="WindowControls">
        <button onClick={() => {WinMan.getInstance().closeWindow(props.windowId)}}></button>
        <button></button>
        <button></button>
      </div>
      <div className="WindowTitle">{ props.title }</div>
    </div>
    <div className="WindowContent">
        { props.content !=null && props.content }
      </div>
  </div></div> || null;
}