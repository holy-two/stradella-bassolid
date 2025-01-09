import Bass from "./components/Bass";
import { css } from "@emotion/css";

export default function App() {
  const styleAppWrapper = css`
    text-align: center;
  `;

  const styleHeader = css`
    text-shadow: 1px 1px white;
  `;

  return (
    <div class={styleAppWrapper}>
      <h1 class={styleHeader}>
        Stradella Bassx System{" "}
        <span role="img" aria-label="Musical notes">
          🎵
        </span>
      </h1>
      <Bass />
    </div>
  );
}
