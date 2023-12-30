import CountryItem from './CountryItem';
import styles from './CountryList.module.css';
import Spinner from './Spinner';
import Message from './Message';
function CountryList({ cities, isLoading }) {
  if (isLoading) {
    return <Spinner />;
  }
  if (!cities.length)
    return (
      <Message message=" Add your first city by clicking on a city on the map" />
    );

  // console.log(map); //  ['Portugal', 'Spain', 'Germany', 'Spain']
  //   const countries = cities.reduce((arr, city) => {
  //     const country = arr.map(el => el.country);

  //     if (!country.includes(city.country)) {
  //       arr.push({ country: city.country, emoji: city.emoji });
  //     }
  //     return arr;
  //   }, []);

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    }
    return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.id} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
