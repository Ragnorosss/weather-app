import WeatherComponent from '@/components/Banner/Banner-main';

interface CityPageProps {
  params: { city: string };
}

const CityPage = ({ params }: CityPageProps) => {
  const { city } = params;

  return (
    <div>
      <h1>Погода в городе: {city}</h1>
      <WeatherComponent cityName={city as string} />  {/* Передаем город в компонент */}

    </div>
  );
};

export default CityPage;
