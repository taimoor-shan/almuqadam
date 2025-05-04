/**
 * This file provides utilities for storing assets in PostgreSQL
 * It includes optimizations and best practices for handling binary data
 */

import { query, queryOne } from '$lib/db';
import { Blob } from 'node:buffer';

/**
 * Store an asset in the PostgreSQL database
 * This function is optimized for handling binary data in PostgreSQL
 * 
 * @param {string} asset_id - The unique identifier for the asset
 * @param {File} file - The file object to store
 * @returns {Promise<void>}
 */
export async function storeAssetInDatabase(asset_id, file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Use prepared statement with binary data
    await query(
      `INSERT INTO assets (asset_id, mime_type, updated_at, size, data)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (asset_id) DO UPDATE
       SET mime_type = EXCLUDED.mime_type,
           updated_at = EXCLUDED.updated_at,
           size = EXCLUDED.size,
           data = EXCLUDED.data`,
      [asset_id, file.type, new Date().toISOString(), file.size, buffer]
    );

    console.log(`Asset ${asset_id} stored successfully (${file.size} bytes)`);
  } catch (error) {
    console.error('Error storing asset in database:', error);
    throw new Error(`Failed to store asset: ${error.message}`);
  }
}

/**
 * Retrieve an asset from the PostgreSQL database
 * 
 * @param {string} asset_id - The unique identifier for the asset
 * @returns {Promise<Object|null>} - The asset object or null if not found
 */
export async function getAssetFromDatabase(asset_id) {
  try {
    const row = await queryOne(
      `SELECT asset_id, mime_type, updated_at, size, data
       FROM assets
       WHERE asset_id = $1`,
      [asset_id]
    );

    if (!row) return null;

    return {
      filename: row.asset_id.split('/').slice(-1)[0],
      mimeType: row.mime_type,
      lastModified: row.updated_at,
      size: row.size,
      data: new Blob([row.data], { type: row.mime_type })
    };
  } catch (error) {
    console.error('Error retrieving asset from database:', error);
    return null;
  }
}

/**
 * Delete an asset from the PostgreSQL database
 * 
 * @param {string} asset_id - The unique identifier for the asset
 * @returns {Promise<boolean>} - True if the asset was deleted, false otherwise
 */
export async function deleteAssetFromDatabase(asset_id) {
  try {
    const result = await query(
      'DELETE FROM assets WHERE asset_id = $1',
      [asset_id]
    );
    
    return result.rowCount > 0;
  } catch (error) {
    console.error('Error deleting asset from database:', error);
    return false;
  }
}

/**
 * List all assets in the database
 * 
 * @returns {Promise<Array>} - Array of asset metadata (without the binary data)
 */
export async function listAssets() {
  try {
    const result = await query(
      `SELECT asset_id, mime_type, updated_at, size
       FROM assets
       ORDER BY updated_at DESC`
    );
    
    return result.rows;
  } catch (error) {
    console.error('Error listing assets:', error);
    return [];
  }
}

// Export the default functions that match the original API
export default {
  storeAsset: storeAssetInDatabase,
  getAsset: getAssetFromDatabase,
  deleteAsset: deleteAssetFromDatabase,
  listAssets
};
