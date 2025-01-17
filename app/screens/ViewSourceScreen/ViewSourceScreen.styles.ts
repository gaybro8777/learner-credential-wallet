import { createDynamicStyleSheet } from '../../lib/dynamicStyles';

export default createDynamicStyleSheet(({ theme }) => ({
  container: {
    padding: 16,
    flex: 1,
  },
  codeBlock: {
    color: theme.color.textPrimary,
    padding: 16,
    fontFamily: theme.fontFamily.mono,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.color.iconInactive,
  },
}));
