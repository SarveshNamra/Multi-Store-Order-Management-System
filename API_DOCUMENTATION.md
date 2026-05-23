# 📘 Multi-Store Order Management System — API Documentation

Professional API documentation for the realtime SaaS-style Multi-Store Order Management System.

---

# 🚀 API Overview

This backend powers a realtime multi-store order management platform built using:

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- Socket.IO

The system supports:

- Realtime order management
- Multi-store architecture
- Analytics aggregation
- Order archival
- Scalable REST APIs
- Room-based Socket.IO communication

---

# 🌐 Base URL

```txt
http://localhost:5000/api/v1
```

---

# 🔐 Authentication Architecture

The project includes JWT middleware architecture for scalable authentication support.

### Current Authentication Structure

- JWT verification middleware
- Authorization header parsing
- Token expiration handling
- Invalid token handling
- Protected route ready architecture

### Authorization Header Format

```http
Authorization: Bearer <token>
```

---

# 🧱 Backend Architecture

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

# 📦 Orders APIs

---

# 1️⃣ Create Order

## Endpoint

```http
POST /orders/create
```

---

## Description

Creates a new order for a specific store.

Supports realtime order broadcasting via Socket.IO.

---

## Request Body

```json
{
    "storeId": "store-1",
    "items": [
        {
            "itemId": "burger",
            "qty": 2
        }
    ],
    "theTotalAmount": 500
}
```

---

## Fields

| Field | Type | Required |
|---|---|---|
| storeId | string | ✅ |
| items | array | ✅ |
| itemId | string | ✅ |
| qty | number | ✅ |
| theTotalAmount | number | ✅ |

---

## Example Request

```bash
curl -X POST http://localhost:5000/api/v1/orders/create \
-H "Content-Type: application/json" \
-d '{
    "storeId": "store-1",
    "items": [
        {
            "itemId": "burger",
            "qty": 2
        }
    ],
    "theTotalAmount": 500
}'
```

---

## Success Response

```json
{
    "success": true,
    "message": "Order created Successfully",
    "data": {
        "id": "clxxxx",
        "storeId": "store-1",
        "status": "PLACED",
        "theTotalAmount": 500,
        "createdAt": "2026-05-23T12:00:00.000Z"
    }
}
```

---

## Error Response

```json
{
    "success": false,
    "message": "Validation failed"
}
```

---

# 2️⃣ Get Orders By Store

## Endpoint

```http
GET /orders/:storeId
```

---

## Description

Fetches paginated orders for a specific store.

---

## Path Params

| Param | Description |
|---|---|
| storeId | Store identifier |

---

## Query Params

| Query | Type | Default |
|---|---|---|
| page | number | 1 |
| limit | number | 10 |

---

## Example Request

```http
GET /api/v1/orders/store-1?page=1&limit=10
```

---

## Success Response

```json
{
    "success": true,
    "message": "Orders fetched Successfully",
    "data": {
        "data": [
            {
                "id": "clxxxx",
                "storeId": "store-1",
                "status": "PLACED"
            }
        ],
        "pagination": {
            "total": 25,
            "page": 1,
            "limit": 10,
            "totalPages": 3
        }
    }
}
```

---

# 3️⃣ Update Order Status

## Endpoint

```http
PATCH /orders/:orderId/status
```

---

## Description

Updates order status and emits realtime Socket.IO event.

---

## Path Params

| Param | Description |
|---|---|
| orderId | Order ID |

---

## Request Body

```json
{
    "status": "PREPARING"
}
```

---

## Allowed Status Values

```txt
PLACED
PREPARING
COMPLETED
```

---

## Example Request

```bash
curl -X PATCH http://localhost:5000/api/v1/orders/clxxxx/status \
-H "Content-Type: application/json" \
-d '{
    "status": "COMPLETED"
}'
```

---

## Success Response

```json
{
    "success": true,
    "message": "Order status updated Successfully",
    "data": {
        "id": "clxxxx",
        "status": "COMPLETED"
    }
}
```

---

# 🗄️ Archive API

---

# Archive Old Orders

## Endpoint

```http
POST /archive-old-orders
```

---

## Description

Archives orders older than 30 days into the `OrderArchive` table.

Uses Prisma transactions for database consistency.

---

## Archival Strategy

### Process

1. Find orders older than 30 days
2. Copy orders into archive table
3. Preserve order items as JSON
4. Delete active orders
5. Execute everything inside Prisma transaction

---

## Example Response

```json
{
    "success": true,
    "message": "Old orders archived successfully",
    "data": {
        "archivedCount": 12,
        "archivedOrders": [
            {
                "id": "clxxxx",
                "storeId": "store-1"
            }
        ]
    }
}
```

---

# 📊 Analytics APIs

---

# 1️⃣ Orders Per Day

## Endpoint

```http
GET /analytics/orders-per-day
```

---

## Description

Returns daily order aggregation counts.

Uses Prisma `groupBy`.

---

## Example Response

```json
[
    {
        "date": "2026-05-20",
        "totalOrders": 15
    }
]
```

---

## Performance Notes

- Aggregation optimized with indexed `createdAt`
- Lightweight grouped response

---

# 2️⃣ Revenue Per Store

## Endpoint

```http
GET /analytics/revenue-per-store
```

---

## Description

Returns total revenue grouped by store.

Uses Prisma aggregation queries.

---

## Example Response

```json
[
    {
        "storeId": "store-1",
        "totalRevenue": 15000
    }
]
```

---

## Performance Notes

- Uses indexed `storeId`
- Uses Prisma `_sum`

---

# 3️⃣ Top Selling Items

## Endpoint

```http
GET /analytics/top-selling-items
```

---

## Description

Returns top 5 selling items by quantity.

---

## Example Response

```json
[
    {
        "itemId": "burger",
        "totalQuantity": 120
    }
]
```

---

## Performance Notes

- Uses Prisma `groupBy`
- Uses quantity aggregation
- Optimized ordering

---

# ⚡ Realtime Socket.IO Documentation

---

# Socket Connection

Frontend connects using Socket.IO client.

---

# Store Room Architecture

## Room Format

```txt
store-${storeId}
```

Example:

```txt
store-store-1
```

---

# Joining Store Rooms

## Client Event

```javascript
socket.emit("join-store", roomId);
```

---

# Leaving Store Rooms

```javascript
socket.emit("leave-store", roomId);
```

---

# Realtime Events

---

## 1️⃣ order-created

### Description

Triggered when new order is created.

---

### Payload

```json
{
    "success": true,
    "message": "New order created",
    "data": {
        "id": "clxxxx",
        "storeId": "store-1"
    }
}
```

---

# 2️⃣ order-status-updated

## Description

Triggered when order status changes.

---

## Payload

```json
{
    "success": true,
    "message": "Order status updated",
    "data": {
        "id": "clxxxx",
        "status": "COMPLETED"
    }
}
```

---

# 🔴 Global Error Response Format

```json
{
    "success": false,
    "message": "Error message",
    "error": "Detailed error"
}
```

---

# ✅ Validation Notes

Validation handled using Zod schemas.

---

## Order Validation

### Required Fields

- storeId
- items
- theTotalAmount

---

## Quantity Validation

- quantity must be positive
- quantity must be integer

---

## Status Validation

Allowed values:

```txt
PLACED
PREPARING
COMPLETED
```

---

# ⚙️ Performance Optimization Notes

---

## PostgreSQL Indexing

Indexes added for:

- storeId
- createdAt
- userId
- storeId + createdAt
- archivedAt

---

## Prisma Optimizations

- `groupBy`
- `_sum`
- `createMany`
- transactions
- parallel Promise queries

---

## Realtime Optimization

- store-specific Socket.IO rooms
- isolated realtime updates
- minimal payload broadcasting

---

## Query Optimization

- pagination using `skip/take`
- indexed store queries
- efficient aggregation queries

---

# 🗃️ Database Models Overview

---

# User

Stores user information.

| Field |
|---|
| id |
| email |
| password |

---

# Order

Active realtime orders table.

| Field |
|---|
| storeId |
| userId |
| theTotalAmount |
| status |
| createdAt |

---

# OrderItem

Stores individual order items.

| Field |
|---|
| itemId |
| quantity |
| orderId |

---

# OrderArchive

Historical archived orders table.

| Field |
|---|
| storeId |
| userId |
| status |
| items (JSON) |
| archivedAt |

---

# 📈 System Highlights

✅ Multi-Store Architecture  
✅ Realtime Socket.IO System  
✅ SaaS Dashboard Architecture  
✅ Prisma ORM + PostgreSQL  
✅ Aggregation Analytics APIs  
✅ Data Archival System  
✅ Zustand State Management  
✅ App Router Frontend  
✅ Responsive SaaS UI  
✅ Scalable Backend Structure

---

# 👨‍💻 Author

### Sarvesh Namra

Built as part of a realtime full-stack SaaS engineering assessment.
