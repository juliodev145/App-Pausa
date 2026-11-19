import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { ArrowLeft, LogOut, Sparkles, ShieldCheck } from 'lucide-react-native';
import { colors, fonts } from '../theme/theme';

export default function History({
  monthName,
  monthActivity,
  activeDayCount,
  monthlyGoal,
  remainingDays,
  totalPauses,
  onBack,
}) {
  const { opens, completedPauses, abandonedPauses, importantMissed } =
    monthActivity;

  const missedText =
    completedPauses === 0
      ? 'Conclua sua primeira pausa para acompanhar essa percepção durante a meta.'
      : `Em ${completedPauses} ${
          completedPauses === 1 ? 'pausa concluída' : 'pausas concluídas'
        }, ${
          importantMissed === 0
            ? 'nenhuma coisa importante foi perdida'
            : `${importantMissed} ${
                importantMissed === 1
                  ? 'coisa importante foi perdida'
                  : 'coisas importantes foram perdidas'
              }`
        }.`;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Botão voltar */}
      <Pressable onPress={onBack} style={styles.backButton} hitSlop={8}>
        <ArrowLeft size={20} color={colors.mutedForeground} />
      </Pressable>

      {/* Título */}
      <View style={styles.header}>
        <Text style={styles.label}>{monthName}</Text>
        <Text style={styles.title}>Seu mês em pausa</Text>
      </View>

      {/* Dois cartões lado a lado */}
      <View style={styles.row}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{opens}</Text>
          <Text style={styles.statText}>vezes que você abriu o Pausa</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{completedPauses}</Text>
          <Text style={styles.statText}>pausas concluídas neste mês</Text>
        </View>
      </View>

      {/* Saídas conscientes */}
      <View style={styles.exitCard}>
        <View style={styles.smallIcon}>
          <LogOut size={20} color={colors.mutedForeground} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.exitTitle}>Saídas conscientes</Text>
          <Text style={styles.mutedText}>
            {abandonedPauses}{' '}
            {abandonedPauses === 1
              ? 'pausa encerrada antes da hora'
              : 'pausas encerradas antes da hora'}
          </Text>
        </View>
      </View>

      {/* Dias de uso consciente */}
      <View style={styles.highlightCard}>
        <View style={styles.sparkIcon}>
          <Sparkles size={24} color={colors.primary} />
        </View>
        <Text style={styles.bigNumber}>{activeDayCount}</Text>
        <Text style={styles.highlightTitle}>dias de uso consciente</Text>
        <Text style={[styles.mutedText, styles.highlightText]}>
          {activeDayCount >= monthlyGoal
            ? `Vitória! Você fez uma pausa em cada um dos ${monthlyGoal} dias do mês. Sua persistência virou um hábito.`
            : `Persistência se constrói aos poucos. Continue: faltam ${remainingDays} ${
                remainingDays === 1 ? 'dia' : 'dias'
              } para sua meta.`}
        </Text>
      </View>

      {/* Perdeu algo importante? */}
      <View style={styles.missedCard}>
        <View style={[styles.smallIcon, { backgroundColor: colors.primary10 }]}>
          <ShieldCheck size={20} color={colors.primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.missedTitle}>Você perdeu algo importante?</Text>
          <Text style={[styles.mutedText, { lineHeight: 22 }]}>
            {missedText}
          </Text>
        </View>
      </View>

      {/* Total */}
      <Text style={styles.footer}>
        No total, você já concluiu{' '}
        <Text style={styles.footerBold}>{totalPauses} pausas</Text>.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 28,
    paddingBottom: 32,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 28,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  header: {
    alignItems: 'center',
    marginTop: 64,
    marginBottom: 32,
  },
  label: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: colors.mutedForeground,
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: 30,
    color: colors.foreground,
    marginTop: 8,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 20,
    borderRadius: 32,
    backgroundColor: colors.secondary45,
    borderWidth: 1,
    borderColor: colors.secondary60,
  },
  statNumber: {
    fontFamily: fonts.semibold,
    fontSize: 30,
    color: colors.primary,
  },
  statText: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 19,
    color: colors.secondaryForeground,
    marginTop: 8,
  },
  exitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 24,
    backgroundColor: colors.secondary25,
    borderWidth: 1,
    borderColor: colors.secondary60,
  },
  smallIcon: {
    width: 40,
    height: 40,
    borderRadius: 16,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exitTitle: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.secondaryForeground,
  },
  mutedText: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.mutedForeground,
    marginTop: 2,
  },
  highlightCard: {
    marginTop: 16,
    padding: 24,
    borderRadius: 32,
    backgroundColor: colors.primary10,
    borderWidth: 1,
    borderColor: colors.primary20,
    alignItems: 'center',
  },
  sparkIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigNumber: {
    fontFamily: fonts.semibold,
    fontSize: 36,
    color: colors.primary,
    marginTop: 16,
  },
  highlightTitle: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: colors.foreground,
    marginTop: 4,
  },
  highlightText: {
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 16,
  },
  missedCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginTop: 16,
    padding: 20,
    borderRadius: 32,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  missedTitle: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: colors.foreground,
  },
  footer: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.mutedForeground,
    textAlign: 'center',
    marginTop: 24,
  },
  footerBold: {
    fontFamily: fonts.semibold,
    color: colors.secondaryForeground,
  },
});