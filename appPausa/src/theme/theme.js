// Cores copiadas do index.css do protótipo (bloco @theme)
export const colors = {
  background: '#f4f6f0',
  foreground: '#2c362d',

  card: '#ffffff',

  primary: '#839d86',
  primaryForeground: '#ffffff',

  secondary: '#e2e8e0',
  secondaryForeground: '#4a5c4d',

  muted: '#e4e7e1',
  mutedForeground: '#6a7c6c',

  border: '#d3dbd4',

  // Versões transparentes (no Tailwind eram bg-primary/10, bg-secondary/45...)
  primary10: 'rgba(131, 157, 134, 0.10)',
  primary20: 'rgba(131, 157, 134, 0.20)',
  secondary25: 'rgba(226, 232, 224, 0.25)',
  secondary40: 'rgba(226, 232, 224, 0.40)',
  secondary45: 'rgba(226, 232, 224, 0.45)',
  secondary60: 'rgba(226, 232, 224, 0.60)',
  secondary70: 'rgba(226, 232, 224, 0.70)',
  overlay: 'rgba(44, 54, 45, 0.20)',
};

// No React Native, cada "peso" da fonte é um arquivo separado
export const fonts = {
  light: 'Outfit_300Light',
  regular: 'Outfit_400Regular',
  medium: 'Outfit_500Medium',
  semibold: 'Outfit_600SemiBold',
};