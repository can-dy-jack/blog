import React from 'react';
import PostHead from '../../component/head';
import PostFooter from '../../component/footer';

function CodeTemplate({ children }) {
  return (
    <>
      <PostHead />
      <main>
        <article
          className="flex-width"
          style={{
            boxSizing: 'border-box',
            padding: '100px 10px',
          }}
        >
          {children}
        </article>
      </main>
      <PostFooter />
    </>
  );
}
export default CodeTemplate;
