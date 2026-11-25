
import { useMemo, useState } from "react";
import {
  Check,
  Eye,
  EyeOff,
  MessageSquare,
  Search,
  Star,
  Trash2,
  X,
} from "lucide-react";
import InventoryBar from "../../components/InventoryBar/InventoryBar";
import "../../pages-css/CustomerReviewsManagement.css";

const initialReviews = [
  {
    id: 1,
    customer: "Alex M.",
    rating: 5,
    message:
      "The sisig is really good, and the serving size is worth the price. The staff were also accommodating. Will definitely come back again!",
    submittedAt: "2026-11-24",
    status: "Pending",
  },
  {
    id: 2,
    customer: "Jamie R.",
    rating: 5,
    message:
      "One of my favorite places to eat around the area. Their fried itik is something I would recommend trying. The food is always satisfying.",
    submittedAt: "2026-11-23",
    status: "Published",
  },
  {
    id: 3,
    customer: "Sam D.",
    rating: 4,
    message:
      "Affordable meals with good portions. I usually order their silog meals whenever I visit. The food is good, although sometimes the waiting time can be a little long.",
    submittedAt: "2026-11-22",
    status: "Pending",
  },
  {
    id: 4,
    customer: "Taylor C.",
    rating: 5,
    message:
      "Their burger is surprisingly good! The price is student-friendly, and the food tastes great. Definitely a nice place to grab a quick meal.",
    submittedAt: "2026-11-20",
    status: "Hidden",
  },
  {
    id: 5,
    customer: "Morgan P.",
    rating: 4,
    message:
      "Good food for an affordable price. The sisig is my go-to order whenever I eat here. I would recommend this place to my friends.",
    submittedAt: "2026-11-19",
    status: "Published",
  },
];

const CustomerReviewsManagementStars = ({ rating, size = 16 }) => {
  return (
    <div
      className="customer-reviews-management-stars"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          size={size}
          fill={index < rating ? "currentColor" : "none"}
          strokeWidth={1.8}
        />
      ))}
    </div>
  );
};

const CustomerReviewsManagement = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [activeFilter, setActiveFilter] = useState("All Reviews");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReviewId, setSelectedReviewId] = useState(null);

  const filterOptions = [
    "All Reviews",
    "Pending",
    "Published",
    "Hidden",
  ];

  const selectedReview = reviews.find(
    (review) => review.id === selectedReviewId
  );

  const pendingCount = reviews.filter(
    (review) => review.status === "Pending"
  ).length;

  const filteredReviews = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return reviews
      .filter((review) => {
        const matchesFilter =
          activeFilter === "All Reviews" ||
          review.status === activeFilter;

        const matchesSearch =
          review.customer.toLowerCase().includes(search) ||
          review.message.toLowerCase().includes(search);

        return matchesFilter && matchesSearch;
      })
      .sort(
        (first, second) =>
          new Date(second.submittedAt) - new Date(first.submittedAt)
      );
  }, [reviews, activeFilter, searchTerm]);

  const formatDate = (date) => {
    return new Date(`${date}T00:00:00`).toLocaleDateString("en-PH", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part.replace(".", "")[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const updateReviewStatus = (id, status) => {
    setReviews((currentReviews) =>
      currentReviews.map((review) =>
        review.id === id ? { ...review, status } : review
      )
    );
  };

  const deleteReview = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmed) return;

    setReviews((currentReviews) =>
      currentReviews.filter((review) => review.id !== id)
    );

    setSelectedReviewId(null);
  };

  return (
    <div className="customer-reviews-management-page">
      <InventoryBar activePage="Reviews" />

      <main className="customer-reviews-management-main">
        <div className="customer-reviews-management-container">
          <header className="customer-reviews-management-header">
            <div>
              <span className="customer-reviews-management-eyebrow">
                WEBSITE CONTENT
              </span>
              <h1>Customer Reviews</h1>
              <p>
                Manage customer feedback and choose which reviews appear on
                the promotional website.
              </p>
            </div>
          </header>

          <section className="customer-reviews-management-content">
            <div className="customer-reviews-management-content-header">
              <div>
                <h2>Submitted Reviews</h2>
                <p>
                  Browse, read, and manage customer feedback.
                </p>
              </div>

              <div className="customer-reviews-management-search">
                <Search size={17} />
                <input
                  type="text"
                  placeholder="Search customer or review..."
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </div>
            </div>

            <div className="customer-reviews-management-filters">
              {filterOptions.map((filter) => (
                <button
                  type="button"
                  key={filter}
                  className={`customer-reviews-management-filter-button ${
                    activeFilter === filter ? "active" : ""
                  }`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                  {filter === "Pending" && pendingCount > 0 && (
                    <span className="customer-reviews-management-filter-count">
                      {pendingCount}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="customer-reviews-management-table-wrapper">
              <table className="customer-reviews-management-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Review</th>
                    <th>Rating</th>
                    <th>Date Submitted</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {filteredReviews.map((review) => (
                    <tr key={review.id}>
                      <td>
                        <div className="customer-reviews-management-customer">
                          <div className="customer-reviews-management-avatar">
                            {getInitials(review.customer)}
                          </div>
                          <strong>{review.customer}</strong>
                        </div>
                      </td>

                      <td>
                        <p className="customer-reviews-management-message-preview">
                          {review.message}
                        </p>
                      </td>

                      <td>
                        <CustomerReviewsManagementStars
                          rating={review.rating}
                          size={14}
                        />
                      </td>

                      <td className="customer-reviews-management-date">
                        {formatDate(review.submittedAt)}
                      </td>

                      <td>
                        <span
                          className={`customer-reviews-management-status ${review.status.toLowerCase()}`}
                        >
                          {review.status}
                        </span>
                      </td>

                      <td>
                        <button
                          type="button"
                          className="customer-reviews-management-view-button"
                          onClick={() => setSelectedReviewId(review.id)}
                        >
                          <Eye size={15} />
                          <span>Read</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredReviews.length === 0 && (
                <div className="customer-reviews-management-empty">
                  <div className="customer-reviews-management-empty-icon">
                    <MessageSquare size={25} />
                  </div>
                  <h3>No reviews found</h3>
                  <p>
                    {searchTerm
                      ? "Try another search term or change the selected filter."
                      : "There are no reviews under this category yet."}
                  </p>
                </div>
              )}
            </div>

            <div className="customer-reviews-management-table-footer">
              <span>
                Showing {filteredReviews.length} of {reviews.length} reviews
              </span>
            </div>
          </section>
        </div>
      </main>

      {selectedReview && (
        <div
          className="customer-reviews-management-modal-overlay"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedReviewId(null);
            }
          }}
        >
          <section
            className="customer-reviews-management-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="customer-reviews-management-modal-title"
          >
            <div className="customer-reviews-management-modal-header">
              <div>
                <span className="customer-reviews-management-eyebrow">
                  CUSTOMER FEEDBACK
                </span>
                <h2 id="customer-reviews-management-modal-title">
                  Review Details
                </h2>
              </div>

              <button
                type="button"
                className="customer-reviews-management-modal-close"
                onClick={() => setSelectedReviewId(null)}
                aria-label="Close review details"
              >
                <X size={20} />
              </button>
            </div>

            <div className="customer-reviews-management-modal-body">
              <div className="customer-reviews-management-detail-customer">
                <div className="customer-reviews-management-avatar large">
                  {getInitials(selectedReview.customer)}
                </div>
                <div>
                  <strong>{selectedReview.customer}</strong>
                  <span>Customer</span>
                </div>
              </div>

              <div className="customer-reviews-management-detail-meta">
                <div>
                  <span>Rating</span>
                  <CustomerReviewsManagementStars
                    rating={selectedReview.rating}
                    size={18}
                  />
                </div>

                <div>
                  <span>Date Submitted</span>
                  <strong>{formatDate(selectedReview.submittedAt)}</strong>
                </div>

                <div>
                  <span>Current Status</span>
                  <span
                    className={`customer-reviews-management-status ${selectedReview.status.toLowerCase()}`}
                  >
                    {selectedReview.status}
                  </span>
                </div>
              </div>

              <div className="customer-reviews-management-detail-message">
                <span>Customer's Review</span>
                <p>{selectedReview.message}</p>
              </div>
            </div>

            <div className="customer-reviews-management-modal-footer">
              <button
                type="button"
                className="customer-reviews-management-delete-button"
                onClick={() => deleteReview(selectedReview.id)}
              >
                <Trash2 size={16} />
                Delete
              </button>

              {selectedReview.status === "Published" ? (
                <button
                  type="button"
                  className="customer-reviews-management-hide-button"
                  onClick={() =>
                    updateReviewStatus(selectedReview.id, "Hidden")
                  }
                >
                  <EyeOff size={16} />
                  Hide from Website
                </button>
              ) : (
                <button
                  type="button"
                  className="customer-reviews-management-publish-button"
                  onClick={() =>
                    updateReviewStatus(selectedReview.id, "Published")
                  }
                >
                  <Check size={17} />
                  Publish on Website
                </button>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default CustomerReviewsManagement;
