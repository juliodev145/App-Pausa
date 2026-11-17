import { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  useFonts,
  Outfit_300Light,
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_600SemiBold,
} from '@expo-google-fonts/outfit';

import { colors } from './src/theme/theme';
import { loadStats, saveStats, loadModes, saveModes } from './src/storage';
import {
  getMonthKey,
  getDayKey,
  getMonthName,
  emptyMonth,
  emptyStats,
} from './src/utils/helpers';

import Home from './src/screens/Home';
// import SelectScreen from './src/screens/SelectScreen';
// import TimerScreen from './src/screens/TimerScreen';
// import FeedbackScreen from './src/screens/FeedbackScreen';
// import HistoryScreen from './src/screens/HistoryScreen';

const DEFAULT_MINUTES = 15;
const MIN_MINUTES = 1;
const MAX_MINUTES = 180;

const TIPS = [
  "Beba um copo d'água",
  'Estique seu corpo',
  'Respire fundo por 3 vezes',
  'Observe algo ao seu redor com calma',
];

export default function App() {
  const [fontsLoaded] = useFonts({
    Outfit_300Light,
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_600SemiBold,
  });

  // "home" | "select" | "timer" | "feedback" | "history"
  const [state, setState] = useState('home');
  const [timeLeft, setTimeLeft] = useState(0);
  const [endTime, setEndTime] = useState(null);
  const [selectedMinutes, setSelectedMinutes] = useState(DEFAULT_MINUTES);
  const [customTheme, setCustomTheme] = useState('');
  const [activeTheme, setActiveTheme] = useState('Pausa');
  const [savedModes, setSavedModes] = useState([]);
  const [isExitConfirmationOpen, setIsExitConfirmationOpen] = useState(false);
  const [stats, setStats] = useState(emptyStats());
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTip, setCurrentTip] = useState(TIPS[0]);

  // ---------- Cálculos do mês (iguais ao protótipo) ----------
  const today = new Date();
  const monthKey = getMonthKey(today);
  const monthlyGoal = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0,
  ).getDate();
  const monthActivity = { ...emptyMonth(), ...stats.months[monthKey] };
  const activeDayCount = monthActivity.activeDays.length;
  const progress = Math.min((activeDayCount / monthlyGoal) * 100, 100);
  const remainingDays = Math.max(monthlyGoal - activeDayCount, 0);
  const monthName = getMonthName(today);

  // ---------- 1) Carrega os dados salvos ao abrir o app ----------
  useEffect(() => {
    async function load() {
      const [savedStats, modes] = await Promise.all([loadStats(), loadModes()]);

      // conta +1 abertura do app neste mês
      const currentMonth = { ...emptyMonth(), ...savedStats.months[monthKey] };
      savedStats.months[monthKey] = {
        ...currentMonth,
        opens: currentMonth.opens + 1,
      };

      setStats(savedStats);
      setSavedModes(modes);
      setIsLoaded(true);
    }
    load();
  }, []);

  // ---------- 2) Salva sempre que mudar (só depois de carregar) ----------
  useEffect(() => {
    if (isLoaded) saveStats(stats);
  }, [stats, isLoaded]);

  useEffect(() => {
    if (isLoaded) saveModes(savedModes);
  }, [savedModes, isLoaded]);

  // ---------- 3) Cronômetro baseado na hora de término ----------
  useEffect(() => {
    if (state !== 'timer' || endTime === null) return;

    const tick = () => {
      const seconds = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
      setTimeLeft(seconds);
      if (seconds === 0) {
        setIsExitConfirmationOpen(false);
        setState('feedback');
      }
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [state, endTime]);

  // ---------- 4) Sorteia uma dica ao iniciar a pausa ----------
  useEffect(() => {
    if (state === 'timer') {
      setCurrentTip(TIPS[Math.floor(Math.random() * TIPS.length)]);
    }
  }, [state]);

  // ---------- Ações ----------
  const updateMinutes = (minutes) => {
    setSelectedMinutes(
      Math.min(Math.max(minutes || MIN_MINUTES, MIN_MINUTES), MAX_MINUTES),
    );
  };

  const startPause = (
    minutes = selectedMinutes,
    theme = customTheme.trim() || 'Pausa personalizada',
  ) => {
    setTimeLeft(minutes * 60);
    setEndTime(Date.now() + minutes * 60 * 1000);
    setActiveTheme(theme);
    setIsExitConfirmationOpen(false);
    setState('timer');
  };

  const startCustomPause = () => {
    const theme = customTheme.trim();
    if (!theme) return;

    const newMode = {
      id: `${Date.now()}`,
      theme,
      minutes: selectedMinutes,
    };

    setSavedModes((previous) => [
      newMode,
      ...previous.filter(
        (mode) =>
          mode.theme.toLowerCase() !== theme.toLowerCase() ||
          mode.minutes !== selectedMinutes,
      ),
    ]);
    startPause(selectedMinutes, theme);
  };

  const handleFeedback = (missedSomething) => {
    const dayKey = getDayKey();

    setStats((previous) => {
      const currentMonth = { ...emptyMonth(), ...previous.months[monthKey] };
      const activeDays = currentMonth.activeDays.includes(dayKey)
        ? currentMonth.activeDays
        : [...currentMonth.activeDays, dayKey];

      return {
        ...previous,
        totalPauses: previous.totalPauses + 1,
        importantMissed: previous.importantMissed + (missedSomething ? 1 : 0),
        months: {
          ...previous.months,
          [monthKey]: {
            ...currentMonth,
            completedPauses: currentMonth.completedPauses + 1,
            importantMissed:
              currentMonth.importantMissed + (missedSomething ? 1 : 0),
            activeDays,
          },
        },
      };
    });
    setState('home');
  };

  const confirmEarlyExit = () => {
    setStats((previous) => {
      const currentMonth = { ...emptyMonth(), ...previous.months[monthKey] };

      return {
        ...previous,
        totalAbandonments: previous.totalAbandonments + 1,
        months: {
          ...previous.months,
          [monthKey]: {
            ...currentMonth,
            abandonedPauses: currentMonth.abandonedPauses + 1,
          },
        },
      };
    });
    setIsExitConfirmationOpen(false);
    setEndTime(null);
    setTimeLeft(0);
    setState('home');
  };

  // ---------- Tela de carregamento ----------
  if (!fontsLoaded || !isLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // ---------- Telas ----------
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />

        <View style={styles.card}>
          {state === 'home' && (
            <Home
              activeDayCount={activeDayCount}
              monthlyGoal={monthlyGoal}
              progress={progress}
              remainingDays={remainingDays}
              savedModes={savedModes}
              completedPauses={monthActivity.completedPauses}
              onStartPause={startPause}
              onOpenSelect={() => setState('select')}
              onOpenHistory={() => setState('history')}
            />
          )}

          {/* AS OUTRAS TELAS ENTRAM AQUI NAS PRÓXIMAS ETAPAS
          {state === 'select' && (
            <SelectScreen
              customTheme={customTheme}
              onChangeTheme={setCustomTheme}
              selectedMinutes={selectedMinutes}
              onChangeMinutes={updateMinutes}
              minMinutes={MIN_MINUTES}
              maxMinutes={MAX_MINUTES}
              onStart={startCustomPause}
              onBack={() => setState('home')}
            />
          )}

          {state === 'timer' && (
            <TimerScreen
              activeTheme={activeTheme}
              timeLeft={timeLeft}
              currentTip={currentTip}
              isExitConfirmationOpen={isExitConfirmationOpen}
              onOpenExit={() => setIsExitConfirmationOpen(true)}
              onCloseExit={() => setIsExitConfirmationOpen(false)}
              onConfirmExit={confirmEarlyExit}
            />
          )}

          {state === 'feedback' && (
            <FeedbackScreen onAnswer={handleFeedback} />
          )}

          {state === 'history' && (
            <HistoryScreen
              monthName={monthName}
              monthActivity={monthActivity}
              activeDayCount={activeDayCount}
              monthlyGoal={monthlyGoal}
              remainingDays={remainingDays}
              totalPauses={stats.totalPauses}
              onBack={() => setState('home')}
            />
          )}
          */}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  card: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
});