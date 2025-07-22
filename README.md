# AD Visualizer (Active Directory Görselleştirici)

## 📁 Proje Yapısı

ADVisualizer/
├── scanner/		       → C# modülü (mock verilerle veri toplar ve Neo4j'e yazar)
├── backend/	 	       → Django REST API (Neo4j'den veriyi alır)
├── frontend/ 	       → React.js arayüz (verileri görselleştirir)
└── README.md 	       → Kurulum ve kullanım dökümanı

---

## ⚙️ Geliştirilen Modüller

### 1️⃣ **Scanner (C#)**

* DirectoryEntry yerine mock verilerle çalışır.
* User, Computer ve Group nesneleri oluşturur.
* ACL ilişkilerini (`GenericAll`, `WriteDacl`, `ForceChangePassword`) Neo4j’e yazar.
* `Neo4jClient` ile veritabanına bağlanır.

### 2️⃣ **Backend API (Python + Django + Neomodel)**

* Neo4j veritabanındaki verileri alır.
* REST API üzerinden listeleme ve detay endpoint'leri sunar.
* ACL ilişkilerini detay endpoint'inde gösterir.


### 3️⃣ **Frontend (React + Axios + React Query)**

* API'den verileri çekerek kullanıcıya sunar.
* Dashboard, liste ve detay sayfalarına sahiptir.
* ACL yetkileri detay sayfalarında gösterilir.

---

## 🧩 Gereksinimler

* .NET SDK (7.0+)
* Python 3.10+
* Node.js 18+
* Neo4j Desktop


## Kurulum Adımları

### 🛢️ **1. Neo4j Veritabanı Kurulumu**

1. [Neo4j Desktop]() indir ve yükle.
2. Yeni bir Local DB oluştur:
   * **Database Name** : `adgraph`
   * **Username** : `neo4j`
   * **Password** : `test1234`
3. Veritabanını başlat.
4. Bağlantı URI: `bolt://localhost:7687`


### ⚙️ **2. Scanner (C#) Modülü Kurulumu**

```cd
cd scanner
dotnet restore
dotnet run
```

➡ Mock User, Computer ve Group nesnelerini ve ACL ilişkilerini Neo4j veritabanına yazar.


### 🐍 **3. Backend API (Django + Neomodel)**

```
cd backend
python -m venv env
source env/bin/activate  # (Windows: env\Scripts\activate)
pip install -r requirements.txt
python manage.py runserver
```

➡ API şu portta çalışır: `http://127.0.0.1:8000`

#### ✅ API Endpoint'leri

| Endpoint                    | Açıklama             |
| --------------------------- | ---------------------- |
| `/api/v1/users`           | User listesi           |
| `/api/v1/computers`       | Computer listesi       |
| `/api/v1/groups`          | Group listesi          |
| `/api/v1/users/{sid}`     | User detay (ACL dahil) |
| `/api/v1/computers/{sid}` | Computer detay         |
| `/api/v1/groups/{sid}`    | Group detay            |


### 🌐 **4. Frontend (React.js)**

```
cd frontend
npm install
npm start
```

#### 🔁 Proxy Ayarı (`package.json` içine):

```
"proxy": "http://localhost:8000"
```

#### 📺 Sayfalar

| Sayfa                | Açıklama                 |
| -------------------- | -------------------------- |
| `/`                | Dashboard: obje sayıları |
| `/users`           | User listesi               |
| `/users/{sid}`     | User detay (ACL dahil)     |
| `/computers`       | Computer listesi           |
| `/computers/{sid}` | Computer detay             |
| `/groups`          | Group listesi              |
| `/groups/{sid}`    | Group detay                |


### 🧪 Test Verileri

> Scanner modülü içinde şu örnek veriler bulunmaktadır:

* **User** : `CN=Alice,...` – SID: `S-1-5-21-1001`
* **Computer** : `CN=PC1,...` – SID: `S-1-5-21-2001`
* **Group** : `CN=Admins,...` – SID: `S-1-5-21-3001`

> ACL:

* Alice → PC1: `GenericAll`
* Admins → Alice: `WriteDacl`
