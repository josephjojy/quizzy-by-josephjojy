import React from "react";

import { Home } from "@bigbinary/neeto-icons";
import { Button, Typography } from "@bigbinary/neetoui/v2";

const PageNotFound = () => {
  return (
    <div>
      <div className="absolute top-0 left-0 flex flex-col justify-center items-center w-full h-full">
        <Typography style="h3" className="max-w-xs  text-center">
          404!
          <br />
          Page not found.
        </Typography>
        <a href="/">
          <Button
            className="mt-5"
            icon={Home}
            label="Take me home"
            style="secondary"
            size="large"
            iconPosition="left"
          />
        </a>
      </div>
    </div>
  );
};

export default PageNotFound;
