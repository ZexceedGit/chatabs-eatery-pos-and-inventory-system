
import { useMemo, useState } from "react";
import POSBar from "../../components/POSBar/POSBar";
import "../../pages-css/History.css";
import {
  Search,
  X,
  ReceiptText,
  TrendingUp,
  ShoppingBag,
  CheckCircle2,
  SlidersHorizontal,
  CalendarDays,
  Clock3,
  Banknote,
  CreditCard,
  Wallet,
  Utensils,
  Bike,
} from "lucide-react";

const historyOrders = [
  {
    id: "ORD-1048",
    source: "Table 03",
    type: "Dine In",
    customer: "Walk-in Customer",
    date: "Nov 21, 2026",
    time: "6:42 PM",
    payment: "Cash",
    status: "Paid",
    items: [
      {
        name: "Sisig Rice Meal",
        quantity: 2,
        price: 99,
        extras: [
          { name: "Extra egg", price: 15 },
          { name: "No onions", price: 0 },
        ],
      },
      {
        name: "Iced Tea",
        quantity: 1,
        price: 25,
        extras: [],
      },
    ],
    discount: 0,
  },
  {
    id: "ORD-1047",
    source: "Takeout",
    type: "Takeout",
    customer: "Mika Santos",
    date: "Nov 21, 2026",
    time: "6:31 PM",
    payment: "GCash",
    status: "Paid",
    items: [
      {
        name: "Classic Burger",
        quantity: 1,
        price: 69,
        extras: [],
      },
      {
        name: "Iced Tea",
        quantity: 1,
        price: 25,
        extras: [],
      },
    ],
    discount: 0,
  },
  {
    id: "ORD-1046",
    source: "Delivery",
    type: "Delivery",
    customer: "Patricia Reyes",
    date: "Nov 21, 2026",
    time: "6:18 PM",
    payment: "GCash",
    status: "Paid",
    items: [
      {
        name: "Fried Itik Meal",
        quantity: 2,
        price: 129,
        extras: [],
      },
      {
        name: "Bottled Water",
        quantity: 1,
        price: 20,
        extras: [],
      },
      {
        name: "Iced Tea",
        quantity: 1,
        price: 25,
        extras: [],
      },
    ],
    discount: 0,
  },
  {
    id: "ORD-1045",
    source: "Table 01",
    type: "Dine In",
    customer: "Walk-in Customer",
    date: "Nov 21, 2026",
    time: "5:54 PM",
    payment: "Cash",
    status: "Paid",
    items: [
      {
        name: "Tapsilog",
        quantity: 1,
        price: 99,
        extras: [],
      },
      {
        name: "Iced Tea",
        quantity: 1,
        price: 25,
        extras: [],
      },
    ],
    discount: 0,
  },
  {
    id: "ORD-1044",
    source: "Table 06",
    type: "Dine In",
    customer: "Walk-in Customer",
    date: "Nov 21, 2026",
    time: "5:32 PM",
    payment: "Cash",
    status: "Paid",
    items: [
      {
        name: "Sisig Rice Meal",
        quantity: 1,
        price: 99,
        extras: [{ name: "Extra egg", price: 15 }],
      },
    ],
    discount: 0,
  },
  {
    id: "ORD-1043",
    source: "Table 02",
    type: "Dine In",
    customer: "Walk-in Customer",
    date: "Nov 21, 2026",
    time: "4:48 PM",
    payment: "Card",
    status: "Paid",
    items: [
      {
        name: "Cheeseburger",
        quantity: 2,
        price: 79,
        extras: [],
      },
    ],
    discount: 0,
  },
  {
    id: "ORD-1042",
    source: "Takeout",
    type: "Takeout",
    customer: "Joshua Cruz",
    date: "Nov 21, 2026",
    time: "4:21 PM",
    payment: "GCash",
    status: "Paid",
    items: [
      {
        name: "Hotsilog",
        quantity: 1,
        price: 79,
        extras: [],
      },
      {
        name: "Iced Tea",
        quantity: 1,
        price: 25,
        extras: [],
      },
    ],
    discount: 0,
  },
  {
    id: "ORD-1041",
    source: "Delivery",
    type: "Delivery",
    customer: "Daniel Flores",
    date: "Nov 20, 2026",
    time: "8:15 PM",
    payment: "GCash",
    status: "Refunded",
    items: [
      {
        name: "Classic Burger",
        quantity: 1,
        price: 69,
        extras: [],
      },
      {
        name: "Cheeseburger",
        quantity: 1,
        price: 79,
        extras: [],
      },
      {
        name: "Bottled Water",
        quantity: 1,
        price: 20,
        extras: [],
      },
    ],
    discount: 0,
  },
];

const currencyFormatter = new Intl.NumberFormat("en-PH", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const formatPrice = (amount) => `₱${currencyFormatter.format(amount)}`;

const getSubtotal = (order) =>
  order.items.reduce((total, item) => {
    const itemTotal = item.price * item.quantity;
    const extrasTotal = item.extras.reduce(
      (extraTotal, extra) => extraTotal + extra.price,
      0
    );

    return total + itemTotal + extrasTotal;
  }, 0);

const getTotal = (order) => getSubtotal(order) - order.discount;

const filterOptions = [
  { label: "All Orders", value: "All" },
  { label: "Dine In", value: "Dine In", icon: Utensils },
  { label: "Takeout", value: "Takeout", icon: ShoppingBag },
  { label: "Delivery", value: "Delivery", icon: Bike },
];

const History = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const paidOrders = historyOrders.filter(
    (order) => order.status === "Paid"
  );

  const totalSales = paidOrders.reduce(
    (total, order) => total + getTotal(order),
    0
  );

  const averageOrder =
    paidOrders.length > 0 ? totalSales / paidOrders.length : 0;

  const filteredOrders = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return historyOrders.filter((order) => {
      const matchesFilter =
        activeFilter === "All" || order.type === activeFilter;

      const searchableContent = [
        order.id,
        order.source,
        order.type,
        order.customer,
        ...order.items.map((item) => item.name),
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchableContent.includes(search);

      return matchesFilter && matchesSearch;
    });
  }, [searchTerm, activeFilter]);

  const getPaymentIcon = (payment) => {
    if (payment === "Cash") return Banknote;
    if (payment === "GCash") return Wallet;
    return CreditCard;
  };

  return (
    <div className="pos-history-layout">
      <POSBar />

      <main className="pos-history-page">
        <header className="pos-history-header">
          <div>
            <h1>History</h1>
            <p>Review previous orders and transaction details.</p>
          </div>
        </header>

        <section className="pos-history-statistics">
          <article className="pos-history-stat-card">
            <div className="pos-history-stat-top">
              <span>Total Sales</span>
              <div className="pos-history-stat-icon sales">
                <TrendingUp size={19} />
              </div>
            </div>
            <h2>{formatPrice(totalSales)}</h2>
            <p>From paid orders</p>
          </article>

          <article className="pos-history-stat-card">
            <div className="pos-history-stat-top">
              <span>Total Orders</span>
              <div className="pos-history-stat-icon orders">
                <ShoppingBag size={19} />
              </div>
            </div>
            <h2>{historyOrders.length}</h2>
            <p>Recorded transactions</p>
          </article>

          <article className="pos-history-stat-card">
            <div className="pos-history-stat-top">
              <span>Average Order</span>
              <div className="pos-history-stat-icon average">
                <ReceiptText size={19} />
              </div>
            </div>
            <h2>{formatPrice(averageOrder)}</h2>
            <p>Average paid transaction</p>
          </article>

          <article className="pos-history-stat-card">
            <div className="pos-history-stat-top">
              <span>Paid Orders</span>
              <div className="pos-history-stat-icon paid">
                <CheckCircle2 size={19} />
              </div>
            </div>
            <h2>{paidOrders.length}</h2>
            <p>Successfully paid</p>
          </article>
        </section>

        <section className="pos-history-content">
          <div className="pos-history-toolbar">
            <div className="pos-history-search">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search order ID, item, or customer..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />

              {searchTerm && (
                <button
                  type="button"
                  className="pos-history-clear-search"
                  onClick={() => setSearchTerm("")}
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            <div className="pos-history-filters">
              <div className="pos-history-filter-label">
                <SlidersHorizontal size={16} />
                <span>Filter:</span>
              </div>

              <div className="pos-history-filter-options">
                {filterOptions.map((filter) => {
                  const FilterIcon = filter.icon;

                  return (
                    <button
                      type="button"
                      key={filter.value}
                      className={`pos-history-filter-button ${
                        activeFilter === filter.value ? "active" : ""
                      }`}
                      onClick={() => setActiveFilter(filter.value)}
                    >
                      {FilterIcon && <FilterIcon size={14} />}
                      {filter.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pos-history-table-heading">
            <div>
              <h2>Previous Orders</h2>
              <p>
                Showing {filteredOrders.length}{" "}
                {filteredOrders.length === 1 ? "order" : "orders"}
              </p>
            </div>
          </div>

          <div className="pos-history-table-wrapper">
            <table className="pos-history-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Table / Channel</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Date &amp; Time</th>
                  <th>Payment</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map((order) => {
                  const PaymentIcon = getPaymentIcon(order.payment);
                  const firstItem = order.items[0];
                  const remainingItems = order.items.length - 1;

                  return (
                    <tr
                      key={order.id}
                      className={
                        selectedOrder?.id === order.id ? "selected" : ""
                      }
                      onClick={() => setSelectedOrder(order)}
                    >
                      <td>
                        <span className="pos-history-order-id">
                          {order.id}
                        </span>
                      </td>

                      <td>
                        <div className="pos-history-source">
                          <span>{order.source}</span>
                          <small>{order.type}</small>
                        </div>
                      </td>

                      <td>
                        <div className="pos-history-item-preview">
                          <span>{firstItem.name}</span>
                          <small>
                            ×{firstItem.quantity}
                            {remainingItems > 0 &&
                              ` · +${remainingItems} more`}
                          </small>
                        </div>
                      </td>

                      <td>
                        <span className="pos-history-total">
                          {formatPrice(getTotal(order))}
                        </span>
                      </td>

                      <td>
                        <div className="pos-history-datetime">
                          <span>{order.date}</span>
                          <small>{order.time}</small>
                        </div>
                      </td>

                      <td>
                        <div className="pos-history-payment">
                          <PaymentIcon size={15} />
                          <span>{order.payment}</span>
                        </div>
                      </td>

                      <td>
                        <span
                          className={`pos-history-status ${
                            order.status === "Paid" ? "status-paid" : "status-refunded"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filteredOrders.length === 0 && (
              <div className="pos-history-empty">
                <div className="pos-history-empty-icon">
                  <Search size={22} />
                </div>
                <h3>No orders found</h3>
                <p>Try searching for another order or changing the filter.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {selectedOrder && (
        <>
          <button
            type="button"
            className="pos-history-drawer-overlay"
            onClick={() => setSelectedOrder(null)}
            aria-label="Close order details"
          />

          <aside className="pos-history-drawer">
            <div className="pos-history-drawer-header">
              <div>
                <h2>Order Details</h2>
                <p>Complete transaction information</p>
              </div>

              <button
                type="button"
                className="pos-history-drawer-close"
                onClick={() => setSelectedOrder(null)}
                aria-label="Close details"
              >
                <X size={19} />
              </button>
            </div>

            <div className="pos-history-drawer-content">
              <div className="pos-history-receipt">
                <div className="pos-history-receipt-brand">
                  <div className="pos-history-receipt-logo">
                    <ReceiptText size={23} />
                  </div>
                  <h3>CHATABS</h3>
                  <span>ORDER RECEIPT</span>
                </div>

                <div className="pos-history-receipt-order">
                  <div>
                    <span>Order ID</span>
                    <strong>{selectedOrder.id}</strong>
                  </div>

                  <span
                    className={`pos-history-status ${
                      selectedOrder.status === "Paid"
                        ? "status-paid"
                        : "status-refunded"
                    }`}
                  >
                    {selectedOrder.status}
                  </span>
                </div>

                <div className="pos-history-receipt-meta">
                  <div>
                    <span>
                      <CalendarDays size={13} />
                      Date
                    </span>
                    <strong>{selectedOrder.date}</strong>
                  </div>

                  <div>
                    <span>
                      <Clock3 size={13} />
                      Time
                    </span>
                    <strong>{selectedOrder.time}</strong>
                  </div>

                  <div>
                    <span>
                      <Utensils size={13} />
                      Order Type
                    </span>
                    <strong>{selectedOrder.type}</strong>
                  </div>

                  <div>
                    <span>
                      <ShoppingBag size={13} />
                      Table / Channel
                    </span>
                    <strong>{selectedOrder.source}</strong>
                  </div>
                </div>

                <div className="pos-history-receipt-divider" />

                <div className="pos-history-receipt-items">
                  <div className="pos-history-receipt-section-title">
                    <span>ORDER ITEMS</span>
                    <span>AMOUNT</span>
                  </div>

                  {selectedOrder.items.map((item, index) => {
                    const extrasTotal = item.extras.reduce(
                      (total, extra) => total + extra.price,
                      0
                    );

                    return (
                      <div
                        className="pos-history-receipt-item"
                        key={`${item.name}-${index}`}
                      >
                        <div className="pos-history-receipt-item-main">
                          <div>
                            <strong>{item.name}</strong>
                            <span>
                              {item.quantity} × {formatPrice(item.price)}
                            </span>
                          </div>

                          <strong>
                            {formatPrice(item.price * item.quantity + extrasTotal)}
                          </strong>
                        </div>

                        {item.extras.length > 0 && (
                          <div className="pos-history-receipt-extras">
                            {item.extras.map((extra, extraIndex) => (
                              <div key={`${extra.name}-${extraIndex}`}>
                                <span>• {extra.name}</span>
                                <span>
                                  {extra.price > 0
                                    ? `+ ${formatPrice(extra.price)}`
                                    : "No charge"}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="pos-history-receipt-divider" />

                <div className="pos-history-receipt-summary">
                  <div>
                    <span>Subtotal</span>
                    <strong>{formatPrice(getSubtotal(selectedOrder))}</strong>
                  </div>

                  {selectedOrder.discount > 0 && (
                    <div>
                      <span>Discount</span>
                      <strong>
                        -{formatPrice(selectedOrder.discount)}
                      </strong>
                    </div>
                  )}

                  <div className="pos-history-receipt-grand-total">
                    <span>Total</span>
                    <strong>{formatPrice(getTotal(selectedOrder))}</strong>
                  </div>
                </div>

                <div className="pos-history-receipt-divider" />

                <div className="pos-history-receipt-payment">
                  <h4>PAYMENT DETAILS</h4>

                  <div>
                    <span>Payment Method</span>
                    <strong>{selectedOrder.payment}</strong>
                  </div>

                  <div>
                    <span>Payment Status</span>
                    <span
                      className={`pos-history-status ${
                        selectedOrder.status === "Paid"
                          ? "status-paid"
                          : "status-refunded"
                      }`}
                    >
                      {selectedOrder.status}
                    </span>
                  </div>
                </div>

                <div className="pos-history-receipt-footer">
                  <span>Thank you for dining with us!</span>
                  <small>CHATABS · POS TRANSACTION RECORD</small>
                </div>
              </div>
            </div>
          </aside>
        </>
      )}
    </div>
  );
};

export default History;
