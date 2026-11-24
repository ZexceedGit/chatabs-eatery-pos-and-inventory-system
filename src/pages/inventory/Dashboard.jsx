import { useState } from "react";
import InventoryBar from "../../components/InventoryBar/InventoryBar";
import "../../pages-css/Dashboard.css";
import {
  Bell,
  Users,
  Package,
  CircleDollarSign,
  ShoppingBag,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ClipboardList,
  CheckCircle2,
} from "lucide-react";

const inventoryStats = [
  {
    label: "Total Customers",
    value: "128",
    growth: "8.2%",
    direction: "up",
    description: "customers vs last month",
    icon: Users,
    highlight: true,
  },
  {
    label: "Total Products",
    value: "48",
    growth: "2.1%",
    direction: "up",
    description: "products vs last month",
    icon: Package,
  },
  {
    label: "Total Sales",
    value: "₱34,850",
    growth: "12.4%",
    direction: "up",
    description: "sales vs last month",
    icon: CircleDollarSign,
  },
  {
    label: "Total Orders",
    value: "186",
    growth: "2.3%",
    direction: "down",
    description: "orders vs last month",
    icon: ShoppingBag,
  },
];

const dailyStats = [
  {
    label: "Orders Today",
    value: "98",
    unit: "orders",
    description: "3 are running late in the kitchen.",
    icon: ClipboardList,
  },
  {
    label: "Customers Today",
    value: "112",
    unit: "customers",
    description: "68 dine-in customers served today.",
    icon: Users,
  },
];

const lowStockItems = [
  { id: 1, name: "Pork", quantity: "2.5 kg" },
  { id: 2, name: "Eggs", quantity: "12 pcs" },
  { id: 3, name: "Cooking Oil", quantity: "1.5 L" },
  { id: 4, name: "Burger Buns", quantity: "4 pcs" },
];

const initialMenuItems = [
  { id: 1, name: "Sisig Rice Meal", category: "Meals", available: true },
  { id: 2, name: "Fried Itik Meal", category: "Itik", available: true },
  { id: 3, name: "Tapsilog", category: "Silog", available: true },
  { id: 4, name: "Hotsilog", category: "Silog", available: true },
  { id: 5, name: "Classic Burger", category: "Burgers", available: true },
  { id: 6, name: "Cheeseburger", category: "Burgers", available: false },
  { id: 7, name: "Iced Tea", category: "Drinks", available: true },
  { id: 8, name: "Bottled Water", category: "Drinks", available: true },
];

const Dashboard = () => {
  const [menuItems, setMenuItems] = useState(initialMenuItems);

  const availableCount = menuItems.filter(
    (item) => item.available
  ).length;

  const toggleAvailability = (id) => {
    setMenuItems((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, available: !item.available }
          : item
      )
    );
  };

  return (
    <div className="inventory-layout">
      <InventoryBar />

      <main className="inventory-page">
        <header className="inventory-page-header">
          <div>
            <span className="inventory-page-eyebrow">
              INVENTORY MANAGEMENT
            </span>
            <h1>Hello, Mr. Richard 👋</h1>
            <p>Here's what's happening with your inventory today.</p>
          </div>

          <div className="inventory-header-actions">
            <div className="inventory-header-date">
              Today's Overview
            </div>

            <button
              type="button"
              className="inventory-notification-button"
              aria-label="Notifications"
            >
              <Bell size={18} />
              <span />
            </button>
          </div>
        </header>

        <div className="inventory-dashboard-grid">
          <section className="inventory-stats-grid">
            {inventoryStats.map((stat) => {
              const Icon = stat.icon;
              const GrowthIcon =
                stat.direction === "up" ? TrendingUp : TrendingDown;

              return (
                <article
                  className={`inventory-stat-card ${
                    stat.highlight ? "inventory-stat-highlight" : ""
                  }`}
                  key={stat.label}
                >
                  <div className="inventory-stat-top">
                    <div className="inventory-stat-icon">
                      <Icon size={21} strokeWidth={1.9} />
                    </div>

                    <span
                      className={`inventory-stat-growth ${
                        stat.direction === "up"
                          ? "growth-up"
                          : "growth-down"
                      }`}
                    >
                      <GrowthIcon size={12} />
                      {stat.growth}
                    </span>
                  </div>

                  <div className="inventory-stat-content">
                    <span className="inventory-stat-label">
                      {stat.label}
                    </span>

                    <div className="inventory-stat-value-row">
                      <h2>{stat.value}</h2>
                      <span>{stat.description}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>

          <section className="inventory-panel inventory-low-stock-panel">
            <div className="inventory-panel-heading">
              <div>
                <div className="inventory-low-stock-title">
                  <h2>Low Stock Alerts</h2>
                  <span>{lowStockItems.length}</span>
                </div>

                <p>Items that need restocking</p>
              </div>

              <div className="inventory-panel-heading-icon inventory-low-stock-heading-icon">
                <ArrowUpRight size={21} strokeWidth={2} />
              </div>
            </div>

            <div className="inventory-low-stock-list">
              {lowStockItems.map((item) => (
                <div
                  className="inventory-low-stock-item"
                  key={item.id}
                >
                  <div className="inventory-low-stock-item-info">
                    <strong>{item.name}</strong>
                    <span>{item.quantity} left</span>
                  </div>

                  <button
                    type="button"
                    className="inventory-restock-button"
                  >
                    Restock
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="inventory-view-all-button"
            >
              View all low stock items
              <ArrowUpRight size={15} />
            </button>
          </section>

          <section className="inventory-daily-grid">
            {dailyStats.map((stat) => {
              const Icon = stat.icon;

              return (
                <article
                  className="inventory-daily-card"
                  key={stat.label}
                >
                  <div className="inventory-daily-top">
                    <div className="inventory-daily-icon">
                      <Icon size={22} strokeWidth={1.9} />
                    </div>

                    <button
                      type="button"
                      className="inventory-daily-arrow"
                      aria-label={`View ${stat.label} details`}
                    >
                      <ArrowUpRight size={18} />
                    </button>
                  </div>

                  <div className="inventory-daily-content">
                    <span>{stat.label}</span>
                    <h2>
                      {stat.value} <small>{stat.unit}</small>
                    </h2>
                    <p>{stat.description}</p>
                  </div>
                </article>
              );
            })}
          </section>

          <section className="inventory-panel inventory-menu-panel">
            <div className="inventory-panel-heading">
              <div>
                <h2>Menu Availability</h2>
                <p>POS item availability overview</p>
              </div>

              <div className="inventory-panel-heading-icon">
                <CheckCircle2 size={19} />
              </div>
            </div>

            <div className="inventory-menu-summary">
              <span>
                <span className="inventory-menu-summary-dot" />
                {availableCount} Available
              </span>

              <span>
                {menuItems.length - availableCount} Unavailable
              </span>
            </div>

            <div className="inventory-menu-list">
              {menuItems.slice(0, 4).map((item) => (
                <div
                  className="inventory-menu-item"
                  key={item.id}
                >
                  <div className="inventory-menu-item-info">
                    <strong>{item.name}</strong>
                    <span>{item.category}</span>
                  </div>

                  <div className="inventory-menu-item-control">
                    <span
                      className={
                        item.available
                          ? "menu-status-available"
                          : "menu-status-unavailable"
                      }
                    >
                      {item.available ? "Available" : "Unavailable"}
                    </span>

                    <button
                      type="button"
                      className={`inventory-toggle ${
                        item.available ? "active" : ""
                      }`}
                      role="switch"
                      aria-checked={item.available}
                      aria-label={`Toggle ${item.name} availability`}
                      onClick={() => toggleAvailability(item.id)}
                    >
                      <span />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="inventory-menu-footer"
            >
              View all {menuItems.length} menu items
              <ArrowUpRight size={14} />
            </button>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;