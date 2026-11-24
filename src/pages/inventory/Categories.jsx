import { useState } from "react";
import InventoryBar from "../../components/InventoryBar/InventoryBar";
import "../../pages-css/Categories.css";
import {
  Plus,
  Search,
  Utensils,
  LayoutGrid,
  List,
  Pencil,
  Trash2,
  Eye,
  X,
  ChefHat,
  Package,
  Check,
  ChevronDown,
  ArrowLeft,
  Layers3,
  ImagePlus,
} from "lucide-react";

const initialCategories = [
  { id: "cat-1", name: "Sisig", description: "Our signature sisig dishes", image: "" },
  { id: "cat-2", name: "Rice Meals", description: "Complete rice meals", image: "" },
  { id: "cat-3", name: "Silog", description: "Classic silog favorites", image: "" },
  { id: "cat-4", name: "Burgers", description: "Freshly prepared burgers", image: "" },
  { id: "cat-5", name: "Sides", description: "Extra servings and sides", image: "" },
  { id: "cat-6", name: "Drinks", description: "Refreshing beverages", image: "" },
];

const ingredientOptions = [
  { id: 1, name: "Pork", unit: "kg" },
  { id: 2, name: "Eggs", unit: "pcs" },
  { id: 3, name: "Cooking Oil", unit: "L" },
  { id: 4, name: "Burger Buns", unit: "pcs" },
  { id: 5, name: "Rice", unit: "kg" },
  { id: 6, name: "Fried Itik", unit: "pcs" },
  { id: 7, name: "Sisig", unit: "kg" },
  { id: 8, name: "Hotdog", unit: "pcs" },
  { id: 9, name: "Beef Tapa", unit: "kg" },
  { id: 10, name: "Burger Patty", unit: "pcs" },
  { id: 11, name: "Cheese", unit: "slices" },
  { id: 12, name: "Iced Tea Mix", unit: "L" },
  { id: 13, name: "Bottled Water", unit: "pcs" },
];

const initialMenuItems = [
  {
    id: 1,
    name: "Sisig Rice Meal",
    categoryId: "cat-1",
    description: "Our popular sizzling sisig served with rice.",
    price: 99,
    available: true,
    image: "",
    recipe: [
      { ingredientId: 7, quantity: 0.15 },
      { ingredientId: 5, quantity: 0.2 },
      { ingredientId: 3, quantity: 0.02 },
    ],
  },
  {
    id: 2,
    name: "Sizzling Sisig",
    categoryId: "cat-1",
    description: "Savory sisig served sizzling hot.",
    price: 89,
    available: true,
    image: "",
    recipe: [
      { ingredientId: 7, quantity: 0.18 },
      { ingredientId: 3, quantity: 0.02 },
    ],
  },
  {
    id: 3,
    name: "Fried Itik Meal",
    categoryId: "cat-2",
    description: "Crispy fried itik served with rice.",
    price: 149,
    available: true,
    image: "",
    recipe: [
      { ingredientId: 6, quantity: 1 },
      { ingredientId: 5, quantity: 0.2 },
      { ingredientId: 3, quantity: 0.02 },
    ],
  },
  {
    id: 4,
    name: "Tapsilog",
    categoryId: "cat-3",
    description: "Beef tapa, fried rice, and egg.",
    price: 89,
    available: true,
    image: "",
    recipe: [
      { ingredientId: 9, quantity: 0.12 },
      { ingredientId: 2, quantity: 1 },
      { ingredientId: 5, quantity: 0.2 },
      { ingredientId: 3, quantity: 0.02 },
    ],
  },
  {
    id: 5,
    name: "Hotsilog",
    categoryId: "cat-3",
    description: "Hotdog, fried rice, and egg.",
    price: 75,
    available: true,
    image: "",
    recipe: [
      { ingredientId: 8, quantity: 2 },
      { ingredientId: 2, quantity: 1 },
      { ingredientId: 5, quantity: 0.2 },
      { ingredientId: 3, quantity: 0.02 },
    ],
  },
  {
    id: 6,
    name: "Classic Burger",
    categoryId: "cat-4",
    description: "Classic burger with a juicy patty.",
    price: 65,
    available: true,
    image: "",
    recipe: [
      { ingredientId: 10, quantity: 1 },
      { ingredientId: 4, quantity: 1 },
      { ingredientId: 3, quantity: 0.01 },
    ],
  },
  {
    id: 7,
    name: "Cheeseburger",
    categoryId: "cat-4",
    description: "Classic burger topped with cheese.",
    price: 75,
    available: true,
    image: "",
    recipe: [
      { ingredientId: 10, quantity: 1 },
      { ingredientId: 4, quantity: 1 },
      { ingredientId: 11, quantity: 1 },
    ],
  },
  {
    id: 8,
    name: "Extra Rice",
    categoryId: "cat-5",
    description: "Additional serving of rice.",
    price: 15,
    available: true,
    image: "",
    recipe: [{ ingredientId: 5, quantity: 0.1 }],
  },
  {
    id: 9,
    name: "Fried Egg",
    categoryId: "cat-5",
    description: "One freshly fried egg.",
    price: 15,
    available: true,
    image: "",
    recipe: [
      { ingredientId: 2, quantity: 1 },
      { ingredientId: 3, quantity: 0.01 },
    ],
  },
  {
    id: 10,
    name: "Iced Tea",
    categoryId: "cat-6",
    description: "Refreshing iced tea.",
    price: 25,
    available: true,
    image: "",
    recipe: [{ ingredientId: 12, quantity: 0.03 }],
  },
  {
    id: 11,
    name: "Bottled Water",
    categoryId: "cat-6",
    description: "Chilled bottled drinking water.",
    price: 20,
    available: true,
    image: "",
    recipe: [{ ingredientId: 13, quantity: 1 }],
  },
];

const emptyFoodForm = {
  name: "",
  categoryId: "",
  description: "",
  price: "",
  available: true,
  image: "",
  recipe: [{ ingredientId: "", quantity: "" }],
};

const emptyCategoryForm = {
  name: "",
  description: "",
  image: "",
};

const CategoryThumbnail = ({ image, className = "" }) => (
  <div className={`categories-category-thumbnail ${className}`}>
    {image ? (
      <img src={image} alt="" />
    ) : (
      <Layers3 size={22} strokeWidth={1.8} />
    )}
  </div>
);

const FoodThumbnail = ({ image, className = "" }) => (
  <div className={`categories-food-thumbnail ${className}`}>
    {image ? (
      <img src={image} alt="" />
    ) : (
      <ChefHat size={21} strokeWidth={1.8} />
    )}
  </div>
);

const Categories = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [menuItems, setMenuItems] = useState(initialMenuItems);

  const [pageMode, setPageMode] = useState("categories");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const [categoryViewMode, setCategoryViewMode] = useState("grid");
  const [foodViewMode, setFoodViewMode] = useState("grid");

  const [categorySearch, setCategorySearch] = useState("");
  const [foodSearch, setFoodSearch] = useState("");

  const [categoryModal, setCategoryModal] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryForm, setCategoryForm] = useState(emptyCategoryForm);
  const [categoryError, setCategoryError] = useState("");
  const [categoryNotice, setCategoryNotice] = useState("");

  const [foodModal, setFoodModal] = useState("");
  const [selectedFood, setSelectedFood] = useState(null);
  const [foodForm, setFoodForm] = useState(emptyFoodForm);
  const [foodError, setFoodError] = useState("");

  const selectedCategoryData = categories.find(
    (category) => category.id === selectedCategoryId
  );

  const getCategoryName = (categoryId) =>
    categories.find((category) => category.id === categoryId)?.name ||
    "Uncategorized";

  const getIngredient = (ingredientId) =>
    ingredientOptions.find(
      (ingredient) => Number(ingredient.id) === Number(ingredientId)
    );

  const getCategoryItems = (categoryId) =>
    menuItems.filter((item) => item.categoryId === categoryId);

  const getCategoryAvailableCount = (categoryId) =>
    getCategoryItems(categoryId).filter((item) => item.available).length;

  const filteredCategories = categories.filter((category) => {
    const query = categorySearch.toLowerCase();

    return (
      category.name.toLowerCase().includes(query) ||
      category.description.toLowerCase().includes(query)
    );
  });

  const filteredFoods = menuItems.filter((item) => {
    const matchesCategory = item.categoryId === selectedCategoryId;
    const query = foodSearch.toLowerCase();

    const matchesSearch =
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  const handleImageUpload = (event, setImage, setError) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("The image must be 5 MB or smaller.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImage(reader.result);
      }
    };

    reader.onerror = () => {
      setError("Unable to read the selected image.");
    };

    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const openCategory = (category) => {
    setSelectedCategoryId(category.id);
    setFoodSearch("");
    setPageMode("foods");
    setCategoryNotice("");
  };

  const backToCategories = () => {
    setPageMode("categories");
    setSelectedCategoryId(null);
    setFoodSearch("");
  };

  const openAddCategory = () => {
    setSelectedCategory(null);
    setCategoryForm(emptyCategoryForm);
    setCategoryError("");
    setCategoryModal("add");
  };

  const openEditCategory = (category) => {
    setSelectedCategory(category);
    setCategoryForm({
      name: category.name,
      description: category.description,
      image: category.image || "",
    });
    setCategoryError("");
    setCategoryModal("edit");
  };

  const closeCategoryModal = () => {
    setCategoryModal("");
    setSelectedCategory(null);
    setCategoryError("");
  };

  const handleSaveCategory = (event) => {
    event.preventDefault();

    const name = categoryForm.name.trim();

    if (!name) {
      setCategoryError("Please enter a category name.");
      return;
    }

    const duplicate = categories.some(
      (category) =>
        category.name.toLowerCase() === name.toLowerCase() &&
        category.id !== selectedCategory?.id
    );

    if (duplicate) {
      setCategoryError("This category already exists.");
      return;
    }

    const updatedCategory = {
      name,
      description: categoryForm.description.trim(),
      image: categoryForm.image || "",
    };

    if (categoryModal === "add") {
      setCategories((current) => [
        ...current,
        {
          id: `cat-${Date.now()}`,
          ...updatedCategory,
        },
      ]);
    } else {
      setCategories((current) =>
        current.map((category) =>
          category.id === selectedCategory.id
            ? { ...category, ...updatedCategory }
            : category
        )
      );
    }

    closeCategoryModal();
  };

  const deleteCategory = (category) => {
    const hasItems = menuItems.some(
      (item) => item.categoryId === category.id
    );

    if (hasItems) {
      setCategoryNotice(
        `The "${category.name}" category still contains food items. Move or remove them before deleting this category.`
      );
      return;
    }

    if (categories.length <= 1) {
      setCategoryNotice("At least one category must remain.");
      return;
    }

    setCategories((current) =>
      current.filter((item) => item.id !== category.id)
    );

    setCategoryNotice("");
  };

  const openAddFood = () => {
    setSelectedFood(null);
    setFoodForm({
      ...emptyFoodForm,
      categoryId: selectedCategoryId || categories[0]?.id || "",
      image: "",
      recipe: [{ ingredientId: "", quantity: "" }],
    });
    setFoodError("");
    setFoodModal("add");
  };

  const openEditFood = (item) => {
    setSelectedFood(item);
    setFoodForm({
      name: item.name,
      categoryId: item.categoryId,
      description: item.description,
      price: String(item.price),
      available: item.available,
      image: item.image || "",
      recipe: item.recipe.map((line) => ({
        ingredientId: String(line.ingredientId),
        quantity: String(line.quantity),
      })),
    });
    setFoodError("");
    setFoodModal("edit");
  };

  const openFoodDetails = (item) => {
    setSelectedFood(item);
    setFoodModal("details");
  };

  const closeFoodModal = () => {
    setFoodModal("");
    setSelectedFood(null);
    setFoodError("");
  };

  const handleFoodFormChange = (field, value) => {
    setFoodForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleRecipeChange = (index, field, value) => {
    setFoodForm((current) => ({
      ...current,
      recipe: current.recipe.map((line, lineIndex) =>
        lineIndex === index
          ? { ...line, [field]: value }
          : line
      ),
    }));
  };

  const addRecipeLine = () => {
    setFoodForm((current) => ({
      ...current,
      recipe: [
        ...current.recipe,
        { ingredientId: "", quantity: "" },
      ],
    }));
  };

  const removeRecipeLine = (index) => {
    setFoodForm((current) => ({
      ...current,
      recipe: current.recipe.filter(
        (_, lineIndex) => lineIndex !== index
      ),
    }));
  };

  const handleSaveFood = (event) => {
    event.preventDefault();

    const price = Number(foodForm.price);

    if (!foodForm.name.trim()) {
      setFoodError("Please enter a food name.");
      return;
    }

    if (!foodForm.categoryId) {
      setFoodError("Please select a category.");
      return;
    }

    if (!Number.isFinite(price) || price < 0) {
      setFoodError("Please enter a valid selling price.");
      return;
    }

    if (foodForm.recipe.length === 0) {
      setFoodError("Add at least one required ingredient.");
      return;
    }

    const recipe = foodForm.recipe.map((line) => ({
      ingredientId: Number(line.ingredientId),
      quantity: Number(line.quantity),
    }));

    const hasInvalidRecipe = recipe.some(
      (line) =>
        !line.ingredientId ||
        !Number.isFinite(line.quantity) ||
        line.quantity <= 0 ||
        !getIngredient(line.ingredientId)
    );

    if (hasInvalidRecipe) {
      setFoodError(
        "Choose an ingredient and enter a quantity for each row."
      );
      return;
    }

    const ingredientIds = recipe.map((line) => line.ingredientId);

    if (new Set(ingredientIds).size !== ingredientIds.length) {
      setFoodError(
        "Each ingredient should only appear once in the recipe."
      );
      return;
    }

    const updatedFood = {
      name: foodForm.name.trim(),
      categoryId: foodForm.categoryId,
      description: foodForm.description.trim(),
      price,
      available: foodForm.available,
      image: foodForm.image || "",
      recipe,
    };

    if (foodModal === "add") {
      setMenuItems((current) => [
        ...current,
        { id: Date.now(), ...updatedFood },
      ]);
    } else {
      setMenuItems((current) =>
        current.map((item) =>
          item.id === selectedFood.id
            ? { ...item, ...updatedFood }
            : item
        )
      );
    }

    closeFoodModal();
  };

  const toggleFoodAvailability = (id) => {
    setMenuItems((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, available: !item.available }
          : item
      )
    );
  };

  const deleteFood = (id) => {
    setMenuItems((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  const totalAvailableFoods = menuItems.filter(
    (item) => item.available
  ).length;

  const totalFoodCount = menuItems.length;

  return (
    <div className="inventory-layout categories-layout">
      <InventoryBar activePage="Categories" />

      <main className="inventory-page categories-page">
        <header className="categories-header">
          <div>
            <span className="categories-eyebrow">
              INVENTORY MANAGEMENT
            </span>

            <h1>Categories</h1>

            <p>
              Organize your food items and manage their recipes.
            </p>
          </div>

          <button
            type="button"
            className="categories-header-button"
            onClick={
              pageMode === "categories"
                ? openAddCategory
                : openAddFood
            }
            disabled={pageMode === "foods" && categories.length === 0}
          >
            <Plus size={17} />
            {pageMode === "categories" ? "Add Category" : "Add Food"}
          </button>
        </header>

        {pageMode === "categories" && (
          <section className="categories-main-section">
            <div className="categories-section-heading">
              <div>
                <h2>Your Categories</h2>
                <p>
                  {categories.length} categories · {totalFoodCount} food items
                </p>
              </div>

              <div className="categories-view-toggle">
                <button
                  type="button"
                  className={categoryViewMode === "grid" ? "active" : ""}
                  onClick={() => setCategoryViewMode("grid")}
                  aria-label="Grid view"
                  title="Grid view"
                >
                  <LayoutGrid size={17} />
                </button>

                <button
                  type="button"
                  className={categoryViewMode === "list" ? "active" : ""}
                  onClick={() => setCategoryViewMode("list")}
                  aria-label="List view"
                  title="List view"
                >
                  <List size={17} />
                </button>
              </div>
            </div>

            <div className="categories-toolbar">
              <div className="categories-search">
                <Search size={17} />

                <input
                  type="text"
                  placeholder="Search categories..."
                  value={categorySearch}
                  onChange={(event) => setCategorySearch(event.target.value)}
                />

                {categorySearch && (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onClick={() => setCategorySearch("")}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <span className="categories-toolbar-count">
                {filteredCategories.length} results
              </span>
            </div>

            {categoryNotice && (
              <div className="categories-notice">
                <span>{categoryNotice}</span>
                <button
                  type="button"
                  onClick={() => setCategoryNotice("")}
                  aria-label="Dismiss notice"
                >
                  <X size={15} />
                </button>
              </div>
            )}

            {filteredCategories.length > 0 ? (
              categoryViewMode === "grid" ? (
                <div className="categories-card-grid">
                  {filteredCategories.map((category) => {
                    const categoryItems = getCategoryItems(category.id);
                    const available = getCategoryAvailableCount(category.id);

                    return (
                      <article
                        className="categories-card"
                        key={category.id}
                      >
                        <button
                          type="button"
                          className="categories-card-main"
                          onClick={() => openCategory(category)}
                        >
                          <div className="categories-card-top">
                            <CategoryThumbnail image={category.image} />

                            <span className="categories-card-count">
                              {categoryItems.length}{" "}
                              {categoryItems.length === 1 ? "item" : "items"}
                            </span>
                          </div>

                          <div className="categories-card-info">
                            <h3>{category.name}</h3>
                            <p>
                              {category.description ||
                                "Manage the food items in this category."}
                            </p>
                          </div>

                          <div className="categories-card-footer">
                            <span>
                              <span className="categories-card-dot" />
                              {available} available
                            </span>

                            <span className="categories-card-open">
                              View items
                              <ChevronDown size={15} />
                            </span>
                          </div>
                        </button>

                        <div className="categories-card-actions">
                          <button
                            type="button"
                            onClick={() => openEditCategory(category)}
                            aria-label={`Edit ${category.name}`}
                            title="Edit category"
                          >
                            <Pencil size={14} />
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => deleteCategory(category)}
                            aria-label={`Delete ${category.name}`}
                            title="Delete category"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="categories-table-wrap">
                  <table className="categories-table">
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>Food Items</th>
                        <th>Available</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredCategories.map((category) => {
                        const categoryItems = getCategoryItems(category.id);
                        const available = getCategoryAvailableCount(category.id);

                        return (
                          <tr key={category.id}>
                            <td data-label="Category">
                              <button
                                type="button"
                                className="categories-table-name"
                                onClick={() => openCategory(category)}
                              >
                                <CategoryThumbnail
                                  image={category.image}
                                  className="categories-table-thumbnail"
                                />

                                <span>
                                  <strong>{category.name}</strong>
                                  <small>
                                    {category.description || "No description"}
                                  </small>
                                </span>
                              </button>
                            </td>

                            <td data-label="Food Items">
                              {categoryItems.length} items
                            </td>

                            <td data-label="Available">
                              {available} available
                            </td>

                            <td data-label="Actions">
                              <div className="categories-table-actions">
                                <button
                                  type="button"
                                  onClick={() => openEditCategory(category)}
                                  title="Edit category"
                                  aria-label={`Edit ${category.name}`}
                                >
                                  <Pencil size={15} />
                                </button>

                                <button
                                  type="button"
                                  onClick={() => deleteCategory(category)}
                                  title="Delete category"
                                  aria-label={`Delete ${category.name}`}
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )
            ) : (
              <div className="categories-empty">
                <div>
                  <Layers3 size={25} />
                </div>
                <strong>No categories found</strong>
                <span>Try another search or create a new category.</span>
                <button type="button" onClick={openAddCategory}>
                  <Plus size={15} />
                  Add Category
                </button>
              </div>
            )}
          </section>
        )}

        {pageMode === "foods" && selectedCategoryData && (
          <section className="categories-main-section">
            <div className="categories-breadcrumb">
              <button
                type="button"
                onClick={backToCategories}
              >
                <ArrowLeft size={16} />
                All Categories
              </button>

              <span>/</span>
              <strong>{selectedCategoryData.name}</strong>
            </div>

            <div className="categories-section-heading">
              <div>
                <h2>{selectedCategoryData.name}</h2>
                <p>
                  {selectedCategoryData.description ||
                    "Manage the food items in this category."}
                </p>
              </div>

              <div className="categories-view-toggle">
                <button
                  type="button"
                  className={foodViewMode === "grid" ? "active" : ""}
                  onClick={() => setFoodViewMode("grid")}
                  aria-label="Grid view"
                  title="Grid view"
                >
                  <LayoutGrid size={17} />
                </button>

                <button
                  type="button"
                  className={foodViewMode === "list" ? "active" : ""}
                  onClick={() => setFoodViewMode("list")}
                  aria-label="List view"
                  title="List view"
                >
                  <List size={17} />
                </button>
              </div>
            </div>

            <div className="categories-toolbar">
              <div className="categories-search">
                <Search size={17} />

                <input
                  type="text"
                  placeholder={`Search ${selectedCategoryData.name.toLowerCase()}...`}
                  value={foodSearch}
                  onChange={(event) => setFoodSearch(event.target.value)}
                />

                {foodSearch && (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onClick={() => setFoodSearch("")}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <span className="categories-toolbar-count">
                {filteredFoods.length}{" "}
                {filteredFoods.length === 1 ? "food item" : "food items"}
              </span>
            </div>

            {filteredFoods.length > 0 ? (
              foodViewMode === "grid" ? (
                <div className="categories-food-grid">
                  {filteredFoods.map((item) => (
                    <article
                      className="categories-food-card"
                      key={item.id}
                    >
                      <div className="categories-food-card-top">
                        <FoodThumbnail image={item.image} />

                        <button
                          type="button"
                          className={`categories-availability ${
                            item.available ? "available" : "unavailable"
                          }`}
                          onClick={() => toggleFoodAvailability(item.id)}
                        >
                          <span />
                          {item.available ? "Available" : "Unavailable"}
                        </button>
                      </div>

                      <div className="categories-food-info">
                        <h3>{item.name}</h3>
                        <p>
                          {item.description || "No description provided."}
                        </p>
                      </div>

                      <div className="categories-food-meta">
                        <strong>₱{Number(item.price).toFixed(2)}</strong>

                        <span>
                          <Package size={13} />
                          {item.recipe.length} ingredients
                        </span>
                      </div>

                      <div className="categories-food-actions">
                        <button
                          type="button"
                          onClick={() => openFoodDetails(item)}
                        >
                          <Eye size={14} />
                          Recipe
                        </button>

                        <button
                          type="button"
                          onClick={() => openEditFood(item)}
                        >
                          <Pencil size={14} />
                          Edit
                        </button>

                        <button
                          type="button"
                          className="categories-food-delete"
                          onClick={() => deleteFood(item.id)}
                          aria-label={`Delete ${item.name}`}
                          title="Delete food"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="categories-table-wrap">
                  <table className="categories-table categories-food-table">
                    <thead>
                      <tr>
                        <th>Food Item</th>
                        <th>Selling Price</th>
                        <th>Ingredients</th>
                        <th>Availability</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredFoods.map((item) => (
                        <tr key={item.id}>
                          <td data-label="Food Item">
                            <div className="categories-table-name">
                              <FoodThumbnail
                                image={item.image}
                                className="categories-table-thumbnail"
                              />

                              <span>
                                <strong>{item.name}</strong>
                                <small>
                                  {item.description || "No description"}
                                </small>
                              </span>
                            </div>
                          </td>

                          <td data-label="Selling Price">
                            <strong className="categories-table-price">
                              ₱{Number(item.price).toFixed(2)}
                            </strong>
                          </td>

                          <td data-label="Ingredients">
                            {item.recipe.length} ingredients
                          </td>

                          <td data-label="Availability">
                            <button
                              type="button"
                              className={`categories-availability ${
                                item.available ? "available" : "unavailable"
                              }`}
                              onClick={() => toggleFoodAvailability(item.id)}
                            >
                              <span />
                              {item.available ? "Available" : "Unavailable"}
                            </button>
                          </td>

                          <td data-label="Actions">
                            <div className="categories-table-actions">
                              <button
                                type="button"
                                onClick={() => openFoodDetails(item)}
                                title="View recipe"
                                aria-label={`View ${item.name} recipe`}
                              >
                                <Eye size={15} />
                              </button>

                              <button
                                type="button"
                                onClick={() => openEditFood(item)}
                                title="Edit food"
                                aria-label={`Edit ${item.name}`}
                              >
                                <Pencil size={15} />
                              </button>

                              <button
                                type="button"
                                onClick={() => deleteFood(item.id)}
                                title="Delete food"
                                aria-label={`Delete ${item.name}`}
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            ) : (
              <div className="categories-empty">
                <div>
                  <Utensils size={25} />
                </div>
                <strong>No food items found</strong>
                <span>
                  Add a food item to start building this category.
                </span>
                <button type="button" onClick={openAddFood}>
                  <Plus size={15} />
                  Add Food
                </button>
              </div>
            )}
          </section>
        )}
      </main>

      {categoryModal && (
        <div
          className="categories-modal-overlay"
          onClick={closeCategoryModal}
        >
          <section
            className="categories-modal categories-category-modal"
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="categories-modal-header">
              <div>
                <span>CATEGORY MANAGEMENT</span>
                <h2>
                  {categoryModal === "add"
                    ? "Add Category"
                    : "Edit Category"}
                </h2>
              </div>

              <button
                type="button"
                className="categories-modal-close"
                onClick={closeCategoryModal}
                aria-label="Close modal"
              >
                <X size={19} />
              </button>
            </div>

            <form
              className="categories-form"
              onSubmit={handleSaveCategory}
            >
              <label className="categories-field-label">
                Category Name
              </label>

              <input
                className="categories-input"
                type="text"
                placeholder="e.g. Sisig, Sides, Drinks"
                value={categoryForm.name}
                onChange={(event) => {
                  setCategoryForm((current) => ({
                    ...current,
                    name: event.target.value,
                  }));
                  setCategoryError("");
                }}
                autoFocus
              />

              <label className="categories-field-label">
                Description
                <span>Optional</span>
              </label>

              <textarea
                className="categories-input categories-textarea"
                placeholder="Briefly describe this category"
                value={categoryForm.description}
                onChange={(event) =>
                  setCategoryForm((current) => ({
                    ...current,
                    description: event.target.value,
                  }))
                }
                rows={2}
              />

              <div className="categories-upload-section">
                <div className="categories-upload-heading">
                  <label className="categories-field-label">
                    Category Image
                  </label>
                  <span>Optional</span>
                </div>

                <div className="categories-upload-box">
                  <CategoryThumbnail
                    image={categoryForm.image}
                    className="categories-upload-preview"
                  />

                  <div className="categories-upload-info">
                    <strong>
                      {categoryForm.image ? "Image selected" : "Default category icon"}
                    </strong>
                    <span>
                      {categoryForm.image
                        ? "Your uploaded image will be displayed."
                        : "Upload an image or keep the default icon."}
                    </span>
                  </div>

                  <div className="categories-upload-actions">
                    <label
                      htmlFor="categories-category-image"
                      className="categories-upload-button"
                    >
                      <ImagePlus size={14} />
                      Choose Image
                    </label>

                    {categoryForm.image && (
                      <button
                        type="button"
                        className="categories-remove-image"
                        onClick={() =>
                          setCategoryForm((current) => ({
                            ...current,
                            image: "",
                          }))
                        }
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <input
                    id="categories-category-image"
                    className="categories-file-input"
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                      handleImageUpload(
                        event,
                        (image) =>
                          setCategoryForm((current) => ({
                            ...current,
                            image,
                          })),
                        setCategoryError
                      )
                    }
                  />
                </div>

                <span className="categories-upload-hint">
                  JPG, PNG, or WebP · Maximum 5 MB
                </span>
              </div>

              {categoryError && (
                <p className="categories-form-error">{categoryError}</p>
              )}

              <div className="categories-modal-actions">
                <button
                  type="button"
                  className="categories-modal-cancel"
                  onClick={closeCategoryModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="categories-modal-primary"
                >
                  {categoryModal === "add" ? "Add Category" : "Save Changes"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      {foodModal && (
        <div
          className="categories-modal-overlay"
          onClick={closeFoodModal}
        >
          <section
            className="categories-modal categories-food-modal"
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="categories-modal-header">
              <div>
                <span>FOOD ITEM MANAGEMENT</span>
                <h2>
                  {foodModal === "details"
                    ? "Food Recipe"
                    : foodModal === "edit"
                    ? "Edit Food"
                    : "Add New Food"}
                </h2>
              </div>

              <button
                type="button"
                className="categories-modal-close"
                onClick={closeFoodModal}
                aria-label="Close modal"
              >
                <X size={19} />
              </button>
            </div>

            {foodModal === "details" && selectedFood && (
              <div className="categories-recipe-details">
                <div className="categories-recipe-food">
                  <FoodThumbnail
                    image={selectedFood.image}
                    className="categories-recipe-thumbnail"
                  />

                  <div>
                    <h3>{selectedFood.name}</h3>
                    <span>{getCategoryName(selectedFood.categoryId)}</span>
                  </div>

                  <strong>
                    ₱{Number(selectedFood.price).toFixed(2)}
                  </strong>
                </div>

                <div className="categories-recipe-heading">
                  <div>
                    <h3>Required Ingredients</h3>
                    <p>Quantities needed for one serving</p>
                  </div>

                  <span>{selectedFood.recipe.length} items</span>
                </div>

                <div className="categories-recipe-list">
                  {selectedFood.recipe.map((line, index) => {
                    const ingredient = getIngredient(line.ingredientId);

                    return (
                      <div
                        className="categories-recipe-line"
                        key={`${line.ingredientId}-${index}`}
                      >
                        <div className="categories-recipe-line-icon">
                          <Package size={15} />
                        </div>

                        <span>
                          {ingredient?.name || "Unknown ingredient"}
                        </span>

                        <strong>
                          {line.quantity} {ingredient?.unit || ""}
                        </strong>
                      </div>
                    );
                  })}
                </div>

                <div className="categories-recipe-note">
                  <Check size={15} />
                  <p>
                    Ingredient quantities are saved per serving and can be
                    used by the POS for stock deduction after completed orders.
                  </p>
                </div>

                <button
                  type="button"
                  className="categories-modal-primary categories-recipe-done"
                  onClick={closeFoodModal}
                >
                  Done
                </button>
              </div>
            )}

            {(foodModal === "add" || foodModal === "edit") && (
              <form
                className="categories-form"
                onSubmit={handleSaveFood}
              >
                <div className="categories-form-row">
                  <div>
                    <label className="categories-field-label">
                      Food Name
                    </label>

                    <input
                      className="categories-input"
                      type="text"
                      placeholder="e.g. Sisig Rice Meal"
                      value={foodForm.name}
                      onChange={(event) =>
                        handleFoodFormChange("name", event.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className="categories-field-label">
                      Category
                    </label>

                    <div className="categories-input-select">
                      <select
                        className="categories-input"
                        value={foodForm.categoryId}
                        onChange={(event) =>
                          handleFoodFormChange("categoryId", event.target.value)
                        }
                      >
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>

                      <ChevronDown size={15} />
                    </div>
                  </div>
                </div>

                <label className="categories-field-label">
                  Description
                </label>

                <textarea
                  className="categories-input categories-textarea"
                  placeholder="Short description of the food item"
                  value={foodForm.description}
                  onChange={(event) =>
                    handleFoodFormChange("description", event.target.value)
                  }
                  rows={2}
                />

                <div className="categories-upload-section">
                  <div className="categories-upload-heading">
                    <label className="categories-field-label">
                      Food Image
                    </label>
                    <span>Optional</span>
                  </div>

                  <div className="categories-upload-box">
                    <FoodThumbnail
                      image={foodForm.image}
                      className="categories-upload-preview"
                    />

                    <div className="categories-upload-info">
                      <strong>
                        {foodForm.image ? "Image selected" : "Default food icon"}
                      </strong>
                      <span>
                        {foodForm.image
                          ? "Your uploaded image will be displayed."
                          : "Upload a food photo or keep the default icon."}
                      </span>
                    </div>

                    <div className="categories-upload-actions">
                      <label
                        htmlFor="categories-food-image"
                        className="categories-upload-button"
                      >
                        <ImagePlus size={14} />
                        Choose Image
                      </label>

                      {foodForm.image && (
                        <button
                          type="button"
                          className="categories-remove-image"
                          onClick={() =>
                            handleFoodFormChange("image", "")
                          }
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <input
                      id="categories-food-image"
                      className="categories-file-input"
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        handleImageUpload(
                          event,
                          (image) =>
                            handleFoodFormChange("image", image),
                          setFoodError
                        )
                      }
                    />
                  </div>

                  <span className="categories-upload-hint">
                    JPG, PNG, or WebP · Maximum 5 MB
                  </span>
                </div>

                <div className="categories-form-row categories-price-availability">
                  <div>
                    <label className="categories-field-label">
                      Selling Price
                    </label>

                    <div className="categories-price-input">
                      <span>₱</span>

                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        value={foodForm.price}
                        onChange={(event) =>
                          handleFoodFormChange("price", event.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="categories-availability-field">
                    <label className="categories-field-label">
                      Availability
                    </label>

                    <button
                      type="button"
                      className={`categories-availability-control ${
                        foodForm.available ? "active" : ""
                      }`}
                      onClick={() =>
                        handleFoodFormChange(
                          "available",
                          !foodForm.available
                        )
                      }
                      role="switch"
                      aria-checked={foodForm.available}
                    >
                      <span />
                      {foodForm.available ? "Available" : "Unavailable"}
                    </button>
                  </div>
                </div>

                <div className="categories-form-divider" />

                <div className="categories-ingredients-heading">
                  <div>
                    <h3>Required Ingredients</h3>
                    <p>Set the quantity used for one serving.</p>
                  </div>

                  <span>{foodForm.recipe.length} ingredients</span>
                </div>

                <div className="categories-ingredient-list">
                  {foodForm.recipe.map((line, index) => {
                    const ingredient = getIngredient(line.ingredientId);

                    return (
                      <div
                        className="categories-ingredient-row"
                        key={index}
                      >
                        <div className="categories-ingredient-select">
                          <select
                            value={line.ingredientId}
                            onChange={(event) =>
                              handleRecipeChange(
                                index,
                                "ingredientId",
                                event.target.value
                              )
                            }
                            aria-label="Select ingredient"
                          >
                            <option value="">Select ingredient</option>

                            {ingredientOptions.map((option) => (
                              <option
                                key={option.id}
                                value={option.id}
                              >
                                {option.name}
                              </option>
                            ))}
                          </select>

                          <ChevronDown size={14} />
                        </div>

                        <div className="categories-ingredient-quantity">
                          <input
                            type="number"
                            min="0.001"
                            step="any"
                            placeholder="Qty"
                            value={line.quantity}
                            onChange={(event) =>
                              handleRecipeChange(
                                index,
                                "quantity",
                                event.target.value
                              )
                            }
                            aria-label="Ingredient quantity"
                          />

                          <span>{ingredient?.unit || "unit"}</span>
                        </div>

                        <button
                          type="button"
                          className="categories-remove-ingredient"
                          onClick={() => removeRecipeLine(index)}
                          aria-label="Remove ingredient"
                          title="Remove ingredient"
                        >
                          <X size={15} />
                        </button>
                      </div>
                    );
                  })}
                </div>

                <button
                  type="button"
                  className="categories-add-ingredient"
                  onClick={addRecipeLine}
                >
                  <Plus size={15} />
                  Add Ingredient
                </button>

                <div className="categories-recipe-note">
                  <Check size={15} />
                  <p>
                    Ingredient quantities are recorded per serving and can
                    be used for stock deduction when connected to the POS.
                  </p>
                </div>

                {foodError && (
                  <p className="categories-form-error">{foodError}</p>
                )}

                <div className="categories-modal-actions">
                  <button
                    type="button"
                    className="categories-modal-cancel"
                    onClick={closeFoodModal}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="categories-modal-primary"
                  >
                    {foodModal === "add" ? "Add Food" : "Save Changes"}
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

export default Categories;