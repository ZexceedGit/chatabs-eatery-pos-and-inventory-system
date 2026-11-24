
# CHATABS
### Restaurant Management System

<p align="center">
  A centralized platform for Chatabs, integrating restaurant transactions, inventory monitoring, and online promotion.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/PHP-777BB4?logo=php&logoColor=white" alt="PHP">
  <img src="https://img.shields.io/badge/Laravel-FF2D20?logo=laravel&logoColor=white" alt="Laravel">
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white" alt="CSS3">
</p>

---

## 📌 About

**Chatabs** is a web-based restaurant management system developed specifically for Chatabs to replace manual operational processes with a centralized digital platform.

The system brings together three major components:

- **Point-of-Sale (POS)** – Handles customer orders, table assignments, kitchen order monitoring, and sales transactions.
- **Promotional Website** – Showcases Chatabs' menu, food offerings, announcements, customer reviews, and restaurant information.
- **Inventory Management** – Maintains ingredient and supply records, monitors stock quantities, and supports restocking.

## 📸 Screenshots

### Point-of-Sale
<p align="center">
  <img src="YOUR-POS-SCREENSHOT-URL" width="850" alt="Chatabs POS">
</p>

### Promotional Website
<p align="center">
  <img src="YOUR-WEBSITE-SCREENSHOT-URL" width="850" alt="Chatabs Website">
</p>

### Inventory Management
<p align="center">
  <img src="YOUR-INVENTORY-SCREENSHOT-URL" width="850" alt="Chatabs Inventory">
</p>

## ✨ Core Features

### 1. Point-of-Sale (POS)
- Customer order creation and modification
- Table-based order assignment
- Kitchen order monitoring and status updates
- Transaction processing and sales records

### 2. Promotional Website
- Restaurant menu with food descriptions and prices
- News and announcements
- Customer reviews
- Restaurant information and business details

### 3. Inventory Management
- Ingredient and supply records
- Stock quantity and unit management
- Inventory adjustments
- Restocking monitoring
- Integration with POS operations

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| PHP | Backend language |
| Laravel | Backend framework |
| PostgreSQL | Database |
| React | Frontend library |
| JSX | React component syntax |
| JavaScript | Application functionality |
| CSS | Interface styling |

## 🏗️ Architecture

The system uses Laravel and PHP for backend operations, React for the frontend, and PostgreSQL for database management.

- **Frontend:** React, JSX, JavaScript, and CSS
- **Backend:** PHP and Laravel
- **Database:** PostgreSQL
- **Communication:** HTTP requests and API endpoints

## 📂 Project Structure

```text
chatabs/
│
├── backend/
│   ├── app/
│   ├── bootstrap/
│   ├── config/
│   ├── database/
│   ├── routes/
│   ├── storage/
│   ├── tests/
│   └── composer.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   └── styles/
│   └── package.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- PHP
- Composer
- Node.js and npm
- PostgreSQL
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
cd YOUR-REPOSITORY
```

### 2. Set Up the Backend

```bash
cd backend
composer install
```

Create the environment file:

```bash
cp .env.example .env
```

Generate the application key:

```bash
php artisan key:generate
```

Configure PostgreSQL in your `.env` file:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=chatabs
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

Run migrations:

```bash
php artisan migrate
```

Start the backend:

```bash
php artisan serve
```

### 3. Set Up the Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the frontend URL displayed in the terminal.

> Ensure that the frontend is configured to communicate with the Laravel backend and that the required CORS settings are properly configured.

## 👥 Contributors

**Developed for:** Chatabs

**Development Team:**
- Add contributor name
- Add contributor name
- Add contributor name
- Add contributor name

**Institution:** Add institution name

**Academic Program:** Add degree program

**Academic Year:** 2026–2027

## 🙏 Credits

- [Laravel](https://laravel.com/)
- [React](https://react.dev/)
- [PostgreSQL](https://www.postgresql.org/)
- [PHP](https://www.php.net/)

## 📄 License

Developed as an academic research and software development project.

Unless otherwise specified, all original project materials remain the property of their respective authors.

---

<p align="center">
  <strong>CHATABS</strong>
  <br>
  <em>Restaurant Operations, Connected.</em>
</p>
