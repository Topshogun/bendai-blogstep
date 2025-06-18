/**
 * Supabase Edge Function: blog-posts
 * 
 * API endpoint for receiving blog post data from n8n workflow
 * 
 * URL: https://your-project.supabase.co/functions/v1/blog-posts
 * Method: POST
 * 
 * Expected payload:
 * {
 *   "title": "Blog Post Title",
 *   "content": "Full blog post content in markdown or HTML",
 *   "excerpt": "Brief description of the post",
 *   "author": "Author Name",
 *   "publishedDate": "2024-01-15T10:30:00Z",
 *   "category": "AI Technology",
 *   "tags": ["AI", "automation", "technology"],
 *   "featuredImage": "https://example.com/image.jpg",
 *   "slug": "blog-post-title"
 * }
 */

import { createClient } from 'npm:@supabase/supabase-js@2';

// CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key',
};

// Interface for incoming blog post data
interface BlogPostData {
  title: string;
  content: string;
  excerpt: string;
  author?: string;
  publishedDate?: string;
  category?: string;
  tags?: string[];
  featuredImage?: string;
  slug?: string;
}

// Interface for database post structure
interface DatabasePost {
  title: string;
  content_markdown: string;
  excerpt: string;
  featured_image_url: string;
  category_ids: string;
  tags: string[] | null;
  slug: string;
  is_published: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
  research_topic: string | null;
  seo_keywords_targeted: string[] | null;
  seo_keywords_used: string[] | null;
}

// Validation function for blog post data
function validateBlogPost(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!data.title || typeof data.title !== 'string' || data.title.trim().length === 0) {
    errors.push('Title is required and must be a non-empty string');
  }
  
  if (!data.content || typeof data.content !== 'string' || data.content.trim().length === 0) {
    errors.push('Content is required and must be a non-empty string');
  }
  
  if (!data.excerpt || typeof data.excerpt !== 'string' || data.excerpt.trim().length === 0) {
    errors.push('Excerpt is required and must be a non-empty string');
  }
  
  if (data.tags && !Array.isArray(data.tags)) {
    errors.push('Tags must be an array');
  }
  
  if (data.featuredImage && typeof data.featuredImage !== 'string') {
    errors.push('Featured image must be a string URL');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// Generate slug from title if not provided
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    console.log('🚀 Blog posts API called with method:', req.method);
    console.log('🔗 Request URL:', req.url);

    // Only allow POST requests
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Method not allowed. Use POST.',
          allowedMethods: ['POST']
        }),
        {
          status: 405,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Parse request body
    let requestData: BlogPostData;
    try {
      const body = await req.text();
      console.log('📥 Raw request body:', body);
      requestData = JSON.parse(body);
      console.log('📝 Parsed blog post data:', {
        title: requestData.title,
        contentLength: requestData.content?.length || 0,
        author: requestData.author,
        category: requestData.category,
        tags: requestData.tags
      });
    } catch (parseError) {
      console.error('❌ JSON parsing error:', parseError);
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid JSON in request body',
          details: parseError.message
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Validate the incoming data
    const validation = validateBlogPost(requestData);
    if (!validation.isValid) {
      console.error('❌ Validation failed:', validation.errors);
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Validation failed',
          details: validation.errors
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Initialize Supabase client with service role key
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('❌ Missing Supabase environment variables');
      console.log('Available env vars:', Object.keys(Deno.env.toObject()));
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Server configuration error',
          details: 'Missing required environment variables'
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // Generate slug if not provided
    const slug = requestData.slug || generateSlug(requestData.title);
    
    // Check if slug already exists
    const { data: existingPost, error: checkError } = await supabase
      .from('Posts')
      .select('id')
      .eq('slug', slug)
      .maybeSingle();

    if (checkError) {
      console.error('❌ Error checking existing slug:', checkError);
    }

    // If slug exists, append timestamp to make it unique
    const finalSlug = existingPost ? `${slug}-${Date.now()}` : slug;

    // Prepare data for database insertion - match the exact schema
    const postData: Partial<DatabasePost> = {
      title: requestData.title.trim(),
      content_markdown: requestData.content.trim(),
      excerpt: requestData.excerpt.trim(),
      featured_image_url: requestData.featuredImage || 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&h=630',
      category_ids: requestData.category || 'AI Technology',
      tags: requestData.tags || null,
      slug: finalSlug,
      is_published: true,
      published_at: requestData.publishedDate || new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      research_topic: null,
      seo_keywords_targeted: null,
      seo_keywords_used: null
    };

    console.log('💾 Inserting post into database:', {
      title: postData.title,
      slug: postData.slug,
      category: postData.category_ids,
      tags: postData.tags,
      hasContent: !!postData.content_markdown,
      hasExcerpt: !!postData.excerpt
    });

    // Insert the blog post into Supabase
    const { data: insertedPost, error: insertError } = await supabase
      .from('Posts')
      .insert(postData)
      .select()
      .single();

    if (insertError) {
      console.error('❌ Database insertion error:', insertError);
      console.error('❌ Error details:', {
        message: insertError.message,
        details: insertError.details,
        hint: insertError.hint,
        code: insertError.code
      });
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Failed to save blog post',
          details: insertError.message,
          code: insertError.code,
          hint: insertError.hint
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    console.log('✅ Blog post saved successfully:', insertedPost.id);

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Blog post created successfully',
        data: {
          id: insertedPost.id,
          title: insertedPost.title,
          slug: insertedPost.slug,
          publishedAt: insertedPost.published_at,
          url: `https://your-domain.com/blog/${insertedPost.slug}`
        }
      }),
      {
        status: 201,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );

  } catch (error) {
    console.error('🚨 Unexpected error:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Internal server error',
        details: error.message,
        stack: error.stack
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});