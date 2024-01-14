import { useCities } from '../Contexts/CitiesContext';
import styles from './CityItem.module.css';
import { Link } from 'react-router-dom';

function CityItem({ cities }) {
  const { currentCity, DeleteCity } = useCities();

  const date = new Date(cities.date);
  const newDate = date.toLocaleString('defualt', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const { emoji, cityName, position, id } = cities;
  function handleDelete(e) {
    e.preventDefault();
    DeleteCity(id);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles['cityItem--active'] : ''
        } `}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({newDate})</time>
        <button className={styles.deleteBtn} onClick={handleDelete}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
