import React from 'react';
import './App.css';
import { RouterProvider } from './router/RouterContext';
import { Link } from './router/Link';
import { Route } from './router/Route';
import { Routes } from './Routes';
import { MenuBar } from './MenuBar';
import { Window } from './Window';

function App() {
  const RESUME_JSX =  <object data="/desktop_files/resume.pdf" type="application/pdf" width="100%" height="100%">
    <p>Alternative text - include a link <a href="http://africau.edu/images/default/sample.pdf">to the PDF!</a></p>
  </object>
  return (
    <div className="App">
      <MenuBar></MenuBar>
      <div className="DesktopContainer" onMouseDown={(e) => {
          console.log('desktop mouse down x: ' + e.clientX + ' y:' + e.clientY)
        }} onMouseUp={(e) => {
          console.log('desktop mouse up x: ' + e.clientX + ' y:' + e.clientY)
      }}>
        <div className="Desktop">
          <div className="WindowManager">
            <Window title="Bienvenidos" width="50%" height="75%" content={RESUME_JSX}></Window>
          </div>
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