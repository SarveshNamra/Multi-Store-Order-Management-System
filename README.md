# 🚀 Multi-Store Order Management System

A full-stack SaaS-style realtime order management platform built within a **3-day assessment** using modern web technologies.

This project demonstrates scalable backend architecture, realtime communication, analytics aggregation, archival strategies, and a modern responsive SaaS dashboard UI.

---

# ✨ Features

## 🏪 Multi-Store Order Management

- Store-specific order handling
- Dynamic store switching
- Store-based filtering
- Scalable multi-store architecture

---

## ⚡ Realtime Functionality

Built using Socket.IO room-based architecture.

### Realtime Events

- `order-created`
- `order-status-updated`

### Realtime Features

- Live order creation updates
- Live order status synchronization
- Store-specific realtime rooms
- Optimistic UI updates

---

## 📦 Order Management

- Create new orders
- Update order statuses
- Pagination support
- Store-specific order retrieval
- Realtime order table updates

---

## 📊 Dashboard & Analytics

### Dashboard Features

- Total Orders
- Pending Orders
- Preparing Orders
- Completed Orders
- Total Revenue

### Charts

- Orders By Status
- Realtime dashboard overview

### Analytics APIs

- Orders Per Day
- Revenue Per Store
- Top 5 Selling Items

---

## 🗄️ Data Archival System

Task 3 implementation includes:

- `OrderArchive` table
- Archival API
- Prisma transactions
- Historical order preservation
- Optimized archival strategy

---

## 🎨 Modern SaaS UI

- Responsive design
- Tailwind CSS
- Clean dashboard layout
- Sidebar navigation
- Modern tables & cards
- Mobile responsive

---

# 🛠️ Tech Stack

## Frontend

| Technology | Purpose |
|---|---|
| Next.js App Router | Frontend Framework |
| React | UI Library |
| Tailwind CSS | Styling |
| Zustand | State Management |
| Axios | API Communication |
| Socket.IO Client | Realtime Updates |
| Recharts | Analytics Charts |

---

## Backend

| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | Backend Framework |
| Prisma ORM | Database ORM |
| PostgreSQL | Database |
| Socket.IO | Realtime Communication |
| Zod | Validation |
| JWT | Authentication Middleware |

---

# 🏗️ Architecture Overview

## Backend Architecture

```txt
Routes
   ↓
Controllers
   ↓
Services
   ↓
Prisma ORM
   ↓
PostgreSQL
```

---

## Frontend Architecture

```txt
Pages
   ↓
Reusable Components
   ↓
Zustand Store
   ↓
Axios Services
   ↓
Backend APIs
```

---

## Realtime Architecture

```txt
Client
   ↓
Socket.IO Client
   ↓
Store-Specific Rooms
   ↓
Socket.IO Server
   ↓
Realtime Event Emitters
```

---

# 📁 Folder Structure

## Backend

```txt
server/
│
├── prisma/
│   └── schema.prisma
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── sockets/
│   ├── validations/
│   ├── app.js
│   └── server.js
```

---

## Frontend

```txt
frontend/
│
├── app/
│   ├── dashboard/
│   ├── orders/
│   ├── create-order/
│   └── analytics/
│
├── components/
│   ├── dashboard/
│   ├── layout/
│   └── orders/
│
├── lib/
├── services/
├── socket/
├── store/
└── public/
```

---

# ⚙️ Environment Variables

## Backend `.env`

```env
DATABASE_URL=
JWT_SECRET=
CLIENT_URL=
PORT=
```

---

## Frontend `.env.local`

```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_SOCKET_URL=
```

---

# 🚀 Setup Instructions

# Backend Setup

## 1. Navigate to backend

```bash
cd server
```

## 2. Install dependencies

```bash
npm install
```

## 3. Generate Prisma client

```bash
npx prisma generate
```

## 4. Run migrations

```bash
npx prisma migrate dev
```

## 5. Start backend server

```bash
npm run dev
```

---

# Frontend Setup

## 1. Navigate to frontend

```bash
cd frontend
```

## 2. Install dependencies

```bash
npm install
```

## 3. Start frontend

```bash
npm run dev
```

---

# 🔌 API Documentation

# Orders APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/orders/create` | Create new order |
| GET | `/api/v1/orders/:storeId` | Fetch store orders |
| PATCH | `/api/v1/orders/:orderId/status` | Update order status |

---

# Archive API

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/archive-old-orders` | Archive old orders |

---

# Analytics APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/analytics/orders-per-day` | Daily order analytics |
| GET | `/api/v1/analytics/revenue-per-store` | Revenue analytics |
| GET | `/api/v1/analytics/top-selling-items` | Top selling items |

---

# 🗃️ Database Details

## Database

- PostgreSQL
- Prisma ORM

---

## Indexed Fields

### Order Table

- `storeId`
- `createdAt`
- `storeId + createdAt`
- `userId`

### OrderArchive Table

- `storeId`
- `createdAt`
- `storeId + createdAt`
- `archivedAt`

---

## Monetary Values

Using Prisma Decimal:

```prisma
Decimal @db.Decimal(10, 2)
```

for accurate financial calculations.

---

# ⚡ Realtime Architecture

## Socket.IO Room Structure

```txt
store-${storeId}
```

Example:

```txt
store-store-1
```

---

## Realtime Events

### Order Created

```txt
order-created
```

### Order Status Updated

```txt
order-status-updated
```

---

## Realtime Flow

```txt
Frontend Client
    ↓
Join Store Room
    ↓
Backend Emits Event
    ↓
Zustand Store Updates
    ↓
Realtime UI Refresh
```

---

# 📊 Task 3 Implementation

## 1. Data Archival System

### Features

- Archive orders older than 30 days
- Prisma transactions
- Historical order preservation
- Bulk archival strategy
- Optimized database operations

### Archive Table

```txt
OrderArchive
```

stores:

- old orders
- archived timestamps
- order items JSON snapshot

---

## 2. Analytics APIs

### Orders Per Day

Aggregation for daily order trends.

### Revenue Per Store

Store-wise revenue aggregation.

### Top 5 Selling Items

Top-selling items by quantity.

---

# 📸 Screenshots

## Dashboard

> Add dashboard screenshot here

---

## Orders Page

> Add orders page screenshot here

---

## Create Order Page

> Add create order screenshot here

---

## Analytics Page

> Add analytics screenshot here

---

# 🔮 Future Improvements

- Authentication & Role-Based Access
- Redis Caching
- Advanced Analytics Dashboard
- Docker Deployment
- Kubernetes Scaling
- CI/CD Pipelines
- Email Notifications
- Inventory Management
- Multi-Tenant SaaS Support
- Payment Integration
- Export Reports
- Webhooks
- Rate Limiting
- Automated Scheduled Archival Jobs

---

# 👨‍💻 Author

### Sarvesh Namra

Built as part of a realtime full-stack SaaS engineering assessment.

---

# ⭐ Project Highlights

✅ Full-Stack SaaS Architecture  
✅ Realtime Socket.IO Updates  
✅ Multi-Store Support  
✅ Modern Responsive UI  
✅ Analytics & Aggregations  
✅ Data Archival System  
✅ Scalable Folder Structure  
✅ Prisma ORM + PostgreSQL  
✅ Zustand State Management  
✅ App Router Architecture

---

# 📄 License

This project is licensed under the MIT License.
