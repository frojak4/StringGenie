'use server'

export type FetchSongsResponse = {
    success: boolean,
    data?: string,
    error?: string
}


export const FetchSongs = async (currentState: undefined, formData: FormData) => {

    const chords = formData.getAll('chords')
    const level = formData.get('level')
    const genre = formData.get('genre')
    const decade = formData.get('decade')
    const chordsString = chords.join(', ');

    const requestBody = {
        chords: chordsString,
        level: level,
        genre: genre || 'any',
        decade: decade || 'any'
    }




    if (chords.length < 3) {
        return { success: false, error: 'Please input at least 3 chords' }
    }

    try {
        const url = 'https://get-songs-ai.frojak4.workers.dev/'

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        const data = await response.json();

        return { success: true, data: { songs: data.songs } }
    } catch (error) {
        return { success: false, error: error.message }
    }

}