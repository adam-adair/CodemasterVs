import { StyleSheet } from 'react-native';
import { Theme } from 'react-native-paper/lib/typescript/types';

export default (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    login: {
      width: '80%',
    },
    margin: {
      margin: 10,
    },
    error: {
      color: 'red',
    },
    forgotLink: {
      marginLeft: 10,
      fontSize: 12,
      textDecorationLine: 'underline',
    },
    centerText: {
      maxWidth: '80%',
      textAlign: 'center',
    },
    row: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-evenly',
    },
    roundBorder: {
      borderRadius: theme.roundness,
      borderWidth: 2,
      borderColor: theme.colors.primary,
    },
    winBorder: {
      borderRadius: theme.roundness,
      borderWidth: 3,
      borderColor: theme.colors.accent,
    },
    loseBorder: {
      borderRadius: theme.roundness,
      borderWidth: 3,
      borderColor: theme.colors.error,
    },
    gameContainer: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    scrolGuessContainer: {
      alignItems: 'center',
      justifyContent: 'flex-end',
      flexGrow: 1,
      flexDirection: 'column-reverse',
      borderRadius: theme.roundness,
    },
    scrollBuildContainer: {
      alignItems: 'center',
      alignSelf: 'center',
      width: '80%',
      flexGrow: 1,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: theme.colors.surface,
      width: '80%',
      height: '80%',
      position: 'absolute',
      left: '10%',
      borderRadius: theme.roundness,
      top: '10%',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
