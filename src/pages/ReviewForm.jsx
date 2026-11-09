import '../pages-css/ReviewForm.css'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import Logo from '../assets/images/Logo.png'
const ReviewForm = () => {
    return ( 
        <>
         <Navbar/>
           <div className="review-form">
              <div className="review-header">
                  <div className="review-logo">
                    <img src={Logo}/>
                  </div>
                  <div className="text-header">
                    <h1>Review Form</h1>
                    <p>What's your experience</p>
                  </div>
              </div>

              <div className="review-grid">
                <div className="review-info">
                     <div className="review-top">
                        <h2>Your voice shapes our kitchen</h2>
                        <p>Tell us about your visit. It only takes a minute</p>
                     </div>
                     <div className="review-middle">
                         <h2>What we're listening for</h2>
                         <div className='review-lists'>
                             <div className="review-list">
                                 <div class="profile-placeholder"></div>
                                 <div className="text-content">
                                     <h2>Food</h2>
                                     <p>Taste, freshness and presentation</p>
                                 </div>
                             </div>

                             <div className="review-list">
                                 <div class="profile-placeholder"></div>
                                 <div className="text-content">
                                     <h2>Food</h2>
                                     <p>Taste, freshness and presentation</p>
                                 </div>
                             </div>

                             <div className="review-list">
                                 <div class="profile-placeholder"></div>
                                 <div className="text-content">
                                     <h2>Food</h2>
                                     <p>Taste, freshness and presentation</p>
                                 </div>
                             </div>

                             <div className="review-list">
                                 <div className="profile-placeholder"></div>
                                 <div className="text-content">
                                     <h2>Food</h2>
                                     <p>Taste, freshness and presentation</p>
                                 </div>
                             </div>
                         </div> 

                             <div className="review-bottom">
                                <div className="review-box">
                                    <h2>Need help with an order?</h2>
                                    <p>Please contact us directly so we can put it right.</p>
                                    <div className="review-contact">
                                        <i>&darr;</i>
                                        <h3>(0000) 0000 - 0000</h3>
                                    </div>
                                       <div className="review-contact">
                                        <i>&darr;</i>
                                        <h3>(0000) 0000 - 0000</h3>
                                    </div>
                                </div>
                             </div> 

                             <div className="visit-us">
                                <h2>Visit us</h2>
                                <p>Mon–Fri 10:00–21:00<br/>Sat–Sun 09:00–22:00</p>
                                <p>123 Main Stree, Placeholder City</p>
                             </div>
                     </div>

                     <div className="form-grid">
                        <div className="form-ask">
                            <div className="text">
                                <h1>How was your meal?</h1>
                                <p>Your feedback help us improve our food and services</p>
                            </div>
                            <div className="form-icon">
                                <img src="#"></img>
                            </div>
                        </div>
                     </div>
                </div>
              </div>
           </div>
         <Footer/>
        </>
     );
}
 
export default ReviewForm;