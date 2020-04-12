import { useEffect, useState } from 'react';

import { sample } from 'helpers';

const useQuoteFetcher = () => {
  const [{ quote, isTrumpQuote }, setQuote] = useState({
    quote: '',
    isTrumpQuote: false,
  });
  const [refetch, setRefetch] = useState(0);

  const getNewQuote = () => setRefetch(prev => prev + 1);

  useEffect(() => {
    const fetchRandomQuote = async () => {
      try {
        const res = await fetch('https://type.fit/api/quotes');
        const quotes = await res.json();

        setQuote({
          quote: sample(quotes.filter(({ author }) => author !== "Donald Trump")).text,
          isTrumpQuote: false,
        });
      } catch (err) {
        console.log(err);
      }
    };
    const fetchTrumpQuote = async () => {
      try {
        const res = await fetch(
          'https://api.whatdoestrumpthink.com/api/v1/quotes/random/'
        );
        const { message } = await res.json();

        setQuote({
          quote: message,
          isTrumpQuote: true,
        });
      } catch (err) {
        console.log(err);
      }
    };
    const action = sample([fetchTrumpQuote, fetchRandomQuote]);
    action();
  }, [refetch]);

  return { quote, isTrumpQuote, getNewQuote };
}

export default useQuoteFetcher;