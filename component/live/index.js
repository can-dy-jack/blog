import { Sandpack } from "@codesandbox/sandpack-react";
import { sandpackDark } from "@codesandbox/sandpack-themes";

function ReactLive({ code }) {
  return (
    <div>
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
