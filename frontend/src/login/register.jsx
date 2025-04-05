import "../style/styleRegister.css";
import { useDarkMode } from '../DarkModeProvider/DarkModeContext';
export default function Register() {
    const { darkMode } = useDarkMode();
  return (
    <div className={`register-container ${darkMode ? 'dark' : ''}`}>
      <div className="register-card">
        <h1 className="register-title">Register</h1>
        
        <form className="register-form">
          <div className="form-group">
            {/* <label htmlFor="username">Username</label> */}
            <input 
              type="text" 
              id="username" 
              placeholder="entrer username" 
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            {/* <label htmlFor="email">Email</label> */}
            <input 
              type="email" 
              id="email" 
              placeholder="entrer email" 
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            {/* <label htmlFor="password">Password</label> */}
            <input 
              type="password" 
              id="password" 
              placeholder="entrer password" 
              className="form-input"
            />
          </div>
          
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}