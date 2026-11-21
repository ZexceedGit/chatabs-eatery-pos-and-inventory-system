
import { useEffect, useMemo, useState } from "react";
import {
  X,
  Plus,
  Minus,
  ReceiptText,
  Table2,
  UserRound,
  Banknote,
  Wallet,
  CheckCircle2,
  CreditCard,
} from "lucide-react";
import "./PaymentModal.css";

const formatPrice = (price) =>
  `₱${Number(price || 0).toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const defaultOrder = {
  id: "ORD-1050",
  table: "Table 03",
  customer: "Ana M.",
  discount: 0,
  items: [
    {
      id: "sisig",
      name: "Sisig Rice Meal",
      price: 99,
      quantity: 2,
      extras: [
        { name: "Extra Egg", price: 15 },
        { name: "No Onions", price: 0 },
      ],
    },
    {
      id: "iced-tea",
      name: "Iced Tea",
      price: 25,
      quantity: 2,
      extras: [],
    },
    {
      id: "burger",
      name: "Classic Burger",
      price: 69,
      quantity: 1,
      extras: [],
    },
  ],
};

const getItemKey = (item, index) =>
  String(item.id ?? item._id ?? `item-${index}`);

const getItemQuantity = (item) =>
  Number(item.quantity ?? item.qty ?? 1);

const getExtrasTotal = (item) =>
  (item.extras || []).reduce(
    (total, extra) => total + Number(extra.price || 0),
    0
  );

const getItemUnitTotal = (item) =>
  Number(item.price || 0) + getExtrasTotal(item);

const getItemLineTotal = (item) =>
  getItemUnitTotal(item) * getItemQuantity(item);

const getOrderSubtotal = (order) =>
  (order.items || []).reduce(
    (total, item) => total + getItemLineTotal(item),
    0
  );

const createInitialGuests = (order) => {
  const allocations = Object.fromEntries(
    (order.items || []).map((item, index) => [
      getItemKey(item, index),
      getItemQuantity(item),
    ])
  );

  return [
    {
      id: 1,
      label: "Guest 1",
      allocations,
      method: "Cash",
      amountReceived: "",
      reference: "",
      paid: false,
    },
  ];
};

const PaymentModal = ({
  isOpen,
  order = defaultOrder,
  table,
  customer,
  onClose,
  onMarkPaid,
}) => {
  const [internalOpen, setInternalOpen] = useState(true);
  const [guests, setGuests] = useState(() =>
    createInitialGuests(order)
  );
  const [activeGuestId, setActiveGuestId] = useState(1);

  const visible = isOpen ?? internalOpen;
  const items = order.items || [];
  const displayTable = table || order.table || "Table 03";
  const displayCustomer =
    customer || order.customer || "Walk-in Customer";

  useEffect(() => {
    if (visible) {
      setGuests(createInitialGuests(order));
      setActiveGuestId(1);
    }
  }, [visible, order.id]);

  const activeGuest = guests.find(
    (guest) => guest.id === activeGuestId
  ) || guests[0];

  const subtotal = useMemo(
    () => getOrderSubtotal(order),
    [order]
  );

  const discount = Number(order.discount || 0);
  const orderTotal = Math.max(0, subtotal - discount);

  const activeAmountDue = items.reduce((total, item, index) => {
    const key = getItemKey(item, index);
    const assignedQuantity = Number(
      activeGuest?.allocations[key] || 0
    );

    return total + assignedQuantity * getItemUnitTotal(item);
  }, 0);

  const totalAssigned = items.reduce((total, item, index) => {
    const key = getItemKey(item, index);

    const assigned = guests.reduce(
      (guestTotal, guest) =>
        guestTotal + Number(guest.allocations[key] || 0),
      0
    );

    return total + assigned;
  }, 0);

  const remainingItems = items.reduce((total, item, index) => {
    const key = getItemKey(item, index);

    const assigned = guests.reduce(
      (guestTotal, guest) =>
        guestTotal + Number(guest.allocations[key] || 0),
      0
    );

    return total + Math.max(0, getItemQuantity(item) - assigned);
  }, 0);

  const allItemsAllocated = remainingItems === 0;

  const activeChange = Math.max(
    0,
    Number(activeGuest?.amountReceived || 0) - activeAmountDue
  );

  const hasOtherUnpaidGuests = guests.some(
    (guest) => guest.id !== activeGuest?.id && !guest.paid
  );

  const paymentIsValid =
    activeGuest?.method === "GCash" ||
    Number(activeGuest?.amountReceived || 0) >= activeAmountDue;

  const canMarkPaid =
    Boolean(activeGuest) &&
    !activeGuest.paid &&
    activeAmountDue > 0 &&
    paymentIsValid &&
    (hasOtherUnpaidGuests || allItemsAllocated);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      setInternalOpen(false);
    }
  };

  const addGuest = () => {
    if (guests.some((guest) => guest.paid) || guests.length >= 8) {
      return;
    }

    const nextId =
      Math.max(...guests.map((guest) => guest.id)) + 1;

    const newGuest = {
      id: nextId,
      label: `Guest ${guests.length + 1}`,
      allocations: {},
      method: "Cash",
      amountReceived: "",
      reference: "",
      paid: false,
    };

    setGuests((current) => [...current, newGuest]);
    setActiveGuestId(nextId);
  };

  const updateActiveGuest = (field, value) => {
    setGuests((current) =>
      current.map((guest) =>
        guest.id === activeGuestId
          ? { ...guest, [field]: value }
          : guest
      )
    );
  };

  const changeAllocation = (key, itemQuantity, amount) => {
    setGuests((current) => {
      const currentGuest = current.find(
        (guest) => guest.id === activeGuestId
      );

      if (!currentGuest || currentGuest.paid) {
        return current;
      }

      const assignedToOthers = current
        .filter((guest) => guest.id !== activeGuestId)
        .reduce(
          (total, guest) =>
            total + Number(guest.allocations[key] || 0),
          0
        );

      const currentQuantity = Number(
        currentGuest.allocations[key] || 0
      );

      const maximumForGuest = Math.max(
        0,
        itemQuantity - assignedToOthers
      );

      const nextQuantity = Math.min(
        maximumForGuest,
        Math.max(0, currentQuantity + amount)
      );

      return current.map((guest) =>
        guest.id === activeGuestId
          ? {
              ...guest,
              allocations: {
                ...guest.allocations,
                [key]: nextQuantity,
              },
            }
          : guest
      );
    });
  };

  const handleExactAmount = () => {
    updateActiveGuest(
      "amountReceived",
      activeAmountDue.toFixed(2)
    );
  };

  const handleMarkPaid = () => {
    if (!canMarkPaid) return;

    const updatedGuests = guests.map((guest) =>
      guest.id === activeGuestId
        ? { ...guest, paid: true }
        : guest
    );

    setGuests(updatedGuests);

    const allGuestsPaid = updatedGuests.every(
      (guest) => guest.paid
    );

    if (allGuestsPaid && allItemsAllocated) {
      onMarkPaid?.({
        order,
        guests: updatedGuests,
        total: orderTotal,
        status: "Paid",
      });

      handleClose();
      return;
    }

    const nextGuest = updatedGuests.find(
      (guest) => !guest.paid
    );

    if (nextGuest) {
      setActiveGuestId(nextGuest.id);
    }
  };

  if (!visible || !activeGuest) return null;

  const canAddGuest =
    !guests.some((guest) => guest.paid) && guests.length < 8;

  return (
    <div
      className="pos-payment-overlay"
      onClick={handleClose}
    >
      <section
        className="pos-payment-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pos-payment-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="pos-payment-header">
          <div>
            <span className="pos-payment-eyebrow">
              CHATABS POS
            </span>
            <h2 id="pos-payment-title">Payment</h2>
          </div>

          <button
            type="button"
            className="pos-payment-close"
            onClick={handleClose}
            aria-label="Close payment"
          >
            <X size={19} />
          </button>
        </header>

        <div className="pos-payment-context">
          <div>
            <Table2 size={15} />
            <span>{displayTable}</span>
          </div>

          <span className="pos-payment-context-divider" />

          <div>
            <UserRound size={15} />
            <span>{displayCustomer}</span>
          </div>

          <span className="pos-payment-order-id">
            {order.id || "New Order"}
          </span>
        </div>

        <div className="pos-payment-main-divider" />

        <div className="pos-payment-columns">
          <section className="pos-payment-receipt-column">
            <div className="pos-payment-column-heading">
              <div>
                <h3>Order Summary</h3>
                <p>Review the items before accepting payment.</p>
              </div>

              <ReceiptText size={19} />
            </div>

            <div className="pos-payment-receipt">
              <div className="pos-payment-receipt-brand">
                <div className="pos-payment-receipt-logo">
                  <ReceiptText size={22} />
                </div>
                <h3>CHATABS</h3>
                <span>ORDER RECEIPT</span>
              </div>

              <div className="pos-payment-receipt-meta">
                <div>
                  <span>ORDER NUMBER</span>
                  <strong>{order.id || "New Order"}</strong>
                </div>

                <div>
                  <span>ORDER TYPE</span>
                  <strong>{displayTable}</strong>
                </div>
              </div>

              <div className="pos-payment-receipt-divider" />

              <div className="pos-payment-receipt-items-heading">
                <span>ITEM DESCRIPTION</span>
                <span>AMOUNT</span>
              </div>

              <div className="pos-payment-receipt-items">
                {items.map((item, index) => {
                  const itemExtras = item.extras || [];
                  const lineTotal = getItemLineTotal(item);

                  return (
                    <div
                      className="pos-payment-receipt-item"
                      key={getItemKey(item, index)}
                    >
                      <div className="pos-payment-receipt-item-main">
                        <div>
                          <h4>{item.name}</h4>
                          <span>
                            {getItemQuantity(item)} ×{" "}
                            {formatPrice(item.price)}
                          </span>
                        </div>

                        <strong>{formatPrice(lineTotal)}</strong>
                      </div>

                      {itemExtras.length > 0 && (
                        <div className="pos-payment-receipt-extras">
                          {itemExtras.map((extra, extraIndex) => (
                            <div
                              key={`${extra.name}-${extraIndex}`}
                            >
                              <span>{extra.name}</span>
                              <span>
                                {Number(extra.price) > 0
                                  ? `+ ${formatPrice(
                                      extra.price *
                                        getItemQuantity(item)
                                    )}`
                                  : "Free"}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {item.notes && (
                        <p className="pos-payment-receipt-note">
                          Note: {item.notes}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="pos-payment-receipt-divider" />

              <div className="pos-payment-receipt-totals">
                <div>
                  <span>Subtotal</span>
                  <strong>{formatPrice(subtotal)}</strong>
                </div>

                {discount > 0 && (
                  <div>
                    <span>Discount</span>
                    <strong>- {formatPrice(discount)}</strong>
                  </div>
                )}

                <div className="pos-payment-receipt-grand-total">
                  <span>Total</span>
                  <strong>{formatPrice(orderTotal)}</strong>
                </div>
              </div>

              <div className="pos-payment-receipt-footer">
                <span>Thank you for dining with us!</span>
                <small>PLEASE KEEP THIS RECEIPT</small>
              </div>
            </div>
          </section>

          <section className="pos-payment-form-column">
            <div className="pos-payment-column-heading pos-payment-who-heading">
              <div>
                <h3>Who is Paying?</h3>
                <p>
                  Add a guest if each person pays for their own items.
                </p>
              </div>

              <button
                type="button"
                className="pos-payment-add-guest"
                onClick={addGuest}
                disabled={!canAddGuest}
              >
                <Plus size={15} />
                Add Guest
              </button>
            </div>

            {guests.length > 1 && (
              <div className="pos-payment-guest-tabs">
                {guests.map((guest, index) => (
                  <button
                    type="button"
                    key={guest.id}
                    className={`pos-payment-guest-tab ${
                      activeGuestId === guest.id ? "active" : ""
                    } ${guest.paid ? "paid" : ""}`}
                    onClick={() => setActiveGuestId(guest.id)}
                  >
                    {`Guest ${index + 1}`}
                    {guest.paid && (
                      <CheckCircle2 size={13} />
                    )}
                  </button>
                ))}
              </div>
            )}

            <div className="pos-payment-guest-assignment">
              <div className="pos-payment-assignment-heading">
                <div>
                  <h4>
                    Items for{" "}
                    {`Guest ${
                      guests.findIndex(
                        (guest) => guest.id === activeGuestId
                      ) + 1
                    }`}
                  </h4>
                  <span>Select the quantities this guest will pay for.</span>
                </div>

                {activeGuest.paid && (
                  <span className="pos-payment-paid-label">
                    <CheckCircle2 size={13} />
                    Paid
                  </span>
                )}
              </div>

              <div className="pos-payment-assignment-list">
                {items.map((item, index) => {
                  const key = getItemKey(item, index);
                  const itemQuantity = getItemQuantity(item);
                  const assignedQuantity = Number(
                    activeGuest.allocations[key] || 0
                  );

                  const assignedToOthers = guests
                    .filter(
                      (guest) => guest.id !== activeGuestId
                    )
                    .reduce(
                      (total, guest) =>
                        total +
                        Number(guest.allocations[key] || 0),
                      0
                    );

                  const availableQuantity = Math.max(
                    0,
                    itemQuantity -
                      assignedQuantity -
                      assignedToOthers
                  );

                  return (
                    <div
                      className="pos-payment-assignment-item"
                      key={key}
                    >
                      <div className="pos-payment-assignment-info">
                        <strong>{item.name}</strong>
                        <span>
                          {formatPrice(getItemUnitTotal(item))} each
                        </span>
                        {assignedToOthers > 0 && (
                          <small>
                            {assignedToOthers} assigned to other guests
                          </small>
                        )}
                      </div>

                      <div className="pos-payment-item-stepper">
                        <button
                          type="button"
                          onClick={() =>
                            changeAllocation(key, itemQuantity, -1)
                          }
                          disabled={
                            activeGuest.paid ||
                            assignedQuantity <= 0
                          }
                          aria-label={`Remove ${item.name}`}
                        >
                          <Minus size={13} />
                        </button>

                        <span>{assignedQuantity}</span>

                        <button
                          type="button"
                          onClick={() =>
                            changeAllocation(key, itemQuantity, 1)
                          }
                          disabled={
                            activeGuest.paid ||
                            availableQuantity <= 0
                          }
                          aria-label={`Add ${item.name}`}
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {guests.length > 1 && remainingItems > 0 && (
                <div className="pos-payment-unassigned">
                  {remainingItems}{" "}
                  {remainingItems === 1 ? "item" : "items"} still need
                  to be assigned to a guest.
                </div>
              )}
            </div>

            <div className="pos-payment-method-section">
              <h4>Payment Method</h4>

              <div className="pos-payment-methods">
                <button
                  type="button"
                  className={`pos-payment-method ${
                    activeGuest.method === "Cash" ? "active" : ""
                  }`}
                  onClick={() =>
                    updateActiveGuest("method", "Cash")
                  }
                  disabled={activeGuest.paid}
                >
                  <Banknote size={17} />
                  Cash
                </button>

                <button
                  type="button"
                  className={`pos-payment-method ${
                    activeGuest.method === "GCash" ? "active" : ""
                  }`}
                  onClick={() =>
                    updateActiveGuest("method", "GCash")
                  }
                  disabled={activeGuest.paid}
                >
                  <Wallet size={17} />
                  GCash
                </button>
              </div>
            </div>

            <div className="pos-payment-due">
              <div>
                <span>Amount Due</span>
                <small>
                  {activeGuest.method === "Cash"
                    ? "Cash payment"
                    : "GCash payment"}
                </small>
              </div>

              <strong>{formatPrice(activeAmountDue)}</strong>
            </div>

            {activeGuest.method === "Cash" ? (
              <div className="pos-payment-cash-section">
                <label htmlFor="pos-payment-cash">
                  Amount Received
                </label>

                <div className="pos-payment-cash-input-row">
                  <div className="pos-payment-input-wrapper">
                    <span>₱</span>
                    <input
                      id="pos-payment-cash"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      value={activeGuest.amountReceived}
                      onChange={(event) =>
                        updateActiveGuest(
                          "amountReceived",
                          event.target.value
                        )
                      }
                      disabled={activeGuest.paid}
                    />
                  </div>

                  <button
                    type="button"
                    className="pos-payment-exact-button"
                    onClick={handleExactAmount}
                    disabled={
                      activeGuest.paid || activeAmountDue <= 0
                    }
                  >
                    Exact Amount
                  </button>
                </div>

                <div className="pos-payment-change">
                  <span>Change</span>
                  <strong>{formatPrice(activeChange)}</strong>
                </div>

                {Number(activeGuest.amountReceived || 0) <
                  activeAmountDue &&
                  Number(activeGuest.amountReceived || 0) > 0 && (
                    <p className="pos-payment-insufficient">
                      Remaining balance:{" "}
                      {formatPrice(
                        activeAmountDue -
                          Number(activeGuest.amountReceived)
                      )}
                    </p>
                  )}
              </div>
            ) : (
              <div className="pos-payment-gcash-section">
                <label htmlFor="pos-payment-gcash">
                  #GCash Reference Number{" "}
                  <span>(Optional)</span>
                </label>

                <div className="pos-payment-gcash-input">
                  <CreditCard size={16} />
                  <input
                    id="pos-payment-gcash"
                    type="text"
                    placeholder="Enter reference number"
                    value={activeGuest.reference}
                    onChange={(event) =>
                      updateActiveGuest(
                        "reference",
                        event.target.value
                      )
                    }
                    disabled={activeGuest.paid}
                  />
                </div>

                <p>
                  Confirm that the GCash payment has been received
                  before marking this guest as paid.
                </p>
              </div>
            )}

            <div className="pos-payment-guest-total">
              <span>
                {guests.length > 1 ? "Guest Total" : "Item Total"}
              </span>
              <strong>{formatPrice(activeAmountDue)}</strong>
            </div>

            <div className="pos-payment-actions">
              <button
                type="button"
                className="pos-payment-cancel"
                onClick={handleClose}
              >
                Cancel
              </button>

              <button
                type="button"
                className="pos-payment-mark-paid"
                onClick={handleMarkPaid}
                disabled={!canMarkPaid}
              >
                {activeGuest.paid ? (
                  <>
                    <CheckCircle2 size={16} />
                    Paid
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={16} />
                    Mark Paid
                  </>
                )}
              </button>
            </div>

            {activeGuest.paid && (
              <p className="pos-payment-paid-message">
                This guest's payment has been recorded.
              </p>
            )}

            {!activeGuest.paid &&
              !canMarkPaid &&
              activeAmountDue > 0 &&
              activeGuest.method === "Cash" &&
              Number(activeGuest.amountReceived || 0) <
                activeAmountDue && (
                <p className="pos-payment-validation">
                  Enter the full amount received before marking as paid.
                </p>
              )}

            {!activeGuest.paid &&
              !canMarkPaid &&
              activeAmountDue > 0 &&
              !hasOtherUnpaidGuests &&
              !allItemsAllocated && (
                <p className="pos-payment-validation">
                  Assign all remaining items before completing payment.
                </p>
              )}
          </section>
        </div>
      </section>
    </div>
  );
};

export default PaymentModal;
