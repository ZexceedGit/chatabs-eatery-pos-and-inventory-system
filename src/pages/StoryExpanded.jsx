
import '../pages-css/StoryExpanded.css'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import MainStory from '../assets/images/Story1.jpg'
import Story1 from '../assets/images/ExpandedStory1.png'
import Story2 from '../assets/images/ExpandedStory2.png'
import Story3 from '../assets/images/ExpandedStory3.png'
import Story4 from '../assets/images/ExpandedStory4.png'
import sdojadjd aodjaso dj ajdaosdj saodja

const StoryExpanded = () => {
    return (
        <>
            <Navbar />

            <div className="story-expanded">
                <div className="title">
                    <h1>Our Story</h1>
                    <p>Explore our selection of affordable favorites, freshly prepared and made to satisfy every craving.</p>
                </div>

                <div className="main-story">
                    <div className="story-text">
                        <h2>A Letter to Our Visitor</h2>
                        <div className="text-paragraph">
                            <p>Welcome to Chatabs. What began as a simple family dream has grown into a place where we share the food and flavors we love. Every dish is made with care, and we hope each visit feels warm, familiar, and special.</p>
                            <p>We are truly grateful to everyone who has supported Chatabs along the way. Every customer who walks through our doors becomes part of our story and reminds us why we started. As a family-run eatery, we hope to keep serving good food with genuine care while growing with our community. Thank you for choosing Chatabs and being part of our journey.</p>
                        </div>
                    </div>

                    <div className="story-image">
                        <img src={MainStory} alt="Our Story" />
                    </div>
                </div>

                <div className="story-timeline">
                    <div className="story-card">
                        <div className="mini-image">
                            <img src={Story1} alt="Chatabs 2020" />
                        </div>
                        <div className="mini-text">
                            <h1>2020</h1>
                            <h2>Where It All Began</h2>
                            <p>Welcome to Chatabs. What began as a simple family dream has grown into a place where we share food, flavors, and moments made with care. We hope every visit feels warm and special.</p>
                        </div>
                    </div>

                    <div className="story-card">
                        <div className="mini-image">
                            <img src={Story2} alt="Chatabs 2021" />
                        </div>
                        <div className="mini-text">
                            <h1>2021</h1>
                            <h2>Growing With Our Community</h2>
                            <p>As more people discovered Chatabs, our little family dream continued to grow. We are grateful for every customer who walked through our doors and became part of our journey.</p>
                        </div>
                    </div>

                    <div className="story-card">
                        <div className="mini-image">
                            <img src={Story3} alt="Chatabs 2022" />
                        </div>
                        <div className="mini-text">
                            <h1>2022</h1>
                            <h2>More Than Just Food</h2>
                            <p>We believe that good food brings people together. Every meal we prepare is an opportunity to create meaningful moments, share happiness, and make everyone feel at home.</p>
                        </div>
                    </div>

                    <div className="story-card">
                        <div className="mini-image">
                            <img src={Story4} alt="Chatabs 2023" />
                        </div>
                        <div className="mini-text">
                            <h1>2023</h1>
                            <h2>Our Journey Continues</h2>
                            <p>Today, we continue to serve our community with the same passion and dedication that started it all. Thank you for being part of the Chatabs story.</p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default StoryExpanded
