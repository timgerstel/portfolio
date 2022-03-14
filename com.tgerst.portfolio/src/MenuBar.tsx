import React, { useEffect, useRef, useState } from 'react';
import './MenuBar.css'
import { MenuBarItem } from './MenuBarItem'
import { useClickOutEvent } from './Utils'

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
    title: 'Yeeeeeer',
    children: [
      { title: 'you already kno what it is', action: (e: React.MouseEvent, callback: any) => { callback() }},
      { title: 'this gon be something eventually >',
        children: [
          { title: 'what im sayin is...', action: (e: React.MouseEvent, callback: any) => { callback() }},
          { title: 'but for right now its kinda janky i know iknow >', children: [
            { title: 'ayy yo', action: (e: React.MouseEvent, callback: any) => { callback() }},
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