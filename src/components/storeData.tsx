// storeData.tsx
import countries from '../json/countries.json';
import occupations from '../json/occupations.json';

export const storeData = () => {
    localStorage.setItem('countries', JSON.stringify(countries));
    localStorage.setItem('occupations', JSON.stringify(occupations));
};

export const handleOccupation = (
  searchTerm: string,
  enrolment: Record<string, any>,
  setEnrolment: (value: Record<string, any>) => void
): [string, string][] => {
  const updated = { ...enrolment, occupation: searchTerm };
  setEnrolment(updated);
  localStorage.setItem("enrolment", JSON.stringify(updated));

  const storedOccupations = JSON.parse(localStorage.getItem("occupations") || "{}");

  return Object.entries(storedOccupations)
    .filter(([_, val]) => typeof val === "string" && val.toLowerCase().includes(searchTerm.toLowerCase()))
    .map(([key, val]) => [key, val as string]);
};

