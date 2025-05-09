// storeData.tsx
import countries from '../json/countries.json';
import occupations from '../json/occupations.json';

export const storeData = () => {
    localStorage.setItem('countries', JSON.stringify(countries));
    localStorage.setItem('occupations', JSON.stringify(occupations));
};