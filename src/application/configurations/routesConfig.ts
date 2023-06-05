import { lazy } from "react";
import { appConstants } from "./constants";

/**
 * router configuration and mapped components.
 *
 * export {
 *   routes
 * }
 */
const Home = lazy(() => import("../../presentation/containers/home"));
const About = lazy(() => import("../../presentation/containers/about"));

const routes = [
  {
    path: appConstants.routePaths.home,
    component: Home,
    authRequired: true,
  },
  {
    path: appConstants.routePaths.about,
    component: About,
    authRequired: true,
  },
  {
    path: "/*",
    component: Home,
    authRequired: true,
  }
];
export { routes };
