import { promises as fs } from 'fs'
import path from 'path'

export interface TeamMember {
  vorname: string
  nachname: string
  schule: string
  rolle: string
  email: string
  bio: string
  social: {
    instagram?: string
    linkedin?: string
  }
  picture_profile: string
  picture_banner: string
}

let cachedTeam: TeamMember[] | null = null

export async function getTeamMembers(): Promise<TeamMember[]> {
  if (cachedTeam) {
    return cachedTeam
  }

  const filePath = path.join(process.cwd(), 'src/data/team.jsonl')
  const fileContent = await fs.readFile(filePath, 'utf-8')
  
  const lines = fileContent.trim().split('\n')
  cachedTeam = lines.map(line => JSON.parse(line))
  
  return cachedTeam
}

export async function getTeamMember(vorname: string): Promise<TeamMember | undefined> {
  const team = await getTeamMembers()
  return team.find(member => member.vorname.toLowerCase() === vorname.toLowerCase())
}
