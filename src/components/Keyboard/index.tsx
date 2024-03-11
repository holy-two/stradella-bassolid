import { css } from '@emotion/css'
import Key from '../Key'
import { For } from 'solid-js'

const BASE_NOTE = 45
const KEYS = 33

export default function Keyboard() {
  const styleWrapper = css`
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 1em 0;
    perspective: 100px;
    perspective-origin: bottom;
    transform-style: preserve-3d;
    transform: rotateX(45deg);
  `

  const KeyList = Array.from({ length: KEYS }, (_, index) => index)

  return (
    <div class={styleWrapper}>
      <For each={KeyList}>
        {(index) => {
          return <Key midiNote={BASE_NOTE + index} />
        }}
      </For>
    </div>
  )
}
