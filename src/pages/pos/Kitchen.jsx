
import "../../pages-css/Kitchen.css";
import POSBar from "../../components/POSBar/POSBar";
import {
  Table2,
  ShoppingBag,
  Bike,
  Clock3,
  Check,
  ChefHat,
  ClipboardList,
  PackageCheck,
} from "lucide-react";

const kitchenColumns = [
  {
    key: "new",
    title: "New",
    icon: ClipboardList,
    orders: [
      {
        source: "Table 3",
        time: "12 mins",
        items: [
          {
            name: "Sisig Rice Meal",
            quantity: 2,
            extras: ["Extra egg", "No onions"],
          },
          {
            name: "Iced Tea",
            quantity: 2,
            extras: [],
          },
        ],
      },
      {
        source: "Table 5",
        time: "8 mins",
        items: [
          {
            name: "Tapsilog",
            quantity: 1,
            extras: ["Sunny side up"],
          },
          {
            name: "Iced Tea",
            quantity: 1,
            extras: ["Less ice"],
          },
        ],
      },
      {
        source: "Takeout · Gabriel",
        time: "5 mins",
        items: [
          {
            name: "Classic Burger",
            quantity: 1,
            extras: ["No onions"],
          },
          {
            name: "Iced Tea",
            quantity: 1,
            extras: [],
          },
        ],
      },
    ],
  },
  {
    key: "cooking",
    title: "Cooking",
    icon: ChefHat,
    orders: [
      {
        source: "Table 2",
        time: "9 mins",
        items: [
          {
            name: "Fried Itik Meal",
            quantity: 2,
            extras: ["Extra rice"],
          },
          {
            name: "Bottled Water",
            quantity: 2,
            extras: [],
          },
        ],
      },
      {
        source: "Takeout · Mika",
        time: "14 mins",
        items: [
          {
            name: "Sisig Rice Meal",
            quantity: 2,
            extras: ["No onions"],
          },
        ],
      },
      {
        source: "Delivery · Patricia",
        time: "11 mins",
        items: [
          {
            name: "Sisig Rice Meal",
            quantity: 2,
            extras: ["Extra egg"],
          },
          {
            name: "Iced Tea",
            quantity: 1,
            extras: [],
          },
          {
            name: "Bottled Water",
            quantity: 1,
            extras: [],
          },
        ],
      },
    ],
  },
  {
    key: "ready",
    title: "Ready",
    icon: PackageCheck,
    orders: [
      {
        source: "Table 6",
        time: "6 mins",
        items: [
          {
            name: "Classic Burger",
            quantity: 1,
            extras: [],
          },
          {
            name: "Cheeseburger",
            quantity: 1,
            extras: ["Extra cheese"],
          },
        ],
      },
      {
        source: "Delivery · Christine",
        time: "3 mins",
        items: [
          {
            name: "Classic Burger",
            quantity: 1,
            extras: [],
          },
          {
            name: "Cheeseburger",
            quantity: 1,
            extras: [],
          },
          {
            name: "Bottled Water",
            quantity: 1,
            extras: [],
          },
        ],
      },
    ],
  },
];

const getSourceIcon = (source) => {
  if (source.startsWith("Table")) return Table2;
  if (source.startsWith("Takeout")) return ShoppingBag;
  return Bike;
};

const Kitchen = () => {
  return (
    <div className="pos-kitchen-layout">
      <POSBar />

      <main className="pos-kitchen-page">
        <header className="pos-kitchen-header">
          <div>
            <h1>Kitchen</h1>
            <p>Monitor and prepare incoming orders.</p>
          </div>
        </header>

        <section className="pos-kitchen-board">
          {kitchenColumns.map((column) => {
            const ColumnIcon = column.icon;

            return (
              <div
                className={`pos-kitchen-column pos-kitchen-column-${column.key}`}
                key={column.key}
              >
                <div className="pos-kitchen-column-header">
                  <div className="pos-kitchen-column-heading">
                    <div className="pos-kitchen-column-icon">
                      <ColumnIcon size={19} />
                    </div>
                    <h2>{column.title}</h2>
                  </div>

                  <span className="pos-kitchen-column-count">
                    {column.orders.length}
                  </span>
                </div>

                <div className="pos-kitchen-order-list">
                  {column.orders.map((order, index) => {
                    const SourceIcon = getSourceIcon(order.source);

                    return (
                      <article
                        className="pos-kitchen-order"
                        key={`${column.key}-${order.source}-${index}`}
                      >
                        <div className="pos-kitchen-order-header">
                          <div className="pos-kitchen-source-icon">
                            <SourceIcon size={17} />
                          </div>

                          <div className="pos-kitchen-order-source">
                            <h3>{order.source}</h3>
                            <span>
                              <Clock3 size={12} />
                              {order.time} ago
                            </span>
                          </div>
                        </div>

                        <div className="pos-kitchen-order-items">
                          {order.items.map((item, itemIndex) => (
                            <div
                              className="pos-kitchen-item"
                              key={`${item.name}-${itemIndex}`}
                            >
                              <div className="pos-kitchen-item-main">
                                <div className="pos-kitchen-item-info">
                                  <span className="pos-kitchen-item-quantity">
                                    {item.quantity}×
                                  </span>
                                  <span className="pos-kitchen-item-name">
                                    {item.name}
                                  </span>
                                </div>

                                {item.extras.length > 0 && (
                                  <div className="pos-kitchen-item-extras">
                                    <span className="pos-kitchen-extras-label">
                                      Extras &amp; notes
                                    </span>

                                    {item.extras.map((extra, extraIndex) => (
                                      <div
                                        className="pos-kitchen-extra"
                                        key={`${extra}-${extraIndex}`}
                                      >
                                        <span className="pos-kitchen-extra-dot" />
                                        <span>{extra}</span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="pos-kitchen-order-footer">
                          {column.key === "new" && (
                            <button
                              type="button"
                              className="pos-kitchen-action pos-kitchen-action-new"
                            >
                              <ChefHat size={16} />
                              Start Cooking
                            </button>
                          )}

                          {column.key === "cooking" && (
                            <button
                              type="button"
                              className="pos-kitchen-action pos-kitchen-action-cooking"
                            >
                              <Check size={16} />
                              Mark as Ready
                            </button>
                          )}

                          {column.key === "ready" && (
                            <button
                              type="button"
                              className="pos-kitchen-action pos-kitchen-action-ready"
                            >
                              <PackageCheck size={16} />
                              Mark as Served
                            </button>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>
      </main>
    </div>
  );
};

export default Kitchen;
