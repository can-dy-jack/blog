import PostHead from "./head";
import PostFooter from "./footer";

function AboutTemplate({ children }) {
    return(
        <>
            <PostHead />
            <main>
                <article style={{
                    width: "80%",
                    margin: "0 auto",
                    padding: "100px 20px"
                }}>
                    { children }
                </article>
            </main>
            <PostFooter />
        </>
    )
}
export default AboutTemplate;