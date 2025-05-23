import { json } from '@sveltejs/kit';
import { createCountry } from '$lib/api';

export async function POST({ request, locals }) {
  const currentUser = locals.user;
  const { title, content, teaser, featured_image, flag } = await request.json();
  const { slug } = await createCountry(title, content, teaser, featured_image, flag, currentUser);
  return json({ slug });
}
