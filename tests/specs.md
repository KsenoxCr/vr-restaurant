# Test Specifications - VR Restaurant

Most highest coverage tests chosen due to time constraints


## 1. API Tests (tRPC Routers)

### 1.1 Menu Router (`src/server/api/routers/menu.ts`)

#### Test: menu.getAll - Combine filters
Setup: Mixed items across categories and availability
Action: Call `menu.getAll({ categoryId: 2, available: true })`
Pass Criteria:
- Returns only items where categoryId = 2 AND available = true

#### Test: menu.getById - Invalid ID throws NOT_FOUND
Setup: No MenuItem with id=999
Action: Call `menu.getById(999)`
Pass Criteria:
- Throws TRPCError with code "NOT_FOUND"
- Error message indicates item not found

---

### 1.2 Session Router (`src/server/api/routers/session.ts`)

#### Test: session.create - Valid seat number creates session
Setup: Clean database, seat 42 not reserved
Action: Call `session.create(42)`
Pass Criteria:
- Returns object with sessionId, expiresAt, role
- Session created in database with seatNumber=42
- Role = "CUSTOMER"
- expiresAt = ~30 minutes from now
- Response headers contain Set-Cookie for sessionId and seatNumber

#### Test: session.create - Seat already reserved throws CONFLICT
Setup: Session already exists for seat 50
Action: Call `session.create(50)`
Pass Criteria:
- Throws TRPCError with code "CONFLICT"
- Error message: "Seat 50 is already reserved"
- No duplicate session created

---

### 1.3 Order Router (`src/server/api/routers/order.ts`)

#### Test: order.create - Valid order creates successfully
Setup:
- Valid customer session
- Menu items exist: [{ id: 1, priceCents: 500 }, { id: 2, priceCents: 300 }]
Action: Call `order.create({ items: [{ id: 1, quantity: 2 }, { id: 2, quantity: 1 }] })`
Pass Criteria:
- Order created with status "SUBMITTED"
- totalCents = (500*2) + (300*1) = 1300
- OrderItems created with correct quantities and priceSnapshotCents
- Returns order with items and menuItem relations
- queuePosition assigned (> 0)

#### Test: order.create - Unavailable menu item rejected
Setup: Menu item id=5 exists but available=false
Action: Call `order.create({ items: [{ id: 5, quantity: 1 }] })`
Pass Criteria:
- Throws TRPCError with code "BAD_REQUEST"
- Error message indicates item unavailable
- No order created

#### Test: order.getAll - Kitchen can view all active orders
Setup:
- Kitchen session authenticated
- Orders: 3 SUBMITTED, 2 PREPARING, 1 READY, 1 DELIVERED
Action: Kitchen calls `order.getAll()`
Pass Criteria:
- Returns 6 orders (excludes DELIVERED)
- Ordered by queuePosition ascending
- Each order includes items with menuItem details

#### Test: order.updateStatus - Non-owner customer cannot update
Setup: Session A creates order, Session B authenticated
Action: Session B calls `order.updateStatus({ orderId: orderA.id, status: "CANCELLED" })`
Pass Criteria:
- Throws TRPCError with code "FORBIDDEN"
- Order status unchanged

---

### 1.4 Kitchen Router (`src/server/api/routers/kitchen.ts`)

#### Test: kitchen.validatePin - Correct PIN creates session
Setup: env.KITCHEN_PIN = "1234"
Action: Call `kitchen.validatePin("1234")`
Pass Criteria:
- Returns { success: true, session: {...} }
- Session created with role "KITCHEN"
- seatNumber = 0
- expiresAt = ~480 minutes (8 hours) from now
- Response sets session cookies

---

### 1.5 Middleware & Context Tests

#### Test: authMiddleware - Respects max session duration (customer)
Setup:
- Customer session created 3h 55min ago
- Already at max duration (4 hours)
Action: Call protected procedure
Pass Criteria:
- Procedure executes
- expiresAt not extended beyond 4 hours from createdAt

---

## 2. React Component Unit Tests

### 2.1 Store Tests

#### Test: CartStore - addItem adds new item
Setup: Empty cart
Action: `addItem({ menuItemId: 1, name: "Burger", priceCents: 899, imageUrl: null, quantity: 1 })`
Pass Criteria:
- Cart contains 1 item
- Item has quantity = 1
- getTotalItems() = 1
- getTotalPrice() = 899

#### Test: CartStore - getTotalPrice calculates correctly
Setup: Cart with:
- Item A: priceCents=500, quantity=2
- Item B: priceCents=300, quantity=1
Action: `getTotalPrice()`
Pass Criteria:
- Returns (500*2) + (300*1) = 1300

#### Test: CartStore - Persistence to localStorage
Setup: Cart with items
Action: Add item, then read from localStorage key "cart-storage"
Pass Criteria:
- localStorage contains serialized cart state
- State can be restored on page reload

---

### 2.2 Utility Function Tests

#### Test: formatCents - Formats cents to euros
Setup: Input 899
Action: Call formatCents(899)
Pass Criteria:
- Returns "8.99€"

#### Test: prolongSession - Extends customer session
Setup:
- Session: role=CUSTOMER, createdAt 1h ago, lastActivity 10min ago
Action: Call prolongSession(session)
Pass Criteria:
- expiresAt extended by ~30 minutes
- lastActivity updated to now
- Max duration not exceeded (4h from createdAt)

---

## 3. E2E Tests (Playwright)

### 3.1 Customer Flow

#### Test: E2E-001 - Complete order flow (happy path)
Setup:
- Clean database with seeded menu items
- No active sessions
Actions:
1. Navigate to home page (/)
2. Click "Get Started"
3. Enter seat number "42"
4. Click submit
5. Verify redirect to /menu
6. Click on a menu item card
7. Verify modal opens with item details
8. Add item to cart (quantity 2)
9. Click cart button in header
10. Verify items in cart
11. Click "Place Order"
12. Verify order status screen shows
13. Verify status is "SUBMITTED"
Pass Criteria:
- Each navigation succeeds
- Cart displays correct items and total
- Order created in database
- Order status screen displays
- Session cookies persist

#### Test: E2E-003 - Seat conflict handling
Setup: Session already exists for seat 50
Actions:
1. Navigate to /seat-selection
2. Enter seat number "50"
3. Submit
Pass Criteria:
- Shows error toast with "Seat 50 is already reserved"
- No new session created
- User remains on seat-selection page

---

### 3.2 Kitchen Flow

#### Test: E2E-K001 - Kitchen login with correct PIN
Setup: env.KITCHEN_PIN = "1234"
Actions:
1. Navigate to /kitchen/login
2. Enter PIN "1234" via numpad
3. Submit
Pass Criteria:
- Redirected to /kitchen
- Kitchen session created
- Session cookies set

#### Test: E2E-K005 - Kitchen progresses order through states
Setup: Kitchen logged in, order status CONFIRMED
Actions:
1. Click "Preparing" button → verify status updates
2. Click "Ready" button → verify status updates
3. Click "Delivered" button → verify status updates
Pass Criteria:
- Each status transition succeeds
- Order moves through: CONFIRMED → PREPARING → READY → DELIVERED
- Final state: order removed from active list

---

### 3.3 Integration & Edge Cases

#### Test: E2E-I001 - Customer sees kitchen status updates
Setup:
- Customer with submitted order viewing status screen
- Kitchen logged in
Actions:
1. Kitchen updates order to "PREPARING"
2. Customer's status screen polls
Pass Criteria:
- Customer sees status update to "PREPARING"
- Polling reflects real-time kitchen actions

#### Test: E2E-I002 - Multiple customers different seats
Setup: Clean database
Actions:
1. Browser/session A: Select seat 10, add items, place order
2. Browser/session B: Select seat 20, add items, place order
3. Kitchen views orders
Pass Criteria:
- Both orders visible in kitchen terminal
- Orders have correct seat numbers (10, 20)
- Queue positions assigned sequentially
- No session conflicts

#### Test: E2E-I003 - Concurrent seat selection race condition
Setup: Two clients attempting to select same seat simultaneously
Actions:
1. Client A starts seat 30 selection
2. Client B starts seat 30 selection
3. Both submit at nearly same time
Pass Criteria:
- One succeeds, one receives conflict error
- Only one session created for seat 30
- Database constraint prevents duplicates

#### Test: E2E-I005 - Menu item price change after cart add
Setup: Item in cart with price 899 cents
Actions:
1. Admin changes item price to 999 cents
2. Customer places order
Pass Criteria:
- OrderItem.priceSnapshotCents = 899 (original price)
- Customer charged original price
- Historical accuracy maintained

---
