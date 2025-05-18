import { writable } from 'svelte/store';

// Legacy stores for backward compatibility
export const activeEditorView = writable(null);
export const isEditing = writable(false);
export const currentUser = writable(null);

// Global contact information stores
export const globalPhone = writable('');
export const globalEmail = writable('');
export const globalAddress = writable('');
