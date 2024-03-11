import { createMemo, createSignal } from "solid-js"
import createActionEffect from "./middleware/actionEffect"
import { NOTE_OFF, NOTE_ON } from "./actionTypes/notes"
import { NotesOwnProps } from "../shared"

export const [allNotes, setAllNotes] = createSignal<boolean[]>([])

export function useAllNotesActions() {
  const setNotes = setAllNotes
  let actionEffect = createActionEffect()

  const noteOn = (midiNote: number) => {
    setNotes(notes => {
      notes[midiNote] = true
      return notes
    })
    actionEffect({
      type: NOTE_ON,
      payload: {
        midiNote
      }
    })
  }

  const noteOff = (midiNote: number) => {
    setNotes(notes => {
      notes[midiNote] = false
      return notes
    })
    actionEffect({
      type: NOTE_OFF,
      payload: {
        midiNote
      }
    })
  }

  return {
    noteOn, noteOff
  }
}

export function useAllNoteSelectors() {

  const isNoteOn = (noteNumber: number) => {
    const notes = allNotes()
    return !!notes[noteNumber]
  }

  return {
    isNoteOn
  }
}

export function useAllNotesStore(props: NotesOwnProps) {
  const { noteOff, noteOn } = useAllNotesActions()
  const { isNoteOn } = useAllNoteSelectors()
  const { midiNote, midiNotes } = props

  const isOn = () => {
    if (Array.isArray(midiNotes)) {
      return midiNotes.every(midiNote => isNoteOn(midiNote))
    } else {
      return isNoteOn(midiNote!)
    }
  }

  const triggerNote = (midiNote: number) => {
    noteOn(midiNote)
  }

  const releaseNote = (midiNote: number) => {
    noteOff(midiNote)
  }

  return {
    isOn, triggerNote, releaseNote
  }
}
