import { View, Text, Pressable, StyleSheet } from 'react-native';
import { LogOut } from 'lucide-react-native';
import { colors, fonts } from '../theme/theme';
import { formatTime, formatRemainingTime } from '../utils/helpers';

export default function Timer({
  activeTheme,
  timeLeft,
  currentTip,
  isExitConfirmationOpen,
  onOpenExit,
  onCloseExit,
  onConfirmExit,
}) {
  return (
    <View style={styles.container}>
      {/* Cronômetro e dica */}
      <View style={styles.center}>
        <Text style={styles.label}>{activeTheme}</Text>
        <Text style={styles.time}>{formatTime(timeLeft)}</Text>

        <Text style={[styles.label, { marginTop: 48 }]}>Dica da pausa</Text>
        <Text style={styles.tip}>{currentTip}</Text>
      </View>

      {/* Cancelar */}
      <Pressable onPress={onOpenExit} style={styles.cancelButton}>
        <LogOut size={16} color={colors.mutedForeground} />
        <Text style={styles.cancelText}>Cancelar</Text>
      </Pressable>

      {/* Confirmação de saída (fica por cima da tela) */}
      {isExitConfirmationOpen && (
        <View style={styles.overlay}>
          <View style={styles.dialog}>
            <View style={styles.dialogIcon}>
              <LogOut size={20} color={colors.secondaryForeground} />
            </View>
            <Text style={styles.dialogTitle}>Tem certeza?</Text>
            <Text style={styles.dialogText}>
              Faltam apenas {formatRemainingTime(timeLeft)}.
            </Text>

            <View style={styles.dialogButtons}>
              <Pressable
                onPress={onCloseExit}
                style={[styles.dialogButton, styles.buttonPrimary]}
              >
                <Text style={styles.buttonPrimaryText}>Continuar</Text>
              </Pressable>
              <Pressable
                onPress={onConfirmExit}
                style={[styles.dialogButton, styles.buttonSecondary]}
              >
                <Text style={styles.buttonSecondaryText}>Sair agora</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 28,
    paddingVertical: 32,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: colors.mutedForeground,
    marginBottom: 16,
  },
  time: {
    fontFamily: fonts.light,
    fontSize: 72,
    color: colors.primary,
    fontVariant: ['tabular-nums'],
  },
  tip: {
    fontFamily: fonts.medium,
    fontSize: 20,
    lineHeight: 26,
    color: colors.foreground,
    textAlign: 'center',
    maxWidth: 240,
    marginTop: -4,
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 999,
  },
  cancelText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.mutedForeground,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
    padding: 20,
  },
  dialog: {
    backgroundColor: colors.card,
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
  },
  dialogIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  dialogTitle: {
    fontFamily: fonts.medium,
    fontSize: 24,
    color: colors.foreground,
  },
  dialogText: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.mutedForeground,
    marginTop: 8,
  },
  dialogButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    width: '100%',
  },
  dialogButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
  },
  buttonPrimaryText: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: colors.primaryForeground,
  },
  buttonSecondary: {
    backgroundColor: colors.secondary70,
  },
  buttonSecondaryText: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: colors.secondaryForeground,
  },
});