import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import {
  Pause,
  Utensils,
  BookOpen,
  Clock,
  SlidersHorizontal,
  CalendarDays,
  ChevronRight,
} from 'lucide-react-native';
import { colors, fonts } from '../theme/theme';

// Cartão de modo (Refeição, Estudo, modos salvos e Personalizado)
function ModeCard({ Icon, title, subtitle, onPress, highlighted }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.modeCard,
        highlighted && styles.modeCardHighlighted,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.modeIcon}>
        <Icon
          size={20}
          color={highlighted ? colors.primaryForeground : colors.primary}
        />
      </View>
      <Text
        style={[styles.modeTitle, highlighted && styles.textWhite]}
        numberOfLines={1}
      >
        {title}
      </Text>
      <Text
        style={[styles.modeSubtitle, highlighted && styles.textWhiteSoft]}
      >
        {subtitle}
      </Text>
    </Pressable>
  );
}

export default function Home({
  activeDayCount,
  monthlyGoal,
  progress,
  remainingDays,
  savedModes,
  completedPauses,
  onStartPause,
  onOpenSelect,
  onOpenHistory,
}) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <View style={styles.logo}>
          <Pause
            size={32}
            color={colors.primary}
            fill={colors.primary}
            strokeWidth={1}
          />
        </View>
        <Text style={styles.title}>Pausa</Text>
        <Text style={styles.subtitle}>
          Desconecte-se aos poucos, no seu tempo.
        </Text>
      </View>

      {/* Meta do mês */}
      <View style={styles.goalSection}>
        <View style={styles.goalRow}>
          <View>
            <Text style={styles.label}>Meta do mês</Text>
            <Text style={styles.goalText}>
              <Text style={styles.goalNumber}>{activeDayCount}</Text>
              <Text style={styles.goalSmall}> de {monthlyGoal} dias</Text>
            </Text>
          </View>
          <Text style={styles.percent}>{Math.round(progress)}%</Text>
        </View>

        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>

        <Text style={styles.goalMessage}>
          {activeDayCount >= monthlyGoal
            ? 'Meta alcançada. Sua constância fez a diferença.'
            : `${remainingDays} ${
                remainingDays === 1 ? 'dia' : 'dias'
              } para celebrar esta conquista.`}
        </Text>
      </View>

      {/* Modos */}
      <View style={styles.modesSection}>
        <Text style={[styles.label, { marginBottom: 12 }]}>
          Escolha seu modo
        </Text>

        <View style={styles.grid}>
          <ModeCard
            Icon={Utensils}
            title="Refeição"
            subtitle="30 minutos"
            onPress={() => onStartPause(30, 'Refeição')}
          />
          <ModeCard
            Icon={BookOpen}
            title="Estudo"
            subtitle="50 minutos"
            onPress={() => onStartPause(50, 'Estudo')}
          />

          {savedModes.map((mode) => (
            <ModeCard
              key={mode.id}
              Icon={Clock}
              title={mode.theme}
              subtitle={`${mode.minutes} ${
                mode.minutes === 1 ? 'minuto' : 'minutos'
              }`}
              onPress={() => onStartPause(mode.minutes, mode.theme)}
            />
          ))}

          <ModeCard
            Icon={SlidersHorizontal}
            title="Personalizado"
            subtitle="Tema e tempo"
            onPress={onOpenSelect}
            highlighted
          />
        </View>

        {/* Histórico */}
        <Pressable
          onPress={onOpenHistory}
          style={({ pressed }) => [styles.historyButton, pressed && styles.pressed]}
        >
          <View style={styles.historyIcon}>
            <CalendarDays size={20} color={colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.historyTitle}>Seu histórico</Text>
            <Text style={styles.historySubtitle}>
              {completedPauses} pausas em {activeDayCount} dias
            </Text>
          </View>
          <ChevronRight size={20} color={colors.mutedForeground} />
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 28,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 22,
    backgroundColor: colors.primary10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontFamily: fonts.semibold,
    fontSize: 36,
    color: colors.foreground,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 24,
    color: colors.mutedForeground,
    textAlign: 'center',
    maxWidth: 230,
    marginTop: 8,
  },
  goalSection: {
    marginTop: 36,
  },
  goalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  label: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: colors.mutedForeground,
  },
  goalText: {
    marginTop: 4,
    color: colors.secondaryForeground,
  },
  goalNumber: {
    fontFamily: fonts.semibold,
    fontSize: 24,
  },
  goalSmall: {
    fontFamily: fonts.regular,
    fontSize: 14,
  },
  percent: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.primary,
  },
  progressTrack: {
    height: 12,
    width: '100%',
    borderRadius: 999,
    backgroundColor: colors.secondary,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
  goalMessage: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.mutedForeground,
    marginTop: 12,
  },
  modesSection: {
    marginTop: 28,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
  modeCard: {
    width: '48%',
    padding: 16,
    borderRadius: 24,
    backgroundColor: colors.secondary45,
    borderWidth: 1,
    borderColor: colors.secondary60,
  },
  modeCardHighlighted: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  modeIcon: {
    marginBottom: 12,
  },
  modeTitle: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: colors.secondaryForeground,
  },
  modeSubtitle: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.mutedForeground,
    marginTop: 2,
  },
  textWhite: {
    color: colors.primaryForeground,
  },
  textWhiteSoft: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  historyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 16,
    padding: 16,
    borderRadius: 24,
    backgroundColor: colors.secondary40,
    borderWidth: 1,
    borderColor: colors.secondary60,
  },
  historyIcon: {
    width: 40,
    height: 40,
    borderRadius: 16,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyTitle: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: colors.secondaryForeground,
  },
  historySubtitle: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.mutedForeground,
    marginTop: 2,
  },
});