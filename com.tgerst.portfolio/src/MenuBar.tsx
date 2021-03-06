import React, { useEffect, useRef, useState } from 'react';
import './MenuBar.css'
import { MenuBarItem } from './MenuBarItem'
import { useClickOutEvent } from './Utils'
import WinMan from './WindowManager';
import { RESUME_JSX } from './default_windows/Resume'

interface Props {
  ActionList?: string[]
}

export interface MenuBarItem_I {
  title: any;
  children?: Array<any>;
  action?: any;
}

let MenuItems = [
  {
    title: <b>TG</b>,
    children: [
      { title: 'About Tim Gerstel', action: (e: React.MouseEvent, callback: any) => {
        WinMan.getInstance().addWindow('AppMain.ResumeWindow','resume.pdf', RESUME_JSX)
        callback()
      }},
      { title: 'Email Tim Gerstel', action: (e: React.MouseEvent, callback: any) => {
        window.location.href = 'mailto:tim.gerstel@gmail.com?body=Sup%20nerd,%20';
        callback();
      }}
    ],
    action: (e: React.MouseEvent, callback: any) => { callback() }
  },
  {
    title: 'thanks for visiting boo',
    children: [
      { title: 'click me first', action: (e: React.MouseEvent, callback: any) => {
        WinMan.getInstance().addWindow('AppMain.ButWhy', 'under construction', <div><h2>hey</h2>
          <p>this portfolio and its content is incomplete as you can tell by the lack of professionalism</p>
          <p>thank u for your understanding</p></div>
        , '50%', 'max-content');
        callback() }},
        { title: 'i had someone tell me i fell off', action: (e: React.MouseEvent, callback: any) => {
          WinMan.getInstance().addWindow('AppMain.yur', 'portfolioception', <iframe width="100%" height="100%" src="https://timgerstel.github.io"></iframe>
          , '70%', '50%');
          callback() }},
      { title: 'oo i needed that >',
        children: [
          { title: 'and they wanna see me pick it back up...', action: (e: React.MouseEvent, callback: any) => { 
            WinMan.getInstance().addWindow('AppMain.yuur', 'im so sorry', <iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0&autoplay=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
          , '50%', '50%', {backgroundColor: "rgba(0,0,0,0)", border: "0"});
            callback() }},
          { title: 'well whered i leave it at? >', children: [
            { title: 'ayy yo', action: (e: React.MouseEvent, callback: any) => {
              WinMan.getInstance().addWindow('AppMain.WheelchairJimmy', 'this is drake from degrassi please dont cancel me', <img src="https://i.kym-cdn.com/entries/icons/mobile/000/009/605/21953.jpg" width="100%" height="100%"></img>, '33%', '33%')
              callback() }},
          ],
          action: (e: React.MouseEvent, callback: any) => {callback()} }
        ],
        action: (e: React.MouseEvent, callback: any) => {callback()}
      }
    ],
    action: (e: React.MouseEvent, callback: any) => { callback() }
  }
]

export const MenuBar: React.FC<Props> = (props) => {
  const [activeItem, setActiveItem] = useState('-1');
  const MenuBarRef = useRef(null);
  useClickOutEvent(MenuBarRef, () => setActiveItem('-1'));

  return (
    <div className="MenuBar Unselectable" unselectable="on" ref={MenuBarRef} onClick={() => {if(activeItem != '-1') setActiveItem('-1')}}>
      {MenuItems.map((val, ind) => {
        return <MenuBarItem itemObj={val} key={ind} id={`${ind}`} activeItem={activeItem} setActive={setActiveItem}></MenuBarItem>
      })}
    </div>
  )
}