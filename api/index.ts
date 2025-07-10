import { put } from '@vercel/blob';
import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { createClient } from 'redis';

import { type DuckSubmission } from '../common/types.js';

export const runtime = 'nodejs';

const app = new Hono().basePath('/api');
const REDIS_KEY = 'duck-hunt:';

async function saveToRedis(value: DuckSubmission): Promise<DuckSubmission | false> {
  try {
    const client = await createClient({ url: process.env.REDIS_URL }).connect();
    const key = REDIS_KEY + Date.now();

    await client.set(key, JSON.stringify(value));
    await client.quit();
    return value;
  } catch (error) {
    console.error('Error saving to Redis:', error);
    return false;
  }
}

app.get('/finds', async (c) => {
  try {
    const client = await createClient({ url: process.env.REDIS_URL }).connect();
    const keys = await client.keys(REDIS_KEY + '*');
    const finds = await Promise.all(
      keys.map(async (key: string) => {
        const value = await client.get(key);
        return { key, value: JSON.parse(value || '{}') as DuckSubmission };
      }),
    );
    await client.quit();
    return c.json(finds);
  } catch (error) {
    console.error('Error fetching finds:', error);
    return c.json({ error: 'Failed to fetch finds' }, 500);
  }
});

app.post('/submit', async (c) => {
  try {
    const formData = await c.req.formData();

    const dateTime = formData.get('dateTime');
    const dayOfWeek = formData.get('dayOfWeek');
    const deck = formData.get('deck');
    const duckId = formData.get('duckId');
    const finderName = formData.get('finderName');
    const hourOfDay = formData.get('hourOfDay');
    const photo = formData.get('photo');
    const quarterOfHour = formData.get('quarterOfHour');
    const section = formData.get('section');
    const story = formData.get('story');

    let blob: any = null;
    let url = null;
    let downloadUrl = null;
    if (photo && typeof photo === 'object' && 'arrayBuffer' in photo) {
      blob = await put(photo.name, photo, { access: 'public', addRandomSuffix: true });
      if (blob) {
        url = blob.url;
        downloadUrl = blob.downloadUrl;
      }
    }

    const data = {
      dateTime,
      dayOfWeek,
      deck,
      downloadUrl,
      duckId,
      finderName,
      hourOfDay,
      quarterOfHour,
      section,
      story,
      url,
    } as DuckSubmission;

    await saveToRedis(data);

    return c.json(data);
  } catch (error) {
    console.error('Error processing form data:', error);
    return c.json({ error: 'Failed to process form data' }, 500);
  }
});

export const GET = handle(app);
export const POST = handle(app);
