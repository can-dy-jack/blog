import React, { useEffect, useState } from 'react';
import Layout from '../component/layout';
import SEO from '../component/SEO';
import css from '../src/styles/clock.module.css';
import useInterval from '../component/hooks/useInterval';

function Clock() {
  const [hours, setHours] = useState('');
  const [minuts, setMinuts] = useState('');
  const [second, setSecond] = useState('');
  const SetData = () => {
    const date = new Date();
    const h = `${date.getHours()}`;
    const m = `${date.getMinutes()}`;
    const s = `${date.getSeconds()}`;
    if (h.length === 2) setHours(h);
    else setHours(`0${h}`);
    if (m.length === 2) setMinuts(m);
    else setMinuts(`0${m}`);
    if (s.length === 2) setSecond(s);
    else setSecond(`0${s}`);
  };
  useEffect(() => {
    SetData();
  }, []);

  useInterval(SetData, 1000);

  return (
    <>
      <SEO
        title="时钟"
        description="时钟"
        keywords={['blog', 'kartjim', 'clock']}
      />
      <Layout>
        <div className={css.clock}>
          <div className={css.hour}>
            <div className={css.tens}>{hours[0]}</div>
            <div className={css.ones}>{hours[1]}</div>
          </div>
          <div className={css.minute}>
            <div className={css.tens}>{minuts.charAt(0)}</div>
            <div className={css.ones}>{minuts.charAt(1)}</div>
          </div>
          <div className={css.second}>
            <div className={css.tens}>{second.charAt(0)}</div>
            <div className={css.ones}>{second.charAt(1)}</div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Clock;