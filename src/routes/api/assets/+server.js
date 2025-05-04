import { json } from '@sveltejs/kit';
import { getAllAssets, deleteAsset } from '$lib/api';

/**
 * Get all assets (admin only)
 */
export async function GET({ locals }) {
  const currentUser = locals.user;
  
  try {
    const assets = await getAllAssets(currentUser);
    return json(assets);
  } catch (error) {
    return json({ error: error.message }, { status: 401 });
  }
}

/**
 * Delete an asset (admin only)
 */
export async function DELETE({ request, locals }) {
  const currentUser = locals.user;
  const { asset_id } = await request.json();
  
  try {
    const result = await deleteAsset(asset_id, currentUser);
    return json({ success: result });
  } catch (error) {
    return json({ error: error.message }, { status: 401 });
  }
}
