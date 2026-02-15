import fs from 'fs'
import path from 'path'

export interface TeamMember {
  vorname: string
  rolle: string
  schule: string
  bio: string
  mastodon: string
  profile_image: string
  banner_image: string
}

export function loadTeamMembers(): TeamMember[] {
  const filePath = path.join(process.cwd(), 'src/data/team.jsonl')
  const content = fs.readFileSync(filePath, 'utf-8')
  
  return content
    .trim()
    .split('\n')
    .filter(line => line.trim())
    .map(line => JSON.parse(line))
}
