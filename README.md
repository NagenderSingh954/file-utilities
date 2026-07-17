# 📁 File Upload Utility

A full-stack file upload and sharing application built using the MERN stack. Users can upload images, PDFs, videos, documents, and text files, view uploaded files, download them, and share them using a generated URL.

## 🚀 Features

* 📤 Upload multiple file types

  * Images
  * PDF documents
  * Videos
  * Text files
* 📝 Create and upload custom text files
* 👀 Preview uploaded files
* 📥 Download uploaded files
* 🗑️ Delete uploaded files
* 🔗 Share uploaded files using a public URL
* ☁️ Cloud storage using Cloudinary
* 📊 Stores file metadata in MongoDB
* 📱 Responsive user interface built with React and Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Hook Form
* React Icons

### Backend

* Node.js
* Express.js
* Multer
* Cloudinary
* MongoDB
* Mongoose


## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/NagenderSingh954/file-utilities.git
cd FileUploadUtility
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## ▶️ Running the Project

### Start Backend

```bash
cd backend
npm run dev
```

### Start Frontend

```bash
cd frontend
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `backend` directory.

```env
PORT=3000

MONGODB_URI=your_mongodb_connection_string

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Create a `.env` file inside the `frontend` directory.

```env
VITE_BASE_URL=http://localhost:3000
```

---

## 📸 Supported File Types

* PNG
* JPG
* JPEG
* GIF
* WEBP
* SVG
* PDF
* TXT
* MP4
* MOV
* AVI
* DOC
* DOCX
* ZIP
* And other files supported by Cloudinary.

---

## 📡 API Endpoints

| Method | Endpoint                    | Description            |
| ------ | --------------------------- | ---------------------- |
| POST   | `/api/v1/files/upload`      | Upload a file          |
| POST   | `/api/v1/files/upload/text` | Upload a text file     |
| GET    | `/api/v1/files`             | Get all uploaded files |
| DELETE | `/api/v1/:id`               | Delete a file          |

---

## 👨‍💻 Author

**Nagender Singh**

If you found this project useful, consider giving it a ⭐ on GitHub.
