import PostHead from "./head";
import PostFooter from "./footer";

function AboutTemplate({ children }) {
    return(
        <>
            <PostHead />
            <main>
                <article style={{
                    width: "80%",
                    margin: "50px auto"
                }}>
                    { children }
                </article>
            </main>
            <PostFooter />
        </>
    )
}
export default AboutTemplate;