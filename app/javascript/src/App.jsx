import React, { useEffect, useState } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";
import { either, isEmpty, isNil } from "ramda";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";
import Login from "components/Authentication/Login";
import PrivateRoute from "components/Common/PrivateRoute";
import { getFromLocalStorage } from "helpers/storage";

import { registerIntercepts } from "./apis/axios";
import AttemptQuiz from "./components/AttemptQuiz";
import CheckQuiz from "./components/AttemptQuiz/CheckQuiz";
import Result from "./components/AttemptQuiz/Result";
import Dashboard from "./components/Dashboard";
import ErrorBoundary from "./components/ErrorBoundary";
import PageNotFound from "./components/ErrorBoundary/PageNotFound";
import NavBar from "./components/NavBar";
import AddQuestion from "./components/Questions/AddQuestion";
import EditQuestion from "./components/Questions/EditQuestion";
import AddQuiz from "./components/Quiz/AddQuiz";
import EditQuiz from "./components/Quiz/EditQuiz";
import ShowQuiz from "./components/Quiz/ShowQuiz";
import Report from "./components/Report";

const App = () => {
  const [loading, setLoading] = useState(true);
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken) && authToken !== "null";

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
    <div className="h-screen w-full flex flex-col">
      <Router>
        <ErrorBoundary>
          <ToastContainer />
          <NavBar isLoggedIn={isLoggedIn} />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/quiz/create" component={AddQuiz} />
            <Route exact path="/quiz/:id/edit" component={EditQuiz} />
            <Route exact path="/quiz/:id/show" component={ShowQuiz} />
            <Route exact path="/question/:id/create" component={AddQuestion} />
            <Route exact path="/public/:slug" component={CheckQuiz} />
            <Route exact path="/reports" component={Report} />
            <Route
              exact
              path="/public/:slug/attempt/new"
              component={AttemptQuiz}
            />
            <Route
              exact
              path="/public/:slug/attempt/:attemptId/result"
              component={Result}
            />
            <Route
              exact
              path="/quiz/:id/question/:quesId/edit"
              component={EditQuestion}
            />
            <PrivateRoute
              exact
              path="/"
              redirectRoute="/login"
              condition={isLoggedIn}
              component={Dashboard}
            />
            <Route component={PageNotFound} />
          </Switch>
        </ErrorBoundary>
      </Router>
    </div>
  );
};

export default App;
