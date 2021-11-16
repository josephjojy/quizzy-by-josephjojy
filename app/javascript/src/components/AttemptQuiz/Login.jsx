import React, { useState } from "react";

import { Input, Button } from "@bigbinary/neetoui/v2";
import Logger from "js-logger";

import attemptsApi from "../../apis/attempts";
import usersApi from "../../apis/users";

const Login = ({ setAttemptId, attemptQuiz, setUserId }) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = async event => {
    event.preventDefault();

    const payload = {
      first_name: firstName,
      last_name: lastName,
      email,
      password: "welcome",
      password_confirmation: "welcome",
    };

    const attempt_payload = {
      user_id: null,
      quiz_id: attemptQuiz.id,
    };

    try {
      const response = await usersApi.create({ user: payload });
      attempt_payload.user_id = await response.data.user;
      const resp = await attemptsApi.create({ attempt: attempt_payload });
      setUserId(response.data.user);
      setAttemptId(resp.data.attempt.id);
    } catch (error) {
      Logger.error(error);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen
      px-4 py-12 lg:px-8 bg-gray-50 sm:px-6"
    >
      <div className="w-full max-w-md px-4 py-12 rounded-xl shadow-lg">
        <h2
          className="mt-6 text-3xl font-extrabold leading-9
          text-center text-bb-gray-700"
        >
          Welcome to {attemptQuiz.name} Quiz
        </h2>
        <form
          className="mt-8 space-y-4"
          onSubmit={event => {
            handleSubmit(event);
          }}
        >
          <Input
            value={firstName}
            label="First Name"
            type="text"
            placeholder="Eve"
            onChange={e => setFirstName(e.target.value)}
            required
          />
          <Input
            value={lastName}
            label="Last Name"
            type="text"
            placeholder="Smith"
            onChange={e => setLastName(e.target.value)}
            required
          />
          <Input
            value={email}
            className="pb-4"
            label="Email"
            type="email"
            placeholder="eve@example.com"
            onChange={e => setEmail(e.target.value)}
            required
          />
          <div className="mt-6 flex flex-col items-center">
            <Button type="submit" size="large" label="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
