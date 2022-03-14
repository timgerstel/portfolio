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
      { title: 'i had someone tell me i fell off', action: (e: React.MouseEvent, callback: any) => { callback() }},
      { title: 'oo i needed that >',
        children: [
          { title: 'and they wanna see me pick it back up...', action: (e: React.MouseEvent, callback: any) => { callback() }},
          { title: 'well whered i leave it at? >', children: [
            { title: 'ayy yo', action: (e: React.MouseEvent, callback: any) => {
              console.log('ayy yo clicked')
              WinMan.getInstance().addWindow('AppMain.WheelchairJimmy', 'champagne papi', <img src="https://i.kym-cdn.com/entries/icons/mobile/000/009/605/21953.jpg" width="100%" height="100%"></img>)
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