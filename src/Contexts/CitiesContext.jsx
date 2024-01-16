import { createContext, useContext, useEffect, useReducer } from 'react';

const CitiesContext = createContext();
const initalState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
};
function reducer(state, active) {
  switch (active.type) {
    case 'loading':
      return { ...state, isLoading: true };
    case 'cities/loaded':
      return { ...state, isLoading: false, cities: active.playLoad };
    case 'city/loaded':
      return { ...state, isLoading: false, currentCity: active.playLoad };
    case 'cities/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, active.playLoad],
        currentCity: active.playLoad,
      };
    case 'cities/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== active.playLoad),
        currentCity: {},
      };
    case 'rejected':
      return { ...state, isLoading: false, error: active.playLoad };
    default: {
      throw new Error('Unknown Action ');
    }
  }
}

function CitiesProvider({ children }) {
  // refactor to useReducer

  const [state, dispatch] = useReducer(reducer, initalState);
  const { cities, isLoading, currentCity } = state;

  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      try {
        // setIsLoading(true);
        dispatch({ type: 'loading' });
        const response = await fetch(`http://localhost:9001/cities`);
        const data = await response.json();
        // setCities(data);
        dispatch({ type: 'cities/loaded', playLoad: data });
      } catch (error) {
        dispatch({
          type: 'rejected',
          playLoad: 'There was an error loading data...',
        });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      // setIsLoading(true);
      dispatch({ type: 'loading' });
      const response = await fetch(`http://localhost:9001/cities/${id}`);
      const data = await response.json();
      // setCurrentCity(data);
      dispatch({ type: 'city/loaded', playLoad: data });
    } catch (error) {
      alert('There was an error loading data');
    }
  }

  async function CreateCity(newCity) {
    try {
      dispatch({ type: 'loading' });
      const response = await fetch(`http://localhost:9001/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      // setCities((cities) => [...cities, data]);
      dispatch({ type: 'cities/created', playLoad: data });
    } catch (error) {
      dispatch({
        type: 'rejected',
        playLoad: 'There was an error Creating cities...',
      });
    }
  }

  async function DeleteCity(id) {
    try {
      dispatch({ type: 'loading' });
      await fetch(`http://localhost:9001/cities/${id}`, {
        method: 'DELETE',
      });
      // setCities((cities) => cities.filter((city) => city.id !== id));
      dispatch({ type: 'cities/deleted', playLoad: id });
    } catch (error) {
      dispatch({
        type: 'rejected',
        playLoad: 'There was an error loading the city...',
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        CreateCity,
        DeleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) throw new Error('This is a no context...');
  return context;
}

export { CitiesProvider, CitiesContext, useCities };
