# Project Schedule: Train Restaurant Ordering System

**Timeline**: November 20, 2025 - January 16, 2026 (8 weeks)
**Methodology**: Waterfall Development Model
**Team Size**: 1 Full-stack Developer

---


## Phase 1: Architecture & Planning

**Duration**: November 20 - November 24, 2025 (5 days)

### Sub-phases:
- [X] Requirements gathering and business analysis - 20/11/2025
- [X] Technology stack evaluation and selection (T3 Stack) - 21/11/2025
- [X] Database schema design and entity modeling - 22/11/2025
- [X] System architecture documentation and ERD diagrams - 23/11/2025
- [X] Development environment setup and tooling configuration - 24/11/2025



## Phase 2: Design

**Duration**: November 25 - November 29, 2025 (5 days)

### Sub-phases:
- [X] UI/UX mockups for customer ordering flow - 26/11/2025
- [X] Kitchen terminal GUI design and workflow - 27/11/2025
- [X] API endpoint design and tRPC router structure - 26/11/2025
- [X] Component hierarchy and state management planning - 28/11/2025
- [X] Database schema finalization and DBML generation - 27/11/2025
- [X] Color system and typography design tokens - 29/11/2025


## Phase 3: Implementation

**Duration**: November 30, 2025 - January 10, 2026 (6 weeks)

### 3.1 Database & Backend Foundation
- [X] Prisma schema implementation and migrations - 30/11/2025
- [X] Database seed script development - 02/12/2025
- [X] Menu router with CRUD operations - 03/12/2025
- [X] Category and MenuItem query procedures - 03/12/2025

### 3.2 Session Management & Authentication
- [X] Session model and cookie-based persistence - 04/12/2025
- [X] Session router with create and expiry logic - 06/12/2025
- [X] Session prolonging and cleanup procedures - 06/12/2025
- [X] Role-based session management (Customer/Kitchen) - 17/12/2025
- [X] Kitchen PIN authentication middleware - 08/01/2026

### 3.3 Order Management System
- [X] Order router with transaction-safe creation - 10/12/2025
- [X] Order status state machine implementation - 11/12/2025
- [X] OrderItem junction table and price snapshot logic - 11/12/2025
- [X] Queue position and estimation calculations - 12/12/2025
- [X] Order update and status mutation procedures - 10/01/2026

### 3.4 Frontend Core Components
- [X] Landing page and seat selection GUI - 07/12/2025
- [X] Button variant system with CVA - 21/12/2025
- [X] Typography component system - 23/12/2025
- [X] Icon system with Lucide React - 08/01/2026
- [X] Toast notification component - 16/12/2025
- [X] Error boundary and loading states - 14/12/2025
- [X] Mobile-only responsive gate - 17/12/2025

### 3.5 Menu & Cart Functionality
- [X] Menu view with category navigation - 13/12/2025
- [X] Menu item detail modal with parallel routing - 18/12/2025
- [X] Zustand cart store for client-side state - 19/12/2025
- [X] Cart page with quantity controls - 20/12/2025
- [X] Add to cart and remove item logic - 20/12/2025
- [X] Allergen filtering system - 28/12/2025
- [X] Filter panel UI and logic - 29/12/2025
- [X] Place order integration with backend - 03/01/2026

### 3.6 Order Status & Tracking
- [X] Order status view components - 04/01/2026
- [X] Order store for persistence across sessions - 05/01/2026
- [X] Status-specific UI screens (preparing, ready, delivered) - 06/01/2026
- [X] Real-time order polling logic - 06/01/2026

### 3.7 Kitchen Terminal
- [X] Kitchen authentication page and PIN validation - 09/01/2026
- [X] Kitchen router with protected procedures - 09/01/2026
- [X] Server-side cookie management for kitchen sessions - 10/01/2026
- [X] Kitchen order queue GUI - 10/01/2026
- [X] Order status mutation controls for staff - 11/01/2026

### 3.8 Polish & Refinement
- [X] Color theme implementation across components - 02/01/2026
- [X] Font selection and typography finalization - 03/01/2026
- [X] Scroll lock for modal overlays - 18/12/2025
- [X] Navigation helpers and back button logic - 22/12/2025
- [X] Price formatting utilities - 16/12/2025
- [X] Git repository mirroring automation (GitHub Actions) - 06/12/2025


## Phase 4: Testing & Quality Assurance
**Duration**: January 11 - January 14, 2026 (4 days)

### Sub-phases:

- [ ] tRPC API endpoint testing and validation
- [ ] React component unit testing
- [ ] End-to-end integration testing (customer flow)
- [ ] Kitchen terminal workflow validation
- [ ] Session management and expiry testing
- [ ] Cross-device compatibility testing - 13/01/2026
- [ ] Performance profiling and optimization


## Phase 5: Deployment & Launch
**Duration**: January 15 - January 16, 2026 (2 days)

### Sub-phases:

- [ ] Production build optimization and bundle analysis
- [X] Database migration to production environment - 13/01/2026
- [X] Environment variable configuration and secrets - 13/01/2026
- [X] Deployment to hosting platform - 13/01/2026
- [ ] cron jobs for intervaled sessions flushing
- [X] Smoke testing in production - 13/01/2026
- [ ] Documentation finalization and handoff


---

## Notes

**Technology Decisions:**
- T3 Stack selected for type safety and rapid development
- Server-side rendering for simplicity (no ISR complexity)
- Zustand for client state, avoiding Redux overhead
- CVA for component variants to maintain consistency

Time Constaints:
- Due to changes in schedule, phase 4. tests & QA was skipped, only defined tests lexically.
- Few high impact bugs (marked in codebase with "FIX:") where left to be fixed.

---

*Last Updated: 11/01/2026*
