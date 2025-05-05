import { getPage } from '$lib/api';

/**
 * Get global data for the website
 * @returns {Promise<Object>} Global data object
 */
export async function getGlobalData() {
  return await getPage('global');
}
