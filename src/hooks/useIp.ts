import { useEffect, useState } from 'react';

export default function useIP() {
  const [ip, setIp] = useState<string | null>(null);

  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await fetch('/api/weather');
        const data = await response.json();
        
        if (data.ip) {
          setIp(data.ip);
        } else {
          setIp('IP не найден');
        }
      } catch (error) {
        console.error('Ошибка при получении IP:', error);
        setIp('Ошибка при получении IP');
      }
    };

    fetchIp();
  }, []);

  return { ip };
}
