markdown
# Visa Request Manager - Backend API 🚀

A RESTful API for managing visa applications and required documents, built with Node.js, Express, TypeScript, and MongoDB.


## 📋 Features

- ✅ **Full CRUD** for Applications and Documents
- ✅ **TypeScript** for type-safe and maintainable code
- ✅ **MongoDB Atlas** as database
- ✅ **Advanced Validation** for data integrity
- ✅ **Relationships** between applications and documents
- ✅ **Clean Architecture** (MVC Pattern)
- ✅ **Unified Error Handling**


## 🛠️ Tech Stack

- **Node.js** + **Express.js** - Server framework
- **TypeScript** - Programming language
- **MongoDB** + **Mongoose** - Database & ODM
- **CORS** - Security middleware
- **dotenv** - Environment variables management


## 📁 Project Structure

back/
    src/
        controllers/     # Business logic
          application.controller.ts
          document.controller.ts
        models/          # Data models
          application.model.ts
          document.model.ts
        routes/          # API routes
          application.routes.ts
          document.routes.ts
          index.ts
        middleware/      # (Under development)
        utils/           # Helper functions
          database.ts
        app.ts           # Express app setup
        server.ts        # Entry point
    .env                 # Environment variables
    .gitignore
    package.json
    tsconfig.json
    README.md


## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account

### Installation

1. **Clone the repository**
  > git clone https://github.com/roudihannanIT/visa-request-manager.git
  > cd visa-request-manager/back


2. Install dependencies

  > npm install


3. Set up environment variables (Create a .env file in the back folder):

- env
- PORT=5000
- MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/visa-app


4. Run in development mode

  > npm run dev


## 📬 API Endpoints

### Applications

- GET [/api/applications] (Get all applications)
- GET [/api/applications/:id] (Get single application with its documents)
- POST [/api/applications] (Create new application)
- PUT [/api/applications/:id] (Update application)
- DELETE [/api/applications/:id] (Delete application)

### Documents

- GET [/api/applications/:applicationId/documents] (Get all documents for an application)
- POST [/api/applications/:applicationId/documents] (Add document to application)
- PUT [/api/documents/:id] (Update document)
- DELETE [/api/documents/:id] (Delete document)
- PATCH [/api/documents/:id/toggle] (Toggle document ready status)

## 📝 Data Models

###  Application

json
{
  "title": "Blue Card Application",
  "visaType": "Blue Card",
  "status": "in-progress",
  "appointmentDate": "2026-07-15",
  "notes": "Interview at German embassy"
  }


### Document

json
{
  "applicationId": ":id",
  "name": "Passport",
  "isReady": true,
  "notes": "Valid until 2027",
  "deadline": "2026-06-01"
  }


## 🔜 Coming Soon

- Authentication system (JWT)
- User authorization
- File upload
- Advanced search
- Filtering and pagination


## 🤝 Contributing

### Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create your feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## 📧 Contact

- Email: [roudihannan7@gmail.com]
- LinkedIn: [Roudi Hannan](https://www.linkedin.com/in/roudi-hannan-6243a5366/)
- GitHub: [@roudihannanIT](https://github.com/roudihannanIT)
- Instagram: [@roudihannan8](https://www.instagram.com/roudihannan8)

## ⭐ Support

### If you like this project, please give it a star on GitHub! ⭐

