
import '../../pages-css/Tables.css';
import POSBar from '../../components/POSBar/POSBar';

import {
    Table2,
    ShoppingBag,
    Bike,
    UserRound,
    Clock3,
    MapPin,
    Trash2,
    UtensilsCrossed
} from 'lucide-react';

const tables = [
    {
        id: 1,
        name: 'Table 1',
        seats: '4 seats',
        orders: [
            {
                id: 1,
                customer: 'Carlo',
                total: 395,
                items: [
                    { name: 'Sisig Rice Meal', quantity: 2, price: 198 },
                    { name: 'Fried Itik Meal', quantity: 1, price: 129 },
                    { name: 'Iced Tea', quantity: 2, price: 50 },
                    { name: 'Extra Egg', quantity: 1, price: 18 }
                ]
            },
            {
                id: 2,
                customer: 'Mika',
                total: 158,
                items: [
                    { name: 'Cheeseburger', quantity: 1, price: 79 },
                    { name: 'Fries', quantity: 1, price: 39 },
                    { name: 'Iced Tea', quantity: 1, price: 25 },
                    { name: 'Extra Cheese', quantity: 1, price: 15 }
                ]
            }
        ]
    },
    {
        id: 2,
        name: 'Table 2',
        seats: '2 seats',
        orders: [
            {
                id: 1,
                customer: 'Ana',
                total: 223,
                items: [
                    { name: 'Sisig Rice Meal', quantity: 2, price: 198 },
                    { name: 'Iced Tea', quantity: 1, price: 25 }
                ]
            }
        ]
    },
    {
        id: 3,
        name: 'Table 3',
        seats: '4 seats',
        orders: []
    },
    {
        id: 4,
        name: 'Table 4',
        seats: '6 seats',
        orders: [
            {
                id: 1,
                customer: 'Joshua',
                total: 327,
                items: [
                    { name: 'Fried Itik Meal', quantity: 2, price: 258 },
                    { name: 'Bottled Water', quantity: 2, price: 40 },
                    { name: 'Extra Rice', quantity: 1, price: 29 }
                ]
            },
            {
                id: 2,
                customer: 'Mark',
                total: 99,
                items: [
                    { name: 'Tapsilog', quantity: 1, price: 99 }
                ]
            }
        ]
    },
    {
        id: 5,
        name: 'Table 5',
        seats: '2 seats',
        orders: []
    },
    {
        id: 6,
        name: 'Table 6',
        seats: '4 seats',
        orders: [
            {
                id: 1,
                customer: 'Angela',
                total: 148,
                items: [
                    { name: 'Classic Burger', quantity: 1, price: 69 },
                    { name: 'Cheeseburger', quantity: 1, price: 79 }
                ]
            }
        ]
    }
];

const offsiteOrders = [
    {
        id: 1,
        orderNumber: 'TO-001',
        type: 'Takeout',
        customer: 'Daniel',
        detail: 'Pickup at counter',
        time: '12:15 PM',
        total: 198,
        items: [
            { name: 'Sisig Rice Meal', quantity: 2, price: 198 }
        ]
    },
    {
        id: 2,
        orderNumber: 'TO-002',
        type: 'Takeout',
        customer: 'Samantha',
        detail: 'Pickup at counter',
        time: '12:25 PM',
        total: 124,
        items: [
            { name: 'Tapsilog', quantity: 1, price: 99 },
            { name: 'Iced Tea', quantity: 1, price: 25 }
        ]
    },
    {
        id: 3,
        orderNumber: 'TO-003',
        type: 'Takeout',
        customer: 'Gabriel',
        detail: 'Pickup at counter',
        time: '12:35 PM',
        total: 149,
        items: [
            { name: 'Fried Itik Meal', quantity: 1, price: 129 },
            { name: 'Bottled Water', quantity: 1, price: 20 }
        ]
    },
    {
        id: 4,
        orderNumber: 'DL-001',
        type: 'Delivery',
        customer: 'Patricia',
        detail: 'Barangay Malinta',
        time: '12:20 PM',
        total: 253,
        items: [
            { name: 'Sisig Rice Meal', quantity: 2, price: 198 },
            { name: 'Iced Tea', quantity: 1, price: 25 },
            { name: 'Bottled Water', quantity: 1, price: 20 },
            { name: 'Extra Egg', quantity: 1, price: 10 }
        ]
    },
    {
        id: 5,
        orderNumber: 'DL-002',
        type: 'Delivery',
        customer: 'Michael',
        detail: 'Barangay Batong Malake',
        time: '12:30 PM',
        total: 223,
        items: [
            { name: 'Fried Itik Meal', quantity: 1, price: 129 },
            { name: 'Tapsilog', quantity: 1, price: 99 }
        ]
    },
    {
        id: 6,
        orderNumber: 'DL-003',
        type: 'Delivery',
        customer: 'Christine',
        detail: 'Barangay San Antonio',
        time: '12:40 PM',
        total: 163,
        items: [
            { name: 'Classic Burger', quantity: 1, price: 69 },
            { name: 'Cheeseburger', quantity: 1, price: 79 },
            { name: 'Bottled Water', quantity: 1, price: 20 }
        ]
    }
];

const formatPrice = (price) => {
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP'
    }).format(price);
};

const Tables = () => {
    return (
        <div className="pos-tables-layout">

            <POSBar />

            <main className="pos-tables-page">

                <header className="pos-tables-header">

                    <div>
                        <h1>Tables</h1>
                        <p>Manage dine-in tables and off-premise orders.</p>
                    </div>

                    <div className="pos-tables-summary">
                        <span className="pos-tables-summary-dot"></span>
                        <span>6 Total Tables</span>
                    </div>

                </header>

                <div className="pos-tables-content">

                    <section className="pos-tables-section">

                        <div className="pos-tables-section-header">

                            <div>
                                <h2>Dine-In Tables</h2>
                                <p>Monitor table occupancy and active orders.</p>
                            </div>

                            <span className="pos-tables-section-count">
                                6 Tables
                            </span>

                        </div>

                        <div className="pos-tables-grid">

                            {tables.map((table) => (
                                <article
                                    className={`pos-table-card ${
                                        table.orders.length > 0 ? 'occupied' : 'available'
                                    }`}
                                    key={table.id}
                                >

                                    <div className="pos-table-card-header">

                                        <div className="pos-table-info">

                                            <div className="pos-table-icon">
                                                <Table2 size={23} strokeWidth={1.7} />
                                            </div>

                                            <div>
                                                <h3>{table.name}</h3>
                                                <p>{table.seats}</p>
                                            </div>

                                        </div>

                                        {table.orders.length > 0 && (
                                            <span className="pos-table-order-badge">
                                                {table.orders.length} {table.orders.length === 1 ? 'order' : 'orders'}
                                            </span>
                                        )}

                                    </div>

                                    <div className="pos-table-card-body">

                                        {table.orders.length === 0 ? (

                                            <div className="pos-table-empty">
                                                <span>No active orders</span>
                                            </div>

                                        ) : (

                                            <div className="pos-table-orders">

                                                {table.orders.map((order) => (
                                                    <div
                                                        className="pos-table-order"
                                                        key={order.id}
                                                    >

                                                        <div className="pos-table-order-header">
                                                            <h4>
                                                                Order {order.id}
                                                                <span> · {order.customer}</span>
                                                            </h4>
                                                        </div>

                                                        <div className="pos-table-order-items">

                                                            {order.items.map((item, index) => (
                                                                <div
                                                                    className="pos-table-order-item"
                                                                    key={index}
                                                                >
                                                                    <span>
                                                                        {item.name} × {item.quantity}
                                                                    </span>

                                                                    <span>
                                                                        {formatPrice(item.price)}
                                                                    </span>
                                                                </div>
                                                            ))}

                                                        </div>

                                                        <div className="pos-table-order-footer">

                                                            <strong>
                                                                Total {formatPrice(order.total)}
                                                            </strong>

                                                            <button type="button">
                                                                <Trash2 size={13} />
                                                                Clear
                                                            </button>

                                                        </div>

                                                    </div>
                                                ))}

                                            </div>

                                        )}

                                    </div>

                                </article>
                            ))}

                        </div>

                    </section>

                    <section className="pos-offsite-section">

                        <div className="pos-offsite-header">

                            <div>
                                <h2>Takeout & Delivery</h2>
                                <p>Orders placed for pickup and delivery.</p>
                            </div>

                            <span className="pos-offsite-count">
                                {offsiteOrders.length} Orders
                            </span>

                        </div>

                        <div className="pos-offsite-grid">

                            {offsiteOrders.map((order) => {
                                const isDelivery = order.type === 'Delivery';

                                return (
                                    <article
                                        className="pos-offsite-card"
                                        key={order.id}
                                    >

                                        <div className="pos-offsite-card-header">

                                            <div className="pos-offsite-customer">

                                                <div className="pos-offsite-avatar">
                                                    <UserRound size={21} />
                                                </div>

                                                <div>
                                                    <h3>{order.customer}</h3>
                                                    <p>{order.orderNumber}</p>
                                                </div>

                                            </div>

                                            <span className={`pos-offsite-type ${
                                                isDelivery ? 'delivery' : 'takeout'
                                            }`}>
                                                {isDelivery ? (
                                                    <Bike size={13} />
                                                ) : (
                                                    <ShoppingBag size={13} />
                                                )}

                                                {order.type}
                                            </span>

                                        </div>

                                        <div className="pos-offsite-details">

                                            <div className="pos-offsite-detail">
                                                {isDelivery ? (
                                                    <MapPin size={14} />
                                                ) : (
                                                    <ShoppingBag size={14} />
                                                )}

                                                <span>{order.detail}</span>
                                            </div>

                                            <div className="pos-offsite-detail">
                                                <Clock3 size={14} />
                                                <span>{order.time}</span>
                                            </div>

                                        </div>

                                        <div className="pos-offsite-divider"></div>

                                        <div className="pos-offsite-items">

                                            {order.items.map((item, index) => (
                                                <div
                                                    className="pos-offsite-item"
                                                    key={index}
                                                >
                                                    <span>
                                                        {item.name} × {item.quantity}
                                                    </span>

                                                    <span>
                                                        {formatPrice(item.price)}
                                                    </span>
                                                </div>
                                            ))}

                                        </div>

                                        <div className="pos-offsite-footer">

                                            <strong>
                                                Total {formatPrice(order.total)}
                                            </strong>

                                            <button type="button">
                                                <Trash2 size={13} />
                                                Clear
                                            </button>

                                        </div>

                                    </article>
                                );
                            })}

                        </div>

                    </section>

                </div>

            </main>

        </div>
    );
};

export default Tables;
