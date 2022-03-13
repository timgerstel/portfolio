import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom';
import { collapseTextChangeRangesAcrossMultipleVersions, isTemplateLiteralToken } from 'typescript';
import { useClickOutEvent } from './Utils'
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
}

export const Window: React.FC<Props> = (props) => {
  const [windowState, setWindowState] = useState({ top: 0, left: 0, dragging: false, rel: {top: 0, left: 0 } });
  const [showing, setShowing] = useState(true);
  const TitleBarRef = useRef(null);

  const onMouseMove = (e: any) => {
    if (!windowState.dragging) return;
    const topDiff = e.pageY - windowState.rel.top;
    const leftDiff = e.pageX - windowState.rel.left;
    console.log('e.pageY: ', e.pageY);
    console.log('windowState.rel.top: ', topDiff);
    console.log('top: topDiff >= 0 ? topDiff : 0', topDiff >= 0 ? topDiff : 0);
    setWindowState({top: topDiff >= 0 ? topDiff : 0, left: leftDiff, dragging: windowState.dragging, rel: { top: windowState.rel.top, left: windowState.rel.left }});
    console.debug('onMouseMove windowState:', windowState);
    e.stopPropagation();
    e.preventDefault();
  }

  const onMouseDown = (e: any) => {
    if (e.button !== 0) return
    if (TitleBarRef.current) {
      const topDiff = e.pageY - windowState.rel.top;
      const leftDiff = e.pageX - windowState.rel.left;
      var computedStyle = window.getComputedStyle(TitleBarRef.current);
      var pos = { top: parseInt(computedStyle.top), left: parseInt(computedStyle.left) };
      console.log('computed style: ', pos);
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

  useEffect(() => {
    console.log('draggign? :', windowState.dragging);
  }, [windowState.dragging])
  
  return showing && <div className="DesktopWindow" style={{
      width: props.width,
      height: props.height,
      left: windowState.left,
      top: windowState.top
    }}>
    <div className="WindowTitleBar" ref={ TitleBarRef } onMouseMove={ onMouseMove} onMouseDown={ onMouseDown } onMouseUp={ onMouseUp } style={{      left: windowState.left,
      top: windowState.top}}>
      <div className="WindowControls">
        <button onClick={() => setShowing(false)}></button>
        <button></button>
        <button></button>
      </div>
      <div className="WindowTitle">{ props.title }</div>
    </div>
    <div className="WindowContent">
        { props.content !=null && props.content }
      </div>
  </div> || null;
}