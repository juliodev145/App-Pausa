// Substitui o localStorage do navegador pelo AsyncStorage do celular
import AsyncStorage from '@react-native-async-storage/async-storage';
import { emptyStats } from './utils/helpers';

const STATS_KEY = 'pausa_stats';
const MODES_KEY = 'pausa_custom_modes';

export async function loadStats() {
  try {
    const saved = await AsyncStorage.getItem(STATS_KEY);
    if (!saved) return emptyStats();

    const parsed = JSON.parse(saved);
    return {
      totalPauses: parsed.totalPauses ?? 0,
      importantMissed: parsed.importantMissed ?? 0,
      totalAbandonments: parsed.totalAbandonments ?? 0,
      months: parsed.months ?? {},
    };
  } catch {
    return emptyStats();
  }
}

export async function saveStats(stats) {
  try {
    await AsyncStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch {
    // se falhar, o app continua funcionando
  }
}

export async function loadModes() {
  try {
    const saved = await AsyncStorage.getItem(MODES_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export async function saveModes(modes) {
  try {
    await AsyncStorage.setItem(MODES_KEY, JSON.stringify(modes));
  } catch {
    // se falhar, o app continua funcionando
  }
}