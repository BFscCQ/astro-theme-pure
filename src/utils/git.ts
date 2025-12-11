import { execSync } from 'child_process'

export interface Commit {
    date: string
    content: string
}

export function getCommits(count = 30): Commit[] {
    try {
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
        console.error('Failed to fetch git commits:', e)
        return []
    }
}
