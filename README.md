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
    "publishedAt": "2024-01-15T10:30:00Z",
    "url": "https://your-domain.com/blog/your-blog-post-title"
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
  -H "Authorization: Bearer YOUR_SUPABASE_ANON_KEY" \
  -d '{
    "title": "Test Blog Post",
    "content": "This is a test blog post content with **markdown** formatting.",
    "excerpt": "A test post for the API endpoint.",
    "category": "Testing",
    "tags": ["test", "api"]
  }'
```

Or use the built-in test function in the admin dashboard at `/admin/posts`.

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
   # Apply the migrations to create Posts and consultations tables
   # The migrations will automatically create the necessary tables and policies
   ```

4. **Development Server**
   ```bash
   npm run dev
   ```

5. **Deploy Edge Function**
   The blog-posts edge function will be automatically deployed to Supabase.

### Admin Dashboard

Access the admin dashboard at `/admin` with these credentials:
- **Username**: `admin`
- **Password**: `admin123`

The admin dashboard includes:
- **Dashboard**: Overview with stats
- **Posts**: View and manage blog posts from your API
- **Users**: User management
- **Settings**: Site configuration

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

### API Integration with n8n

To integrate with your n8n workflow:

1. **Configure HTTP Request Node** in n8n:
   - Method: POST
   - URL: `https://your-project.supabase.co/functions/v1/blog-posts`
   - Headers: 
     - `Content-Type: application/json`
     - `Authorization: Bearer YOUR_SUPABASE_ANON_KEY`

2. **Set up the request body** with your blog post data following the expected format above.

3. **Handle the response** to check for success/error status.

### Troubleshooting

If you encounter issues:

1. **Check the admin dashboard** at `/admin/posts` for any error messages
2. **Use the "Test API" button** in the admin dashboard to verify the endpoint
3. **Check browser console** for detailed error logs
4. **Verify environment variables** are correctly set
5. **Ensure Supabase project** has the correct tables and policies

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### License

This project is proprietary and confidential.