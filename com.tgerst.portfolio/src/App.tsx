import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
// import { RouterProvider } from './router/RouterContext';
// import { Link } from './router/Link';
// import { Route } from './router/Route';
// import { Routes } from './Routes';
import { MenuBar } from './MenuBar';
import WinMan, {WindowManager} from './WindowManager'
import { RESUME_JSX } from './default_windows/Resume'

function App() {
  WinMan.getInstance().addWindow('AppMain.ResumeWindow','resume.pdf', RESUME_JSX)

  return (
    <div className="App">
      <MenuBar></MenuBar>
      <div className="DesktopContainer">
        <div className="Desktop">
          <WindowManager></WindowManager>
          <div className="IconGrid">
          </div>
          <div className="Wallpaper">
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
          </div>
        </div>
      </div>
      {/* Todo for future: use router to make certain desktop functions accessible via a route. Like if i want to open App1 i could route it as tgerst.com/app1 or some shit */}
      {/* <RouterProvider routeList={Routes}>
        <Route path={Routes.ind.path}>
          <p>hey, thanks for stopping by</p>
          <Link to={Routes.resume.path}>about</Link>
        </Route>

        <Route path={Routes.resume.path}>
          <p>created by tim gerstel</p>
          <Link to={Routes.ind.path}>back to greeting</Link>
        </Route>
      </RouterProvider> */}
    </div>
  );
}

export default App;