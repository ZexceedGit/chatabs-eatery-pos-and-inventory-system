import { useMemo, useState } from "react";
import InventoryBar from "../../components/InventoryBar/InventoryBar";
import "../../pages-css/MarketList.css";
import {
  Plus,
  Search,
  Package,
  AlertTriangle,
  AlertCircle,
  Trash2,
  X,
  FileSpreadsheet,
  ShoppingBasket,
  Check,
  ListFilter,
} from "lucide-react";

const inventoryIngredients = [
  {
    id: 1,
    name: "Pork",
    category: "Meat",
    currentStock: "0.8",
    stockUnit: "kg",
    suggestedQuantity: "3",
    suggestedUnit: "kg",
    status: "Low Stock",
  },
  {
    id: 2,
    name: "Eggs",
    category: "Meat & Poultry",
    currentStock: "1",
    stockUnit: "tray",
    suggestedQuantity: "2",
    suggestedUnit: "trays",
    status: "Low Stock",
  },
  {
    id: 3,
    name: "Cooking Oil",
    category: "Pantry",
    currentStock: "0",
    stockUnit: "L",
    suggestedQuantity: "2",
    suggestedUnit: "L",
    status: "Out of Stock",
  },
  {
    id: 4,
    name: "Rice",
    category: "Pantry",
    currentStock: "3",
    stockUnit: "kg",
    suggestedQuantity: "10",
    suggestedUnit: "kg",
    status: "Low Stock",
  },
  {
    id: 5,
    name: "Burger Buns",
    category: "Bakery",
    currentStock: "0",
    stockUnit: "pcs",
    suggestedQuantity: "2",
    suggestedUnit: "packs",
    status: "Out of Stock",
  },
  {
    id: 6,
    name: "Cheese",
    category: "Dairy",
    currentStock: "0.5",
    stockUnit: "pack",
    suggestedQuantity: "2",
    suggestedUnit: "packs",
    status: "Low Stock",
  },
  {
    id: 7,
    name: "Iced Tea Mix",
    category: "Drinks",
    currentStock: "1",
    stockUnit: "pack",
    suggestedQuantity: "2",
    suggestedUnit: "packs",
    status: "Low Stock",
  },
  {
    id: 8,
    name: "Fried Itik",
    category: "Meat",
    currentStock: "0",
    stockUnit: "pcs",
    suggestedQuantity: "5",
    suggestedUnit: "pcs",
    status: "Out of Stock",
  },
  {
    id: 9,
    name: "Burger Patty",
    category: "Meat",
    currentStock: "12",
    stockUnit: "pcs",
    suggestedQuantity: "2",
    suggestedUnit: "packs",
    status: "In Stock",
  },
  {
    id: 10,
    name: "Hotdog",
    category: "Meat",
    currentStock: "4",
    stockUnit: "pcs",
    suggestedQuantity: "2",
    suggestedUnit: "packs",
    status: "In Stock",
  },
];

const unitOptions = [
  "pcs",
  "kg",
  "g",
  "L",
  "mL",
  "pack",
  "packs",
  "tray",
  "trays",
  "bottle",
  "box",
  "sack",
];

const emptyProductForm = {
  name: "",
  category: "Other",
  quantity: "1",
  unit: "pcs",
};

function MarketList() {
  const [marketItems, setMarketItems] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState("inventory");
  const [inventoryView, setInventoryView] = useState("Both");
  const [inventorySearch, setInventorySearch] = useState("");
  const [selectedInventoryIds, setSelectedInventoryIds] = useState([]);

  const [productForm, setProductForm] = useState(emptyProductForm);
  const [formError, setFormError] = useState("");

  const filteredMarketItems = useMemo(() => {
    return marketItems.filter((item) => {
      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [marketItems, statusFilter, searchQuery]);

  const availableRestockItems = useMemo(() => {
    return inventoryIngredients.filter((item) => {
      const alreadyAdded = marketItems.some(
        (marketItem) => marketItem.inventoryId === item.id
      );

      return (
        !alreadyAdded &&
        (item.status === "Low Stock" || item.status === "Out of Stock")
      );
    });
  }, [marketItems]);

  const availableInventory = useMemo(() => {
    return availableRestockItems.filter((item) => {
      const matchesView =
        inventoryView === "Both" || item.status === inventoryView;

      const matchesSearch =
        item.name.toLowerCase().includes(inventorySearch.toLowerCase()) ||
        item.category.toLowerCase().includes(inventorySearch.toLowerCase());

      return matchesView && matchesSearch;
    });
  }, [availableRestockItems, inventoryView, inventorySearch]);

  const lowStockCount = availableRestockItems.filter(
    (item) => item.status === "Low Stock"
  ).length;

  const outOfStockCount = availableRestockItems.filter(
    (item) => item.status === "Out of Stock"
  ).length;

  const allVisibleSelected =
    availableInventory.length > 0 &&
    availableInventory.every((item) =>
      selectedInventoryIds.includes(item.id)
    );

  const openModal = () => {
    setModalTab("inventory");
    setInventoryView("Both");
    setInventorySearch("");
    setSelectedInventoryIds([]);
    setProductForm(emptyProductForm);
    setFormError("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormError("");
    setSelectedInventoryIds([]);
  };

  const toggleInventorySelection = (itemId) => {
    setSelectedInventoryIds((currentIds) =>
      currentIds.includes(itemId)
        ? currentIds.filter((id) => id !== itemId)
        : [...currentIds, itemId]
    );
  };

  const toggleSelectAllVisible = () => {
    const visibleIds = availableInventory.map((item) => item.id);

    if (allVisibleSelected) {
      setSelectedInventoryIds((currentIds) =>
        currentIds.filter((id) => !visibleIds.includes(id))
      );
    } else {
      setSelectedInventoryIds((currentIds) => [
        ...new Set([...currentIds, ...visibleIds]),
      ]);
    }
  };

  const addSelectedInventory = () => {
    const selectedItems = inventoryIngredients.filter((item) =>
      selectedInventoryIds.includes(item.id)
    );

    const newItems = selectedItems.map((item) => ({
      id: `inventory-${item.id}`,
      inventoryId: item.id,
      name: item.name,
      category: item.category,
      currentStock: item.currentStock,
      stockUnit: item.stockUnit,
      status: item.status,
      quantity: item.suggestedQuantity,
      unit: item.suggestedUnit,
    }));

    setMarketItems((currentItems) => [...currentItems, ...newItems]);
    closeModal();
  };

  const handleProductFormChange = (event) => {
    const { name, value } = event.target;

    setProductForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const addCustomProduct = (event) => {
    event.preventDefault();

    const name = productForm.name.trim();
    const quantity = Number(productForm.quantity);

    if (!name) {
      setFormError("Please enter an ingredient or product name.");
      return;
    }

    if (!Number.isFinite(quantity) || quantity <= 0) {
      setFormError("Please enter a quantity greater than zero.");
      return;
    }

    const duplicate = marketItems.some(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    );

    if (duplicate) {
      setFormError("This product is already in your market list.");
      return;
    }

    setMarketItems((currentItems) => [
      ...currentItems,
      {
        id: `custom-${Date.now()}`,
        inventoryId: null,
        name,
        category: productForm.category,
        currentStock: "—",
        stockUnit: "",
        status: "Custom",
        quantity: String(quantity),
        unit: productForm.unit,
      },
    ]);

    closeModal();
  };

  const updateQuantity = (itemId, quantity) => {
    setMarketItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const updateUnit = (itemId, unit) => {
    setMarketItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId ? { ...item, unit } : item
      )
    );
  };

  const removeItem = (itemId) => {
    setMarketItems((currentItems) =>
      currentItems.filter((item) => item.id !== itemId)
    );
  };

  return (
    <div className="market-list-page">
      <InventoryBar activePage="Market List" />

      <main className="market-list-main">
        <div className="market-list-container">
          <header className="market-list-header">
            <div className="market-list-heading">
              <div className="market-list-breadcrumb">
                <span>Inventory</span>
                <span>/</span>
                <span>Market List</span>
              </div>

              <h1>Market List</h1>
              <p>
                Organize the ingredients and supplies you need to purchase.
              </p>
            </div>
          </header>

          <section className="market-list-panel">
            <div className="market-list-toolbar">
              <div className="market-list-toolbar-left">
                <button
                  type="button"
                  className="market-list-add-button"
                  onClick={openModal}
                >
                  <Plus size={17} />
                  Add Ingredient
                </button>

                <div className="market-list-filter">
                  <ListFilter size={16} />
                  <select
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value)}
                    aria-label="Filter market list by stock status"
                  >
                    <option value="All">All Items</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                    <option value="Custom">Custom Items</option>
                  </select>
                </div>
              </div>

              <div className="market-list-search">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Search ingredients..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
              </div>
            </div>

            <div className="market-list-table-wrapper">
              <table className="market-list-table">
                <thead>
                  <tr>
                    <th>Ingredient / Product</th>
                    <th>Category</th>
                    <th>Current Stock</th>
                    <th>Stock Status</th>
                    <th>Quantity to Buy</th>
                    <th>Unit</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredMarketItems.length > 0 ? (
                    filteredMarketItems.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="market-list-item-name">
                            <div className="market-list-item-icon">
                              <Package size={17} />
                            </div>
                            <span>{item.name}</span>
                          </div>
                        </td>

                        <td>
                          <span className="market-list-category">
                            {item.category}
                          </span>
                        </td>

                        <td>
                          <span className="market-list-current-stock">
                            {item.currentStock === "—"
                              ? "—"
                              : `${item.currentStock} ${item.stockUnit}`}
                          </span>
                        </td>

                        <td>
                          {item.status === "Low Stock" && (
                            <span className="market-list-status status-low">
                              <AlertTriangle size={13} />
                              Low Stock
                            </span>
                          )}

                          {item.status === "Out of Stock" && (
                            <span className="market-list-status status-out">
                              <AlertCircle size={13} />
                              Out of Stock
                            </span>
                          )}

                          {item.status === "In Stock" && (
                            <span className="market-list-status status-in">
                              <Check size={13} />
                              In Stock
                            </span>
                          )}

                          {item.status === "Custom" && (
                            <span className="market-list-status status-custom">
                              Custom
                            </span>
                          )}
                        </td>

                        <td>
                          <input
                            className="market-list-quantity-input"
                            type="number"
                            min="0.1"
                            step="0.1"
                            value={item.quantity}
                            onChange={(event) =>
                              updateQuantity(item.id, event.target.value)
                            }
                            aria-label={`Quantity to buy for ${item.name}`}
                          />
                        </td>

                        <td>
                          <select
                            className="market-list-unit-select"
                            value={item.unit}
                            onChange={(event) =>
                              updateUnit(item.id, event.target.value)
                            }
                            aria-label={`Unit for ${item.name}`}
                          >
                            {unitOptions.map((unit) => (
                              <option key={unit} value={unit}>
                                {unit}
                              </option>
                            ))}
                          </select>
                        </td>

                        <td>
                          <button
                            type="button"
                            className="market-list-delete-button"
                            onClick={() => removeItem(item.id)}
                            aria-label={`Remove ${item.name}`}
                            title="Remove from market list"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">
                        <div className="market-list-empty">
                          <div className="market-list-empty-icon">
                            <ShoppingBasket size={27} />
                          </div>
                          <h3>
                            {marketItems.length === 0
                              ? "Your market list is empty"
                              : "No matching ingredients"}
                          </h3>
                          <p>
                            {marketItems.length === 0
                              ? "Add ingredients from your inventory or enter products you need to purchase."
                              : "Try changing the filter or search for another item."}
                          </p>

                          {marketItems.length === 0 && (
                            <button
                              type="button"
                              onClick={openModal}
                              className="market-list-empty-button"
                            >
                              <Plus size={16} />
                              Add your first ingredient
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="market-list-table-footer">
              <span>
                Showing {filteredMarketItems.length} of {marketItems.length}{" "}
                listed {marketItems.length === 1 ? "item" : "items"}
              </span>
              <span>Changes are kept in this page for now.</span>
            </div>
          </section>

          <div className="market-list-export-section">
            <div className="market-list-export-note">
              <div className="market-list-export-icon">
                <FileSpreadsheet size={21} />
              </div>

              <div>
                <h3>Export your market list</h3>
                <p>
                  Prepare your list so you can bring it with you when buying
                  supplies.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="market-list-export-button"
              disabled={marketItems.length === 0}
              title={
                marketItems.length === 0
                  ? "Add at least one item before exporting"
                  : "XLSX export will be available in a future update"
              }
            >
              <FileSpreadsheet size={17} />
              Export as XLSX
            </button>
          </div>
        </div>
      </main>

      {isModalOpen && (
        <div className="market-list-modal-overlay">
          <div className="market-list-modal">
            <div className="market-list-modal-header">
              <div className="market-list-modal-heading-icon">
                <ShoppingBasket size={20} />
              </div>

              <div className="market-list-modal-title">
                <h2>Add to Market List</h2>
                <p>Choose inventory ingredients or add your own product.</p>
              </div>

              <button
                type="button"
                className="market-list-modal-close"
                onClick={closeModal}
                aria-label="Close modal"
              >
                <X size={19} />
              </button>
            </div>

            <div className="market-list-modal-tabs">
              <button
                type="button"
                className={modalTab === "inventory" ? "active" : ""}
                onClick={() => {
                  setModalTab("inventory");
                  setFormError("");
                }}
              >
                <Package size={15} />
                From Inventory
              </button>

              <button
                type="button"
                className={modalTab === "custom" ? "active" : ""}
                onClick={() => {
                  setModalTab("custom");
                  setFormError("");
                }}
              >
                <Plus size={15} />
                Custom Product
              </button>
            </div>

            {modalTab === "inventory" && (
              <div className="market-list-inventory-picker">
                <div className="market-list-picker-toolbar">
                  <div className="market-list-picker-label">
                    <strong>Select ingredients</strong>
                    <span>
                      Only low-stock and out-of-stock items are shown.
                    </span>
                  </div>

                  <div className="market-list-stock-options">
                    <button
                      type="button"
                      className={
                        inventoryView === "Low Stock" ? "active low" : ""
                      }
                      onClick={() => setInventoryView("Low Stock")}
                    >
                      <AlertTriangle size={13} />
                      Low Stock
                      <span>{lowStockCount}</span>
                    </button>

                    <button
                      type="button"
                      className={
                        inventoryView === "Out of Stock" ? "active out" : ""
                      }
                      onClick={() => setInventoryView("Out of Stock")}
                    >
                      <AlertCircle size={13} />
                      Out of Stock
                      <span>{outOfStockCount}</span>
                    </button>

                    <button
                      type="button"
                      className={inventoryView === "Both" ? "active both" : ""}
                      onClick={() => setInventoryView("Both")}
                    >
                      Both
                      <span>{lowStockCount + outOfStockCount}</span>
                    </button>
                  </div>

                  <div className="market-list-picker-search">
                    <Search size={15} />
                    <input
                      type="text"
                      placeholder="Search ingredients..."
                      value={inventorySearch}
                      onChange={(event) =>
                        setInventorySearch(event.target.value)
                      }
                    />
                  </div>

                  <label className="market-list-select-all">
                    <span>
                      <strong>Select all</strong>
                      <small>
                        {availableInventory.length} matching ingredients
                      </small>
                    </span>

                    <input
                      type="checkbox"
                      checked={allVisibleSelected}
                      onChange={toggleSelectAllVisible}
                      disabled={availableInventory.length === 0}
                    />
                  </label>
                </div>

                <div className="market-list-picker-list">
                  {availableInventory.length > 0 ? (
                    availableInventory.map((item) => (
                      <label
                        className={`market-list-picker-item ${
                          selectedInventoryIds.includes(item.id)
                            ? "selected"
                            : ""
                        }`}
                        key={item.id}
                      >
                        <input
                          type="checkbox"
                          checked={selectedInventoryIds.includes(item.id)}
                          onChange={() =>
                            toggleInventorySelection(item.id)
                          }
                        />

                        <div className="market-list-picker-item-icon">
                          <Package size={17} />
                        </div>

                        <div className="market-list-picker-item-info">
                          <strong>{item.name}</strong>
                          <span>{item.category}</span>
                        </div>

                        <div className="market-list-picker-item-stock">
                          <strong>
                            {item.currentStock} {item.stockUnit}
                          </strong>
                          <span
                            className={
                              item.status === "Out of Stock" ? "out" : "low"
                            }
                          >
                            {item.status}
                          </span>
                        </div>
                      </label>
                    ))
                  ) : (
                    <div className="market-list-picker-empty">
                      <Package size={23} />
                      <strong>No available ingredients</strong>
                      <span>
                        Try another stock filter or search term.
                      </span>
                    </div>
                  )}
                </div>

                <div className="market-list-picker-footer">
                  <span>
                    {selectedInventoryIds.length} selected
                  </span>

                  <div>
                    <button
                      type="button"
                      className="market-list-cancel-button"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      className="market-list-confirm-button"
                      onClick={addSelectedInventory}
                      disabled={selectedInventoryIds.length === 0}
                    >
                      <Plus size={15} />
                      Add Selected
                    </button>
                  </div>
                </div>
              </div>
            )}

            {modalTab === "custom" && (
              <form
                className="market-list-custom-form"
                onSubmit={addCustomProduct}
              >
                <div className="market-list-form-group">
                  <label htmlFor="custom-product-name">
                    Ingredient / Product Name
                  </label>
                  <input
                    id="custom-product-name"
                    type="text"
                    name="name"
                    placeholder="e.g. Plastic containers"
                    value={productForm.name}
                    onChange={handleProductFormChange}
                    autoFocus
                  />
                </div>

                <div className="market-list-form-group">
                  <label htmlFor="custom-product-category">Category</label>
                  <select
                    id="custom-product-category"
                    name="category"
                    value={productForm.category}
                    onChange={handleProductFormChange}
                  >
                    <option value="Other">Other</option>
                    <option value="Meat">Meat</option>
                    <option value="Meat & Poultry">Meat & Poultry</option>
                    <option value="Pantry">Pantry</option>
                    <option value="Produce">Produce</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Drinks">Drinks</option>
                    <option value="Packaging">Packaging</option>
                    <option value="Cleaning Supplies">
                      Cleaning Supplies
                    </option>
                  </select>
                </div>

                <div className="market-list-form-row">
                  <div className="market-list-form-group">
                    <label htmlFor="custom-product-quantity">
                      Quantity to Buy
                    </label>
                    <input
                      id="custom-product-quantity"
                      type="number"
                      name="quantity"
                      min="0.1"
                      step="0.1"
                      value={productForm.quantity}
                      onChange={handleProductFormChange}
                    />
                  </div>

                  <div className="market-list-form-group">
                    <label htmlFor="custom-product-unit">Unit</label>
                    <select
                      id="custom-product-unit"
                      name="unit"
                      value={productForm.unit}
                      onChange={handleProductFormChange}
                    >
                      {unitOptions.map((unit) => (
                        <option key={unit} value={unit}>
                          {unit}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {formError && (
                  <p className="market-list-form-error">{formError}</p>
                )}

                <div className="market-list-custom-actions">
                  <button
                    type="button"
                    className="market-list-cancel-button"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="market-list-confirm-button"
                  >
                    <Plus size={15} />
                    Add to List
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MarketList;