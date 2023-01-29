import React from 'react';
import Layout from '../component/layout';
import SEO from '../component/SEO';

function Pages404() {
  return (
    <Layout>
      <SEO title="404 not found." />
      <div style={{
        margin: '200px 100px',
        textAlign: 'center',
      }}
      >
        <h3>404 | This page could not be found.</h3>
      </div>
    </Layout>
  );
}
export default Pages404;