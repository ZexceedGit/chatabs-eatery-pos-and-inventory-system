import '../pages-css/ReviewForm.css'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import Logo from '../assets/images/Logo.png'

const ReviewForm = () => {
    return (
        <>
            <Navbar />

            <main className="review-page">
                <div className="review-container">

                    <div className="review-header">
                        <div className="review-logo">
                            <img src={Logo} alt="Chatabs Logo" />
                        </div>

                        <div className="text-header">
                            <h1>Review Form</h1>
                            <p>What's your experience?</p>
                        </div>
                    </div>

                    <div className="review-grid">

                        <section className="review-info">
                            <div className="review-top">
                                <h2>Your voice shapes our kitchen</h2>
                                <p>
                                    Tell us about your visit. It only takes a minute.
                                </p>
                            </div>

                            <div className="review-middle">
                                <h2>What we're listening for</h2>

                                <div className="review-lists">
                                    <div className="review-list">
                                        <div className="profile-placeholder">🍽</div>

                                        <div className="text-content">
                                            <h2>Food</h2>
                                            <p>Taste, freshness and presentation.</p>
                                        </div>
                                    </div>

                                    <div className="review-list">
                                        <div className="profile-placeholder">♡</div>

                                        <div className="text-content">
                                            <h2>Service</h2>
                                            <p>Friendliness, speed and attentiveness.</p>
                                        </div>
                                    </div>

                                    <div className="review-list">
                                        <div className="profile-placeholder">★</div>

                                        <div className="text-content">
                                            <h2>Experience</h2>
                                            <p>Comfort, cleanliness and atmosphere.</p>
                                        </div>
                                    </div>

                                    <div className="review-list">
                                        <div className="profile-placeholder">+</div>

                                        <div className="text-content">
                                            <h2>Suggestions</h2>
                                            <p>Anything you'd like us to improve.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="review-bottom">
                                <div className="review-box">
                                    <h2>Need help with an order?</h2>

                                    <p>
                                        Please contact us directly so we can put it right.
                                    </p>

                                    <div className="review-contact">
                                        <i>↓</i>
                                        <h3>(0000) 0000 - 0000</h3>
                                    </div>

                                    <div className="review-contact">
                                        <i>↓</i>
                                        <h3>chatabs@gmail.com</h3>
                                    </div>
                                </div>
                            </div>

                            <div className="visit-us">
                                <h2>Visit us</h2>

                                <p>
                                    Mon–Fri 10:00–21:00
                                    <br />
                                    Sat–Sun 09:00–22:00
                                </p>

                                <p>
                                    Antique Compound,
                                    <br />
                                    Brgy. Malinta, Los Baños, Laguna
                                </p>
                            </div>
                        </section>

                        <section className="form-grid">
                            <div className="form-ask">
                                <div className="text">
                                    <h1>How was your meal?</h1>
                                    <p>
                                        Your feedback helps us improve our food and services.
                                    </p>
                                </div>

                                <div className="form-icon">
                                    <span>✦</span>
                                </div>
                            </div>

                            <div className="form-divider"></div>

                            <form className="review-form-content">

                                <div className="rating-section">
                                    <div className="rating-stars">
                                        <label>
                                            <input type="radio" name="rating" />
                                            <span>★</span>
                                        </label>

                                        <label>
                                            <input type="radio" name="rating" />
                                            <span>★</span>
                                        </label>

                                        <label>
                                            <input type="radio" name="rating" />
                                            <span>★</span>
                                        </label>

                                        <label>
                                            <input type="radio" name="rating" />
                                            <span>★</span>
                                        </label>

                                        <label>
                                            <input type="radio" name="rating" />
                                            <span>★</span>
                                        </label>
                                    </div>

                                    <div className="rating-indicator">
                                        <span>Excellent</span>
                                    </div>
                                </div>

                                <div className="form-section">
                                    <div className="section-heading">
                                        <h2>What could we improve?</h2>
                                    </div>

                                    <div className="choice-grid improvement-grid">
                                        <label className="choice-button">
                                            <input type="checkbox" name="improvements" />
                                            <span>Food quality</span>
                                        </label>

                                        <label className="choice-button">
                                            <input type="checkbox" name="improvements" />
                                            <span>Slow service</span>
                                        </label>

                                        <label className="choice-button">
                                            <input type="checkbox" name="improvements" />
                                            <span>Cleanliness</span>
                                        </label>

                                        <label className="choice-button">
                                            <input type="checkbox" name="improvements" />
                                            <span>Order accuracy</span>
                                        </label>

                                        <label className="choice-button">
                                            <input type="checkbox" name="improvements" />
                                            <span>Portion size</span>
                                        </label>

                                        <label className="choice-button">
                                            <input type="checkbox" name="improvements" />
                                            <span>Other</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="form-section">
                                    <div className="section-heading">
                                        <h2>How did you dine?</h2>
                                    </div>

                                    <div className="choice-grid dine-grid">
                                        <label className="choice-button">
                                            <input type="radio" name="dining" />
                                            <span>Dine in</span>
                                        </label>

                                        <label className="choice-button">
                                            <input type="radio" name="dining" />
                                            <span>Take out</span>
                                        </label>

                                        <label className="choice-button">
                                            <input type="radio" name="dining" />
                                            <span>Delivery</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="form-section">
                                    <div className="section-heading section-heading-between">
                                        <h2>Comments</h2>
                                        <span>Optional</span>
                                    </div>

                                    <textarea
                                        className="review-comments"
                                        name="comments"
                                        rows="5"
                                        placeholder="Share your thoughts..."
                                    ></textarea>
                                </div>

                                <div className="form-section">
                                    <div className="section-heading section-heading-between">
                                        <h2>Your name</h2>
                                        <span>Optional</span>
                                    </div>

                                    <input
                                        className="review-name"
                                        type="text"
                                        name="name"
                                        placeholder="Your name"
                                    />
                                </div>

                                <button type="submit" className="submit-review">
                                    Submit Review
                                    <span>→</span>
                                </button>

                            </form>
                        </section>

                    </div>
                </div>
            </main>

            <Footer />
        </>
    )
}

export default ReviewForm