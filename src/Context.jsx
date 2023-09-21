import { createContext, useState, useEffect } from 'react';

export const Context = createContext();

export function Provider({ children }) {
  const [fotos, setFotos] = useState([]);

  const getData = async () => {
    const res = await fetch('/fotos.json');
    const data = await res.json();
    const photos = data.photos.map((photos) => {
      return {
        id: photos.id,
        src: photos.src.tiny,
        alt: photos.alt,
        liked: false,
      };
    });

    setFotos(photos);
  };

  useEffect(() => {
    getData();
  }, []);

  const globalState = { fotos, setFotos };

  return <Context.Provider value={globalState}> {children} </Context.Provider>;
}