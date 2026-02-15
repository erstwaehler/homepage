interface MarkdownProps {
  content: string
}

export default function Markdown({ content }: MarkdownProps) {
  // Simple markdown to HTML conversion
  // This is a basic implementation. For production, consider using a library like marked or remark
  const renderMarkdown = (md: string) => {
    return md
      .split('\n')
      .map((line, i) => {
        // Headers
        if (line.startsWith('### ')) {
          return `<h3 key="${i}" class="text-xl font-semibold text-foreground mt-6 mb-3">${line.slice(4)}</h3>`
        }
        if (line.startsWith('## ')) {
          return `<h2 key="${i}" class="text-2xl font-bold text-foreground mt-8 mb-4">${line.slice(3)}</h2>`
        }
        if (line.startsWith('# ')) {
          return `<h1 key="${i}" class="text-3xl md:text-4xl font-bold text-foreground mb-6">${line.slice(2)}</h1>`
        }
        
        // Bold text
        line = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
        
        // Links
        line = line.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>')
        
        // Empty lines
        if (line.trim() === '') {
          return '<br key="' + i + '" />'
        }
        
        // Regular paragraphs
        if (!line.startsWith('<')) {
          return `<p key="${i}" class="text-foreground/90 leading-relaxed mb-4">${line}</p>`
        }
        
        return line
      })
      .join('')
  }

  return (
    <div 
      className="prose prose-slate max-w-none"
      dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
    />
  )
}
