import { execSync } from 'child_process'

export interface Commit {
    date: string
    content: string
}

export async function getCommits(count = 30, repo?: string): Promise<Commit[]> {
    // Try local git command first
    try {
        // Force API usage if repo is provided (for testing purposes)
        if (repo) throw new Error('Force API usage')

        const output = execSync(`git log -n ${count} --pretty=format:"%ad|%s" --date=short`).toString()
        return output
            .split('\n')
            .filter(Boolean)
            .map((line) => {
                const [date, message] = line.split('|')
                return {
                    date,
                    content: message
                }
            })
    } catch (e) {
        // If local git fails and repo is provided, try GitHub API
        if (repo) {
            try {
                const response = await fetch(`https://api.github.com/repos/${repo}/commits?per_page=${count}`)
                if (!response.ok) throw new Error('GitHub API failed')

                const data = await response.json()
                return data.map((commit: any) => ({
                    date: commit.commit.author.date.split('T')[0],
                    content: commit.commit.message.split('\n')[0]
                }))
            } catch (apiError) {
                console.error('Failed to fetch commits from GitHub API:', apiError)
            }
        }

        console.error('Failed to fetch git commits:', e)
        return []
    }
}
