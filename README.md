# EmTech Logistics Management System

A comprehensive logistics management system frontend built with React, TypeScript, and modern web technologies. This application provides a responsive web interface for warehouse managers, sales representatives, operations managers, and external stakeholders to manage inventory, process orders, and track logistics operations in real-time.

## 🚀 Features

### Core Functionality
- **Real-time Dashboard**: Live overview of logistics operations with key metrics and charts
- **Inventory Management**: Track stock levels, products, and warehouse locations with low-stock alerts
- **Sales Order Management**: Process and manage customer orders from creation to delivery
- **Customer Relationship Management**: Manage customer information, contacts, and order history
- **Advanced Reporting**: Comprehensive analytics and data visualization for operations insights
- **Role-Based Access Control**: Tailored interfaces and permissions for different user roles

### User Roles & Permissions
- **Admin**: Full system access and configuration
- **Warehouse Managers**: Inventory oversight, stock management, warehouse operations
- **Sales Representatives**: Order processing, customer interactions, sales tracking
- **Operations Managers**: System oversight, reporting, analytics
- **External Stakeholders**: Limited read-only access to relevant operational data

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Routing**: React Router v6
- **State Management**: React Context + useReducer
- **Data Fetching**: TanStack Query (React Query)
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Headless UI
- **Build Tool**: Vite
- **Notifications**: React Hot Toast

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🔐 Demo Accounts

| Role | Email | Password | Access Level |
|------|--------|----------|-------------|
| Admin | admin@emtech.com | admin123 | Full system access |
| Warehouse Manager | warehouse@emtech.com | warehouse123 | Inventory & warehouse operations |
| Sales Representative | sales@emtech.com | sales123 | Orders & customer management |
| Operations Manager | ops@emtech.com | ops123 | Reports & analytics |

## 📱 Features by Role

### Dashboard (All Users)
- Real-time metrics and KPIs
- Interactive charts and graphs
- Recent activity feed
- Role-specific quick actions

### Inventory Management (Warehouse Managers)
- Product catalog with search and filtering
- Stock level monitoring with alerts
- Multi-warehouse support
- Inventory movements tracking

### Sales Orders (Sales Reps, Warehouse Managers)
- Order creation and management
- Customer order history
- Status tracking and updates
- Shipping management

### Customer Management (Sales Reps)
- Customer profiles and contacts
- Order history and analytics
- Communication logs
- Account management

### Reports & Analytics (Operations Managers)
- Sales performance reports
- Inventory analytics
- Customer insights
- Exportable reports

### System Settings (Admin)
- User management
- Role and permission configuration
- System preferences
- Security settings

## 🏗️ Build & Deployment

```bash
# Development build
npm run build

# Preview production build
npm run preview

# Linting
npm run lint
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components
│   └── ui/             # Basic UI components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── contexts/           # React context providers
├── services/           # API services
├── types/              # TypeScript definitions
└── utils/              # Utility functions
```

## 🎨 Responsive Design

- **Desktop**: Full-featured interface with sidebar navigation
- **Tablet**: Adaptive layout with collapsible sidebar
- **Mobile**: Touch-optimized interface with mobile-friendly navigation

---

**EmTech Logistics Management System** - Streamlining logistics operations with modern web technology.
