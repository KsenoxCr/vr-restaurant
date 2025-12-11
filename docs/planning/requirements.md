# business requirements

## Deployment

- Demo version for single train restaurant carriage
- Session based, initially no user accounts
- Using cookies for session persistence
- Staff access point: Stationary Terminal in kitchen area
- Customer access (web app, no native install)
- Payment handled separately during order receival (cash/card), integrated payment processing is out of scope for system
- Session length max 4h, default 30min, expireAt length updated if activity
- Kitchen authenticate with pin

## User flows

- Passenger on train → selects seat (manual input, later feature: QR code) -> accesses menu via device → places order → receives order at seat
                                                                                                                ↓
                                                                                                    Cancels order before confirmed
- Kitchen receives order queue → prepares → marks ready
- waiters → delivers to carriage/seat
- Staff manages menu availability (items run out during journey)

## Contraints

### Scaling limits

- kitchen staff limited to 5 concurrent orders (preparation capacity)
- max 30 orders at a time per train (kitchen capacity, restaurant carriage seats: ~50)
- Menu items: max 30 (limited kitchen space)
- concurrent users: 200 (db connections)

### functional contrains

- Orders in "Preparing" state capped at 5
- 6th order stays "Confirmed" until slot opens
- Only one active order per seat

## Order state machine

Submitted → Confirmed → Preparing → Ready → Delivered
              ↓             ↓
          Rejected (out of stock, kitchen closed, product quality defect detected)

## Error States

- Order submission fails (network, validation)
- Kitchen rejects after "Preparing" started
- Customer cancels order (accident, changed mind)

## Access control

- Physical access control only

## MVP

- Customer can browse menu, add to cart, submit order
- Kitchen receives order, updates status
- Kitchen view shows queue depth
- Customer sees order status update (polling)
- Staff can mark items unavailable
- Works with spotty connectivity (order queues locally)
- Allergen filtering
- pin auth for kitchen terminal

## Later Features (If time schedule permits)

- Real-time status updates (WebSocket, polling fallback)
- Order history per session
- Estimated preparation time

## Out of scope

- Multi-tenancy: fleet of trains, single train suitable for demo/prototype
- offline-first architecture. Unnecessary complexity for edge case of poor connection (remote areas, underpasses)
- Payment processing integration, physical payment terminal sufficient
- Estimated preparation time display
- Monitoring & Statistics dashboard
- customer & staff accounts for auth
- Desktop styling for web app, demo optimized for mobile
- QR code for seat identification
- Caching (proof of concept, no deployment, no CDN = UX optimization redundant)
- Time of day specific menus i.e breakfast menu
- Seat availability validation
- Reactive Design

## Technology Stack: T3 with Local Postgres (Docker)

- Rationale: Rapid development, strong type safety, good community support. Will use in future projects for own startups, potential clients and react/nextjs is in demand for software dev jobs.

## Architectural choices

- SSR: Simplest to implement, no deployment to userbase so scalability constraints are acceptable. Also easiest to learn, standard pattern for modern Next.js app router. no ISR validation logic bugs

## Domain Entities

MenuItem
- id
- name
- price
- categoryId
- available (stock flag, staff toggle)
- allergens (text/enum array)
- description
- imageUrl (optional, cuts if time pressure)

Category
- id
- name
- displayOrder (sort menu sections)
- items (relation)

Order
- id
- status (enum: submitted → confirmed → preparing → ready → delivered/rejected)
- total (computed)
- queuePosition (calculated: pending orders ahead)
- estimatedStartTime (computed based on queue)
- seatNumber
- createdAt
- updatedAt
- items (relation)

OrderItem (junction table)
- orderId
- menuItemId
- quantity
- priceSnapshot (CRITICAL: captures price at order time, not current MenuItem.price)

Session
- id (browser session token)
- seatNumber
- createdAt
- expriresAt
- ActiveOrderId (current order in progress)
- lastActivity
