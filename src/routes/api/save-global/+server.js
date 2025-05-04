import { json } from '@sveltejs/kit';
import { createOrUpdatePage } from '$lib/api';

export async function POST({ request, locals }) {
  const currentUser = locals.user;
  const { globalData } = await request.json();
  await createOrUpdatePage('global', globalData, currentUser);
  return json({ status: 'ok' });
}
