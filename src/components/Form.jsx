// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from 'react';

import styles from './Form.module.css';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import BacakButton from './BacakButton';
import { useUrlPosition } from '../hooks/useUrlPosition';
import Message from './Message';
import Spinner from './Spinner';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useCities } from '../Contexts/CitiesContext';

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const { CreateCity } = useCities();
  const navigate = useNavigate();
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [lat, lng] = useUrlPosition();
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [geoCodingErrorMessage, setGeoCodingErrorMessage] = useState('');

  useEffect(() => {
    async function getCities() {
      try {
        setIsLoadingGeoCoding(true);
        setGeoCodingErrorMessage('');
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );
        const data = await res.json();

        if (!data.countryCode)
          throw new Error(
            "That doesn't seem to be a city. Click somewhere else 😞 "
          );
        setCityName(data.city || data.locality || '');
        setCountry(data.countryName);
      } catch (error) {
        setIsLoadingGeoCoding(false);
        setGeoCodingErrorMessage(error.message);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }
    getCities();
  }, [lat, lng]);

  // display spinner for show the data is loaded or not
  if (isLoadingGeoCoding) return <Spinner />;
  // dipslay the error message
  if (geoCodingErrorMessage) return <Message message={geoCodingErrorMessage} />;

  if (!lat && !lng)
    return (
      <Message message="👋 Add your first city by clicking on a city on the map" />
    );

  async function handleSubmit(e) {
    e.preventDefault();
    // add new city
    const newCity = {
      cityName,
      country,
      date,
      notes,
      position: { lat, lng },
      // id
    };
    await CreateCity(newCity);
    navigate('/app/cities');
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="YYY/MM/dd"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BacakButton />
      </div>
    </form>
  );
}

export default Form;
