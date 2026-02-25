import React, { useState } from 'react'
import './Login.css'
import { login, signup } from '../../firebase'
import netflix_spinner from '../../assets/netflix_spinner.gif'
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [signState, setSignState] = useState("Sign In")
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const user_auth = async (event)=>{
    event.preventDefault();
    setLoading(true);
    let success = false;
    if(signState==="Sign In"){
      success = await login(email, password);
    }else{
      success = await signup(name, email, password);
    }
    setLoading(false);
    if(success) {
      // Handle successful authentication (e.g., redirect to home)
      navigate("/");
    }
  }


  return (
    loading?
    <div className='login-spinner'>
      <img src={netflix_spinner} alt="" />
    </div>:
    <div className='login'>
      <img src={logo} alt="" className='login-logo' />
      <div className="login-form">
        <h1> {signState}</h1>
        <form onSubmit={user_auth}>
          {signState === "Sign Up" && (
            <input type="name" placeholder='Your name' value={name} onChange={(e) => setName(e.target.value)} />
          )}
          <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type='submit' disabled={loading}>{loading ? <img src={netflix_spinner} alt="" /> : signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor=''>Remember me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>New to Netflix? <span onClick={() => setSignState("Sign Up")}>Sign Up Now</span></p>
          ) : (
            <p>Already have account? <span onClick={() => setSignState("Sign In")}>Sign In Now</span></p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login