# HunarHub

# HunarHub 🔧

> Connecting skilled local workers with people who need them — Carpenters, Electricians, Plumbers aur bahut kuch.

---

## 📌 About the project

HunarHub ek local services marketplace hai jahan users apne area ke skilled workers ko easily dhundh sakte hain aur book kar sakte hain. Workers apna profile banake apni services list kar sakte hain.

---

## 🚀 Tech stack

| Layer          | Technology           |
| -------------- | -------------------- |
| Backend        | Node.js + Express.js |
| Database       | MongoDB + Mongoose   |
| Authentication | JWT + bcrypt         |
| Image Upload   | Cloudinary           |
| AI Features    | Anthropic Claude API |
| API Testing    | Postman              |

---

## 📁 Folder structure

```
hunarhub/
├── config/
│   └── db.js               # MongoDB connection
├── controllers/
│   ├── authController.js
│   ├── workerController.js
│   ├── bookingController.js
│   └── reviewController.js
├── middleware/
│   └── authMiddleware.js    # JWT verify
├── models/
│   ├── User.js
│   ├── Worker.js
│   ├── Booking.js
│   └── Review.js
├── routes/
│   ├── authRoutes.js
│   ├── workerRoutes.js
│   ├── bookingRoutes.js
│   └── reviewRoutes.js
├── utils/
│   └── generateToken.js
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md
```

---

## ⚙️ Setup & installation

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/hunarhub.git
cd hunarhub
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
ANTHROPIC_API_KEY=your_claude_api_key
```

### 4. Run the server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

---

## 🔗 API endpoints

### Auth routes

| Method | Endpoint             | Description            |
| ------ | -------------------- | ---------------------- |
| POST   | `/api/auth/register` | New user register karo |
| POST   | `/api/auth/login`    | Login karo             |
| POST   | `/api/auth/logout`   | Logout karo            |
| GET    | `/api/auth/profile`  | Apna profile dekho     |
| PUT    | `/api/auth/profile`  | Profile update karo    |

### Worker routes

| Method | Endpoint                                              | Description                       |
| ------ | ----------------------------------------------------- | --------------------------------- |
| GET    | `/api/workers`                                        | Saare workers dekho               |
| GET    | `/api/workers/:id`                                    | Ek worker ki detail               |
| GET    | `/api/workers/search?skill=electrician&area=ludhiana` | Search workers                    |
| POST   | `/api/workers/register`                               | Worker ke roop mein register karo |
| PUT    | `/api/workers/:id`                                    | Worker profile update karo        |

### Booking routes

| Method | Endpoint                   | Description                 |
| ------ | -------------------------- | --------------------------- |
| POST   | `/api/bookings`            | Naya booking banao          |
| GET    | `/api/bookings/my`         | Apni bookings dekho         |
| PUT    | `/api/bookings/:id/cancel` | Booking cancel karo         |
| PUT    | `/api/bookings/:id/status` | Status update karo (worker) |

### Review routes

| Method | Endpoint                  | Description             |
| ------ | ------------------------- | ----------------------- |
| POST   | `/api/reviews`            | Review likho            |
| GET    | `/api/reviews/worker/:id` | Worker ke reviews dekho |

---

## 🤖 AI features (Phase 3)

- **Smart search** — Hinglish mein type karo, AI sahi worker dhundhe
- **Review summarizer** — 100 reviews ko 3 lines mein summarize kare
- **AI Chatbot** — User apni problem describe kare, bot guide kare
- **Fake review detector** — Spam reviews automatically detect ho
- **Price estimator** — Area aur job type ke basis pe fair price suggest kare

---

## 🛡️ Security

- Passwords bcrypt se hash hote hain
- JWT tokens se authentication hoti hai
- `.env` file kabhi GitHub pe push mat karo
- Rate limiting applied on all routes

---

## 📦 Dependencies

```json
{
  "express": "^4.18.0",
  "mongoose": "^7.0.0",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.0",
  "dotenv": "^16.0.0",
  "cloudinary": "^1.37.0",
  "multer": "^1.4.5",
  "@anthropic-ai/sdk": "^0.20.0",
  "cors": "^2.8.5",
  "express-rate-limit": "^6.7.0"
}
```

---

## 👨‍💻 Development phases

- [x] Phase 1 — Project setup & planning
- [ ] Phase 2 — User module (auth, profile)
- [ ] Phase 3 — Worker module (search, filter)
- [ ] Phase 4 — Booking & Review system
- [ ] Phase 5 — AI integration
- [ ] Phase 6 — Testing & deployment

---

## 🙌 Contributing

Pull requests welcome hain! Koi bug mile toh issue open karo.

---

## 📄 License

MIT License — freely use kar sakte ho.

---

_Built with ❤️ for local workers of India_
