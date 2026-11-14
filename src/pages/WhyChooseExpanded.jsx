import '../pages-css/WhyChooseExpanded.css'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import placeholder from '../assets/images/ExpandedStory1.png'

const relatedArticles = [
    {
        title: 'The Story Behind Chatabs',
        description: 'Get to know how Chatabs started and how it became what it is today.',
        image: '../assets/images/articles/chatabs-story.jpg'
    },
    {
        title: 'Our Best-Selling Favorites',
        description: 'Discover the dishes that keep our customers coming back for more.',
        image: '../assets/images/articles/best-sellers.jpg'
    },
    {
        title: 'Good Food, Great Moments',
        description: 'A closer look at the food, people, and moments that make Chatabs special.',
        image: '../assets/images/articles/great-moments.jpg'
    }
]

const WhyChooseExpanded = () => {
    return (
        <>
            <Navbar />

            <main className="article-page">
                <article className="article-container">
                    <header className="article-header">
                        <span className="article-category">FEATURES</span>

                        <h1>More Than a Meal: What Makes Chatabs Special</h1>

                        <div className="article-meta">
                            <span>November 12, 2026</span>
                            <span className="article-meta-divider">•</span>
                            <span>12:30 PM</span>
                            <span className="article-meta-divider">•</span>
                            <span>4 min read</span>
                        </div>
                    </header>

                    <div className="article-featured-image">
                        <img
                            src={placeholder}
                            alt="A selection of Chatabs dishes"
                        />
                    </div>

                    <div className="article-content">
                        <p>
                            Finding a good place to eat is about more than just satisfying
                            your hunger. It is about enjoying food that feels familiar,
                            getting good value for your money, and having a place you can
                            always come back to. At Chatabs, we bring these simple things
                            together through our food and the experience we offer.
                        </p>

                        <p>
                            From our signature fried itik to our flavorful sisig and
                            satisfying silog meals, every dish is prepared to give
                            customers something worth enjoying. We offer a variety of
                            meals that suit different tastes, whether you are looking
                            for a quick bite or a filling meal with friends.
                        </p>

                        <p>
                            We also believe that good food should be accessible. That is
                            why Chatabs continues to serve affordable meals without
                            compromising the flavors our customers enjoy. Whether you
                            are a student, a local resident, or simply passing by, there
                            is always something on our menu for you.
                        </p>

                        <p>
                            More than anything, Chatabs is a place built around serving
                            people. As we continue to grow and improve, our goal remains
                            the same: to provide satisfying food, welcoming service, and
                            a dining experience that makes every visit worthwhile.
                        </p>
                    </div>
                </article>

                <section className="related-articles">
                    <div className="related-articles-heading">
                        <span>KEEP EXPLORING</span>
                        <h2>A Little More About Chatabs</h2>
                        <p>
                            There is more to discover. Explore our stories, favorite
                            dishes, and the things that make Chatabs what it is.
                        </p>
                    </div>

                    <div className="related-articles-grid">
                        {relatedArticles.map((article) => (
                            <article
                                className="related-article-card"
                                key={article.title}
                                style={{ backgroundImage: `url(${article.image})` }}
                            >
                                <div className="related-article-overlay"></div>

                                <button
                                    type="button"
                                    className="related-article-arrow"
                                    aria-label={`Read ${article.title}`}
                                >
                                    &rarr;
                                </button>

                                <div className="related-article-info">
                                    <h3>{article.title}</h3>
                                    <p>{article.description}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}

export default WhyChooseExpanded