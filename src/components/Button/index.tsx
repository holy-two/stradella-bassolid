import { css } from '@emotion/css'
import { NotesOwnProps } from '../../shared'
import { useAllNotesStore } from '../../store'

export interface ButtonProps extends NotesOwnProps {
}

export default function Button(props: ButtonProps) {
  const { midiNote, midiNotes } = props
  const {
    isOn, releaseNote, triggerNote
  } = useAllNotesStore(props)

  const isChord = !!midiNotes
  const isMiddleC = midiNote === 48

  const trigger = () => {
    if (isChord) {
      midiNotes.forEach(note => triggerNote(note))
    } else {
      triggerNote(midiNote!)
    }
  }

  const release = () => {
    if (isChord) {
      midiNotes.forEach(note => releaseNote(note))
    } else {
      releaseNote(midiNote!)
    }
  }

  const styleWrapper = css`
    width: 1em;
    height: 1em;
    border-radius: 1em;
    border: 1px solid rgb(109, 109, 109);
    transition: backgroun-color 0.5s, transform 0.1s;
    margin: 0 0.5em;
    cursor: pointer;
    box-shadow: 1px 3px 5px black;
    overflow: hidden;
    -webkit-tap-highlight-color: transparent;
    user-select: none;

    &.isOn,&.isOn:hover {
      transform: scale(0.95) translateY(4px);
    }
  `

  const styleInner = css`
    width: 100%;
    height: 100%;
    border-radius: 1em;
    background-color: white;
    box-shadow: inset 0 0 1em #000000;

    &.middleC {
      background-color: black;
      box-shadow: inset 0 0 1em #ffffff;
    }
  `

  return (
    <div
      class={styleWrapper}
      classList={{ isOn: isOn() }}
      onPointerDown={trigger}
      onPointerUp={release}
      onPointerLeave={release}
    >
      <div
        class={styleInner}
        classList={{
          middleC: isMiddleC
        }}
      />
    </div>
  )
}
