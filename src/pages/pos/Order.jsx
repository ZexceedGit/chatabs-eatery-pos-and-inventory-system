
import '../../pages-css/Order.css';
import POSBar from '../../components/POSBar/POSBar';

import {
    Search,
    Plus,
    Minus,
    Trash2,
    ShoppingBag,
    UtensilsCrossed,
    Flame,
    UserRound,
    ArrowRight,
    ChevronDown
} from 'lucide-react';

const products = [
    {
        id: 1,
        name: 'Sisig Rice Meal',
        category: 'Meals',
        price: 99,
        tag: 'Best Seller',
        stock: 12,
        selectedCount: 1
    },
    {
        id: 2,
        name: 'Fried Itik Meal',
        category: 'Itik',
        price: 129,
        stock: 8
    },
    {
        id: 3,
        name: 'Tapsilog',
        category: 'Silog',
        price: 99,
        stock: 0
    },
    {
        id: 4,
        name: 'Hotsilog',
        category: 'Silog',
        price: 79,
        stock: 3
    },
    {
        id: 5,
        name: 'Classic Burger',
        category: 'Burgers',
        price: 69,
        stock: 10
    },
    {
        id: 6,
        name: 'Cheeseburger',
        category: 'Burgers',
        price: 79,
        stock: 6
    },
    {
        id: 7,
        name: 'Iced Tea',
        category: 'Drinks',
        price: 25,
        stock: 14
    },
    {
        id: 8,
        name: 'Bottled Water',
        category: 'Drinks',
        price: 20,
        stock: 20
    }
];

const categories = [
    'All Items',
    'Meals',
    'Itik',
    'Silog',
    'Burgers',
    'Drinks'
];

const orderItems = [
    {
        id: 1,
        name: 'Sisig Rice Meal',
        price: 99,
        quantity: 2,
        subtotal: 228,
        extras: [
            { name: 'Extra egg', price: 15 },
            { name: 'No onions', price: 0 }
        ]
    },
    {
        id: 2,
        name: 'Iced Tea',
        price: 25,
        quantity: 1,
        subtotal: 25,
        extras: [
            { name: 'Less ice', price: 0 }
        ]
    }
];

const formatPrice = (price) => {
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP'
    }).format(price);
};

const Order = () => {
    return (
        <div className="pos-order-layout">

            <POSBar />

            <main className="pos-order-page">

                <header className="pos-order-header">

                    <div className="pos-order-heading">
                        <h1>Orders</h1>
                        <p>
                            Friday, October 2. Ana M., shift started 8:00 AM.
                        </p>
                    </div>

                </header>

                <section className="pos-order-content">

                    <div className="pos-menu-panel">

                        <div className="pos-menu-toolbar">

                            <div className="pos-menu-search">
                                <Search size={18} />

                                <input
                                    type="text"
                                    placeholder="Search menu items..."
                                    readOnly
                                />

                            </div>

                        </div>

                        <div className="pos-menu-categories">

                            {categories.map((category, index) => (
                                <button
                                    type="button"
                                    key={category}
                                    className={`pos-category-button ${
                                        index === 0 ? 'active' : ''
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}

                        </div>

                        <div className="pos-menu-meta">

                            <div className="pos-hide-sold-out">
                                <span className="pos-checkbox"></span>
                                <span>Hide sold out</span>
                            </div>

                            <span className="pos-menu-count">
                                {products.length} Items
                            </span>

                        </div>

                        <div className="pos-products-grid">

                            {products.map((product) => {
                                const isSoldOut = product.stock === 0;
                                const isLowStock = product.stock > 0 && product.stock <= 5;

                                return (
                                    <article
                                        className={`pos-product-card ${
                                            isSoldOut ? 'sold-out' : ''
                                        } ${product.selectedCount ? 'selected' : ''}`}
                                        key={product.id}
                                    >

                                        {product.selectedCount && (
                                            <span className="pos-product-selected-count">
                                                {product.selectedCount}
                                            </span>
                                        )}

                                        <div className="pos-product-image">

                                            <span className="pos-product-image-placeholder">
                                                Product Image
                                            </span>

                                            {product.tag && !isSoldOut && (
                                                <span className="pos-product-tag">
                                                    <Flame size={12} />
                                                    {product.tag}
                                                </span>
                                            )}

                                            {isSoldOut && (
                                                <span className="pos-product-sold-label">
                                                    SOLD OUT
                                                </span>
                                            )}

                                        </div>

                                        <div className="pos-product-details">

                                            <h3>{product.name}</h3>

                                            <div className="pos-product-info">

                                                <span className={`pos-product-stock ${
                                                    isLowStock ? 'low-stock' : ''
                                                } ${isSoldOut ? 'unavailable' : ''}`}>
                                                    {isSoldOut
                                                        ? 'Unavailable'
                                                        : `${product.stock} pcs left`}
                                                </span>

                                                <span className="pos-product-price">
                                                    {formatPrice(product.price)}
                                                </span>

                                            </div>

                                        </div>

                                    </article>
                                );
                            })}

                        </div>

                    </div>

                    <aside className="pos-order-panel">

                        <div className="pos-cart-header">

                            <div>
                                <h2>Current Order</h2>
                                <p>New customer order</p>
                            </div>

                            <div className="pos-cart-icon">
                                <ShoppingBag size={20} />
                            </div>

                        </div>

                        <div className="pos-order-type">

                            <button type="button" className="active">
                                <UtensilsCrossed size={16} />
                                Dine In
                            </button>

                            <button type="button">
                                <ShoppingBag size={16} />
                                Takeout
                            </button>

                        </div>

                        <div className="pos-table-selection">

                            <label>Table Number</label>

                            <div className="pos-table-select">
                                <span>Table 01</span>
                                <ChevronDown size={16} />
                            </div>

                        </div>

                        <div className="pos-cart-divider"></div>

                        <div className="pos-cart-list-header">

                            <div>
                                <h3>Order Items</h3>
                                <span>3 items</span>
                            </div>

                            <button
                                type="button"
                                className="pos-cart-clear"
                            >
                                <Trash2 size={14} />
                                Clear
                            </button>

                        </div>

                        <div className="pos-cart-items">

                            {orderItems.map((item) => (
                                <div className="pos-cart-item" key={item.id}>

                                    <div className="pos-cart-item-image">
                                        <span>Image</span>
                                    </div>

                                    <div className="pos-cart-item-details">

                                        <div className="pos-cart-item-heading">
                                            <h4>{item.name}</h4>

                                            <strong>
                                                {formatPrice(item.subtotal)}
                                            </strong>
                                        </div>

                                        <div className="pos-cart-item-extras">

                                            {item.extras.map((extra) => (
                                                <div
                                                    className="pos-cart-item-extra"
                                                    key={extra.name}
                                                >
                                                    <span>{extra.name}</span>

                                                    <span>
                                                        {formatPrice(extra.price)}
                                                    </span>
                                                </div>
                                            ))}

                                        </div>

                                        <div className="pos-cart-item-controls">

                                            <div className="pos-cart-quantity">

                                                <button type="button">
                                                    <Minus size={13} />
                                                </button>

                                                <span>{item.quantity}</span>

                                                <button type="button">
                                                    <Plus size={13} />
                                                </button>

                                            </div>

                                            <button
                                                type="button"
                                                className="pos-cart-remove"
                                            >
                                                <Trash2 size={15} />
                                            </button>

                                        </div>

                                    </div>

                                </div>
                            ))}

                        </div>

                        <div className="pos-cart-summary">

                            <div className="pos-cart-total-row">
                                <span>Subtotal</span>
                                <span>₱253.00</span>
                            </div>

                            <div className="pos-cart-total-row">
                                <span>Additional Charges</span>
                                <span>₱0.00</span>
                            </div>

                            <div className="pos-cart-divider"></div>

                            <div className="pos-cart-grand-total">
                                <span>Total</span>
                                <strong>₱253.00</strong>
                            </div>

                            <button
                                type="button"
                                className="pos-checkout-button"
                            >
                                <span>Proceed to Payment</span>
                                <ArrowRight size={18} />
                            </button>

                            <div className="pos-cart-actions">

                                <button
                                    type="button"
                                    className="pos-send-kitchen"
                                >
                                    <UtensilsCrossed size={15} />
                                    Send to Kitchen
                                </button>

                                <button
                                    type="button"
                                    className="pos-clear-order"
                                >
                                    <Trash2 size={15} />
                                    Clear Order
                                </button>

                            </div>

                        </div>

                    </aside>

                </section>

            </main>

        </div>
    );
};

export default Order;
