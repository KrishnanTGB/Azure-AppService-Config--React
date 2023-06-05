import { Suspense } from 'react';
import { HashRouter, Routes, Route } from "react-router-dom";
import { routes } from "../../../application/configurations/routesConfig";
import "./App.scss";
import PageLoader from '../../components/pageLoader';

function App() {
  /**
   * reder routes based on the router configurations
   * @return  {Component} route component
   */
  const renderRoutes = (route: {
    path: any | undefined;
    component: any | undefined;
  }) => (
    <Route key={route.path} path={route.path} element={<route.component/>} />
  );

  return (
    <div className="App">
      <Suspense fallback={<PageLoader />}>
      <HashRouter>
        <Routes>{routes.map(renderRoutes)}</Routes>
      </HashRouter>
      </Suspense>
    </div>
  );
}

export default App;
