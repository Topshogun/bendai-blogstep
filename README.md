## Bendai - AI Automation Agency

A modern, production-ready website for an AI automation agency built with React, TypeScript, and Tailwind CSS.

### Features

- **Modern Design**: Beautiful, responsive design with smooth animations
- **AI-Focused Content**: Specialized sections for AI automation services
- **Contact Integration**: Consultation form with Supabase backend
- **Admin Dashboard**: Simple admin interface for managing content
- **Blog API**: Edge function endpoint for receiving blog posts from external workflows

### Blog API Endpoint

The project includes a Supabase Edge Function for receiving blog posts from external systems like n8n workflows.

#### Endpoint Details

- **URL**: `https://your-project.supabase.co/functions/v1/blog-posts`
- **Method**: `POST`
- **Content-Type**: `application/json`

#### Expected Payload Format

```json
{
  "title": "Your Blog Post Title",
  "content": "Full blog post content in markdown or HTML format",
  "excerpt": "Brief description or summary of the post",
  "author": "Author Name (optional)",
  "publishedDate": "2024-01-15T10:30:00Z (optional, defaults to current time)",
  "category": "AI Technology (optional, defaults to 'AI Technology')",
  "tags": ["AI", "automation", "technology"],
  "featuredImage": "https://example.com/image.jpg (optional)",
  "slug": "custom-url-slug (optional, auto-generated from title)"
}
```

#### Response Format

**Success (201 Created):**
```json
{
  "success": true,
  "message": "Blog post created successfully",
  "data": {
    "id": "uuid",
    "title": "Your Blog Post Title",
    "slug": "your-blog-post-title",
    "publishedAt": "2024-01-15T10:30:00Z"
  }
}
```

**Error (400/500):**
```json
{
  "success": false,
  "error": "Error description",
  "details": "Additional error details"
}
```

#### Testing the Endpoint

You can test the endpoint using curl:

```bash
curl -X POST https://your-project.supabase.co/functions/v1/blog-posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Blog Post",
    "content": "This is a test blog post content.",
    "excerpt": "A test post for the API endpoint.",
    "category": "Testing",
    "tags": ["test", "api"]
  }'
```

### Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

3. **Database Setup**
   Run the Supabase migrations to set up the required tables:
   ```bash
   # The migrations will create the Posts and consultations tables
   ```

4. **Development Server**
   ```bash
   npm run dev
   ```

5. **Deploy Edge Function**
   The blog-posts edge function will be automatically deployed to Supabase.

### Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── constants/          # Static data and configuration
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── styles/             # CSS and styling files

supabase/
├── functions/          # Edge functions
└── migrations/         # Database migrations
```

### Technologies Used

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (Database, Auth, Edge Functions)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Build Tool**: Vite

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### License

This project is proprietary and confidential.