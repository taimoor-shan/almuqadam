import { json } from '@sveltejs/kit';
import { deleteCountry } from '$lib/api';

export async function POST({ request, locals }) {
  const currentUser = locals.user;
  const { slug } = await request.json();
  await deleteCountry(slug, currentUser);
  return json({ success: true });
}
