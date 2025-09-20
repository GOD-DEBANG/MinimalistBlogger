# Minimalist Blogger

A modern, professional blog platform with a minimalist aesthetic—built for fast, focused content creation and seamless reading experiences.

---

## Table of Contents

- [Features](#features)
- [File Structure](#file-structure)
- [Deployment](#deployment)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Landing Page with Featured Posts:** Highlights important content and includes search functionality.
- **Blog Post Listing & Filtering:** Paginated list with category/tag filtering.
- **Single Post View:** Full blog post content with author info, date, and featured image.
- **AI Content Generation:** Generate blog drafts using AI for creative brainstorming.
- **Admin Dashboard:** Create, edit, and delete posts with a rich-text editor.
- **Search Functionality:** Find posts by title or content.
- **Responsive Design:** Optimized for desktop, tablet, and mobile devices.
- **Minimalist UI:** Clean, grid-based layout with subtle animations.

---

## File Structure

```
MinimalistBlogger/
├── .gitignore
├── .idx/
├── .modified
├── apphosting.yaml
├── components.json
├── docs/
│   └── blueprint.md
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── src/
│   ├── ai/
│   │   ├── ai-blog-post-drafting.ts
│   │   └── flows/
│   │       ├── blog.ts
│   │       └── index.ts
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── blog/
│   │   │   └── [slug]/page.tsx
│   │   └── create/
│   │       └── components/
│   │           ├── post-form.tsx
│   │           └── actions.ts
│   ├── components/
│   │   └── layout/
│   │       ├── header.tsx
│   │       └── footer.tsx
│   └── lib/
│       └── posts.ts
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## Deployment

Minimalist Blogger is live at:  
**[https://minimalist-blogger-2zep.vercel.app/](https://minimalist-blogger-2zep.vercel.app/)**

### Prerequisites

- Node.js (v18+)
- npm or yarn
- [Google Cloud API Key](https://console.cloud.google.com/) (for dynamic post fetching)

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/GOD-DEBANG/MinimalistBlogger.git
   cd MinimalistBlogger
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**
   - Create a `.env.local` file in the root.
   - Add your Google API key:
     ```
     API_KEY=your_google_api_key_here
     ```

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   - The app will be accessible at `http://localhost:3000`.

5. **Production build:**
   ```bash
   npm run build
   npm start
   ```

6. **Configure hosting (optional):**
   - Use `apphosting.yaml` for custom deployment (e.g., Google Cloud).
   - For Vercel, push to your GitHub repo and import via the Vercel dashboard.
   - For Netlify, refer to their Next.js deployment docs.

---

## Usage

- Visit the homepage to browse featured posts.
- Use the search bar or filters to find content.
- Sign in as an admin to create/edit blog posts (see `/create`).
- Use the AI-powered content generation tool for draft ideas.

---

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements, new features, or bug fixes.

---

## License

This project is licensed under the MIT License.

---

> **Minimalist Blogger** — A clean space for thoughts, stories, and ideas. Explore articles on tech, design, and personal growth.
