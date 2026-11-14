import '../pages-css/Menu.css'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'

const menuItems = [
    {
        name: 'Fried Itik',
        price: '₱250',
        description: 'Our signature crispy fried duck, seasoned and cooked to golden perfection.',
        category: 'Best Sellers',
        image: '../assets/images/menu/fried-itik.jpg'
    },
    {
        name: 'Sisig',
        price: '₱120',
        description: 'Savory and flavorful sizzling sisig, served with a satisfying mix of spices.',
        category: 'Best Sellers',
        image: '../assets/images/menu/sisig.jpg'
    },
    {
        name: 'Porksilog',
        price: '₱95',
        description: 'A filling combination of pork, garlic rice, and a freshly cooked egg.',
        category: 'Silog Meals',
        image: '../assets/images/menu/porksilog.jpg'
    },
    {
        name: 'Tapsilog',
        price: '₱100',
        description: 'Tender marinated beef served with garlic rice and a sunny-side-up egg.',
        category: 'Silog Meals',
        image: '../assets/images/menu/tapsilog.jpg'
    },
    {
        name: 'Classic Burger',
        price: '₱85',
        description: 'A juicy burger patty with fresh vegetables and our house burger sauce.',
        category: 'Burgers',
        image: '../assets/images/menu/classic-burger.jpg'
    },
    {
        name: 'Cheese Burger',
        price: '₱100',
        description: 'A classic burger topped with melted cheese and our signature sauce.',
        category: 'Burgers',
        image: '../assets/images/menu/cheese-burger.jpg'
    },
    {
        name: 'Chicksilog',
        price: '₱95',
        description: 'Crispy chicken served with garlic rice and a freshly cooked egg.',
        category: 'Silog Meals',
        image: '../assets/images/menu/chicksilog.jpg'
    },
    {
        name: 'Sisig Rice',
        price: '₱110',
        description: 'A generous serving of flavorful sisig paired with warm steamed rice.',
        category: 'Rice Meals',
        image: '../assets/images/menu/sisig-rice.jpg'
    }
]

const categories = [
    'All',
    'Best Sellers',
    'Silog Meals',
    'Rice Meals',
    'Burgers',
    'Drinks'
]

const Menu = () => {
    return (
        <>
            <Navbar />

            <main className="menu-page">
                <section className="menu-heading">
                    <span className="menu-eyebrow">FRESHLY PREPARED, ALWAYS SATISFYING</span>
                    <h1>Our Menu</h1>
                    <p>
                        Discover your favorites, from our signature dishes
                        to satisfying everyday meals. There's always something
                        delicious waiting for you.
                    </p>
                </section>

                <section className="menu-content">
                    <div className="menu-search">
                        <span className="search-icon">⌕</span>
                        <input
                            type="search"
                            placeholder="Search for a dish..."
                            aria-label="Search menu"
                        />
                    </div>

                    <div className="menu-filters">
                        {categories.map((category, index) => (
                            <button
                                type="button"
                                className={`menu-filter ${index === 0 ? 'active' : ''}`}
                                key={category}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <div className="menu-results-heading">
                        <h2>Explore our dishes</h2>
                        <span>Our selection</span>
                    </div>

                    <div className="menu-grid">
                        {menuItems.map((item) => (
                            <article className="menu-item" key={item.name}>
                                <div className="menu-item-image">
                                    <img src={item.image} alt={item.name} />
                                </div>

                                <div className="menu-item-info">
                                    <div className="menu-item-heading">
                                        <h3>{item.name}</h3>
                                        <span className="menu-item-price">
                                            {item.price}
                                        </span>
                                    </div>

                                    <p>{item.description}</p>
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

export default Menu