
import '../pages-css/CashierPin.css';
import Logo from '../assets/images/Logo.png';

const CashierPin = () => {
    return (
        <div className="cashier-page">

            <div className="cashier-left">
                <div className="cashier-overlay"></div>

                <div className="cashier-logo">
                    <img src={Logo} alt="Chatabs Logo" />
                </div>

                <div className="cashier-left-content">
                    <h2>
                        Good service starts at the counter.
                    </h2>

                    <p>
                        Every great dining experience begins with
                        a friendly face. Get ready to serve, connect,
                        and make someone's day.
                    </p>

                    <div className="cashier-status-divider"></div>

                    <div className="cashier-status">
                        <div className="status-item">
                            <span className="status-indicator"></span>
                            <div>
                                <p>Network</p>
                                <h4>Online</h4>
                            </div>
                        </div>

                        <div className="status-item">
                            <div>
                                <p>Register</p>
                                <h4>03</h4>
                            </div>
                        </div>

                        <div className="status-item">
                            <div>
                                <p>System</p>
                                <h4>Operational</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="cashier-right">

                <div className="cashier-datetime">
                    <span>Monday, November 9, 2026</span>
                    <h4>08:30 AM</h4>
                </div>

                <div className="cashier-content">

                    <div className="cashier-heading">
                        <span className="cashier-label">EMPLOYEE ACCESS</span>
                        <h1>Clock in to start</h1>
                        <p>
                            Pick your name, then enter your 4-digit PIN
                            to get started.
                        </p>
                    </div>

                    <div className="employee-selection">
                        <button className="employee-option active">
                            <span>JD</span>
                            <p>John Doe</p>
                        </button>

                        <button className="employee-option">
                            <span>SM</span>
                            <p>Sarah Miller</p>
                        </button>

                        <button className="employee-option">
                            <span>MR</span>
                            <p>Mark Reyes</p>
                        </button>

                        <button className="employee-option">
                            <span>AC</span>
                            <p>Anna Cruz</p>
                        </button>
                    </div>

                    <div className="pin-section">
                        <p className="pin-label">
                            Enter PIN for <strong>John Doe</strong>
                        </p>

                        <div className="pin-indicators">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>

                    <div className="cashier-keypad">
                        <button>1</button>
                        <button>2</button>
                        <button>3</button>
                        <button>4</button>
                        <button>5</button>
                        <button>6</button>
                        <button>7</button>
                        <button>8</button>
                        <button>9</button>
                        <button className="key-action">Clear</button>
                        <button>0</button>
                        <button className="key-action">⌫</button>
                    </div>

                    <button className="clock-in-button">
                        Clock In <span>→</span>
                    </button>

                    <div className="manager-help">
                        <p>Not on the list?</p>
                        <a href="#">Get a manager</a>
                    </div>

                </div>

                <div className="cashier-footer">
                    <p>© 2026 Chatabs Eatery. All rights reserved.</p>
                    <span>POS SYSTEM · V1.0</span>
                </div>

            </div>

        </div>
    );
};

export default CashierPin;
