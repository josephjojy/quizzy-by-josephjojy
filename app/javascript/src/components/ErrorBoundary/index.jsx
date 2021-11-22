import React from "react";

import { Home } from "@bigbinary/neeto-icons";
import { Button, Typography } from "@bigbinary/neetoui/v2";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    logger.error(error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    logger.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute top-0 left-0 flex flex-col justify-center items-center w-full h-full">
          <Typography style="h3" className="max-w-xs  text-center">
            You have landed somewhere unknown.
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
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
