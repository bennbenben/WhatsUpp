import React from "react";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <div style={{ width: '100%', height: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <form onSubmit={handleSubmit} style={{background: 'grey', padding: '32px'}}>
       <div>
       <h3>Username</h3>
        <input type="text" />
       </div>
        <div>
        <h3>Password</h3>
        <input type="password" />
        </div>
        <button style={{marginTop: '32px'}} type="submit">Login</button>
      </form>
      </div>
    </div>
  );
};

export default Login;
