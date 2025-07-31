# GoalTech Organizational Chart

A modern, responsive organizational chart built with **React + TypeScript + Vite**.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## ✨ Modern Features

- **⚡ Vite**: Lightning-fast dev server with hot module replacement
- **⚛️ React 18**: Modern React with hooks and TypeScript
- **🎨 Component-based**: Reusable EmployeeCard components
- **🔍 Real-time Search**: Instant filtering and search
- **📱 Responsive**: Works perfectly on all devices
- **🎯 TypeScript**: Full type safety and IntelliSense
- **🔄 Hot Reload**: See changes instantly without page refresh

## 📁 Modern Project Structure

```
📦 GoalTech Org Chart/
├── 📄 index.html              # Vite entry point
├── 📄 vite.config.ts          # Vite configuration
├── 📄 package.json            # Dependencies & scripts
├── 📄 tsconfig.json           # TypeScript config
│
├── 📁 src/                    # React source code
│   ├── 📄 main.tsx            # React entry point
│   ├── 📄 App.tsx             # Main app component
│   ├── 📄 index.css           # Global styles
│   ├── 📄 App.css             # App-specific styles
│   │
│   ├── 📁 components/         # React components
│   │   ├── 📄 OrgChart.tsx    # Main org chart
│   │   ├── 📄 OrgChart.css    # Chart styles
│   │   ├── 📄 EmployeeCard.tsx # Employee card
│   │   └── 📄 EmployeeCard.css # Card styles
│   │
│   ├── 📁 services/           # Data services
│   │   └── 📄 dataLoader.ts   # Employee data loader
│   │
│   └── 📄 types.ts            # TypeScript types
│
├── 📁 data/                   # Employee data
│   └── 📄 employees.json      # JSON data source
│
└── 📁 dist/                   # Production build (auto-generated)
```

## 🛠️ Development Experience

### No More Manual Compilation! 🎉

- **Start dev server**: `npm run dev`
- **Make changes**: Edit any `.tsx` or `.ts` file
- **See results**: Changes appear instantly in browser
- **TypeScript errors**: Show in real-time in your editor

### Modern Component Architecture

```tsx
// Clean React component with TypeScript
const EmployeeCard: React.FC<EmployeeCardProps> = ({ 
  employee, 
  onCardClick 
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  
  return (
    <div className="employee-card" onClick={() => onCardClick(employee)}>
      {/* Modern JSX with full TypeScript support */}
    </div>
  )
}
```

## 📊 Features

- **Interactive Cards**: Click to select, expand teams
- **Smart Search**: Find employees by name, phone, ID
- **Filter by Role**: Dropdown filtering by designation
- **Responsive Grid**: Auto-adjusts to screen size
- **Material Design**: Beautiful, modern UI
- **Real Employee Data**: Loads from `data/employees.json`

## 🔧 Scripts

```bash
npm run dev      # Start development server (port 3000)
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Check code quality
```

## 🎯 Why This is Better

### Before (Old Setup):
- ❌ Manual TypeScript compilation
- ❌ Vanilla JavaScript with complex DOM manipulation
- ❌ No hot reload - refresh required for changes
- ❌ Scattered HTML/CSS/JS files
- ❌ No component reusability

### Now (Modern Setup):
- ✅ **Automatic compilation** with Vite
- ✅ **React components** with clean, reusable code
- ✅ **Hot module replacement** - instant updates
- ✅ **Organized structure** with proper separation
- ✅ **TypeScript everywhere** for better DX

## 🏗️ Adding New Features

### New Employee Card Property:
```tsx
// 1. Update interface
interface EmployeeCardProps {
  newProp?: string
}

// 2. Use in component
const EmployeeCard = ({ newProp }) => (
  <div>{newProp}</div>
)

// 3. See changes instantly!
```

### New Component:
```bash
# Create new component
touch src/components/NewComponent.tsx
touch src/components/NewComponent.css

# Import and use - hot reload handles the rest!
```

## 🚀 Deployment

```bash
# Build for production
npm run build

# Deploy dist/ folder to:
# - Vercel, Netlify, GitHub Pages
# - Any static hosting service
```

**Modern React development at its finest!** ⚡

---

Built with React 18, TypeScript, and Vite for the best developer experience.