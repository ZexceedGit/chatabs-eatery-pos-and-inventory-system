
import '../pages-css/GalleryExpanded.css'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import placeholder from '../assets/images/ExpandedStory1.png'
const years = ['All', '2026', '2025', '2024', '2023', '2022']

const galleryImages = [
    { image: placeholder, year: '2026' },
    { image: placeholder, year: '2026' },
    { image: placeholder, year: '2026' },
    { image: placeholder, year: '2026' },
    { image: placeholder, year: '2026' },
    { image: placeholder, year: '2026' },
    { image: placeholder, year: '2026' },
    { image: placeholder, year: '2026' },
    { image: placeholder, year: '2026' },
    { image: placeholder, year: '2026' }
]

const GalleryExpanded = () => {
    return (
        <>
            <Navbar />

            <main className="chatabs-gallery-page">
                <section className="chatabs-gallery-container">

                    <header className="chatabs-gallery-header">
                        <div className="chatabs-gallery-header-top">

                            <div className="chatabs-gallery-title-group">
                                <span className="chatabs-gallery-subtitle">
                                    FROM OUR GALLERY
                                </span>

                                <h1>From Our Gallery</h1>
                            </div>

                            <div className="chatabs-gallery-years">
                                {years.map((year, index) => (
                                    <button
                                        type="button"
                                        className={`chatabs-gallery-year ${index === 0 ? 'active' : ''}`}
                                        key={year}
                                    >
                                        {year}
                                    </button>
                                ))}
                            </div>

                        </div>

                        <div className="chatabs-gallery-header-line"></div>
                    </header>

                    <section className="chatabs-gallery-grid">
                        {galleryImages.map((item, index) => (
                            <div
                                className={`chatabs-gallery-item chatabs-gallery-item-${index + 1}`}
                                key={index}
                            >
                                <img
                                    src={item.image}
                                    alt={`Chatabs gallery photo ${index + 1}`}
                                />
                            </div>
                        ))}
                    </section>

                    <nav
                        className="chatabs-gallery-pagination"
                        aria-label="Gallery pagination"
                    >
                        <button
                            type="button"
                            className="chatabs-gallery-pagination-arrow"
                            aria-label="Previous page"
                        >
                            &larr;
                        </button>

                        <button
                            type="button"
                            className="chatabs-gallery-pagination-number active"
                        >
                            1
                        </button>

                        <button
                            type="button"
                            className="chatabs-gallery-pagination-number"
                        >
                            2
                        </button>

                        <button
                            type="button"
                            className="chatabs-gallery-pagination-number"
                        >
                            3
                        </button>

                        <span className="chatabs-gallery-pagination-dots">
                            ...
                        </span>

                        <button
                            type="button"
                            className="chatabs-gallery-pagination-number"
                        >
                            5
                        </button>

                        <button
                            type="button"
                            className="chatabs-gallery-pagination-arrow"
                            aria-label="Next page"
                        >
                            &rarr;
                        </button>
                    </nav>

                </section>
            </main>

            <Footer />
        </>
    )
}

export default GalleryExpanded
