import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';
import { colors, fonts } from '../theme/theme';

export default function Feedback({ onAnswer }) {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Check size={40} color={colors.primary} strokeWidth={2.5} />
      </View>

      <Text style={styles.title}>Pausa concluída</Text>
      <Text style={styles.text}>
        Você perdeu algo importante durante esse tempo?
      </Text>

      <View style={styles.buttons}>
        <Pressable
          onPress={() => onAnswer(true)}
          style={[styles.button, styles.buttonSecondary]}
        >
          <Text style={styles.buttonSecondaryText}>Sim</Text>
        </Pressable>
        <Pressable
          onPress={() => onAnswer(false)}
          style={[styles.button, styles.buttonPrimary]}
        >
          <Text style={styles.buttonPrimaryText}>Não</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 28,
  },
  icon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: 30,
    color: colors.foreground,
    marginBottom: 12,
  },
  text: {
    fontFamily: fonts.regular,
    fontSize: 18,
    lineHeight: 28,
    color: colors.mutedForeground,
    textAlign: 'center',
    maxWidth: 240,
    marginBottom: 48,
  },
  buttons: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 20,
    borderRadius: 32,
    alignItems: 'center',
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
  },
  buttonPrimaryText: {
    fontFamily: fonts.medium,
    fontSize: 18,
    color: colors.primaryForeground,
  },
  buttonSecondary: {
    backgroundColor: colors.secondary70,
  },
  buttonSecondaryText: {
    fontFamily: fonts.medium,
    fontSize: 18,
    color: colors.secondaryForeground,
  },
});