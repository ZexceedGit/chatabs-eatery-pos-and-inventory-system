
import '../pages-css/Login.css';
import Logo from '../assets/images/Logo.png';

const Login = () => {
    return (
        <div className="login-page">

            <div className="login-left">

                <div className="login-logo">
                    <img src={Logo} alt="Chatabs Logo" />
                </div>

                <div className="login-content">

                    <div className="login-heading">
                        <h1>
                            <span className="greeting-emoji">👋</span>
                            Morning, Sir <span className="ignited1">Richard!</span>
                        </h1>
                        <p>Welcome back! Tara, Let's get the restaurant going!.</p>
                    </div>

                    <div className="login-form-container">

                        <button className="google-login" type="button">
                            <img
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                alt="Google"
                            />
                            Continue with Google
                        </button>

                        <div className="login-divider">
                            <span></span>
                            <p>OR</p>
                            <span></span>
                        </div>

                        <form className="login-form">

                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" id="username" placeholder="Enter your username" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" placeholder="Enter your password" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="pin">Security PIN</label>
                                <input
                                    type="password"
                                    id="pin"
                                    placeholder="Enter your 4-digit PIN"
                                    maxLength={4}
                                    inputMode="numeric"
                                    required
                                />
                            </div>

                            <div className="login-options">
                                <label className="remember-me">
                                    <input type="checkbox" />
                                    <span>Remember me</span>
                                </label>

                                <a href="/forgot-password">Forgot password?</a>
                            </div>

                            <button className="login-button" type="submit">
                                Login to Dashboard
                                <span>→</span>
                            </button>

                        </form>
                    </div>

                </div>

                <div className="login-copyright">
                    <p>© 2026 Chatabs Eatery. All rights reserved.</p>
                </div>

            </div>

            <div className="login-right">

                <div className="login-right-overlay"></div>


                <div className="login-right-content">
                    

                    <p>
                       “From our little kitchen to your table, every meal is made with
                        care, served with heart, and inspired by the flavors we grew
                        up loving.”
                    </p>

                    <div className="login-image-author">
                        <h4>Mr. Richard Dumalanta</h4>
                        <span>Owner</span>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Login;
