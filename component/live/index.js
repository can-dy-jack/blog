import { Sandpack } from "@codesandbox/sandpack-react";
import { sandpackDark } from "@codesandbox/sandpack-themes";

function ReactLive({ code }) {
  return (
    <div style={{
        boxShadow: "0 5px 20px 5px rgba(0,0,0,.1)"
    }}>
      <Sandpack
        template="react"
        theme={sandpackDark}
        files={{
          "/App.js": code,
        }}
      />
    </div>
  );
}

export default ReactLive;
