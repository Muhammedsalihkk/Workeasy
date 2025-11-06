# Professional Folder Structure

## New Structure Overview

```
src/
├── pages/              # Page-level components (routes)
│   ├── auth/
│   │   └── Login.jsx
│   ├── company/
│   │   ├── Dashboard.jsx
│   │   ├── orders/
│   │   ├── employees/
│   │   └── profile/
│   ├── home/
│   │   └── Home.jsx
│   └── Error/
│       ├── 404.jsx
│       └── 500.jsx
│
├── features/           # Feature-based components
│   ├── auth/
│   ├── company/
│   ├── orders/
│   └── employees/
│
├── components/         # Reusable components
│   ├── layouts/
│   │   ├── AppLayout.jsx
│   │   ├── Header.jsx
│   │   └── Sidebar.jsx
│   ├── ui/            # UI components (buttons, inputs, etc.)
│   └── common/        # Common components
│       └── PrivateRoute.jsx
│
├── store/             # Redux store
│   ├── slices/
│   │   └── Slice/
│   │       ├── Company_slice/
│   │       ├── userSlice/
│   │       ├── orders/
│   │       └── Subscription_slice/
│   └── store.jsx
│
├── hooks/             # Custom React hooks
├── utils/             # Utility functions
│   └── ScrollToTop.jsx
├── services/          # API services
├── styles/            # Global styles
├── assets/            # Static assets
├── App.jsx
└── main.jsx
```

## Migration Notes

- All Redux slices moved to `store/slices/`
- Layout components moved to `components/layouts/`
- Pages organized by feature (auth, company, home)
- Utility functions moved to `utils/`
- All imports need to be updated to reflect new paths

