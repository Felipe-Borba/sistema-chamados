import { Switch } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import RouteWrapper from "./Route";

function Routes() {
  return (
    <Switch>
      <RouteWrapper exact path="/" component={SignIn} />
      <RouteWrapper exact path="/register" component={SignUp} />
      <RouteWrapper exact path="/dashboard" component={Dashboard} isPrivate />
    </Switch>
  );
}

export default Routes;
