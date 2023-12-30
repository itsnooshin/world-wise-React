import styles from './CityItem.module.css';
import { Link } from 'react-router-dom';

function CityItem({ cities }) {
  const date = new Date(cities.date);
  const newDate = date.toLocaleString('defualt', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  console.log(cities.position.lng);
  const {emoji , cityName , position  } = cities

  return (
    <li>
      <Link
        className={styles.cityItem}
        to={`${cities.id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({newDate})</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
