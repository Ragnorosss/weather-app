import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const city = url.searchParams.get('city');
  const days = url.searchParams.get('days') || '1'; // Значение по умолчанию 1 день
  const forwardedFor = req.headers.get('x-forwarded-for');
  const ip = forwardedFor?.split(',')[0]?.trim();
  //@typescript-eslint/no-explicit-any
  if (!city && !ip) {
    return NextResponse.json({ error: 'Не указан город или IP' }, { status: 400 });
  }

  const query = city || ip;
  const apiKey = process.env.ACCESS_TOKEN;

  if (!apiKey) {
    return NextResponse.json({ error: 'API ключ не найден' }, { status: 500 });
  }

  try {
    const weatherResponse = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${query}&days=${days}&aqi=yes`
    );

    if (!weatherResponse.ok) {
      throw new Error('Ошибка при получении данных из Weather API');
    }

    const weatherData = await weatherResponse.json();

    if (!weatherData || !weatherData.location || !weatherData.forecast) {
      throw new Error('Неверный формат данных от Weather API');
    }
    //@typescript-eslint/no-explicit-any
    return NextResponse.json(weatherData);
  } catch (error: any) {
    console.error('Ошибка:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
