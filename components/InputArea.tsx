"use client"
import React, { useActionState, useEffect, useState } from 'react'
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'
import { FetchSongs } from '@/actions'
import { useToast } from '@/hooks/use-toast'
import { Button } from './ui/button'
import { guitarChords } from '@/chords'

const InputArea = () => {

    const [level, setLevel] = useState('Beginner')
    const [chords, setChords] = useState<string[]>([])

    const [state, action] = useActionState(FetchSongs, null)

    const { toast } = useToast()

    useEffect(() => {
        if (state) {
            if (!state?.success) {
                toast({ variant: "destructive", title: 'Error', description: state?.error })
            }
        }
    }, [state])

    return (
        <form action={action} className="py-12 flex flex-col items-center">
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
            <Button variant="default">Submit</Button>
        </form>

    )
}

export default InputArea