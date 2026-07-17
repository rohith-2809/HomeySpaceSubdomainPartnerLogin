# HomeySpace — Partner Dashboard

Welcome to the HomeySpace Partner Dashboard! This application is a comprehensive, web-first React platform designed for real estate developers to manage their projects, inventory, and unit assignments.

---

## 🏗 Directory Structure

Here is a detailed breakdown of the current `src/` directory and how the application is architected:

```text
src/
├── components/                  # Reusable UI components
│   ├── DashboardLayout.jsx      # The persistent shell (Sidebar + Top Navigation) used across the app
│   ├── StatusLayout.jsx         # Centered, distraction-free layout for terminal/success screens
│   ├── CustomDatePicker.jsx     # Reusable date picker component
│   └── CustomSelect.jsx         # Custom dropdown/select component
│
├── context/                     # Global State Management (React Context)
│   ├── ProjectContext.jsx       # Holds global project data, unit availability, and booking logic
│   └── AssignUnitContext.jsx    # Holds the temporary draft state while navigating the Assign Unit flow
│
├── pages/                       # All route-level components
│   │
│   ├── auth & onboarding/       # Initial entry points
│   │   ├── LoginPage.jsx
│   │   ├── CompanyProfilePage.jsx
│   │   ├── BasicInfoPage.jsx
│   │   └── ReviewConfirmPage.jsx
│   │
│   ├── status/                  # Terminal states for partner verification
│   │   ├── ApplicationSubmittedPage.jsx
│   │   ├── VerificationPendingPage.jsx
│   │   └── AccountVerifiedPage.jsx
│   │
│   ├── dashboard/               # Core logged-in views
│   │   ├── DashboardHomePage.jsx
│   │   └── UnderConstructionPage.jsx (Placeholder for Team, Sales, Settings)
│   │
│   └── project/                 # The core functional domain of the app
│       │
│       ├── (Project Hub)
│       │   ├── ProjectsListPage.jsx      # Grid view of all projects
│       │   └── ProjectDetailPage.jsx     # Central hub for a specific project
│       │
│       ├── (Setup Flow)                  # Creating a brand new project
│       │   ├── AddProjectPage.jsx
│       │   ├── LocationDetailsPage.jsx
│       │   ├── TowersBlocksPage.jsx
│       │   ├── UnitsSetupPage.jsx
│       │   ├── ReviewSetupPage.jsx
│       │   └── ProjectCompletePage.jsx
│       │
│       └── (Assign Unit Flow)            # Booking/Selling a specific unit
│           ├── AssignUnitTowerPage.jsx   # Step 1: Pick tower
│           ├── AssignUnitFlatPage.jsx    # Step 2: Pick flat (Visual Grid)
│           ├── AssignUnitDetailsPage.jsx # Step 3: Confirm unit specs
│           ├── AssignBuyerDetailsPage.jsx# Step 4: Buyer details
│           ├── AssignBookingDetailsPage.jsx# Step 5: Financials & dates
│           ├── AssignReviewPage.jsx      # Step 6: Final review
│           └── AssignCompletePage.jsx    # Success receipt
│
├── App.jsx                      # Main router, wires all pages to their URLs
├── index.css                    # Tailwind CSS configuration, custom design tokens, and utility classes
└── main.jsx                     # React DOM entry point
```

---

## 🔄 The User Journey (Application Flow)

The application is structured into a distinct sequence of user journeys:

### 1. Authentication & Onboarding
* **`/` (Login):** The entry point. The user logs in via mobile number.
* **`/onboarding/*`:** New partners fill out their Company Profile and Basic Info, then Review and Submit.

### 2. Status & Verification
* **`/status/*`:** After submitting onboarding details, the user hits a terminal state (Application Submitted -> Verification Pending -> Account Verified). 
* *Design Note:* These screens use the `StatusLayout` (a centered card) to remove navigation distractions since the user is blocked until verified.

### 3. The Dashboard Shell
* Once verified, the user enters the main application. 
* The `DashboardLayout` wraps all subsequent pages, providing a persistent left sidebar and top navigation bar.

### 4. Project Creation (`/projects/new/*`)
* The user clicks "New Project" and is taken through a linear setup wizard.
* Flow: `Project Basics` → `Location` → `Towers & Blocks` → `Unit Configurations` → `Review Setup`.
* Upon saving, they hit `ProjectCompletePage` (a terminal screen showing their project stats).

### 5. Project Management (`/projects`)
* **Projects List:** Shows all draft and active projects (e.g., Vasavi Skies).
* **Project Dashboard (`/projects/:id`):** Clicking a project takes the user to its dedicated hub. This dashboard displays overall sales progress (Sold vs. Available), quick actions, and tower overviews.

### 6. Assign Unit Flow (`/projects/:id/assign/*`)
* Triggered from the Project Dashboard when a developer wants to record a sale.
* **State Management:** This flow is wrapped in `AssignUnitContext` to remember what the user types as they navigate forward and backward between steps.
* **The Steps:**
  1. **Tower Selection:** Pick which building to look at.
  2. **Flat Selection:** A rich visual floor grid (like a theater seating chart) allowing the user to pick an available unit. Hovering over available units shows interactive feedback.
  3. **Unit Details:** Auto-populated from the grid choice; user confirms BHK type, size, and facing.
  4. **Buyer Details:** Form to collect Name, Phone, and Email.
  5. **Booking Details:** Form to collect Date, Amount, and Notes.
  6. **Review:** A read-only summary of the previous 3 steps.
* **Confirmation:** Hitting submit triggers the `ProjectContext` to mark that exact flat as "Booked", decrements available units, and increments sold units for the project. The user is then shown a receipt screen (`AssignCompletePage`) before being redirected back to the updated Project Dashboard.
