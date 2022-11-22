import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";

function ReactLiveMdx({ code, scope }) {
  return (
    <>
    <LiveProvider
      code={code}
      scope={scope}
    >
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
    </LiveProvider>
    </>
  );
}
export default ReactLiveMdx;