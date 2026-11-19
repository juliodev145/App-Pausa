import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { ArrowLeft, Minus, Plus, Clock } from 'lucide-react-native';
import { colors, fonts } from '../theme/theme';

export default function Select({
  customTheme,
  onChangeTheme,
  selectedMinutes,
  onChangeMinutes,
  minMinutes,
  maxMinutes,
  onStart,
  onBack,
}) {
  const canStart = customTheme.trim().length > 0;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      {/* Botão voltar */}
      <Pressable onPress={onBack} style={styles.backButton} hitSlop={8}>
        <ArrowLeft size={20} color={colors.mutedForeground} />
      </Pressable>

      <View style={styles.header}>
        <Text style={styles.title}>Sua pausa</Text>
        <Text style={styles.subtitle}>Escolha um tema e a duração ideal.</Text>
      </View>

      {/* Tema */}
      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Tema da pausa</Text>
        <TextInput
          value={customTheme}
          onChangeText={onChangeTheme}
          maxLength={30}
          placeholder="Ex.: leitura, caminhada..."
          placeholderTextColor={colors.mutedForeground}
          style={styles.input}
        />
      </View>

      {/* Duração */}
      <View style={styles.durationArea}>
        <View style={styles.durationRow}>
          <Pressable
            onPress={() => onChangeMinutes(selectedMinutes - 5)}
            disabled={selectedMinutes <= minMinutes}
            style={[
              styles.roundButton,
              selectedMinutes <= minMinutes && styles.disabled,
            ]}
          >
            <Minus size={20} color={colors.secondaryForeground} />
          </Pressable>

          <View style={{ alignItems: 'center' }}>
            <TextInput
              value={String(selectedMinutes)}
              onChangeText={(text) => onChangeMinutes(Number(text))}
              keyboardType="number-pad"
              maxLength={3}
              style={styles.minutesInput}
            />
            <Text style={styles.minutesLabel}>minutos</Text>
          </View>

          <Pressable
            onPress={() => onChangeMinutes(selectedMinutes + 5)}
            disabled={selectedMinutes >= maxMinutes}
            style={[
              styles.roundButton,
              selectedMinutes >= maxMinutes && styles.disabled,
            ]}
          >
            <Plus size={20} color={colors.secondaryForeground} />
          </Pressable>
        </View>

        <Text style={styles.hint}>
          Ajuste entre {minMinutes} e {maxMinutes} minutos
        </Text>
      </View>

      {/* Iniciar */}
      <Pressable
        onPress={onStart}
        disabled={!canStart}
        style={({ pressed }) => [
          styles.startButton,
          !canStart && styles.disabled,
          pressed && styles.pressed,
        ]}
      >
        <Clock size={20} color={colors.primaryForeground} />
        <Text style={styles.startText}>Salvar e iniciar</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 28,
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
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: 30,
    color: colors.foreground,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.mutedForeground,
    marginTop: 12,
    textAlign: 'center',
  },
  field: {
    marginTop: 32,
  },
  fieldLabel: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.secondaryForeground,
    marginBottom: 8,
  },
  input: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.foreground,
    backgroundColor: colors.secondary40,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  durationArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 28,
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  roundButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.secondary60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  minutesInput: {
    width: 128,
    fontFamily: fonts.light,
    fontSize: 72,
    color: colors.primary,
    textAlign: 'center',
    padding: 0,
  },
  minutesLabel: {
    fontFamily: fonts.medium,
    fontSize: 14,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: colors.mutedForeground,
    marginTop: 8,
  },
  hint: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.mutedForeground,
    marginTop: 24,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: colors.primary,
    paddingVertical: 20,
    borderRadius: 32,
  },
  startText: {
    fontFamily: fonts.medium,
    fontSize: 18,
    color: colors.primaryForeground,
  },
  disabled: {
    opacity: 0.4,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
});