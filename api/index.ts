import { put } from '@vercel/blob';
import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { createClient } from 'redis';

export const runtime = 'nodejs';

const app = new Hono().basePath('/api');

async function saveToRedis(key: string, value: unknown) {
  try {
    const client = await createClient({ url: process.env.REDIS_URL }).connect();

    await client.set(key, JSON.stringify(value));
    const storedValue = await client.get(key);

    await client.quit();

    return storedValue;
  } catch (error) {
    console.error('Error saving to Redis:', error);
    return null;
  }
}

app.get('/', (c) => {
  return c.json({ message: 'from Hono!' });
});

app.post('/save', async (c) => {
  const { key, value } = await c.req.json();
  if (!key || !value) {
    return c.json({ error: 'Key and value are required' }, 400);
  }
  const savedValue = await saveToRedis(key, value);
  return c.json({ key, value: savedValue });
});

app.get('/finds', async (c) => {
  try {
    const client = await createClient({ url: process.env.REDIS_URL }).connect();
    const keys = await client.keys('duck-hunt:*');
    const finds = await Promise.all(
      keys.map(async (key) => {
        const value = await client.get(key);
        return { key, value: JSON.parse(value || '{}') };
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
    const photo = formData.get('photo');
    const duckId = formData.get('duckId');
    const finderName = formData.get('finderName');
    const dateTime = formData.get('dateTime');
    const deck = formData.get('deck');
    const section = formData.get('section');
    const story = formData.get('story');

    let blob: any = null;
    let url = null;
    let downloadUrl = null;
    if (photo && typeof photo === 'object' && 'arrayBuffer' in photo) {
      blob = await put(photo.name, photo, { access: 'public' });
      if (blob) {
        url = blob.url;
        downloadUrl = blob.downloadUrl;
      }
    }

    // Here you can process the data as needed, e.g., save to a database
    return c.json({
      data: {
        duckId,
        finderName,
        dateTime,
        deck,
        section,
        story,
      },
      url,
      downloadUrl,
    });
  } catch (error) {
    console.error('Error processing form data:', error);
    return c.json({ error: 'Failed to process form data' }, 500);
  }
});

export const GET = handle(app);
export const POST = handle(app);
