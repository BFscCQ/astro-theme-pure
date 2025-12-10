import type { APIRoute } from 'astro'

export const GET: APIRoute = async () => {
    const API_KEY = import.meta.env.LASTFM_API_KEY
    const USERNAME = import.meta.env.LASTFM_USERNAME

    if (!API_KEY || !USERNAME) {
        return new Response(JSON.stringify({ error: 'Missing Last.fm configuration' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        })
    }

    try {
        const response = await fetch(
            `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=1`
        )
        const data = await response.json()
        const track = data.recenttracks.track[0]

        return new Response(
            JSON.stringify({
                artist: track.artist['#text'],
                title: track.name,
                cover: track.image[2]['#text'], // Medium size
                url: track.url,
                isPlaying: track['@attr']?.nowplaying === 'true'
            }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'public, max-age=60' // Cache for 1 minute
                }
            }
        )
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        })
    }
}
