import React from "react";
import { Link } from "react-router-dom";

const Hello = () => {
  return (
    <>
      <div>Hello</div>
      <Link to="/helloworld">navigate to helloworld</Link>
    </>
  );
};

export default Hello;
