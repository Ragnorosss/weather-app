export type WeatherDataCurrent = {
    location: {
      name: string;
      region: string;
      country: string;
      localtime: string;
    };
    current: {
      temp_c: number;
      condition: {
        text: string;
        icon: string;
      };
      wind_kph: number;
      humidity: number;
      feelslike_c: number;
      air_quality: {
        co: number;
        no2: number;
        o3: number;
      };
    };
    forecast?: {
      forecastday: Array<{
        date: string;
        day: {
          maxtemp_c: number;
          mintemp_c: number;
          avgtemp_c: number;
          condition: {
            text: string;
            icon: string;
          };
        };
      }>;
    };
  }
  