import PostHead from "./head";
import PostFooter from "./footer";

function AboutTemplate({ children }) {
  return (
    <>
      <PostHead />
      <main>
        <article
          className="flex-width"
          style={{
            boxSizing: "border-box",
            padding: "100px 10px",
          }}
        >
          {children}
        </article>
      </main>
      <PostFooter />
    </>
  );
}
export default AboutTemplate;
