import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { MailComposerOptions } from 'expo-mail-composer';
import { TProfile } from './types/shared';

const androidBannerID = 'ca-app-pub-1940265691596251/3084020880';
const iosBannerID = 'ca-app-pub-1940265691596251/8847483451';
const testID = 'ca-app-pub-3940256099942544/6300978111';

const productionID = Platform.OS === 'ios' ? iosBannerID : androidBannerID;
const adUnitID = Constants.isDevice && !__DEV__ ? productionID : testID;

const androidInterstitialID = 'ca-app-pub-1940265691596251/3526484375';
const iosInterstitialID = 'ca-app-pub-1940265691596251/9007586353';
const testInterstitialID = 'ca-app-pub-3940256099942544/1033173712';

const productionInterstitialID =
  Platform.OS === 'ios' ? iosInterstitialID : androidInterstitialID;
const adUnitInterstitialID =
  Constants.isDevice && !__DEV__
    ? productionInterstitialID
    : testInterstitialID;

const androidClientId =
  '844960036116-h1blkv2bijurb7vtvvp2cpdvedt16kc9.apps.googleusercontent.com';
const expoClientId =
  '844960036116-fa1or0bsdonmqadph2h9c9edpebjcpus.apps.googleusercontent.com';
const iosClientId =
  '844960036116-1spalg6i3b984lbr8iohom9o2krojqbq.apps.googleusercontent.com';

const pegColors = [
  '#EF476F',
  '#DE9151',
  '#FFC31F',
  '#06D6A0',
  '#118AB2',
  '#55418B',
  '#CCCCCC',
];

const pegSize = 25;

const defaultColorIndexes = [0, 1, 2, 3, 4, 5, 6];

const messageLimit = 50;

const appStoreLink = 'https://apps.apple.com/us/app/codemastervs/id1603681123';
const playStoreLink =
  'https://play.google.com/store/apps/details?id=com.aar2222.codemastervs';

const defaultProfile: TProfile = {
  userName: null,
  darkTheme: false,
  email: null,
  isLoggedIn: false,
};

const emailBody = `
<html>
<div>I'm inviting you to play CodemasterVs!</div> 
<div>Download the app and add me as a contact:</div>
<div>${appStoreLink}</div>
<div>CodemasterVs on the Apple App Store</div>
<div>${playStoreLink}</div>
<div>CodemasterVs on the Google Play Store</div>
</html>
`;

const defaultInvitation: MailComposerOptions = {
  subject: 'Crack the code?',
  body: emailBody,
  isHtml: true,
};

const adFrequency = 4;

export {
  adUnitID,
  adUnitInterstitialID,
  pegColors,
  pegSize,
  defaultColorIndexes,
  messageLimit,
  defaultProfile,
  defaultInvitation,
  androidClientId,
  expoClientId,
  iosClientId,
  appStoreLink,
  playStoreLink,
  adFrequency,
};
