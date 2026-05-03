# Image Optimization Guide

This project uses [`@unpic/react`](https://unpic.pics/) for automatic image optimization across all components.

## Why @unpic/react?

- 🚀 **Automatic Optimization**: Responsive images with correct sizes
- 📦 **CDN Support**: Works with Vercel, Cloudflare, and more
- ⚡ **Performance**: Lazy loading by default
- 🎨 **Consistent API**: Same interface for all images
- 📱 **Responsive**: Automatic srcset generation

## Components

### OptimizedImage

The base component for all image optimization needs.

```tsx
import { OptimizedImage } from "~/components/OptimizedImage";

<OptimizedImage
  src="/images/example.png"
  alt="Example"
  layout="constrained"
  width={800}
  height={600}
/>
```

**Props:**
- `layout`: `"constrained"` | `"fullWidth"` | `"fixed"` (default: `"constrained"`)
- `priority`: `boolean` - Use for above-the-fold images (eager loading)
- All standard `img` attributes

### HeroImage

Optimized for large banner/hero images. Always full width and eager loaded.

```tsx
import { HeroImage } from "~/components/OptimizedImage";

<HeroImage
  src="/hero/stadeum.png"
  alt="Stadeum Stade"
  aspectRatio={16 / 9}
/>
```

**Use Cases:**
- Hero sections
- Page banners
- Featured post images
- Background images

### AvatarImage

Optimized for profile images and avatars. Fixed size with rounded styling.

```tsx
import { AvatarImage } from "~/components/OptimizedImage";

<AvatarImage
  src="/team/jack_profile.png"
  alt="Jack"
  size={128}
  className="border-4 border-primary"
/>
```

**Props:**
- `size`: `number` - Width and height in pixels (default: 128)

**Use Cases:**
- Team member profiles
- User avatars
- Author photos
- Comment avatars

### ThumbnailImage

Optimized for card thumbnails with aspect ratio support.

```tsx
import { ThumbnailImage } from "~/components/OptimizedImage";

<ThumbnailImage
  src="/blog/post-banner.png"
  alt="Blog Post"
  aspectRatio={16 / 9}
  className="rounded-lg"
/>
```

**Props:**
- `aspectRatio`: `number` - Width/height ratio (default: 16/9)

**Use Cases:**
- Blog post cards
- Team member cards
- Gallery thumbnails
- Product cards

## Best Practices

### 1. Use Priority for Above-the-Fold Images

```tsx
// ✅ Good: Hero image loads immediately
<HeroImage
  src="/hero/main.png"
  alt="Hero"
  priority // Automatically set in HeroImage
/>

// ❌ Bad: Hero image lazy loads
<OptimizedImage
  src="/hero/main.png"
  alt="Hero"
  layout="fullWidth"
/>
```

### 2. Choose the Right Layout

- **fullWidth**: Images that span the container width
- **constrained**: Images with max dimensions
- **fixed**: Icons and small images with exact sizes

### 3. Always Include Alt Text

```tsx
// ✅ Good: Descriptive alt text
<OptimizedImage
  src="/team/jack.png"
  alt="Jack Ruder, Projektleitung"
/>

// ❌ Bad: Missing alt text
<OptimizedImage src="/team/jack.png" />
```

### 4. Specify Aspect Ratios

Prevents layout shift during image load.

```tsx
// ✅ Good: Aspect ratio prevents CLS
<ThumbnailImage
  src="/blog/post.png"
  alt="Post"
  aspectRatio={16 / 9}
/>

// ❌ Bad: Layout shift during load
<img src="/blog/post.png" alt="Post" />
```

### 5. Use Appropriate Sizes

```tsx
// ✅ Good: Reasonable size for avatar
<AvatarImage src="/avatar.png" alt="User" size={64} />

// ❌ Bad: Unnecessarily large
<AvatarImage src="/avatar.png" alt="User" size={1024} />
```

## Image Formats

Recommended formats:
- **PNG**: Logos, icons, images with transparency
- **JPG**: Photos, complex images
- **WebP**: Modern browsers (automatic conversion)
- **AVIF**: Next-gen format (automatic conversion)

@unpic automatically serves the best format based on browser support.

## File Organization

```
public/
├── hero/           # Hero/banner images
│   ├── stadeum.png
│   ├── team1.png
│   └── ...
├── team/           # Team member images
│   ├── jack_profile.png
│   ├── jack_banner.png
│   └── ...
├── schulen/        # School/organization logos
│   └── schulleitungen.png
└── blog/           # Blog post images (optional)
    └── post-banner.png
```

## Performance Tips

1. **Compress images before upload**
   - Use tools like TinyPNG or Squoosh
   - Target: < 500KB per image

2. **Use appropriate dimensions**
   - Hero: 1920x1080 max
   - Banners: 1600x900 max
   - Avatars: 256x256 max
   - Thumbnails: 800x450 max

3. **Lazy load by default**
   - Only use `priority` for above-the-fold images
   - Let @unpic handle lazy loading

4. **Monitor Core Web Vitals**
   - Check LCP (Largest Contentful Paint)
   - Minimize CLS (Cumulative Layout Shift)

## Migration Guide

### From `<img>` tags

```tsx
// Before
<img
  src="/team/member.png"
  alt="Member"
  className="w-full h-full object-cover"
/>

// After
<ThumbnailImage
  src="/team/member.png"
  alt="Member"
  aspectRatio={16 / 9}
/>
```

### From Next.js Image

```tsx
// Before (Next.js)
<Image
  src="/hero.png"
  alt="Hero"
  fill
  priority
/>

// After (@unpic/react)
<HeroImage
  src="/hero.png"
  alt="Hero"
/>
```

## Troubleshooting

### Image not loading

1. Check file path (must be in `public/`)
2. Verify file exists
3. Check console for errors

### Image quality issues

1. Increase source image resolution
2. Use PNG for images with text
3. Avoid over-compression

### Layout shift

1. Always specify `aspectRatio`
2. Reserve space with CSS
3. Use `width` and `height` props

## Resources

- [@unpic/react Documentation](https://unpic.pics/)
- [Web.dev Image Optimization](https://web.dev/fast/#optimize-your-images)
- [Core Web Vitals](https://web.dev/vitals/)