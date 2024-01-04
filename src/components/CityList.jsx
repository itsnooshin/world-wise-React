import styles from './CityList.module.css';
import Spinner from './Spinner';
import CityItem from './CityItem';
import Message from './Message';
import { useContext } from 'react';
import { CitiesContext } from '../Contexts/CitiesContext';

function CityList() {
  const { isLoading, cities } = useContext(CitiesContext);


  if (isLoading) {
    return <Spinner />;
  }
  if (!cities.length)
    return (
      <Message message=" Add your first city by clicking on a city on the map" />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem cities={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
