import { createContext, useContext, useEffect, useState } from 'react';

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:9001/cities`);
        const data = await response.json();
        setCities(data);
      } catch (error) {
        alert(`There was an error loading data ${error}`);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:9001/cities/${id}`);
      const data = await response.json();
      setCurrentCity(data);
    } catch (error) {
      alert('There was an error loading data');
    } finally {
      setIsLoading(false);
    }
  }

  async function CreateCity(newCity) {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:9001/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setCities((cities) => [...cities, data]);
    } catch (error) {
      alert('Error creating city:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function DeleteCity(id) {
    try {
      setIsLoading(true);
      await fetch(`http://localhost:9001/cities/${id}`, {
        method: 'DELETE',
      });

      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (error) {
      alert('There was a error with Deleteing city');
    } finally {
      setIsLoading(false);
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
  if (context === undefined) throw new Error('This is a error');
  return context;
}

export { CitiesProvider, CitiesContext, useCities };
