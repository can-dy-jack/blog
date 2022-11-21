import { useEffect } from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";

function ReactLiveMdx({ children }) {
    useEffect(() => {
        console.log(children)
    })

  return (
    <>
    <LiveProvider
      code={children ? children : `function Clock() {
return (
    <div>
      <h3>现在的时间是 {new Date().toLocaleTimeString()}。</h3>
    </div>
  );
}`}
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
    
    {children}
    </>
  );
}
export default ReactLiveMdx;