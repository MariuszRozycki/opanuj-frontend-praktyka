import { useState } from 'react';
import { Country } from '../types/Country';

type GuessingFormProps = {
  country: Country;
  fetchRandomCountry: () => void;
};

function GuessingForm({ country, fetchRandomCountry }: GuessingFormProps) {
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');

  const checkGuess = () => {
    if (guess.toLowerCase() === country.name.common.toLowerCase()) {
      setMessage('Correct!');
    } else {
      setMessage('Incorrect, try again.');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col">
        <img src={country.flags.png} alt={`${country.name.common} flag`} />
        <input
          type="text"
          placeholder="Guess the country"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        />
      </div>
      <button onClick={checkGuess}>Check</button>
      <button onClick={fetchRandomCountry}>Randomize Again</button>
      <p>{message}</p>
    </div>
  );
};

export default GuessingForm;
