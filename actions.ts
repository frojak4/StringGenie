'use server'

export type FetchSongsResponse = {
    success: boolean,
    data?: string,
    error?: string
}


export const FetchSongs = async (currentState: undefined, formData: FormData) => {

    const chords = formData.getAll('chords')
    const level = formData.get('level')


    if (chords.length < 3) {
        return { success: false, error: 'Please input at least 3 chords' }
    }
}