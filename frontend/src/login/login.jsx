import "../style/styleLogin.css";

export default function Login() {
  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Login</h1>
        
        <form className="login-form">
          <div className="form-group">
            {/* <label htmlFor="email">Email</label> */}
            <input 
              type="email" 
              id="email" 
              placeholder="enter email" 
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            {/* <label htmlFor="password">Password</label> */}
            <input 
              type="password" 
              id="password" 
              placeholder="enter password" 
              className="form-input"
            />
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>
          
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}