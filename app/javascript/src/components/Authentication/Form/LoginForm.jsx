import React from "react";

import { Input, Button } from "@bigbinary/neetoui/v2";

const LoginForm = ({ handleSubmit, setEmail, setPassword, loading }) => {
  return (
    <div
      className="flex items-center justify-center min-h-screen
      px-4 py-12 lg:px-8 bg-gray-50 sm:px-6 "
    >
      <div className="w-full max-w-md px-4 py-12 rounded-xl shadow-lg">
        <h2
          className="mt-6 text-3xl font-extrabold leading-9
          text-center text-bb-gray-700"
        >
          Login
        </h2>
        <form className="mt-8" onSubmit={handleSubmit}>
          <Input
            className="pb-4"
            label="Email"
            type="email"
            placeholder="oliver@example.com"
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            placeholder="********"
            onChange={e => setPassword(e.target.value)}
          />
          <div className="mt-6 flex flex-col items-center">
            <Button
              type="submit"
              size="large"
              label="Login"
              loading={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
