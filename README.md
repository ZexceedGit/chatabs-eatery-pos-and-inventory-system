
# HANK'S LAST STAND
### A 2D Quest-Driven Hangman Adventure

<p align="center">
  Explore a mysterious town, help its residents, solve word puzzles, and uncover the truth behind the Hangman King.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Java-21-orange?logo=openjdk" alt="Java 21">
  <img src="https://img.shields.io/badge/Spring_Boot-4.1.2-6DB33F?logo=springboot" alt="Spring Boot">
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white" alt="CSS3">
</p>

---

## 🎮 About

**Hank's Last Stand** is a 2D adventure game that puts a twist on the classic Hangman experience.

Explore a town filled with characters, take on their quests, and solve word puzzles to help them. Collect items, unlock new quests, and work your way toward the final encounter with the Hangman King.

Built with a Java-powered backend and a browser-based frontend, the project combines game development with object-oriented software architecture.

---

## 📸 Screenshots

| Main Menu | Gameplay |
|:---:|:---:|
| <img src="https://github.com/user-attachments/assets/a1b0ba74-8ab6-41c4-8db3-1185f21c2a20" width="400" alt="Main Menu"> | <img src="https://github.com/user-attachments/assets/5c6517a9-0dc5-4193-b43b-5f60ce9eb099" width="400" alt="Gameplay"> |

| Boss Fight | Victory |
|:---:|:---:|
| <!-- Add Boss Fight screenshot URL here --> | <!-- Add Victory screenshot URL here --> |

---

## ✨ Features

- **Town Exploration** – Navigate the game world and discover its residents.
- **Quest System** – Complete character-specific quests and unlock progression.
- **Hangman Challenges** – Solve category-based word puzzles using definitions as clues.
- **Collectibles** – Gather candies and use them to obtain hints.
- **Quest Items** – Obtain items required to unlock certain quests.
- **Boss Encounter** – Face the Hangman King in a special timed challenge.
- **Scoring System** – Earn scores based on gameplay performance and completion time.
- **Leaderboard** – Track player records and export leaderboard data.
- **Interactive Dialogue** – Discover character stories through NPC interactions.

---

## 🕹️ Controls

| Key | Action |
|:---:|---|
| `A` | Move left |
| `D` | Move right |
| `W` / `Space` | Jump |
| `E` | Interact |
| `P` / `Esc` | Pause |
| `Enter` | Confirm / Start |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Java 21** | Backend development and game data modeling |
| **Spring Boot** | Backend application framework |
| **Spring Web MVC** | REST API development |
| **Jackson** | JSON serialization |
| **Apache Maven** | Build and dependency management |
| **HTML5** | Game interface structure |
| **CSS3** | Styling and visual presentation |
| **JavaScript** | Game logic, rendering, and interactions |
| **HTML Canvas** | 2D game rendering |
| **Browser Local Storage** | Local leaderboard persistence |

---

## 🏗️ Architecture

The project uses a separated frontend and backend architecture.

- **Frontend:** Handles rendering, player input, gameplay mechanics, animations, and user interface interactions.
- **Backend:** Provides structured game data through REST API endpoints using Java and Spring Boot.
- **Communication:** The frontend retrieves game definitions from the backend through HTTP requests and JSON responses.
- **Persistence:** Browser Local Storage is used for leaderboard records.

### Object-Oriented Design

The Java backend uses object-oriented design to organize game entities and their behavior.

| Class | Responsibility |
|---|---|
| `GameCharacter` | Abstract base class for game characters |
| `NPC` | Represents quest-giving characters |
| `Boss` | Represents the final boss |
| `QuestItem` | Defines collectible quest items |
| `NPCAppearance` | Stores character appearance properties |
| `GameData` | Organizes game definitions |
| `GameDataService` | Provides game data |
| `GameDataController` | Exposes game data through REST endpoints |

**Core OOP Concepts Implemented:**

- Encapsulation
- Inheritance
- Polymorphism
- Abstraction

---

## 📂 Project Structure

```text
hangman-game/
│
├── backend/
│   ├── pom.xml
│   ├── mvnw
│   ├── mvnw.cmd
│   └── src/
│       └── main/
│           ├── java/com/hangman/
│           │   ├── model/
│           │   ├── service/
│           │   ├── controller/
│           │   └── config/
│           └── resources/
│
├── assets/
│
├── js/
│   ├── main.js
│   ├── game.js
│   ├── data/
│   ├── engine/
│   ├── logic/
│   └── systems/
│
├── styles/
│   ├── HangmanArt.css
│   ├── HUD.css
│   ├── Menu.css
│   └── Animation.css
│
├── index.html
├── global.css
└── leaderboard.txt
```

---

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed:

- [Java Development Kit 21](https://adoptium.net/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Google Chrome](https://www.google.com/chrome/) or [Microsoft Edge](https://www.microsoft.com/edge/)
- [Live Server Extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

Maven installation is not required because the project includes Maven Wrapper.

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
```

Navigate to the project directory:

```bash
cd YOUR-REPOSITORY
```

### 2. Start the Backend

Navigate to the backend directory:

```bash
cd backend
```

**Compile the project:**

Windows:

```powershell
.\mvnw.cmd clean compile
```

macOS / Linux:

```bash
chmod +x ./mvnw
./mvnw clean compile
```

**Start the Spring Boot application:**

Windows:

```powershell
.\mvnw.cmd spring-boot:run
```

macOS / Linux:

```bash
./mvnw spring-boot:run
```

Wait until Spring Boot successfully starts.

### 3. Verify the Backend

Open the following endpoint in your browser:

```text
http://localhost:8080/api/game-data
```

A successful response should return the game's data in JSON format.

### 4. Launch the Frontend

1. Open the project root folder in Visual Studio Code.
2. Locate `index.html`.
3. Right-click the file.
4. Select **Open with Live Server**.
5. Open the game in your browser.

The backend must remain running while playing.

> **Note:** The frontend and backend must use compatible CORS settings. The default development ports are `5500` for Live Server and `8080` for Spring Boot.

---

## 📋 Development Notes

- Preserve the original project directory structure.
- Keep the backend running while accessing the game.
- Ensure that the configured API endpoint is accessible.
- Do not move game assets without updating their corresponding references.
- Leaderboard records are stored using browser-side storage.

---

## 👥 Contributors

Developed by:

- **Luigi Sebastian I. Bautista**
- **Cedrick A. Eusebio**
- **Erickson Joseph Kristoffer P. Luna**
- **Jasmine Quintina L. Roque**
- **Gino Vargas**

**Bachelor of Science in Computer Science – Intelligent Systems**

**Laguna State Polytechnic University – Los Baños Campus**

---

## 🙏 Credits

- [Google Fonts – Pixelify Sans](https://fonts.google.com/specimen/Pixelify+Sans)
- [Spring Initializr](https://start.spring.io/)

---

## 📄 License

This project was developed as an academic software development project.

Unless a license is added to this repository, all rights to the project's original source code and assets remain with their respective authors.

---

<p align="center">
  <strong>HANK'S LAST STAND</strong>
  <br>
  <em>A different kind of Hangman adventure.</em>
</p>
