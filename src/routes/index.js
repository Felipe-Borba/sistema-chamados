import { Switch } from "react-router-dom";
import Customers from "../pages/Customers";
import Dashboard from "../pages/Dashboard";
import New from "../pages/New";
import Profile from "../pages/Profile";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import RouteWrapper from "./Route";

function Routes() {
  return (
    <Switch>
      <RouteWrapper exact path="/" component={SignIn} />
      <RouteWrapper exact path="/register" component={SignUp} />
      <RouteWrapper exact path="/dashboard" component={Dashboard} isPrivate />
      <RouteWrapper exact path="/profile" component={Profile} isPrivate />
      <RouteWrapper exact path="/customers" component={Customers} isPrivate />
      <RouteWrapper exact path="/new" component={New} isPrivate />
      <RouteWrapper exact path="/new/:id" component={New} isPrivate />
    </Switch>
  );
}

export default Routes;
