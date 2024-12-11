"use client"
import React, { useActionState, useEffect, useState } from 'react'
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'
import { FetchSongs } from '@/actions'
import { useToast } from '@/hooks/use-toast'
import { Button } from './ui/button'
import { guitarChords } from '@/chords'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Song } from '@/Types'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const InputArea = () => {

    const [level, setLevel] = useState('Beginner')
    const [chords, setChords] = useState<string[]>([])
    const [decade, setDecade] = useState<string>("")
    const [genre, setGenre] = useState<string>("")


    const [modalOpen, setModalOpen] = useState(false)
    const [songs, setSongs] = useState<Song[]>([])

    const [state, action, isPending] = useActionState(FetchSongs, null)

    const { toast } = useToast()

    useEffect(() => {
        if (state) {
            if (!state?.success) {
                toast({ variant: "destructive", title: 'Error', description: state?.error })
            } else if (state.data) {
                setSongs(state?.data?.songs)
                setModalOpen(true)
            }
        }
    }, [state])



    return (
        <form action={action} className="py-12 flex flex-col items-center">
            <section className="flex gap-4">
                <input type="hidden" value={decade} name="decade" />
                <Select value={decade} onValueChange={(value) => { if (value) setDecade(value) }}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Genre (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="rock">Rock</SelectItem>
                        <SelectItem value="folk">Folk</SelectItem>
                        <SelectItem value="blues">Blues</SelectItem>
                        <SelectItem value="jazz">Jazz</SelectItem>
                        <SelectItem value="metal">Metal</SelectItem>
                        <SelectItem value="country">Country</SelectItem>
                        <SelectItem value="funk">Funk</SelectItem>
                    </SelectContent>
                </Select>
                <input type="hidden" value={genre} name="genre" />
                <Select value={genre} onValueChange={(value) => { if (value) setGenre(value) }}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Decade (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="2020s">2020s</SelectItem>
                        <SelectItem value="2010s">2010s</SelectItem>
                        <SelectItem value="2000s">2000s</SelectItem>
                        <SelectItem value="1990s">1990s</SelectItem>
                        <SelectItem value="1980s">1980s</SelectItem>
                        <SelectItem value="1970s">1970s</SelectItem>
                        <SelectItem value="1960s">1960s</SelectItem>
                    </SelectContent>
                </Select>
            </section>


            <h3 className="text-accent-foreground text-xl">Level: </h3>
            <input type="hidden" value={level} name="level" />
            <ToggleGroup className="py-4" value={level} variant="outline" type="single" onValueChange={(value) => { if (value) setLevel(value) }}>
                <ToggleGroupItem value="Beginner">Beginner</ToggleGroupItem>
                <ToggleGroupItem value="Intermediate">Intermediate</ToggleGroupItem>
                <ToggleGroupItem value="Advanced">Advanced</ToggleGroupItem>
            </ToggleGroup>
            <h3 className="text-accent-foreground text-xl">Chords: </h3>
            {chords.map((chord, i) => {
                return <input key={i} type="hidden" value={chord} name="chords" />
            })}
            <ToggleGroup className="py-4 flex flex-col text-center" value={chords} variant="outline" type="multiple" onValueChange={(value) => setChords(value)}>

                <span className="py-2">
                    <h4 className="text-muted-foreground text-sm">Easy</h4>
                    {guitarChords[0].chords.map((chord, i) => {
                        return <ToggleGroupItem className="p-2 m-1" value={chord} key={i}>{chord}</ToggleGroupItem>
                    })}
                </span>
                <span className="py-2">
                    <h4 className="text-muted-foreground text-sm">Medium</h4>
                    {guitarChords[1].chords.map((chord, i) => {
                        return <ToggleGroupItem className="p-2 m-1" value={chord} key={i}>{chord}</ToggleGroupItem>
                    })}
                </span>
                <span className="py-2">
                    <h4 className="text-muted-foreground text-sm">Hard</h4>
                    {guitarChords[2].chords.map((chord, i) => {
                        return <ToggleGroupItem className="p-2 m-1" value={chord} key={i}>{chord}</ToggleGroupItem>
                    })}
                </span>

            </ToggleGroup>


            <Button disabled={isPending} variant="default">{isPending ? 'Loading...' : 'Submit'}</Button>
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogContent>
                    <DialogTitle>Suggested songs:</DialogTitle>

                    {songs.map((song, i) => {
                        return <Button variant="outline" key={i}>{song.song} by {song.artist}</Button>
                    })}
                </DialogContent>
            </Dialog>
        </form>

    )
}

export default InputArea