import "../style/stylewelcome.css"
export default function Welcome() {
    return (
<div className="welcome-container">
<div className="content-overlay">
            <h1 className="welcome-title">Welcome Director!</h1>
            <div className="button-group">
                <button className="welcome-button login-button">
                    Login
                </button>
                <button className="welcome-button register-button">
                    Register
                </button>
            </div>
        </div>
</div>
    );
}