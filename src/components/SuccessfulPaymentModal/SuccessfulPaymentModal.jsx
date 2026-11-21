
import { useState } from "react";
import {
  X,
  Check,
  Printer,
  Mail,
  ShoppingBag,
  ReceiptText,
  CalendarDays,
  Clock3,
  Table2,
  UserRound,
  Banknote,
  Wallet,
  CreditCard,
} from "lucide-react";
import "./SuccessfulPaymentModal.css";

const formatPrice = (price) =>
  `₱${Number(price || 0).toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const defaultOrder = {
  id: "ORD-1050",
  table: "Table 03",
  customer: "Ana M.",
  date: "Nov 21, 2026",
  time: "7:15 PM",
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

const defaultPayment = {
  status: "Paid",
  guests: [
    {
      id: 1,
      label: "Guest 1",
      method: "Cash",
      amountReceived: "400",
      reference: "",
      paid: true,
      allocations: {
        sisig: 2,
        "iced-tea": 2,
        burger: 1,
      },
    },
  ],
};

const getItemKey = (item, index) =>
  String(item.id ?? item._id ?? `item-${index}`);

const getQuantity = (item) =>
  Number(item.quantity ?? item.qty ?? 1);

const getExtrasTotal = (item) =>
  (item.extras || []).reduce(
    (total, extra) => total + Number(extra.price || 0),
    0
  );

const getItemUnitTotal = (item) =>
  Number(item.price || 0) + getExtrasTotal(item);

const getItemTotal = (item) =>
  getItemUnitTotal(item) * getQuantity(item);

const getSubtotal = (order) =>
  (order.items || []).reduce(
    (total, item) => total + getItemTotal(item),
    0
  );

const getGuestAmountDue = (guest, items) =>
  items.reduce((total, item, index) => {
    const key = getItemKey(item, index);
    const quantity = Number(guest.allocations?.[key] || 0);

    return total + quantity * getItemUnitTotal(item);
  }, 0);

const SuccessfulPaymentModal = ({
  isOpen,
  order = defaultOrder,
  payment = defaultPayment,
  onClose,
  onNewOrder,
  onEmailReceipt,
  onPrintReceipt,
}) => {
  const [internalOpen, setInternalOpen] = useState(true);

  const visible = isOpen ?? internalOpen;

  if (!visible || !order) return null;

  const items = order.items || [];
  const subtotal = getSubtotal(order);
  const discount = Number(order.discount || 0);
  const total = Math.max(0, Number(payment.total ?? subtotal - discount));

  const guests = payment.guests || [];

  const paymentMethods = [
    ...new Set(
      guests.map((guest) => guest.method).filter(Boolean)
    ),
  ];

  const paymentMethod =
    paymentMethods.length > 1
      ? "Split Payment"
      : paymentMethods[0] || payment.method || "Cash";

  const amountPaid =
    guests.length > 0
      ? guests.reduce((sum, guest) => {
          const due = getGuestAmountDue(guest, items);

          if (guest.method === "Cash") {
            const received = Number(guest.amountReceived || 0);
            return sum + (received > 0 ? received : due);
          }

          return sum + due;
        }, 0)
      : Number(payment.amountPaid ?? total);

  const change =
    guests.length > 0
      ? guests.reduce((sum, guest) => {
          if (guest.method !== "Cash") return sum;

          const due = getGuestAmountDue(guest, items);
          const received = Number(guest.amountReceived || 0);

          return sum + Math.max(0, received - due);
        }, 0)
      : Number(payment.change || 0);

  const paymentStatus = payment.status || "Paid";

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      setInternalOpen(false);
    }
  };

  const handlePrint = () => {
    if (onPrintReceipt) {
      onPrintReceipt({ order, payment });
    } else {
      window.print();
    }
  };

  const handleEmail = () => {
    onEmailReceipt?.({ order, payment });
  };

  const handleNewOrder = () => {
    onNewOrder?.();
    handleClose();
  };

  const PaymentIcon =
    paymentMethod === "Cash"
      ? Banknote
      : paymentMethod === "GCash"
        ? Wallet
        : CreditCard;

  const orderDate = order.date || payment.date || "—";
  const orderTime = order.time || payment.time || "—";

  return (
    <div className="successful-payment-overlay">
      <section
        className="successful-payment-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="successful-payment-title"
      >
        <button
          type="button"
          className="successful-payment-close"
          onClick={handleClose}
          aria-label="Close payment confirmation"
        >
          <X size={19} />
        </button>

        <div className="successful-payment-left">
          <div className="successful-payment-success-icon">
            <Check size={36} strokeWidth={2.8} />
          </div>

          <span className="successful-payment-success-label">
            TRANSACTION COMPLETED
          </span>

          <h2 id="successful-payment-title">
            Payment Successful
          </h2>

          <p className="successful-payment-message">
            The order has been successfully paid and recorded.
          </p>

          <div className="successful-payment-summary">
            <div className="successful-payment-amount">
              <div>
                <span>Amount Paid</span>
                <small>Payment received</small>
              </div>
              <strong>{formatPrice(amountPaid)}</strong>
            </div>

            <div className="successful-payment-change">
              <div>
                <span>Change</span>
                <small>Return to customer</small>
              </div>
              <strong>{formatPrice(change)}</strong>
            </div>
          </div>

          <div className="successful-payment-actions">
            <button
              type="button"
              className="successful-payment-print"
              onClick={handlePrint}
            >
              <Printer size={17} />
              Print Receipt
            </button>

            <div className="successful-payment-secondary-actions">
              <button
                type="button"
                className="successful-payment-email"
                onClick={handleEmail}
              >
                <Mail size={15} />
                Email Receipt
              </button>

              <button
                type="button"
                className="successful-payment-new-order"
                onClick={handleNewOrder}
              >
                <ShoppingBag size={15} />
                New Order
              </button>
            </div>
          </div>
        </div>

        <div className="successful-payment-right">
          <div className="successful-payment-receipt-heading">
            <div>
              <h3>Receipt</h3>
              <p>Transaction summary</p>
            </div>

            <ReceiptText size={20} />
          </div>

          <div className="successful-payment-receipt">
            <div className="successful-payment-receipt-brand">
              <div className="successful-payment-receipt-logo">
                <ReceiptText size={23} />
              </div>

              <h3>CHATABS</h3>
              <span>OFFICIAL SALES RECEIPT</span>
              <small>Thank you for your order!</small>
            </div>

            <div className="successful-payment-receipt-meta">
              <div>
                <span>ORDER ID</span>
                <strong>{order.id || "New Order"}</strong>
              </div>

              <div>
                <span>DATE &amp; TIME</span>
                <strong>
                  {orderDate} · {orderTime}
                </strong>
              </div>

              <div>
                <span>CUSTOMER</span>
                <strong>{order.customer || "Walk-in Customer"}</strong>
              </div>

              <div>
                <span>TABLE / CHANNEL</span>
                <strong>{order.table || "Takeout"}</strong>
              </div>
            </div>

            <div className="successful-payment-receipt-divider" />

            <div className="successful-payment-receipt-items-heading">
              <span>ITEM DESCRIPTION</span>
              <span>AMOUNT</span>
            </div>

            <div className="successful-payment-receipt-items">
              {items.map((item, index) => (
                <div
                  className="successful-payment-receipt-item"
                  key={getItemKey(item, index)}
                >
                  <div className="successful-payment-receipt-item-main">
                    <div>
                      <h4>{item.name}</h4>
                      <span>
                        {getQuantity(item)} × {formatPrice(item.price)}
                      </span>
                    </div>

                    <strong>{formatPrice(getItemTotal(item))}</strong>
                  </div>

                  {item.extras?.length > 0 && (
                    <div className="successful-payment-receipt-extras">
                      {item.extras.map((extra, extraIndex) => (
                        <div
                          key={`${extra.name}-${extraIndex}`}
                        >
                          <span>{extra.name}</span>
                          <span>
                            {Number(extra.price) > 0
                              ? `+ ${formatPrice(
                                  Number(extra.price) *
                                    getQuantity(item)
                                )}`
                              : "Free"}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {item.notes && (
                    <p className="successful-payment-receipt-note">
                      Note: {item.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="successful-payment-receipt-divider" />

            <div className="successful-payment-receipt-totals">
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

              <div className="successful-payment-receipt-grand-total">
                <span>Total</span>
                <strong>{formatPrice(total)}</strong>
              </div>
            </div>

            <div className="successful-payment-receipt-divider" />

            <div className="successful-payment-receipt-payment">
              <h4>PAYMENT DETAILS</h4>

              {guests.length > 1 ? (
                guests.map((guest, index) => {
                  const guestDue = getGuestAmountDue(guest, items);

                  return (
                    <div
                      className="successful-payment-receipt-guest"
                      key={guest.id ?? index}
                    >
                      <span>
                        {guest.label || `Guest ${index + 1}`} ·{" "}
                        {guest.method || "Cash"}
                      </span>
                      <strong>{formatPrice(guestDue)}</strong>
                    </div>
                  );
                })
              ) : (
                <div>
                  <span>Payment Method</span>
                  <strong>{paymentMethod}</strong>
                </div>
              )}

              <div>
                <span>Payment Status</span>
                <span className="successful-payment-receipt-paid">
                  <span className="successful-payment-receipt-check">
                    <Check size={10} />
                  </span>
                  {paymentStatus}
                </span>
              </div>

              {guests.some((guest) => guest.reference) && (
                <div>
                  <span>GCash Reference</span>
                  <strong>
                    {guests
                      .filter((guest) => guest.reference)
                      .map((guest) => guest.reference)
                      .join(", ")}
                  </strong>
                </div>
              )}

              <div>
                <span>Amount Paid</span>
                <strong>{formatPrice(amountPaid)}</strong>
              </div>

              <div>
                <span>Change</span>
                <strong>{formatPrice(change)}</strong>
              </div>
            </div>

            <div className="successful-payment-receipt-footer">
              <span>THANK YOU FOR DINING WITH US!</span>
              <small>CHATABS · POS TRANSACTION RECORD</small>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SuccessfulPaymentModal;
