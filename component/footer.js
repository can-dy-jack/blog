import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import config from '../config';

const StyleFooter = styled.footer`
  border-top: 1px solid var(--border);
  padding: 40px;
  text-align: center;
`;
const StyledLinkBox = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 20px;
  margin-bottom: 40px;
`;
const StyledLink = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-width: 200px;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 30px;
`;
const StyledLinkHead = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  margin: 10px 0;
  line-height: 2;
`;

function PostFooter() {
  return (
    <StyleFooter>
      <StyledLinkBox>
        {config.footer.map((item) => (
          <StyledLink key={item.label}>
            <StyledLinkHead>{item.label}</StyledLinkHead>
            {item.items.map((link) => (
              <span key={link.link}>
                <Link style={{ lineHeight: 2 }} href={link.link}>{link.label}</Link>
              </span>
            ))}
          </StyledLink>
        ))}
      </StyledLinkBox>
      <p>
        {`Copyright © ${new Date().getFullYear()},`}
        <Link href="https://github.com/can-dy-jack">{config.author}</Link>
        {' Inc. Built with Next.js.'}
      </p>
    </StyleFooter>
  );
}
export default PostFooter;
