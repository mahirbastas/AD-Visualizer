# AD Visualizer (Active Directory Visualizer)

## 📁 Project Structure

ADVisualizer/
├── scanner/      → C# module (collects mock data and writes to Neo4j)
├── backend/      → Django REST API (reads data from Neo4j)
├── frontend/     → React.js UI (visualizes the data)
└── README.md     → Setup and usage documentation

---

## ⚙️ Developed Modules

### 1️⃣ Scanner (C#)

- Works with mock data instead of DirectoryEntry.
- Creates User, Computer, and Group objects.
- Writes ACL relationships (`GenericAll`, `WriteDacl`, `ForceChangePassword`) to Neo4j.
- Connects to the database using `Neo4jClient`.

### 2️⃣ Backend API (Python + Django + Neomodel)

- Fetches data from the Neo4j database.
- Provides list and detail endpoints via REST API.
- Displays ACL relationships in the user detail endpoints.

### 3️⃣ Frontend (React + Axios + React Query)

- Fetches data from the API and displays it to users.
- Includes dashboard, list, and detail pages.
- ACL permissions are shown on detail pages.

---

## 🧩 Requirements

- .NET SDK (7.0+)
- Python 3.10+
- Node.js 18+
- Neo4j Desktop

---

## 🔧 Installation Steps

### 🛢️ 1. Neo4j Database Setup

1. Download and install [Neo4j Desktop](https://neo4j.com/download/).
2. Create a new local database:
   - **Database Name**: `adgraph`
   - **Username**: `neo4j`
   - **Password**: `test1234`
3. Start the database.
4. Connection URI: `bolt://localhost:7687`


### ⚙️ 2. Scanner (C#) Module Setup

```bash
cd scanner
dotnet restore
dotnet run
```

➡ Mock User, Computer, Group objects and ACL relationships into the Neo4j database.

### 🐍 **3. Backend API (Django + Neomodel)**

```
cd backend
python -m venv env
source env/bin/activate  # (Windows: env\Scripts\activate)
pip install -r requirements.txt
python manage.py runserver
```

➡ The API runs at: `http://127.0.0.1:8000`

#### ✅ API Endpoints

| Endpoint                    | Description             |
| --------------------------- | ---------------------- |
| `/api/v1/users`           | List of users           |
| `/api/v1/computers`       | List of computers       |
| `/api/v1/groups`          | List of groups          |
| `/api/v1/users/{sid}`     | User details (includes ACL) |
| `/api/v1/computers/{sid}` | Computer details         |
| `/api/v1/groups/{sid}`    | Group details            |

### 🌐 **4. Frontend (React.js)**

```
cd frontend
npm install
npm start
```

#### 🔁 Proxy Setting (in package.json):

```
"proxy": "http://localhost:8000"
```

#### 📺 Pages

| Page                | Description                 |
| -------------------- | -------------------------- |
| `/`                | Dashboard: object counts |
| `/users`           | List of users               |
| `/users/{sid}`     | User details (includes ACL) |
| `/computers`       | List of computers           |
| `/computers/{sid}` | Computer details            |
| `/groups`          | List of groups              |
| `/groups/{sid}`    | Group details               |

### 🧪 Sample Test Data

> The Scanner module includes the following mock objects:

* **User** : `CN=Alice,...` – SID: `S-1-5-21-1001`
* **Computer** : `CN=PC1,...` – SID: `S-1-5-21-2001`
* **Group** : `CN=Admins,...` – SID: `S-1-5-21-3001`

> ACL Relationships:

* Alice → PC1: `GenericAll`
* Admins → Alice: `WriteDacl`
