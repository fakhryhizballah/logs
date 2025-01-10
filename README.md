# API Manajemen Log

Dokumen README ini memberikan gambaran umum tentang API RESTful untuk mengelola dan mencari log. API ini dirancang untuk memungkinkan aplikasi berbagi log dan memungkinkan pengguna untuk mencari serta melihat log dengan efisien.

---

## **Daftar Isi**
1. [Pendahuluan](#pendahuluan)
2. [Fitur](#fitur)
3. [Persiapan Awal](#persiapan-awal)
4. [Endpoint API](#endpoint-api)
5. [Autentikasi](#autentikasi)
6. [Penanganan Kesalahan](#penanganan-kesalahan)
7. [Variabel Lingkungan](#variabel-lingkungan)
8. [Contoh Permintaan](#contoh-permintaan)

---

## **1. Pendahuluan**
API Manajemen Log memungkinkan pengembang untuk mengelola log dari berbagai aplikasi dengan menyediakan endpoint untuk membuat, mengambil, dan mencari log. API ini aman karena mendukung autentikasi dan otorisasi untuk melindungi data log yang sensitif.

---

## **2. Fitur**
- Membuat, membaca, dan mencari log.
- Autentikasi yang aman menggunakan token.
- Mendukung paginasi untuk pencarian log yang besar.
- Kontrol akses berbasis peran untuk mengatur akses ke log.

---

## **3. Persiapan Awal**
### **Prasyarat**
- Node.js dan npm telah terinstal.
- Instans MongoDB (lokal atau jarak jauh).

### **Instalasi**
Clone repositori dan instal dependensi:
```bash
git clone https://github.com/yourusername/log-management-api.git
cd log-management-api
npm install
```

### **Jalankan API**
```bash
npm start
```
API akan tersedia di **http://localhost:3000**.

---

## **4. Endpoint API**

### **Autentikasi**
| Metode | Endpoint       | Deskripsi                |
|--------|----------------|--------------------------|
| POST   | /auth/register | Mendaftarkan pengguna baru |
| POST   | /auth/login    | Login dan mendapatkan token |

### **Log**
| Metode | Endpoint       | Deskripsi                |
|--------|----------------|--------------------------|
| POST   | /logs          | Membuat entri log baru   |
| GET    | /logs          | Mengambil semua log      |
| GET    | /logs/:id      | Mengambil log spesifik   |
| GET    | /logs/search   | Mencari log berdasarkan query |

---

## **5. Autentikasi**
API menggunakan **JSON Web Tokens (JWT)** untuk autentikasi. Setelah login, pengguna akan menerima token yang harus disertakan di header **Authorization** untuk mengakses rute yang dilindungi.

Contoh:
```http
Authorization: Bearer <your-token>
```

---

## **6. Penanganan Kesalahan**
API mengembalikan respons kesalahan yang terstandarisasi. Berikut adalah contoh format kesalahan:
```json
{
  "error": true,
  "message": "Token tidak valid"
}
```

| Kode Status | Deskripsi            |
|-------------|----------------------|
| 400         | Permintaan Tidak Valid |
| 401         | Tidak Terotorisasi    |
| 404         | Tidak Ditemukan       |
| 500         | Kesalahan Server Internal |

---

## **7. Variabel Lingkungan**
Buat file **.env** untuk mengatur variabel lingkungan:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/logs
JWT_SECRET=your_jwt_secret
```

---

## **8. Contoh Permintaan**

### **Mendaftarkan Pengguna**
```http
POST /auth/register
Content-Type: application/json

{
  "username": "user1",
  "password": "securepassword"
}
```

### **Membuat Entri Log Baru**
```http
POST /logs
Authorization: Bearer <your-token>
Content-Type: application/json

{
  "application": "MyApp",
  "level": "info",
  "message": "Ini adalah pesan log."
}
```

### **Mencari Log**
```http
GET /logs/search?query=error
Authorization: Bearer <your-token>
```

