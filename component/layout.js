import PostHead from "./head";
import PostFooter from "./footer";

function Layout({ children }) {
    return(
        <>
            <PostHead />
            <main>
                { children }
            </main>
            <PostFooter />
        </>
    )
}
export default Layout;