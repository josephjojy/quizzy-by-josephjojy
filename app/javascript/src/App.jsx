import React, { useEffect, useState } from "react";

// import { either, isEmpty, isNil } from "ramda";
// import PrivateRoute from "components/Common/PrivateRoute";
import { PageLoader } from "@bigbinary/neetoui/v2";
// import { getFromLocalStorage } from "helpers/storage";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";
import Login from "components/Authentication/Login";

import { registerIntercepts } from "./apis/axios";
import NavBar from "./components/NavBar";

const App = () => {
  const [loading, setLoading] = useState(true);
  // const authToken = getFromLocalStorage("authToken");
  // const isLoggedIn = !either(isNil, isEmpty)(authToken) && authToken !== "null";

  useEffect(() => {
    setAuthHeaders(setLoading);
    initializeLogger();
    registerIntercepts();
  }, []);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Router>
      <ToastContainer />
      <NavBar />
      <Switch>
        <Route exact path="/login" component={Login} />
        {/* <PrivateRoute
          path="/"
          redirectRoute="/login"
          condition={isLoggedIn}
          component={Dashboard}
        /> */}
      </Switch>
    </Router>
  );
};

export default App;
