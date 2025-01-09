import { createSignal } from 'solid-js'
import createActionEffect from './middleware/actionEffect'
import { NOTE_OFF, NOTE_ON } from './actionTypes/notes'
import { NotesOwnProps } from '../shared'

export const [allNotes, setAllNotes] = createSignal<boolean[]>([])

export function useAllNotesActions() {
  const actionEffect = createActionEffect()

  const noteOn = (midiNote: number) => {
    setAllNotes(notes => {
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
    setAllNotes(notes => {
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
    noteOn,
    noteOff
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
  const { noteOff: releaseNote, noteOn: triggerNote } = useAllNotesActions()
  const { isNoteOn } = useAllNoteSelectors()
  const { midiNote, midiNotes } = props

  const isOn = () => {
    if (Array.isArray(midiNotes)) {
      return midiNotes.every(isNoteOn)
    } else {
      return isNoteOn(midiNote!)
    }
  }

  return {
    isOn,
    triggerNote,
    releaseNote
  }
}
