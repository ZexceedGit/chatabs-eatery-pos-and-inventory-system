import './Footer.css'
const Footer = () => {
    return ( 
        <>
         <footer>
            <div className="footer-panel">
                <div className="footer-cta">
                    <h1>Ready to eat something new?</h1>
                    <button>Contact us</button>
                </div>
                
                <div className="footer-grid">
                    <div>
                        <div className="footer-brand">Chatabs</div>
                        <p>Lorem ipsum dolor sit amet consecterur adiplscing comet avurem</p>
                    </div>

                    <div>
                        <h4>Established</h4>
                        <div className="established-date">May 17 2020</div>
                         <p>Lorem ipsum dolor sit amet consecterur adiplscing comet avurem</p>
                    </div>

                    <div>
                        <h4>Contact us</h4>
                         <p>Lorem ipsum dolor sit amet consecterur adiplscing comet avurem</p>
                         <form className="newsletter" action="mailto:cedrickeusebio4@gmail.com" method="POST" enctype="text/plain">
                         <input type="text" required placeholder="Your name"/>
                         <button>Join &rarr;</button>
                         </form>
                    </div>
                </div>
                <div className='footer-wordmark'><span>C</span><span>h</span><span>a</span><span>t</span><span>a</span><span>b</span><span>s</span></div>
            </div>
         </footer>
        </>
     );
}
 
export default Footer;