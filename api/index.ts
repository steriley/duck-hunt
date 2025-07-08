import { put } from '@vercel/blob';
import { Hono } from 'hono';
import { handle } from 'hono/vercel';

export const config = {
  runtime: 'edge',
};

const app = new Hono().basePath('/api');

app.get('/', (c) => {
  return c.json({ message: 'from Hono!' });
});

app.post('/submit', async (c) => {
  // Parse multipart form data
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
});

export default handle(app);
