
import { useState } from "react";
import logo from "../../assets/images/logo.png";
import {
  LayoutDashboard,
  Package,
  Layers3,
  ShoppingBasket,
  FileText,
  MessageSquare,
  History,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import "./InventoryBar.css";

const inventoryItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Items", icon: Package },
  { label: "Categories", icon: Layers3 },
  { label: "Market List", icon: ShoppingBasket },
];

const websiteItems = [
  { label: "Articles", icon: FileText },
  { label: "Reviews", icon: MessageSquare },
];

const systemItems = [
  { label: "Activity Log", icon: History },
];

const InventoryBar = ({
  activePage = "Dashboard",
  onNavigate,
  onLogout,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigation = (page) => {
    onNavigate?.(page);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    setMenuOpen(false);

    if (onLogout) {
      onLogout();
      return;
    }

    window.alert("Logout has not been connected to the authentication system yet.");
  };

  const renderNavigation = (items) =>
    items.map((item) => {
      const Icon = item.icon;
      const active = item.label === activePage;

      return (
        <button
          type="button"
          key={item.label}
          className={`inventory-bar-link ${active ? "active" : ""}`}
          aria-current={active ? "page" : undefined}
          onClick={() => handleNavigation(item.label)}
        >
          <Icon size={18} strokeWidth={1.9} />
          <span>{item.label}</span>
        </button>
      );
    });

  return (
    <aside className={`inventory-bar ${menuOpen ? "menu-open" : ""}`}>
      <div className="inventory-bar-header">
        <div className="inventory-bar-brand">
          <img src={logo} alt="Chatabs logo" />

          <div>
            <h2>CHATABS</h2>
            <span>INVENTORY SYSTEM</span>
          </div>
        </div>

        <button
          type="button"
          className="inventory-bar-menu-toggle"
          onClick={() => setMenuOpen((current) => !current)}
          aria-label={menuOpen ? "Close inventory menu" : "Open inventory menu"}
          aria-expanded={menuOpen}
          aria-controls="inventory-bar-menu"
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      <div className="inventory-bar-content" id="inventory-bar-menu">
        <div className="inventory-bar-divider" />

        <div className="inventory-bar-section-label">
          INVENTORY
        </div>

        <nav className="inventory-bar-navigation">
          {renderNavigation(inventoryItems)}
        </nav>

        <div className="inventory-bar-divider" />

        <div className="inventory-bar-section-label">
          WEBSITE CONTENT
        </div>

        <nav className="inventory-bar-navigation">
          {renderNavigation(websiteItems)}
        </nav>

        <div className="inventory-bar-divider" />

        <div className="inventory-bar-section-label">
          SYSTEM
        </div>

        <nav className="inventory-bar-navigation">
          {renderNavigation(systemItems)}
        </nav>

        <div className="inventory-bar-bottom">
          <div className="inventory-bar-user">
            <div className="inventory-bar-avatar">CA</div>

            <div className="inventory-bar-user-info">
              <strong>Admin</strong>
              <span>Inventory Manager</span>
            </div>
          </div>

          <button
            type="button"
            className="inventory-bar-logout"
            onClick={handleLogout}
          >
            <LogOut size={17} strokeWidth={1.9} />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default InventoryBar;
