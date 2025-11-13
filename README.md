# Document Summarizer - Frontend

A modern React application that allows users to upload PDF or text documents and receive AI-generated summaries in 5 key bullet points.

## 🏗️ Architecture

This project is built following **SOLID principles** and **clean architecture**:

### Component Structure (Atomic Design)

```
src/
├── components/
│   ├── ui/                    # shadcn/ui base components
│   │   ├── button.tsx         # Reusable button
│   │   └── card.tsx           # Reusable card
│   ├── FileUploadZone.tsx     # File upload interface (UI only)
│   ├── SummaryDisplay.tsx     # Summary display (UI only)
│   ├── LoadingSpinner.tsx     # Loading animation (UI only)
│   └── ErrorMessage.tsx       # Error display (UI only)
├── hooks/                     # Custom hooks (ALL business logic)
│   ├── useFileUpload.ts       # File selection & drag-drop logic
│   ├── useFileValidation.ts   # File validation logic
│   └── useDocumentSummarizer.ts # API calls & state management
├── types/
│   └── index.ts               # TypeScript type definitions
└── lib/
    └── utils.ts               # Utility functions
```

### Key Principles

✅ **Single Responsibility**: Each component/hook has ONE job
✅ **Separation of Concerns**: UI components only handle presentation
✅ **Business Logic in Hooks**: All logic is in custom hooks, not components
✅ **Pure UI Components**: Components receive data via props, no internal logic

## 🚀 Features

- 📄 **File Upload**: Drag-and-drop or click to upload PDF/TXT files
- ✅ **File Validation**: Type checking (PDF/TXT only) and size limits (max 10MB)
- 🤖 **AI Summarization**: Sends files to backend API for processing
- 📝 **5-Point Summary**: Displays concise summaries in bullet points
- ⚡ **Loading States**: Visual feedback during processing
- 🚨 **Error Handling**: User-friendly error messages
- 🔄 **Reset Function**: Upload new documents easily
- 📱 **Responsive Design**: Works on mobile and desktop
- 🎨 **Modern UI**: Beautiful gradient design with smooth animations

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI component library
- **Lucide React** - Icons

## 📦 Installation

### Prerequisites

- Node.js 18+ installed
- A backend API running (see backend repository)

### Steps

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd AIDocSummarizer/client
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_API_URL=http://localhost:3001
```

4. **Start the development server**

```bash
npm run dev
```

The app will be running on [http://localhost:5173](http://localhost:5173)

## 📚 Project Structure

```
client/
├── src/
│   ├── components/           # UI Components
│   │   ├── ui/              # shadcn/ui components
│   │   ├── FileUploadZone.tsx
│   │   ├── SummaryDisplay.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ErrorMessage.tsx
│   ├── hooks/               # Custom Hooks (Business Logic)
│   │   ├── useFileUpload.ts
│   │   ├── useFileValidation.ts
│   │   └── useDocumentSummarizer.ts
│   ├── types/               # TypeScript Types
│   │   └── index.ts
│   ├── lib/                 # Utilities
│   │   └── utils.ts
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── components.json          # shadcn/ui config
├── tailwind.config.js       # Tailwind config
├── tsconfig.json            # TypeScript config
├── vite.config.ts           # Vite config
├── package.json             # Dependencies
├── .env.example             # Environment variables example
└── README.md                # This file
```

## 🎯 How It Works

### 1. File Upload Hook (`useFileUpload`)

Handles:
- File selection from input
- Drag and drop functionality
- File validation (via `useFileValidation`)
- Error state management

### 2. File Validation Hook (`useFileValidation`)

Validates:
- File type (PDF or TXT only)
- File size (max 10MB)
- Returns validation result

### 3. Document Summarizer Hook (`useDocumentSummarizer`)

Handles:
- API calls to backend
- Loading state
- Error handling
- Summary state management

### 4. Pure UI Components

Components like `FileUploadZone`, `SummaryDisplay`, `LoadingSpinner`, and `ErrorMessage` are **pure presentational components**:
- Receive all data via props
- No business logic
- Only handle UI rendering

## 🔌 API Integration

The app expects a backend API with the following endpoint:

**POST** `/api/summarize`

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: File with field name `file`

**Response:**

```json
{
  "success": true,
  "summary": [
    "First key point...",
    "Second key point...",
    "Third key point...",
    "Fourth key point...",
    "Fifth key point..."
  ],
  "fileName": "document.pdf"
}
```

## 🎨 Customization

### Change Colors

Edit `src/index.css` to modify the color scheme:

```css
:root {
  --primary: 221.2 83.2% 53.3%;  /* Blue */
  --secondary: 210 40% 96.1%;     /* Light gray */
  /* ... other colors */
}
```

### Change File Size Limit

Edit `src/types/index.ts`:

```typescript
export const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
```

### Add More File Types

Edit `src/types/index.ts`:

```typescript
export type AllowedFileType = 'application/pdf' | 'text/plain' | 'application/msword';

export const ALLOWED_FILE_TYPES: AllowedFileType[] = [
  'application/pdf',
  'text/plain',
  'application/msword',
];
```

## 🧪 Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

Preview the production build:

```bash
npm run preview
```

## 📝 Development Guidelines

### Adding New Features

1. **Add types** in `src/types/index.ts`
2. **Create hook** for business logic in `src/hooks/`
3. **Create UI component** (pure, no logic) in `src/components/`
4. **Use hook** in component to connect logic

### Component Rules

- ✅ Components should only render UI
- ✅ All logic should be in custom hooks
- ✅ Use TypeScript for type safety
- ✅ Keep components small and focused
- ❌ No API calls in components
- ❌ No complex state management in components

### Hook Rules

- ✅ One hook per responsibility
- ✅ Return only what's needed
- ✅ Use TypeScript for return types
- ✅ Handle errors gracefully

## 🐛 Troubleshooting

### Build Errors

If you see TypeScript errors, make sure all dependencies are installed:

```bash
rm -rf node_modules package-lock.json
npm install
```

### API Connection Issues

1. Check that backend is running
2. Verify `VITE_API_URL` in `.env` is correct
3. Check browser console for CORS errors

### Styling Issues

If Tailwind styles aren't working:

1. Make sure `tailwind.config.js` is configured
2. Check that `index.css` imports Tailwind
3. Restart the dev server

## 📄 License

MIT

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide](https://lucide.dev/) for icons
- [Vite](https://vitejs.dev/) for blazing fast builds
