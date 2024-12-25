import React from "react";

const Login = ({ handleLogin, login }) => {
  return (
    <div className="relative isolate overflow-hidden py-24 sm:py-32">
      <button className="text-white" onClick={handleLogin}>{login ? "Log out" : "Log in"}</button>
    </div>
  );
};

export default Login;
