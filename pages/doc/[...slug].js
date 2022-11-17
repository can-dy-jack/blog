import { useRouter } from "next/router";
import Layout from "../../component/layout";
import { get_doc_paths } from "../../lib/getDoc";

function DOCPages({ data }) {
  const router = useRouter();

  return (
    <>
      <Layout>
        <div style={{ margin: "200px" }}>{JSON.stringify(router.query)}</div>
        <div style={{ margin: "200px" }}>{data.join(",")}</div>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const paths = await get_doc_paths();
  console.log(JSON.stringify(paths));
  return {
    paths,
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  return {
    props: {
      data: params.slug,
    },
  };
}

export default DOCPages;

