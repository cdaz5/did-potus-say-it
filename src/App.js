import React, { useRef, useState } from 'react';

import useQuoteFetcher from 'hooks/use-quote-fetcher';

import { paint } from 'helpers';

const App = () => {
  const canvas = useRef(null);
  const [loading, setLoading] = useState(false);
  const { quote, isTrumpQuote, getNewQuote } = useQuoteFetcher();

  const performAnswerActions = async (text) => {
    if (!canvas.current) return;
    setLoading(true);
    const { current: cvs } = canvas;

    const ctx = cvs.getContext("2d");

    await paint(text, cvs)
    getNewQuote()
    ctx.clearRect(0, 0, cvs.width, cvs.height)
    setLoading(false)
  }

  const handleClick = didHeSay => () => isTrumpQuote === didHeSay ?
      performAnswerActions('correct') : performAnswerActions('wrong')

  return (
    <div className="height-100 width-100">
      <div className="pos-rel flex flex-col align-center height-100">
        <div className="flex">
          <h1 className="quote">{quote}</h1>
        </div>
        <div className="resp-container flex flex-1 width-100 pad-20 justify-end align-end">
          <canvas id="canvas" ref={canvas} />
          <div className=" action-container flex flex-1 flex-col pad-20 align-center">
            <h1 className='resp-header'>Did he say it?</h1>
            <div className='btn-container flex justify-evenly'>
              <button className='btn mr-10' disabled={loading} onClick={handleClick(true)}>
                Yes, definitely!
              </button>
              <button className='btn' disabled={loading} onClick={handleClick(false)}>
                No, fucking way!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
