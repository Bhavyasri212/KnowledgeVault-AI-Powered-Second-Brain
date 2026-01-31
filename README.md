# 🧠 KnowledgeVault – AI-Powered Second Brain

A modern web application that transforms how you capture, organize, and retrieve your personal knowledge using artificial intelligence.

KnowledgeVault acts as your **intelligent second brain**, automatically categorizing and summarizing your thoughts, articles, and insights.

---

## 🧠 What is KnowledgeVault?

KnowledgeVault is an AI-powered knowledge management system that helps you:

- Capture knowledge from multiple sources (notes, articles, links, insights)
- Organize automatically with AI-generated summaries and tags
- Retrieve instantly through semantic search and conversation
- Connect ideas across your personal knowledge base

---

## 📱 Live Demo

🚀 https://knowledge-vault-ai-powered-second-b.vercel.app/

---

## ✨ Key Features

- **Multi-Format Knowledge Capture** – Add notes, links, and insights seamlessly
- **AI-Powered Analysis** – Automatic summarization and intelligent tagging using Google’s Gemini API
- **Smart Search & Retrieval** – Find relevant information through natural conversation
- **URL Fetching** – Automatically extract content from web articles
- **Draft Auto-Save** – Never lose your work with automatic draft persistence
- **Real-Time Preview** – See AI-generated summaries before saving
- **Secure Authentication** – Built with Supabase Auth for enterprise-grade security
- **Responsive Design** – Beautiful dark-themed UI that works on all devices
- **Keyboard Shortcuts** – Power-user shortcuts (Cmd+Enter to save, Esc to close)

---

## 🎥 Screenshots & Demo

### Dashboard

- Organized view of all your captured knowledge  
  <img width="1898" height="868" alt="Dashboard" src="https://github.com/user-attachments/assets/ac6bfd9e-9fd0-4f9d-bf07-327983b14d31" />

### Add Knowledge Form

- AI-powered form with real-time preview  
  <img width="1904" height="864" alt="Add Knowledge Form" src="https://github.com/user-attachments/assets/242dc641-91d1-49e7-83db-c3c00a9c0c45" />

### Chat Interface

- Ask questions and get intelligent responses  
  <img width="1895" height="866" alt="Chat Interface" src="https://github.com/user-attachments/assets/12cf3370-5fa9-4b20-b6a3-ee2d62655347" />

### Collections View

- Browse and manage your knowledge library  
  <img width="1892" height="860" alt="Collections View" src="https://github.com/user-attachments/assets/97f76d4c-6015-441a-a8b3-8874ef8fe4ca" />

---

- Organized view of all your captured knowledge  
  <img width="1898" height="868" alt="Dashboard" src="https://github.com/user-attachments/assets/ac6bfd9e-9fd0-4f9d-bf07-327983b14d31" />

### Add Knowledge Form

- AI-powered form with real-time preview  
  <img width="1904" height="864" alt="Add Knowledge Form" src="https://github.com/user-attachments/assets/242dc641-91d1-49e7-83db-c3c00a9c0c45" />

### Chat Interface

- Ask questions and get intelligent responses  
  <img width="1895" height="866" alt="Chat Interface" src="https://github.com/user-attachments/assets/12cf3370-5fa9-4b20-b6a3-ee2d62655347" />

### Collections View

- Browse and manage your knowledge library  
  <img width="1892" height="860" alt="Collections View" src="https://github.com/user-attachments/assets/97f76d4c-6015-441a-a8b3-8874ef8fe4ca" />

---

## 🏗️ Architecture

KnowledgeVault follows a **Portable Architecture** with four core principles:

### 1. Decoupled Layers

Each component is independent and swappable:

- **Frontend**: Next.js, React, Framer Motion
- **Backend**: Next.js API routes (serverless)
- **Database**: Supabase (PostgreSQL)
- **AI Engine**: Google Generative AI (Gemini)

---

### 2. Modular Design

```bash
knowledgevault/
├── app/
│   ├── api/               # Backend logic (analyze, chat, fetch-url, knowledge, search)
│   ├── components/        # Shared UI components (Header, Footer)
│   └── [pages]            # Route-based pages (add, auth, chat, collections, etc.)
├── lib/                   # External client configurations (Supabase)
└── public/                # Static assets
```

### 3. Scalable Data Flow

```
User Input → Validation → AI Processing → Database Storage → Retrieval & Chat
```

### 4. Future-Proof Stack

- Database agnostic (easily swap Supabase for other backends)

- AI model agnostic (Gemini → Claude → Custom models)

- Frontend framework flexibility (React → Vue/Svelte if needed)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm** or **yarn**

#### Required Accounts

- **Supabase**
- **Google Cloud Console** (for Gemini API)

## 📦 Installation

### 1. Clone the Repository

```
git clone https://github.com/Bhavyasri212/KnowledgeVault.git
cd KnowledgeVault
```

### 2. Install Dependencies

```
npm install
```

### 3. Set Up Environment Variables

- Create a .env.local file in the root directory:

```
# Supabase Configuration
  NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
  SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
# Google Generative AI (Gemini)
   GOOGLE_GENERATIVE_AI_API_KEY=your_google_api_key
# Node Environment
  NODE_ENV=development
```

### 🔑 How to Get These Values

#### Supabase Keys

- Go to **Project Settings → API Keys** in your Supabase dashboard

#### Google API Key

- Create a project in **Google Cloud Console**
- Enable the **Generative AI API**
- Generate an API key

#### Service Role Key

- Available in **Supabase → API Settings**
- ⚠️ **Use with caution — server-side only**

### 4. Set up the database Run the following SQL in your Supabase SQL editor:

```
-- Create knowledge_items table
CREATE TABLE knowledge_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('note', 'link', 'insight')),
  tags TEXT[] DEFAULT '{}',
  summary TEXT,
  source_url TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX idx_knowledge_user_id ON knowledge_items(user_id);
CREATE INDEX idx_knowledge_created_at ON knowledge_items(created_at DESC);

-- Enable Row Level Security
ALTER TABLE knowledge_items ENABLE ROW LEVEL SECURITY;

-- Create RLS policy
CREATE POLICY "Users can only access their own knowledge"
  ON knowledge_items
  FOR ALL
  USING (auth.uid() = user_id);
```

### 5. Run the development server

```
npm run dev
```

- Open http://localhost:3000 in your browser.

---

## 📱 Demo Access

**Quick Start without Setup**

- **Email:** demo@gmail.com
- **Password:** 123456

---

## 🔑 Environment Variables Reference

| Variable                        | Purpose                             | Where to Find                                        |
| ------------------------------- | ----------------------------------- | ---------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase project URL                | Supabase Dashboard → Settings → API                  |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public API key for client-side auth | Supabase Dashboard → Settings → API                  |
| `SUPABASE_SERVICE_ROLE_KEY`     | Server-side privileged key          | Supabase Dashboard → Settings → API                  |
| `GOOGLE_GENERATIVE_AI_API_KEY`  | Gemini API key                      | Google Cloud Console → APIs & Services → Credentials |

---

## 📂 Project Structure

```
knowledgevault/
├── app/
│   ├── api/
│   │   ├── analyze/route.ts        # AI analysis for summaries & tags
│   │   ├── chat/route.ts           # Chat endpoint with contextual knowledge
│   │   ├── fetch-url/route.ts      # Extract content from URLs
│   │   ├── knowledge/route.ts      # CRUD for knowledge items
│   │   └── search/route.ts         # Semantic / keyword search
│   │
│   ├── page.tsx                    # Home / landing page
│   ├── add/page.tsx                # Add knowledge form
│   ├── auth/page.tsx               # Login / signup
│   ├── chat/page.tsx               # Chat interface
│   ├── collections/page.tsx        # Knowledge library
│   ├── docs/page.tsx               # Architecture docs
│   ├── profile/page.tsx            # User profile
│   │
│   ├── components/
│   │   ├── Header.tsx              # Navigation header
│   │   └── Footer.tsx              # Footer component
│   │
│   ├── favicon.ico
│   ├── globals.css
│   ├── globals.d.ts
│   └── layout.tsx
│
├── lib/supabase.ts
├── public/
├── .env.local
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json

```

---

## 🔄 API Endpoints

### Knowledge Management

**POST `/api/knowledge`** – Create new knowledge item

```
curl -X POST http://localhost:3000/api/knowledge \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "title": "React Hooks",
    "content": "useEffect, useState...",
    "type": "note",
    "tags": ["react", "hooks"],
    "summary": "Core hooks in React"
  }'
```

### GET /api/knowledge – Fetch user's knowledge items

```
curl http://localhost:3000/api/knowledge \
  -H "Authorization: Bearer <token>"
```

## AI Features

### POST /api/analyze – Analyze and generate summary

```
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Article Title",
    "content": "Full article content..."
  }'
```

### POST /api/chat – Chat with your knowledge base

```
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "messages": [
      { "role": "user", "content": "What did I note about AI?" }
    ]
  }'
```

### POST /api/fetch-url – Extract content from URL

```
curl -X POST http://localhost:3000/api/fetch-url \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com/article"
  }'
```

### POST /api/search – Semantic search in your knowledge base

```
curl -X POST http://localhost:3000/api/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "machine learning architecture"
  }'
```

---

## 🎨 Design System

KnowledgeVault uses a sophisticated dark theme with:

**Primary Colors:**

- **Background:** `#0B0B0B` (pure black)
- **Surface:** `#141414`, `#1A1A1A` (dark gray)
- **Accent:** `#E5C07B` (warm gold)
- **Text:** `#F5F5F5` (off-white), `#A1A1AA` (gray), `#52525B` (dark gray)
- **Borders:** `#262626`

**Built with:**

- Tailwind CSS – Utility-first styling
- Framer Motion – Smooth animations
- Lucide Icons – Beautiful icon library

---

## 🔐 Security Features

- **Row-Level Security (RLS):** Users can only access their own data
- **Supabase Auth:** JWT-based authentication
- **Environment Variables:** Sensitive keys never exposed in frontend
- **Server-Side API Routes:** Database operations protected server-side
- **CORS & Rate Limiting:** Built-in protection against abuse

---

## 📊 Performance Optimizations

- **Image Optimization:** Next.js automatic image optimization
- **Code Splitting:** Automatic route-based code splitting
- **Caching:** Strategic use of browser and server caching
- **Database Indexes:** Optimized queries for fast retrieval
- **Draft Auto-Save:** LocalStorage for instant saving

---

## 🚢 Deployment

**Deploy to Vercel (Recommended):**

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy with one click

```
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add GOOGLE_GENERATIVE_AI_API_KEY
```

---

## 🚢 Deploy to Other Platforms

- **Netlify:** Similar process with environment variables
- **Docker:** Create a `Dockerfile` for containerization
- **Self-hosted:** Deploy to any Node.js server

---

## 🛠️ Development Scripts

```
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint

# Format code
npm run format
```

---

## 📚 Tech Stack

| Layer          | Technology                       | Purpose             |
| -------------- | -------------------------------- | ------------------- |
| Frontend       | Next.js 15, React 19, TypeScript | UI & client logic   |
| Styling        | Tailwind CSS, Framer Motion      | Design & animations |
| Backend        | Next.js API Routes, Node.js      | Server-side logic   |
| Database       | Supabase (PostgreSQL)            | Data persistence    |
| Authentication | Supabase Auth                    | User management     |
| AI/ML          | Google Generative AI (Gemini)    | NLP & summarization |
| Deployment     | Vercel                           | Hosting & CDN       |

---

## 🐛 Troubleshooting

- **Issue:** "User not authenticated"  
  **Solution:** Ensure you're logged in and the auth token is valid. Check browser cookies.

- **Issue:** "AI analysis failed"  
  **Solution:** Verify `GOOGLE_GENERATIVE_AI_API_KEY` is correct and the API is enabled in Google Cloud Console.

- **Issue:** "Failed to fetch knowledge"  
  **Solution:** Check database connection and RLS policies. Verify `SUPABASE_SERVICE_ROLE_KEY`.

- **Issue:** "Content fetch failed"  
  **Solution:** The URL may be protected. Try fetching manually or check CORS settings.

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the **MIT License** – see the LICENSE file for details.

---

## 🙏 Acknowledgments

- Supabase – Open-source Firebase alternative
- Google Generative AI – Gemini API
- Vercel – Next.js creators & hosting
- Tailwind CSS – Utility-first CSS framework
- Framer Motion – Animation library

---

## 📧 Support & Contact

- **Issues:** GitHub Issues
- **Discussions:** GitHub Discussions
- **Email:** [Your contact email]

---

## 🗺️ Roadmap

- [ ] Advanced semantic search with vector embeddings
- [ ] Collaborative knowledge sharing
- [ ] Export to multiple formats (PDF, Markdown, etc.)
- [ ] Browser extension for quick capture
- [ ] Mobile app (React Native)
- [ ] Voice-to-text capture
- [ ] Integration with popular tools (Notion, Obsidian)
- [ ] Custom AI models and fine-tuning
- [ ] Real-time collaboration

---

Built with ❤️ by Sudhini Bhavyasri Reddy  
Transform your thoughts into intelligence with **KnowledgeVault**.

```

### 3. Scalable Data Flow

```

User Input → Validation → AI Processing → Database Storage → Retrieval & Chat

```

### 4. Future-Proof Stack

- Database agnostic (easily swap Supabase for other backends)

- AI model agnostic (Gemini → Claude → Custom models)

- Frontend framework flexibility (React → Vue/Svelte if needed)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm** or **yarn**

#### Required Accounts

- **Supabase**
- **Google Cloud Console** (for Gemini API)

## 📦 Installation

### 1. Clone the Repository

```

git clone https://github.com/Bhavyasri212/KnowledgeVault.git
cd KnowledgeVault

```

### 2. Install Dependencies

```

npm install

```

### 3. Set Up Environment Variables

- Create a .env.local file in the root directory:

```

# Supabase Configuration

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Google Generative AI (Gemini)

GOOGLE_GENERATIVE_AI_API_KEY=your_google_api_key

# Node Environment

NODE_ENV=development

```

### 🔑 How to Get These Values

#### Supabase Keys

- Go to **Project Settings → API Keys** in your Supabase dashboard

#### Google API Key

- Create a project in **Google Cloud Console**
- Enable the **Generative AI API**
- Generate an API key

#### Service Role Key

- Available in **Supabase → API Settings**
- ⚠️ **Use with caution — server-side only**

### 4. Set up the database Run the following SQL in your Supabase SQL editor:

```

-- Create knowledge_items table
CREATE TABLE knowledge_items (
id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
title TEXT NOT NULL,
content TEXT NOT NULL,
type VARCHAR(50) NOT NULL CHECK (type IN ('note', 'link', 'insight')),
tags TEXT[] DEFAULT '{}',
summary TEXT,
source_url TEXT,
created_at TIMESTAMP DEFAULT now(),
updated_at TIMESTAMP DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX idx_knowledge_user_id ON knowledge_items(user_id);
CREATE INDEX idx_knowledge_created_at ON knowledge_items(created_at DESC);

-- Enable Row Level Security
ALTER TABLE knowledge_items ENABLE ROW LEVEL SECURITY;

-- Create RLS policy
CREATE POLICY "Users can only access their own knowledge"
ON knowledge_items
FOR ALL
USING (auth.uid() = user_id);

```

### 5. Run the development server

```

npm run dev

```

- Open http://localhost:3000 in your browser.

---

## 📱 Demo Access

**Quick Start without Setup**

- **Email:** demo@gmail.com
- **Password:** 123456

---

## 🔑 Environment Variables Reference

| Variable                        | Purpose                             | Where to Find                                        |
| ------------------------------- | ----------------------------------- | ---------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase project URL                | Supabase Dashboard → Settings → API                  |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public API key for client-side auth | Supabase Dashboard → Settings → API                  |
| `SUPABASE_SERVICE_ROLE_KEY`     | Server-side privileged key          | Supabase Dashboard → Settings → API                  |
| `GOOGLE_GENERATIVE_AI_API_KEY`  | Gemini API key                      | Google Cloud Console → APIs & Services → Credentials |

---

## 📂 Project Structure

```

knowledgevault/
├── app/
│ ├── api/
│ │ ├── analyze/route.ts # AI analysis for summaries & tags
│ │ ├── chat/route.ts # Chat endpoint with contextual knowledge
│ │ ├── fetch-url/route.ts # Extract content from URLs
│ │ ├── knowledge/route.ts # CRUD for knowledge items
│ │ └── search/route.ts # Semantic / keyword search
│ │
│ ├── page.tsx # Home / landing page
│ ├── add/page.tsx # Add knowledge form
│ ├── auth/page.tsx # Login / signup
│ ├── chat/page.tsx # Chat interface
│ ├── collections/page.tsx # Knowledge library
│ ├── docs/page.tsx # Architecture docs
│ ├── profile/page.tsx # User profile
│ │
│ ├── components/
│ │ ├── Header.tsx # Navigation header
│ │ └── Footer.tsx # Footer component
│ │
│ ├── favicon.ico
│ ├── globals.css
│ ├── globals.d.ts
│ └── layout.tsx
│
├── lib/supabase.ts
├── public/
├── .env.local
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json

```

---

## 🔄 API Endpoints

### Knowledge Management

**POST `/api/knowledge`** – Create new knowledge item

```

curl -X POST http://localhost:3000/api/knowledge \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer <token>" \
 -d '{
"title": "React Hooks",
"content": "useEffect, useState...",
"type": "note",
"tags": ["react", "hooks"],
"summary": "Core hooks in React"
}'

```

### GET /api/knowledge – Fetch user's knowledge items

```

curl http://localhost:3000/api/knowledge \
 -H "Authorization: Bearer <token>"

```

## AI Features

### POST /api/analyze – Analyze and generate summary

```

curl -X POST http://localhost:3000/api/analyze \
 -H "Content-Type: application/json" \
 -d '{
"title": "Article Title",
"content": "Full article content..."
}'

```

### POST /api/chat – Chat with your knowledge base

```

curl -X POST http://localhost:3000/api/chat \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer <token>" \
 -d '{
"messages": [
{ "role": "user", "content": "What did I note about AI?" }
]
}'

```

### POST /api/fetch-url – Extract content from URL

```

curl -X POST http://localhost:3000/api/fetch-url \
 -H "Content-Type: application/json" \
 -d '{
"url": "https://example.com/article"
}'

```

### POST /api/search – Semantic search in your knowledge base

```

curl -X POST http://localhost:3000/api/search \
 -H "Content-Type: application/json" \
 -d '{
"query": "machine learning architecture"
}'

```

---

## 🎨 Design System

KnowledgeVault uses a sophisticated dark theme with:

**Primary Colors:**

- **Background:** `#0B0B0B` (pure black)
- **Surface:** `#141414`, `#1A1A1A` (dark gray)
- **Accent:** `#E5C07B` (warm gold)
- **Text:** `#F5F5F5` (off-white), `#A1A1AA` (gray), `#52525B` (dark gray)
- **Borders:** `#262626`

**Built with:**

- Tailwind CSS – Utility-first styling
- Framer Motion – Smooth animations
- Lucide Icons – Beautiful icon library

---

## 🔐 Security Features

- **Row-Level Security (RLS):** Users can only access their own data
- **Supabase Auth:** JWT-based authentication
- **Environment Variables:** Sensitive keys never exposed in frontend
- **Server-Side API Routes:** Database operations protected server-side
- **CORS & Rate Limiting:** Built-in protection against abuse

---

## 📊 Performance Optimizations

- **Image Optimization:** Next.js automatic image optimization
- **Code Splitting:** Automatic route-based code splitting
- **Caching:** Strategic use of browser and server caching
- **Database Indexes:** Optimized queries for fast retrieval
- **Draft Auto-Save:** LocalStorage for instant saving

---

## 🚢 Deployment

**Deploy to Vercel (Recommended):**

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy with one click

```

vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add GOOGLE_GENERATIVE_AI_API_KEY

```

---

## 🚢 Deploy to Other Platforms

- **Netlify:** Similar process with environment variables
- **Docker:** Create a `Dockerfile` for containerization
- **Self-hosted:** Deploy to any Node.js server

---

## 🛠️ Development Scripts

```

# Start development server

npm run dev

# Build for production

npm run build

# Start production server

npm start

# Run ESLint

npm run lint

# Format code

npm run format

```

---

## 📚 Tech Stack

| Layer          | Technology                       | Purpose             |
| -------------- | -------------------------------- | ------------------- |
| Frontend       | Next.js 15, React 19, TypeScript | UI & client logic   |
| Styling        | Tailwind CSS, Framer Motion      | Design & animations |
| Backend        | Next.js API Routes, Node.js      | Server-side logic   |
| Database       | Supabase (PostgreSQL)            | Data persistence    |
| Authentication | Supabase Auth                    | User management     |
| AI/ML          | Google Generative AI (Gemini)    | NLP & summarization |
| Deployment     | Vercel                           | Hosting & CDN       |

---

## 🐛 Troubleshooting

- **Issue:** "User not authenticated"
  **Solution:** Ensure you're logged in and the auth token is valid. Check browser cookies.

- **Issue:** "AI analysis failed"
  **Solution:** Verify `GOOGLE_GENERATIVE_AI_API_KEY` is correct and the API is enabled in Google Cloud Console.

- **Issue:** "Failed to fetch knowledge"
  **Solution:** Check database connection and RLS policies. Verify `SUPABASE_SERVICE_ROLE_KEY`.

- **Issue:** "Content fetch failed"
  **Solution:** The URL may be protected. Try fetching manually or check CORS settings.

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the **MIT License** – see the LICENSE file for details.

---

## 🙏 Acknowledgments

- Supabase – Open-source Firebase alternative
- Google Generative AI – Gemini API
- Vercel – Next.js creators & hosting
- Tailwind CSS – Utility-first CSS framework
- Framer Motion – Animation library

---

## 📧 Support & Contact

- **Issues:** GitHub Issues
- **Discussions:** GitHub Discussions
- **Email:** [Your contact email]

---

## 🗺️ Roadmap

- [ ] Advanced semantic search with vector embeddings
- [ ] Collaborative knowledge sharing
- [ ] Export to multiple formats (PDF, Markdown, etc.)
- [ ] Browser extension for quick capture
- [ ] Mobile app (React Native)
- [ ] Voice-to-text capture
- [ ] Integration with popular tools (Notion, Obsidian)
- [ ] Custom AI models and fine-tuning
- [ ] Real-time collaboration

---

Built with ❤️ by Sudhini Bhavyasri Reddy
Transform your thoughts into intelligence with **KnowledgeVault**.
```
