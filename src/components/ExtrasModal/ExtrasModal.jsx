
import { useEffect, useState } from "react";
import {
  X,
  Minus,
  Plus,
  Table2,
  UserRound,
  MessageSquareText,
  Image as ImageIcon,
} from "lucide-react";
import "./ExtrasModal.css";

const formatPrice = (price) =>
  `₱${Number(price || 0).toFixed(2)}`;

const defaultItem = {
  id: 1,
  name: "Sisig Rice Meal",
  price: 99,
  image:
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=85",
};

const defaultExtras = [
  { id: "egg", name: "Extra Egg", price: 15 },
  { id: "rice", name: "Extra Rice", price: 20 },
  { id: "cheese", name: "Extra Cheese", price: 15 },
  { id: "onions", name: "No Onions", price: 0 },
];

const ExtrasModal = ({
  isOpen,
  item = defaultItem,
  table = "Table 03",
  customer = "Ana M.",
  extras = defaultExtras,
  onClose,
  onAddToOrder,
}) => {
  const [internalOpen, setInternalOpen] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [notes, setNotes] = useState("");
  const [imageError, setImageError] = useState(false);

  const visible = isOpen ?? internalOpen;

  const availableExtras =
    extras.length > 0 ? extras : item?.extrasOptions || [];

  useEffect(() => {
    if (visible) {
      setQuantity(1);
      setSelectedExtras([]);
      setNotes("");
      setImageError(false);
    }
  }, [visible, item?.id, item?.name]);

  if (!visible || !item) return null;

  const unitPrice = Number(item.price || 0);

  const extrasTotal = selectedExtras.reduce(
    (total, extra) => total + Number(extra.price || 0),
    0
  );

  const total = (unitPrice + extrasTotal) * quantity;

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      setInternalOpen(false);
    }
  };

  const toggleExtra = (extra) => {
    setSelectedExtras((current) => {
      const exists = current.some(
        (selected) => selected.id === extra.id
      );

      if (exists) {
        return current.filter(
          (selected) => selected.id !== extra.id
        );
      }

      return [...current, extra];
    });
  };

  const handleAddToOrder = () => {
    const customizedItem = {
      ...item,
      quantity,
      extras: selectedExtras.map((extra) => ({
        name: extra.name,
        price: Number(extra.price || 0),
      })),
      notes: notes.trim(),
      subtotal: total,
    };

    onAddToOrder?.(customizedItem);
    handleClose();
  };

  const imageSource = item.image || item.imageUrl || item.thumbnail;

  return (
    <div className="extras-modal-overlay" onClick={handleClose}>
      <section
        className="extras-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="extras-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="extras-modal-header">
          <div>
            <span className="extras-modal-eyebrow">
              ORDER CUSTOMIZATION
            </span>
            <h2 id="extras-modal-title">Customize Item</h2>
            <p>Personalize this item before adding it to the order.</p>
          </div>

          <button
            type="button"
            className="extras-modal-close"
            onClick={handleClose}
            aria-label="Close modal"
          >
            <X size={19} />
          </button>
        </div>

        <div className="extras-modal-context">
          <div>
            <Table2 size={15} />
            <span>{table}</span>
          </div>

          <span className="extras-modal-context-divider" />

          <div>
            <UserRound size={15} />
            <span>{customer}</span>
          </div>
        </div>

        <div className="extras-modal-divider" />

        <div className="extras-modal-body">
          <div className="extras-modal-section-label">
            SELECTED ITEM
          </div>

          <div className="extras-modal-product">
            <div className="extras-modal-product-image">
              {imageSource && !imageError ? (
                <img
                  src={imageSource}
                  alt={item.name}
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="extras-modal-image-fallback">
                  <ImageIcon size={26} />
                  <span>No image</span>
                </div>
              )}
            </div>

            <div className="extras-modal-product-info">
              <h3>{item.name}</h3>
              <span className="extras-modal-product-price">
                {formatPrice(unitPrice)}
                <small> / item</small>
              </span>
            </div>

            <div className="extras-modal-quantity">
              <button
                type="button"
                onClick={() =>
                  setQuantity((current) => Math.max(1, current - 1))
                }
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>

              <span>{quantity}</span>

              <button
                type="button"
                onClick={() => setQuantity((current) => current + 1)}
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          <div className="extras-modal-section">
            <div className="extras-modal-section-heading">
              <div>
                <h3>Add Extras</h3>
                <p>Make this order just the way they like it.</p>
              </div>

              <span>OPTIONAL</span>
            </div>

            {availableExtras.length > 0 ? (
              <div className="extras-modal-options">
                {availableExtras.map((extra, index) => {
                  const extraId = extra.id ?? extra.name ?? index;

                  const isSelected = selectedExtras.some(
                    (selected) => selected.id === extraId
                  );

                  return (
                    <label
                      className={`extras-modal-option ${
                        isSelected ? "selected" : ""
                      }`}
                      key={extraId}
                    >
                      <div className="extras-modal-option-info">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() =>
                            toggleExtra({
                              ...extra,
                              id: extraId,
                            })
                          }
                        />

                        <span>{extra.name}</span>
                      </div>

                      <span className="extras-modal-option-price">
                        {Number(extra.price) > 0
                          ? `+ ${formatPrice(extra.price)}`
                          : "Free"}
                      </span>
                    </label>
                  );
                })}
              </div>
            ) : (
              <p className="extras-modal-no-options">
                No extras available for this item.
              </p>
            )}
          </div>

          <div className="extras-modal-section extras-modal-notes">
            <div className="extras-modal-section-heading">
              <div>
                <h3>Notes for Kitchen</h3>
                <p>Include any special preparation instructions.</p>
              </div>
              <MessageSquareText size={18} />
            </div>

            <div className="extras-modal-notes-input">
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Example: Make it extra crispy, sauce on the side..."
                rows={3}
                maxLength={200}
              />
            </div>

            <span className="extras-modal-character-count">
              {notes.length}/200
            </span>
          </div>
        </div>

        <div className="extras-modal-footer">
          <div className="extras-modal-total">
            <div>
              <span>Order total</span>
              <small>
                {quantity} {quantity === 1 ? "item" : "items"}
                {selectedExtras.length > 0 &&
                  ` · ${selectedExtras.length} extras`}
              </small>
            </div>

            <strong>{formatPrice(total)}</strong>
          </div>

          <div className="extras-modal-actions">
            <button
              type="button"
              className="extras-modal-cancel"
              onClick={handleClose}
            >
              Cancel
            </button>

            <button
              type="button"
              className="extras-modal-add"
              onClick={handleAddToOrder}
            >
              Add to Order
              <Plus size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExtrasModal;
