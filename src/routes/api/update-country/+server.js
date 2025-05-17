import { json } from '@sveltejs/kit';
import { updateCountry } from '$lib/api';

export async function POST({ request, locals }) {
  const currentUser = locals.user;
  const { slug, title, content, teaser, featured_image, flag } = await request.json();
  const result = await updateCountry(slug, title, content, teaser, featured_image, flag, currentUser);
  return json({
    updatedAt: result.updated_at,
    slug: result.slug
  });
}
