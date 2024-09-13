import { useEffect, useState } from 'react';

export default function useIP() {
  const [ip, setIp] = useState<string | null>(null);

  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await fetch('/api/weather');
        const data = await response.json();
        setIp(data.ip);
      } catch (error) {
        console.error('Ошибка при получении IP:', error);
        setIp('Ошибка при получении IP');
      } 
    };

    fetchIp();
  }, []);
  
  return { ip };
}
