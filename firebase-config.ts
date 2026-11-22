import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
// @ts-ignore - tipos do firebase/auth não expõem getReactNativePersistence p/ RN, mas existe em runtime no build nativo (iOS/Android)
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";
import { Platform } from "react-native";
import { getFirestore } from "firebase/firestore";

//Configuração das credenciais do Firebase, que estão no arquivo .env
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

//Verifica se já tem uma instancia do Firebase iniciada, se tiver apenas usa ela com getApp(),
//se não tiver, inicializa com initializeApp() e passa as credencias do banco em firebaseConfig
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
//exporta a instancia do Firestore para ser usada em outros arquivos
export const db = getFirestore(app);

// Na web o bundle do firebase/auth não traz getReactNativePersistence (é só
// pra iOS/Android), então lá usamos getAuth normal — o Firebase já persiste
// a sessão no localStorage do navegador por padrão.
export const auth =
  Platform.OS === "web"
    ? getAuth(app)
    : initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
      });
