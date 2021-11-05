import React from "react";

import { Typography, Button } from "@bigbinary/neetoui/v2";
import { Header } from "@bigbinary/neetoui/v2/layouts";
import { resetAuthTokens } from "src/apis/axios";

import authApi from "apis/auth";
import { getFromLocalStorage, setToLocalStorage } from "helpers/storage";

const NavBar = ({ isLoggedIn }) => {
  const userName = getFromLocalStorage("authUserName");
  const handleLogout = async () => {
    try {
      await authApi.logout();
      setToLocalStorage({
        authToken: null,
        email: null,
        userId: null,
        userName: null,
      });
      resetAuthTokens();
      window.location.href = "/";
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div className="border-b-2 px-4">
      <Header
        title="Quizzy"
        actionBlock={
          isLoggedIn && (
            <>
              <Typography style="h4">Reports</Typography>
              <Typography className="px-4" style="h4">
                {userName}
              </Typography>
              <Button label="Logout" onClick={() => handleLogout()} />
            </>
          )
        }
      />
    </div>
  );
};

export default NavBar;
