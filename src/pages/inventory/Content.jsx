import { useMemo, useState } from "react";
import InventoryBar from "../../components/InventoryBar/InventoryBar";
import "../../pages-css/Content.css";
import {
  Plus,
  Search,
  FileText,
  Edit3,
  Trash2,
  Eye,
  X,
  ImagePlus,
  Save,
  Send,
  ArrowLeft,
  Newspaper,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Image as ImageIcon,
} from "lucide-react";

const categoryOptions = [
  "News & Updates",
  "Food Highlights",
  "Our Story",
  "Promotions",
  "Behind the Scenes",
  "Announcements",
];

const initialArticles = [
  {
    id: 1,
    title: "The Story Behind Chatabs' Famous Sisig",
    category: "Food Highlights",
    excerpt:
      "Discover how one of our most-loved dishes became a favorite among our customers.",
    content:
      "Every restaurant has a dish that customers keep coming back for. At Chatabs, our sisig has become one of those favorites. What started as a small eatery serving fried itik eventually grew into a place offering affordable meals and food that people can enjoy every day.\n\nWe continue to prepare our dishes with the same goal: serve good food that makes every visit worthwhile. Whether you are dining with friends or grabbing a quick meal, our sisig is always ready to be part of your experience.",
    image: "",
    status: "Published",
    date: "Nov 20, 2026",
  },
  {
    id: 2,
    title: "A Taste of Home: Our Fried Itik",
    category: "Our Story",
    excerpt:
      "Learn about the dish that started the Chatabs journey and continues to be part of our identity.",
    content:
      "Chatabs started in 2020 with a simple idea: serve fried itik to customers looking for something familiar and satisfying.\n\nOver the years, our menu has grown, but our beginnings remain an important part of who we are. We are proud to share the food that started our journey with everyone who visits us.",
    image: "",
    status: "Published",
    date: "Nov 18, 2026",
  },
  {
    id: 3,
    title: "What's Cooking at Chatabs?",
    category: "News & Updates",
    excerpt:
      "A little update on what is happening in our kitchen and the meals we are preparing.",
    content:
      "There is always something happening in the Chatabs kitchen. We continue to prepare your favorite meals while finding ways to make your dining experience better.\n\nVisit us and enjoy the meals you have come to love.",
    image: "",
    status: "Draft",
    date: "Nov 24, 2026",
  },
];

const emptyArticleForm = {
  title: "",
  category: "News & Updates",
  excerpt: "",
  content: "",
  image: "",
};

const ContentImage = ({ image, className = "" }) => {
  return (
    <div className={`content-image-placeholder ${className}`}>
      {image ? (
        <img src={image} alt="Article cover" />
      ) : (
        <div className="content-image-fallback">
          <ImageIcon size={23} />
        </div>
      )}
    </div>
  );
};

const Content = () => {
  const [articles, setArticles] = useState(initialArticles);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [editorOpen, setEditorOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [articleForm, setArticleForm] = useState(emptyArticleForm);
  const [formError, setFormError] = useState("");
  const [imageError, setImageError] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewStatus, setPreviewStatus] = useState("Draft");

  const publishedCount = articles.filter(
    (article) => article.status === "Published"
  ).length;

  const draftCount = articles.filter(
    (article) => article.status === "Draft"
  ).length;

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesFilter =
        activeFilter === "All" || article.status === activeFilter;

      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [articles, activeFilter, searchQuery]);

  const openEditor = (article = null) => {
    if (article) {
      setEditingId(article.id);
      setArticleForm({
        title: article.title,
        category: article.category,
        excerpt: article.excerpt,
        content: article.content,
        image: article.image,
      });
    } else {
      setEditingId(null);
      setArticleForm(emptyArticleForm);
    }

    setFormError("");
    setImageError("");
    setPreviewOpen(false);
    setEditorOpen(true);
  };

  const closeEditor = () => {
    setEditorOpen(false);
    setEditingId(null);
    setArticleForm(emptyArticleForm);
    setFormError("");
    setImageError("");
    setPreviewOpen(false);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setArticleForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setImageError("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageError("Image size must not exceed 5 MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setArticleForm((currentForm) => ({
        ...currentForm,
        image: reader.result,
      }));
      setImageError("");
    };

    reader.onerror = () => {
      setImageError("Unable to read this image. Please try again.");
    };

    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const removeImage = () => {
    setArticleForm((currentForm) => ({
      ...currentForm,
      image: "",
    }));
    setImageError("");
  };

  const handleSaveArticle = (status) => {
    const title = articleForm.title.trim();
    const excerpt = articleForm.excerpt.trim();
    const content = articleForm.content.trim();

    if (!title) {
      setFormError("Please enter an article title.");
      return;
    }

    if (!excerpt) {
      setFormError("Please enter a short article description.");
      return;
    }

    if (!content) {
      setFormError("Please write the article content.");
      return;
    }

    const currentDate = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const articleData = {
      ...articleForm,
      title,
      excerpt,
      content,
      status,
      date: currentDate,
    };

    if (editingId) {
      setArticles((currentArticles) =>
        currentArticles.map((article) =>
          article.id === editingId
            ? { ...article, ...articleData }
            : article
        )
      );
    } else {
      setArticles((currentArticles) => [
        {
          id: Date.now(),
          ...articleData,
        },
        ...currentArticles,
      ]);
    }

    closeEditor();
  };

  const deleteArticle = (articleId) => {
    const article = articles.find((item) => item.id === articleId);

    if (!window.confirm(`Delete "${article?.title}"?`)) return;

    setArticles((currentArticles) =>
      currentArticles.filter((item) => item.id !== articleId)
    );
  };

  const openPreview = () => {
    if (!articleForm.title.trim()) {
      setFormError("Please enter an article title before previewing.");
      return;
    }

    if (!articleForm.content.trim()) {
      setFormError("Please write some content before previewing.");
      return;
    }

    setFormError("");

    const currentArticle = articles.find(
      (article) => article.id === editingId
    );

    setPreviewStatus(currentArticle?.status || "Draft");
    setPreviewOpen(true);
  };

  const previewArticleFromList = (article) => {
    setArticleForm({
      title: article.title,
      category: article.category,
      excerpt: article.excerpt,
      content: article.content,
      image: article.image,
    });

    setPreviewStatus(article.status);
    setPreviewOpen(true);
  };

  const articleToPreview = {
    ...articleForm,
    status: previewStatus,
  };

  return (
    <div className="content-page">
      <InventoryBar activePage="Articles" />

      <main className="content-main">
        <div className="content-container">
          {!editorOpen ? (
            <>
              <header className="content-header">
                <div>
                  <div className="content-breadcrumb">
                    <span>Website Management</span>
                    <span>/</span>
                    <span>Articles</span>
                  </div>

                  <h1>Articles</h1>
                  <p>
                    Create and manage the articles displayed on your
                    promotional website.
                  </p>
                </div>

                <button
                  type="button"
                  className="content-create-button"
                  onClick={() => openEditor()}
                >
                  <Plus size={17} />
                  Write Article
                </button>
              </header>

              <section className="content-overview">
                <div className="content-overview-card">
                  <div className="content-overview-icon">
                    <Newspaper size={19} />
                  </div>
                  <div>
                    <span>Total Articles</span>
                    <strong>{articles.length}</strong>
                  </div>
                </div>

                <div className="content-overview-card">
                  <div className="content-overview-icon published">
                    <CheckCircle2 size={19} />
                  </div>
                  <div>
                    <span>Published</span>
                    <strong>{publishedCount}</strong>
                  </div>
                </div>

                <div className="content-overview-card">
                  <div className="content-overview-icon draft">
                    <Clock3 size={19} />
                  </div>
                  <div>
                    <span>Drafts</span>
                    <strong>{draftCount}</strong>
                  </div>
                </div>
              </section>

              <section className="content-panel">
                <div className="content-toolbar">
                  <div className="content-filters">
                    {["All", "Published", "Draft"].map((filter) => (
                      <button
                        key={filter}
                        type="button"
                        className={
                          activeFilter === filter ? "active" : ""
                        }
                        onClick={() => setActiveFilter(filter)}
                      >
                        {filter}
                        <span>
                          {filter === "All"
                            ? articles.length
                            : filter === "Published"
                            ? publishedCount
                            : draftCount}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="content-search">
                    <Search size={16} />
                    <input
                      type="text"
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={(event) =>
                        setSearchQuery(event.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="content-table-wrapper">
                  <table className="content-table">
                    <thead>
                      <tr>
                        <th>Article</th>
                        <th>Category</th>
                        <th>Date Modified</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredArticles.length > 0 ? (
                        filteredArticles.map((article) => (
                          <tr key={article.id}>
                            <td>
                              <div className="content-table-title">
                                <ContentImage image={article.image} />
                                <div>
                                  <strong>{article.title}</strong>
                                  <span>{article.excerpt}</span>
                                </div>
                              </div>
                            </td>

                            <td>
                              <span className="content-category">
                                {article.category}
                              </span>
                            </td>

                            <td>
                              <span className="content-date">
                                <CalendarDays size={13} />
                                {article.date}
                              </span>
                            </td>

                            <td>
                              <span
                                className={`content-status ${
                                  article.status === "Published"
                                    ? "status-published"
                                    : "status-draft"
                                }`}
                              >
                                {article.status === "Published" ? (
                                  <CheckCircle2 size={13} />
                                ) : (
                                  <Clock3 size={13} />
                                )}
                                {article.status}
                              </span>
                            </td>

                            <td>
                              <div className="content-actions">
                                <button
                                  type="button"
                                  onClick={() => openEditor(article)}
                                  title="Edit article"
                                  aria-label={`Edit ${article.title}`}
                                >
                                  <Edit3 size={15} />
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    previewArticleFromList(article)
                                  }
                                  title="Preview article"
                                  aria-label={`Preview ${article.title}`}
                                >
                                  <Eye size={15} />
                                </button>

                                <button
                                  type="button"
                                  className="delete-action"
                                  onClick={() => deleteArticle(article.id)}
                                  title="Delete article"
                                  aria-label={`Delete ${article.title}`}
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5">
                            <div className="content-empty">
                              <FileText size={27} />
                              <strong>No articles found</strong>
                              <span>
                                Try another search or create a new article.
                              </span>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="content-table-footer">
                  Showing {filteredArticles.length} of {articles.length}{" "}
                  articles
                </div>
              </section>
            </>
          ) : (
            <section className="content-editor">
              <div className="content-editor-header">
                <button
                  type="button"
                  className="content-back-button"
                  onClick={closeEditor}
                >
                  <ArrowLeft size={17} />
                  Back to Articles
                </button>

                <div className="content-editor-heading">
                  <div>
                    <h1>{editingId ? "Edit Article" : "Write Article"}</h1>
                    <p>
                      Write the content that will appear on the promotional
                      website.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="content-preview-button"
                    onClick={openPreview}
                  >
                    <Eye size={16} />
                    Preview
                  </button>
                </div>
              </div>

              <div className="content-editor-layout">
                <div className="content-editor-main">
                  <div className="content-editor-card">
                    <div className="content-field">
                      <label htmlFor="content-article-title">
                        Article Title
                      </label>
                      <input
                        id="content-article-title"
                        name="title"
                        type="text"
                        placeholder="Enter an interesting article title..."
                        value={articleForm.title}
                        onChange={handleFormChange}
                        maxLength={120}
                      />
                      <span className="content-field-counter">
                        {articleForm.title.length}/120
                      </span>
                    </div>

                    <div className="content-field">
                      <label htmlFor="content-article-category">
                        Category
                      </label>
                      <select
                        id="content-article-category"
                        name="category"
                        value={articleForm.category}
                        onChange={handleFormChange}
                      >
                        {categoryOptions.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="content-field">
                      <label htmlFor="content-article-excerpt">
                        Short Description
                      </label>
                      <textarea
                        id="content-article-excerpt"
                        name="excerpt"
                        rows={3}
                        placeholder="Write a short introduction that will appear before readers open the article..."
                        value={articleForm.excerpt}
                        onChange={handleFormChange}
                        maxLength={250}
                      />
                      <span className="content-field-counter">
                        {articleForm.excerpt.length}/250
                      </span>
                    </div>

                    <div className="content-field">
                      <label htmlFor="content-article-body">
                        Article Content
                      </label>
                      <textarea
                        id="content-article-body"
                        name="content"
                        className="content-content-input"
                        placeholder="Start writing your article here..."
                        value={articleForm.content}
                        onChange={handleFormChange}
                      />
                      <span className="content-editor-hint">
                        Separate paragraphs by leaving an empty line.
                      </span>
                    </div>
                  </div>
                </div>

                <aside className="content-editor-sidebar">
                  <div className="content-editor-card">
                    <div className="content-sidebar-title">
                      <h3>Cover Image</h3>
                      <span>Optional</span>
                    </div>

                    <ContentImage
                      image={articleForm.image}
                      className="content-cover-preview"
                    />

                    <input
                      id="content-cover-upload"
                      type="file"
                      accept="image/*"
                      className="content-file-input"
                      onChange={handleImageUpload}
                    />

                    <label
                      htmlFor="content-cover-upload"
                      className="content-upload-button"
                    >
                      <ImagePlus size={16} />
                      Choose Image
                    </label>

                    {articleForm.image && (
                      <button
                        type="button"
                        className="content-remove-image"
                        onClick={removeImage}
                      >
                        <X size={13} />
                        Remove Image
                      </button>
                    )}

                    <p className="content-upload-hint">
                      Recommended: landscape image. Maximum file size: 5 MB.
                    </p>

                    {imageError && (
                      <p className="content-image-error">{imageError}</p>
                    )}
                  </div>

                  <div className="content-editor-card content-publish-card">
                    <div className="content-sidebar-title">
                      <h3>Publishing</h3>
                    </div>

                    <div className="content-publish-info">
                      <div>
                        <Clock3 size={15} />
                        <span>Current status</span>
                      </div>

                      <strong>
                        {editingId
                          ? articles.find(
                              (article) => article.id === editingId
                            )?.status || "Draft"
                          : "New Draft"}
                      </strong>
                    </div>

                    <div className="content-publish-actions">
                      <button
                        type="button"
                        className="content-save-draft-button"
                        onClick={() => handleSaveArticle("Draft")}
                      >
                        <Save size={16} />
                        Save as Draft
                      </button>

                      <button
                        type="button"
                        className="content-publish-button"
                        onClick={() => handleSaveArticle("Published")}
                      >
                        <Send size={16} />
                        Publish Article
                      </button>
                    </div>

                    {formError && (
                      <p className="content-form-error">{formError}</p>
                    )}

                    <p className="content-publish-hint">
                      Published articles are intended to appear on the
                      promotional website. Website synchronization is not
                      connected yet.
                    </p>
                  </div>
                </aside>
              </div>
            </section>
          )}
        </div>
      </main>

      {previewOpen && (
        <div
          className="content-preview-overlay"
          onClick={() => setPreviewOpen(false)}
        >
          <div
            className="content-preview-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="content-preview-modal-header">
              <div>
                <Eye size={17} />
                <strong>Article Preview</strong>
              </div>

              <button
                type="button"
                onClick={() => setPreviewOpen(false)}
                aria-label="Close preview"
              >
                <X size={19} />
              </button>
            </div>

            <div className="content-preview-content">
              <ContentImage
                image={articleToPreview.image}
                className="content-preview-cover"
              />

              <div className="content-preview-article">
                <span className="content-preview-category">
                  {articleToPreview.category}
                </span>

                <h1>
                  {articleToPreview.title || "Your Article Title"}
                </h1>

                <p className="content-preview-excerpt">
                  {articleToPreview.excerpt ||
                    "Your article description will appear here."}
                </p>

                <div className="content-preview-meta">
                  <span>
                    <CalendarDays size={14} />
                    Preview
                  </span>
                  <span>{articleToPreview.status}</span>
                </div>

                <div className="content-preview-body">
                  {articleToPreview.content || "Your article content..."}
                </div>
              </div>
            </div>

            <div className="content-preview-footer">
              <span>This is a preview of the article content.</span>
              <button
                type="button"
                onClick={() => setPreviewOpen(false)}
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Content;