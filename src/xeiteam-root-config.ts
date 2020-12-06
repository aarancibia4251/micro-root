import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import "zone.js";

const data = {
  errors: {
    errorElement: "<div>Error al montar la app</div>",
  },
};

const routes = constructRoutes(document.querySelector("#single-spa-layout"), {
  loaders: null,
  props: null,
  ...data,
});
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();
start();
