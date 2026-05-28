# AL NASR FRAGRANCES 🏰✨

## Luxury Arabic Attar E-commerce Website

<div align="center">
  <img src="https://via.placeholder.com/150x150/000000/FFD700?text=AL+NASR" width="150">
  <h3>Experience Royal Fragrance</h3>
  <p>Luxury Arabic Attars Crafted for Elegance</p>
</div>

---

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- Install [Node.js](https://nodejs.org/) (v18 or higher)
- Git (optional)

### One-Click Setup

**Windows Users:**
```batch
# Download and double-click these files:
setup.bat     # Installs everything
start.bat     # Runs the project
```

**Mac/Linux Users:**
```bash
# Copy-paste these commands:
git clone https://github.com/yourusername/al-nasr-fragrances.git
cd al-nasr-fragrances
chmod +x setup.sh start.sh
./setup.sh
./start.sh
```

### Manual Setup (3 Commands)
```bash
# 1. Install backend
cd backend && npm install

# 2. Install frontend  
cd ../frontend && npm install

# 3. Run project (2 terminals)
Terminal 1: cd backend && npm start
Terminal 2: cd frontend && npm start
```

### Access the Website
- **Website**: http://localhost:3000
- **Admin Login**: http://localhost:3000/login
- **API**: http://localhost:5000

---

## 📦 Tech Stack

| Frontend | Backend | Database |
|----------|---------|----------|
| React 18 | Node.js 18 | MongoDB |
| Tailwind CSS | Express.js | Mongoose |
| Framer Motion | JWT Auth | Cloudinary |
| Axios | Razorpay | - |

---

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/alnasr
JWT_SECRET=your_secret_key
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000
```

---

## 👑 Admin Access

**First Time Setup:** Visit `http://localhost:5000/api/auth/setup`

**Login Credentials:**
- Username: `alnasr_admin`
- Password: `Admin@123`

---

## 📱 Features

### Customer Features
- ✅ Luxury black & gold design
- ✅ Browse premium attars
- ✅ Add to cart / Wishlist
- ✅ Direct WhatsApp ordering
- ✅ Secure checkout
- ✅ Responsive on all devices

### Admin Features
- ✅ Add/Edit/Delete products
- ✅ Manage inventory
- ✅ View customer orders
- ✅ Update order status
- ✅ Upload product images

---

## 🗂️ Folder Structure

```
al-nasr-fragrances/
├── frontend/          # React app
│   ├── src/
│   │   ├── pages/    # All pages
│   │   ├── components/
│   │   └── context/
│   └── public/
├── backend/           # Node.js API
│   ├── models/       # Database schemas
│   ├── routes/       # API endpoints
│   └── server.js
└── database/          # MongoDB scripts
```

---

## 🚢 Deployment

### Deploy to Render (Backend)
```bash
# Push to GitHub, then on Render:
Build Command: npm install
Start Command: npm start
```

### Deploy to Vercel (Frontend)
```bash
# In Vercel dashboard:
Framework: Create React App
Environment: REACT_APP_API_URL=your-backend-url
```

---

## ❓ Common Issues

| Problem | Solution |
|---------|----------|
| MongoDB error | Use MongoDB Atlas (cloud) instead |
| Port 3000 busy | Run: `npx kill-port 3000` |
| Modules not found | Run: `rm -rf node_modules && npm install` |
| CORS error | Check backend .env file |

---

## 📞 Quick Commands

```bash
# Start development servers
npm run dev

# Build for production
npm run build

# Test API
curl http://localhost:5000/api/products
```

---

## 🆘 Need Help?

- **Documentation**: See full README.md
- **Issues**: GitHub Issues tab
- **Email**: support@alnasrfragrances.com

---

## 📄 License

MIT © AL NASR FRAGRANCES

---

<div align="center">
  <sub>Built with ❤️ for royal fragrance lovers</sub>
  <br/>
  <sub>✨ Where Luxury Meets Elegance ✨</sub>
</div>
```

---

## 🎯 That's It!

Your luxury fragrance store is now running at **http://localhost:3000** 🎉

**Default Products Included:**
- Royal Oud (₹8,999)
- Black Musk (₹6,999)  
- Arabian Rose (₹7,999)
- White Amber (₹5,999)
- Desert Gold (₹9,999)
- Sultan Leather (₹12,999)
- Midnight Oud (₹10,999)

**Need Sample Data?** Visit admin dashboard and add products!
