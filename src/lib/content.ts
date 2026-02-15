import { promises as fs } from 'fs'
import path from 'path'

export interface ContentMatter {
  title: string
  description?: string
  date?: string
  author?: string
  [key: string]: any
}

export interface ContentDocument {
  slug: string
  frontmatter: ContentMatter
  content: string
}

async function parseMarkdownFile(filePath: string, slug: string): Promise<ContentDocument> {
  const fileContent = await fs.readFile(filePath, 'utf-8')
  
  // Simple frontmatter parser
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/
  const match = fileContent.match(frontmatterRegex)
  
  if (!match) {
    return {
      slug,
      frontmatter: { title: slug },
      content: fileContent,
    }
  }
  
  const [, frontmatterString, content] = match
  const frontmatter: ContentMatter = { title: slug }
  
  // Parse YAML-like frontmatter
  frontmatterString.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':')
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim()
      const value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '')
      frontmatter[key] = value
    }
  })
  
  return {
    slug,
    frontmatter,
    content: content.trim(),
  }
}

export async function getBlogPosts(): Promise<ContentDocument[]> {
  const contentDir = path.join(process.cwd(), 'content/blog')
  
  try {
    const files = await fs.readdir(contentDir)
    const mdFiles = files.filter(file => file.endsWith('.md') || file.endsWith('.mdx'))
    
    const posts = await Promise.all(
      mdFiles.map(async (file) => {
        const slug = file.replace(/\.(md|mdx)$/, '')
        const filePath = path.join(contentDir, file)
        return parseMarkdownFile(filePath, slug)
      })
    )
    
    // Sort by date descending
    return posts.sort((a, b) => {
      const dateA = a.frontmatter.date ? new Date(a.frontmatter.date).getTime() : 0
      const dateB = b.frontmatter.date ? new Date(b.frontmatter.date).getTime() : 0
      return dateB - dateA
    })
  } catch (error) {
    return []
  }
}

export async function getBlogPost(slug: string): Promise<ContentDocument | undefined> {
  const contentDir = path.join(process.cwd(), 'content/blog')
  
  try {
    const filePath = path.join(contentDir, `${slug}.md`)
    return await parseMarkdownFile(filePath, slug)
  } catch (error) {
    try {
      const filePath = path.join(contentDir, `${slug}.mdx`)
      return await parseMarkdownFile(filePath, slug)
    } catch {
      return undefined
    }
  }
}

export async function getPageContent(page: 'konzept' | 'impressum'): Promise<ContentDocument | undefined> {
  const contentDir = path.join(process.cwd(), 'content/pages')
  
  try {
    const filePath = path.join(contentDir, `${page}.md`)
    return await parseMarkdownFile(filePath, page)
  } catch (error) {
    return undefined
  }
}
