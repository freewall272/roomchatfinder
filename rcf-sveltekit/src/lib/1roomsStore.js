// src/lib/roomsStore.js
import { writable, derived } from 'svelte/store';

export const rooms = writable([]);
export const tags = writable([]);
export const loading = writable(false);
export const selectedGender = writable('f'); // default: female
export const selectedTag = writable(null);

const allowedTags = [
  "alt","anal","asian","ass","blonde","bigtits","brunette","cosplay","curvy","english","feet",
  "deepthroat","fuckmachine","goth","halloween","latina","lesbian","love","new","petite","pussy",
  "teen","tattoos","pawg","redhead","milf","18","solo","tattoo","piercing","fit","cosplay",
  "gaming","lingerie","yoga"
];

export async function fetchRooms() {
  loading.set(true);
  try {
    const res = await fetch('https://api.dimecams.com/api/rooms');
    const data = await res.json();
    const results = data.results || [];
    rooms.set(results);

    // collect tags globally
    const set = new Set();
    results.forEach(r => {
      r.tags?.forEach(tag => {
        const lower = tag.toLowerCase();
        if (allowedTags.includes(lower)) set.add(tag);
      });
    });
    tags.set(Array.from(set).sort((a, b) => a.localeCompare(b)));
  } catch (err) {
    console.error('❌ Failed to fetch rooms:', err);
  } finally {
    loading.set(false);
  }
}

// 🔍 Derived store that filters by both gender + tag
export const filteredRooms = derived(
  [rooms, selectedGender, selectedTag],
  ([$rooms, $selectedGender, $selectedTag]) => {
    return $rooms.filter((r) => {
      const genderMatch = !$selectedGender || r.gender === $selectedGender;
      const tagMatch =
        !$selectedTag ||
        (r.tags && r.tags.some((t) => t.toLowerCase() === $selectedTag.toLowerCase()));
      return genderMatch && tagMatch;
    });
  }
);
