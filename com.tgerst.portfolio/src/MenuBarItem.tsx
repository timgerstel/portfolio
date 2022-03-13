import React, { useEffect, useState } from 'react';
import { MenuBarItem_I } from './MenuBar'
import './MenuBar.css'

interface Props {
  itemObj: MenuBarItem_I;
  activeItem: string;
  id: string;
  setActive?: any;
}

export const MenuBarItem: React.FC<Props> = (props) => {
  const [activeItem, setActiveItem] = useState('-1'); //activeItem = the active submenu (confusing but using same var for 
  const isActive = props.activeItem == props.id; //this state item is for the menu bar item itself to track whether it is active or notconsistency. see: MenuBar.tsx)
  const activateHandler = (e: any) => {
    setActiveItem(props.id);
    props.setActive(props.id);
  }
  const clickHandler = (e: any) => {
    props.setActive(props.id);
    props.itemObj.action(e, () => {
      console.log(`MenuBarItem onClick ${props.id} callback()`)
    });
  }
  const mouseEnterHandler = (e: any) => {
    if(props.activeItem != '-1') activateHandler(e) //if menu is already active, allow hover selecting similar to osx
  }

  // useEffect(() => {
  //   console.log('active item:', activeItem);
  // }, [activeItem])

  return (
    <div className="MenuBarItem" onMouseEnter={mouseEnterHandler} onBlur={() => setActiveItem('-1')}>
      <div className="MenuBarItemBody" >
        <span className="MenuBarItemTitle" onClick={clickHandler}>{props.itemObj.title}</span>
        <div className={isActive ? "MenuBarItem-Dropdown Show-Dropdown" : "MenuBarItem-Dropdown"} onMouseEnter={mouseEnterHandler}>
          {props.itemObj.children?.map((val: any, ind: number) => {
            return <MenuBarItem itemObj={val} key={ind} id={`${props.id}.${ind}`} activeItem={activeItem} setActive={setActiveItem}></MenuBarItem>
          })}
        </div>
      </div>
    </div>
  )
}