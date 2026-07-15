/**
 * Merges two arrays of products, removing duplicates based on product.id
 * Uses a Map for O(n) time complexity.
 * 
 * @param {Array} listA - First list of products
 * @param {Array} listB - Second list of products
 * @returns {Array} - The merged list without duplicates
 */
export function mergeWishlists(listA, listB) {
  const map = new Map();

  // Add all items from listA
  for (const item of listA) {
    if (!map.has(item.id)) {
      map.set(item.id, item);
    }
  }

  // Add items from listB, skipping those already in map
  for (const item of listB) {
    if (!map.has(item.id)) {
      map.set(item.id, item);
    }
  }

  // Return the merged values as an array
  return Array.from(map.values());
}
