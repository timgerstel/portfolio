import { useCallback, useState } from 'react';
import { Window } from './Window'

interface Props {
  windows?: any;
}

export default class WinMan {
  windows: any = {};
  static sharedInstance: WinMan;
  private forceRenderFunc: any;

  public static getInstance(): WinMan {
    if(!WinMan.sharedInstance) {
      WinMan.sharedInstance = new WinMan();
    }
    return WinMan.sharedInstance;
  }

  addWindow(uniqueId: string, title: string, content: any, width?: any, height?: any, style?: any) {
    console.log('adding window');
    this.windows[uniqueId] = <Window windowId={uniqueId} title={title} key={uniqueId} styleObj={style} width={width || "50%"} height={height || "70%"} content={content}></Window>
    if(this.forceRenderFunc != null) this.forceRenderFunc();
  }

  closeWindow(uniqueId: any) {
    delete this.windows[uniqueId];
    console.log('closed window', uniqueId);
    console.log('window:' , this.windows);
    if(this.forceRenderFunc != null)  this.forceRenderFunc();
  }

  setForceWindowFunc(f: any){
    this.forceRenderFunc = f;
  }

  getWindows() {
    return this.windows;
  }
}

export const WindowManager: React.FC<Props> = (props) => {
  // todo: fix this hack
  // Cannot update a component (`WindowManager`) while rendering a different component (`App`)
  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []);
  WinMan.getInstance().setForceWindowFunc(forceUpdate);

  return <div className="WindowManager" style={{height: "100%"}}>
    {Object.keys(WinMan.getInstance().getWindows()).map((window: any, id: any) => {
      console.log('rendering window', window)
      return WinMan.getInstance().getWindows()[window];
    })}
  </div>
}