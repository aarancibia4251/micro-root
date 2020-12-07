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
  loaders: null,
  props: {
    declarations: "HOLA",
    loggedInUser: fetch("https://api.ipify.org/?format=json").then((r) =>
      r.json()
    ),
  },
};

const routes = constructRoutes(
  document.querySelector("#single-spa-layout"),
  data
);
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
