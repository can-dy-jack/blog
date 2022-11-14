import PostHead from "./head";
import PostFooter from "./footer";

function Layout({ children, className }) {
    return(
        <>
            <PostHead />
            <main className={className}>
                { children }
            </main>
            <PostFooter />
        </>
    )
}
export default Layout;