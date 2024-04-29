import React from 'react'
import '../../Css/admin.css'
import { usePassword } from '../../hooks/InputValidator';
import { Navigate } from 'react-router-dom';

const AdminLogin = () => {

    const isAdmin = true;

  const { pass, setpass, passFlag, passErr } = usePassword("");


      const signInSubmitHandler = (e) => {
        e.preventDefault();
      if (!passFlag) setcheck(passErr);
      else setcheck('')
        console.log("Sign In");
      };

      if(isAdmin) return <Navigate to='/admin/dashboard' />

  return (
    <div className="container" id="container" style={{width: '300px'}} >
    <div className="form-container sign-in">
      <form onSubmit={signInSubmitHandler}>
        <h1>Admin Log In</h1>
        <span>Use your Passkey to Login</span>
        <input
          type="password"
          placeholder="passkey"
          value={pass}
          onChange={(e) => setpass(e.currentTarget.value)}
          />
        <button type='submit'>Sign In</button>
      </form>
    </div>
          </div>
  );
}

export default AdminLogin