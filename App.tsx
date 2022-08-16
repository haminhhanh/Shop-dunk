/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import React from 'react';
 import { RecoilRoot } from 'recoil';
 import Root from './src/Root';
//  import SplashScreen from 'react-native-splash-screen';
 
 const App = () => {
  //  React.useEffect(() => {
  //    SplashScreen.hide();
  //  });
   return (
     <RecoilRoot>
       <Root />
     </RecoilRoot>
   );
 };
 
 export default App;
 