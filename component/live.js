import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";

export default function ReactLive({children}) {
  return (
    <>
      <LiveProvider code="<h1>h1</h1>">
        <LiveEditor
          className="live"
          style={{
            background: "#322a38",
            borderRadius: "5px",
          }}
        />
        <LiveError />
        <LivePreview
          className="live-preview"
          style={{
            padding: "10px",
            background: "var(--foot-bg)",
            margin: "10px 0",
          }}
        />

{children}
      </LiveProvider>
    </>
  );
}
