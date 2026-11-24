import { useState } from "react";
import InventoryBar from "../../components/InventoryBar/InventoryBar";
import "../../pages-css/Stocks.css";
import {
  Search,
  Plus,
  Package,
  List,
  SlidersHorizontal,
  Pencil,
  X,
  ArrowDownToLine,
  ArrowUpFromLine,
  CheckCircle2,
  AlertTriangle,
  CircleX,
} from "lucide-react";

const initialItems = [
  {
    id: 1,
    name: "Pork",
    category: "Meat",
    quantity: 2.5,
    unit: "kg",
    lowStockAt: 5,
  },
  {
    id: 2,
    name: "Eggs",
    category: "Dairy & Eggs",
    quantity: 12,
    unit: "pcs",
    lowStockAt: 30,
  },
  {
    id: 3,
    name: "Cooking Oil",
    category: "Pantry",
    quantity: 1.5,
    unit: "L",
    lowStockAt: 3,
  },
  {
    id: 4,
    name: "Burger Buns",
    category: "Bakery",
    quantity: 4,
    unit: "pcs",
    lowStockAt: 12,
  },
  {
    id: 5,
    name: "Rice",
    category: "Pantry",
    quantity: 18,
    unit: "kg",
    lowStockAt: 10,
  },
  {
    id: 6,
    name: "Fried Itik",
    category: "Meat",
    quantity: 0,
    unit: "pcs",
    lowStockAt: 2,
  },
  {
    id: 7,
    name: "Sisig",
    category: "Meat",
    quantity: 6,
    unit: "kg",
    lowStockAt: 3,
  },
  {
    id: 8,
    name: "Soft Drinks",
    category: "Drinks",
    quantity: 24,
    unit: "pcs",
    lowStockAt: 12,
  },
];

const emptyForm = {
  name: "",
  category: "Meat",
  quantity: "0",
  unit: "kg",
  lowStockAt: "2",
};

const getItemStatus = (item) => {
  if (Number(item.quantity) <= 0) return "Out of Stock";
  if (Number(item.quantity) <= Number(item.lowStockAt)) return "Low Stock";
  return "In Stock";
};

const Stocks = () => {
  const [items, setItems] = useState(initialItems);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [modal, setModal] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");
  const [adjustmentType, setAdjustmentType] = useState("Stock In");
  const [adjustmentQuantity, setAdjustmentQuantity] = useState("");
  const [adjustmentReason, setAdjustmentReason] = useState("");

  const categories = [
    ...new Set(items.map((item) => item.category)),
  ].sort();

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "All Categories" ||
      item.category === categoryFilter;

    const matchesStatus =
      statusFilter === "All Status" ||
      getItemStatus(item) === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalItems = items.length;

  const inStockCount = items.filter(
    (item) => getItemStatus(item) === "In Stock"
  ).length;

  const lowStockCount = items.filter(
    (item) => getItemStatus(item) === "Low Stock"
  ).length;

  const outOfStockCount = items.filter(
    (item) => getItemStatus(item) === "Out of Stock"
  ).length;

  const overviewStats = [
    {
      label: "Total Items",
      value: totalItems,
      description: "registered inventory items",
      icon: Package,
    },
    {
      label: "In Stock",
      value: inStockCount,
      description: "items above stock threshold",
      icon: CheckCircle2,
    },
    {
      label: "Low Stock",
      value: lowStockCount,
      description: "items needing restocking",
      icon: AlertTriangle,
    },
    {
      label: "Out of Stock",
      value: outOfStockCount,
      description: "items currently unavailable",
      icon: CircleX,
    },
  ];

  const openDetails = (item) => {
    setSelectedItem(item);
    setModal("list");
  };

  const openAdjust = (item) => {
    setSelectedItem(item);
    setAdjustmentType("Stock In");
    setAdjustmentQuantity("");
    setAdjustmentReason("");
    setFormError("");
    setModal("adjust");
  };

  const openEdit = (item) => {
    setSelectedItem(item);
    setForm({
      name: item.name,
      category: item.category,
      quantity: String(item.quantity),
      unit: item.unit,
      lowStockAt: String(item.lowStockAt),
    });
    setFormError("");
    setModal("edit");
  };

  const openAdd = () => {
    setSelectedItem(null);
    setForm(emptyForm);
    setFormError("");
    setModal("add");
  };

  const closeModal = () => {
    setModal("");
    setSelectedItem(null);
    setFormError("");
  };

  const handleFormChange = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSaveItem = (event) => {
    event.preventDefault();

    const quantity = Number(form.quantity);
    const lowStockAt = Number(form.lowStockAt);

    if (!form.name.trim()) {
      setFormError("Please enter an item name.");
      return;
    }

    if (!form.unit.trim()) {
      setFormError("Please enter a unit.");
      return;
    }

    if (
      !Number.isFinite(quantity) ||
      quantity < 0 ||
      !Number.isFinite(lowStockAt) ||
      lowStockAt < 0
    ) {
      setFormError("Please enter valid stock quantities.");
      return;
    }

    const updatedItem = {
      name: form.name.trim(),
      category: form.category,
      quantity,
      unit: form.unit.trim(),
      lowStockAt,
    };

    if (modal === "add") {
      setItems((current) => [
        ...current,
        { id: Date.now(), ...updatedItem },
      ]);
    } else {
      setItems((current) =>
        current.map((item) =>
          item.id === selectedItem.id
            ? { ...item, ...updatedItem }
            : item
        )
      );
    }

    closeModal();
  };

  const handleAdjustment = (event) => {
    event.preventDefault();

    const amount = Number(adjustmentQuantity);

    if (!Number.isFinite(amount) || amount <= 0) {
      setFormError("Enter a quantity greater than zero.");
      return;
    }

    const currentQuantity = Number(selectedItem.quantity);

    const newQuantity =
      adjustmentType === "Stock In"
        ? currentQuantity + amount
        : currentQuantity - amount;

    if (newQuantity < 0) {
      setFormError("The stock quantity cannot go below zero.");
      return;
    }

    setItems((current) =>
      current.map((item) =>
        item.id === selectedItem.id
          ? { ...item, quantity: newQuantity }
          : item
      )
    );

    closeModal();
  };

  return (
    <div className="inventory-layout stocks-layout">
      <InventoryBar activePage="Items" />

      <main className="inventory-page stocks-page">
        <header className="stocks-header">
          <div>
            <span className="stocks-eyebrow">
              INVENTORY MANAGEMENT
            </span>
            <h1>Items</h1>
            <p>Manage your inventory items and monitor stock levels.</p>
          </div>

          <button
            type="button"
            className="stocks-add-button"
            onClick={openAdd}
          >
            <Plus size={17} />
            Add Item
          </button>
        </header>

        <section className="stocks-overview">
          {overviewStats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article className="stocks-overview-card" key={stat.label}>
                <div className="stocks-overview-top">
                  <div className="stocks-overview-icon">
                    <Icon size={20} strokeWidth={1.9} />
                  </div>
                </div>

                <div className="stocks-overview-content">
                  <span>{stat.label}</span>

                  <div className="stocks-overview-value-row">
                    <h2>{stat.value}</h2>
                    <p>{stat.description}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <section className="stocks-section">
          <div className="stocks-section-header">
            <div>
              <h2>Inventory Items</h2>
              <p>View and manage the items recorded in your inventory.</p>
            </div>

            <span className="stocks-result-count">
              {filteredItems.length} of {totalItems} items
            </span>
          </div>

          <div className="stocks-filters">
            <div className="stocks-search">
              <Search size={17} />

              <input
                type="text"
                placeholder="Search items..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />

              {search && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setSearch("")}
                >
                  <X size={15} />
                </button>
              )}
            </div>

            <div className="stocks-filter-select">
              <SlidersHorizontal size={15} />

              <select
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
                aria-label="Filter by category"
              >
                <option>All Categories</option>

                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="stocks-filter-select">
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                aria-label="Filter by stock status"
              >
                <option>All Status</option>
                <option>In Stock</option>
                <option>Low Stock</option>
                <option>Out of Stock</option>
              </select>
            </div>

            {(search ||
              categoryFilter !== "All Categories" ||
              statusFilter !== "All Status") && (
              <button
                type="button"
                className="stocks-clear-filter"
                onClick={() => {
                  setSearch("");
                  setCategoryFilter("All Categories");
                  setStatusFilter("All Status");
                }}
              >
                Clear filters
              </button>
            )}
          </div>

          <div className="stocks-table-wrap">
            <table className="stocks-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Category</th>
                  <th>In Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => {
                    const status = getItemStatus(item);

                    return (
                      <tr key={item.id}>
                        <td data-label="Item">
                          <div className="stocks-table-item">
                            <div className="stocks-table-item-icon">
                              <Package size={17} />
                            </div>
                            <strong>{item.name}</strong>
                          </div>
                        </td>

                        <td data-label="Category">
                          <span className="stocks-table-category">
                            {item.category}
                          </span>
                        </td>

                        <td data-label="In Stock">
                          <strong className="stocks-table-quantity">
                            {item.quantity} {item.unit}
                          </strong>
                        </td>

                        <td data-label="Status">
                          <span
                            className={`stocks-status ${
                              status === "In Stock"
                                ? "stocks-status-in-stock"
                                : status === "Low Stock"
                                ? "stocks-status-low-stock"
                                : "stocks-status-out-stock"
                            }`}
                          >
                            <span />
                            {status}
                          </span>
                        </td>

                        <td data-label="Actions">
                          <div className="stocks-item-actions">
                            <button
                              type="button"
                              className="stocks-item-action"
                              onClick={() => openDetails(item)}
                              aria-label={`View ${item.name} details`}
                              title="List"
                            >
                              <List size={15} />
                              <span>List</span>
                            </button>

                            <button
                              type="button"
                              className="stocks-item-action"
                              onClick={() => openAdjust(item)}
                              aria-label={`Adjust ${item.name} stock`}
                              title="Adjust"
                            >
                              <SlidersHorizontal size={15} />
                              <span>Adjust</span>
                            </button>

                            <button
                              type="button"
                              className="stocks-item-action"
                              onClick={() => openEdit(item)}
                              aria-label={`Edit ${item.name}`}
                              title="Edit"
                            >
                              <Pencil size={15} />
                              <span>Edit</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr className="stocks-empty-row">
                    <td colSpan="5">
                      <div className="stocks-empty">
                        <div>
                          <Package size={23} />
                        </div>
                        <strong>No items found</strong>
                        <span>
                          Try changing your search or filter selection.
                        </span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {modal && (
        <div
          className="stocks-modal-overlay"
          onClick={closeModal}
        >
          <section
            className="stocks-modal"
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="stocks-modal-header">
              <div>
                <span>INVENTORY ITEM</span>
                <h2>
                  {modal === "list"
                    ? "Item Details"
                    : modal === "adjust"
                    ? "Adjust Stock"
                    : modal === "edit"
                    ? "Edit Item"
                    : "Add New Item"}
                </h2>
              </div>

              <button
                type="button"
                className="stocks-modal-close"
                onClick={closeModal}
                aria-label="Close modal"
              >
                <X size={19} />
              </button>
            </div>

            {modal === "list" && selectedItem && (
              <div className="stocks-details">
                <div className="stocks-details-top">
                  <div className="stocks-details-icon">
                    <Package size={25} />
                  </div>

                  <div>
                    <h3>{selectedItem.name}</h3>
                    <span>{selectedItem.category}</span>
                  </div>
                </div>

                <div className="stocks-details-grid">
                  <div>
                    <span>Current Stock</span>
                    <strong>
                      {selectedItem.quantity} {selectedItem.unit}
                    </strong>
                  </div>

                  <div>
                    <span>Low Stock Threshold</span>
                    <strong>
                      {selectedItem.lowStockAt} {selectedItem.unit}
                    </strong>
                  </div>

                  <div>
                    <span>Stock Status</span>
                    <strong>{getItemStatus(selectedItem)}</strong>
                  </div>

                  <div>
                    <span>Category</span>
                    <strong>{selectedItem.category}</strong>
                  </div>
                </div>

                <button
                  type="button"
                  className="stocks-modal-primary"
                  onClick={closeModal}
                >
                  Done
                </button>
              </div>
            )}

            {modal === "adjust" && selectedItem && (
              <form
                className="stocks-form"
                onSubmit={handleAdjustment}
              >
                <div className="stocks-adjust-item">
                  <div className="stocks-table-item-icon">
                    <Package size={18} />
                  </div>

                  <div>
                    <strong>{selectedItem.name}</strong>
                    <span>
                      Current stock: {selectedItem.quantity} {selectedItem.unit}
                    </span>
                  </div>
                </div>

                <label className="stocks-field-label">
                  Adjustment Type
                </label>

                <div className="stocks-adjust-type">
                  <button
                    type="button"
                    className={
                      adjustmentType === "Stock In" ? "selected" : ""
                    }
                    onClick={() => {
                      setAdjustmentType("Stock In");
                      setFormError("");
                    }}
                  >
                    <ArrowDownToLine size={16} />
                    Stock In
                  </button>

                  <button
                    type="button"
                    className={
                      adjustmentType === "Stock Out" ? "selected" : ""
                    }
                    onClick={() => {
                      setAdjustmentType("Stock Out");
                      setFormError("");
                    }}
                  >
                    <ArrowUpFromLine size={16} />
                    Stock Out
                  </button>
                </div>

                <label className="stocks-field-label">
                  Quantity ({selectedItem.unit})
                </label>

                <input
                  className="stocks-input"
                  type="number"
                  min="0.01"
                  step="any"
                  placeholder="Enter quantity"
                  value={adjustmentQuantity}
                  onChange={(event) => {
                    setAdjustmentQuantity(event.target.value);
                    setFormError("");
                  }}
                />

                <label className="stocks-field-label">
                  Reason <span>Optional</span>
                </label>

                <input
                  className="stocks-input"
                  type="text"
                  placeholder="Enter adjustment reason"
                  value={adjustmentReason}
                  onChange={(event) =>
                    setAdjustmentReason(event.target.value)
                  }
                />

                {formError && (
                  <p className="stocks-form-error">{formError}</p>
                )}

                <div className="stocks-modal-actions">
                  <button
                    type="button"
                    className="stocks-modal-cancel"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="stocks-modal-primary"
                  >
                    Confirm Adjustment
                  </button>
                </div>
              </form>
            )}

            {(modal === "add" || modal === "edit") && (
              <form
                className="stocks-form"
                onSubmit={handleSaveItem}
              >
                <label className="stocks-field-label">
                  Item Name
                </label>

                <input
                  className="stocks-input"
                  type="text"
                  placeholder="Enter item name"
                  value={form.name}
                  onChange={(event) =>
                    handleFormChange("name", event.target.value)
                  }
                />

                <label className="stocks-field-label">
                  Category
                </label>

                <select
                  className="stocks-input"
                  value={form.category}
                  onChange={(event) =>
                    handleFormChange("category", event.target.value)
                  }
                >
                  {[
                    "Meat",
                    "Dairy & Eggs",
                    "Pantry",
                    "Bakery",
                    "Drinks",
                    "Other",
                  ].map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                <div className="stocks-form-row">
                  <div>
                    <label className="stocks-field-label">
                      Current Quantity
                    </label>

                    <input
                      className="stocks-input"
                      type="number"
                      min="0"
                      step="any"
                      value={form.quantity}
                      onChange={(event) =>
                        handleFormChange("quantity", event.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className="stocks-field-label">
                      Unit
                    </label>

                    <input
                      className="stocks-input"
                      type="text"
                      placeholder="kg, pcs, L"
                      value={form.unit}
                      onChange={(event) =>
                        handleFormChange("unit", event.target.value)
                      }
                    />
                  </div>
                </div>

                <label className="stocks-field-label">
                  Low Stock Threshold
                </label>

                <input
                  className="stocks-input"
                  type="number"
                  min="0"
                  step="any"
                  value={form.lowStockAt}
                  onChange={(event) =>
                    handleFormChange("lowStockAt", event.target.value)
                  }
                />

                {formError && (
                  <p className="stocks-form-error">{formError}</p>
                )}

                <div className="stocks-modal-actions">
                  <button
                    type="button"
                    className="stocks-modal-cancel"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="stocks-modal-primary"
                  >
                    {modal === "add" ? "Add Item" : "Save Changes"}
                  </button>
                </div>
              </form>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default Stocks;