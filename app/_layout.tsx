import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "expo-router/react-navigation";
import { Stack } from "expo-router";
import "react-native-reanimated";

import { AuthProvider } from "@/context/auth-context";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { cores } from "@/styles/cores";

export const unstable_settings = {
  //anchor: "(tabs)",
  initialRouteName: "login",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      {/*Rotas de paginas*/ }
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="cadastro" options={{ 
            headerShown: true, 
            title: "Cadastre-se",
            headerTintColor: cores.branco,
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: cores.verde,
            },
            }} />
          <Stack.Screen name="esqueci-senha" options={{ headerShown: false }} />
          <Stack.Screen name="verificar-email" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </AuthProvider>
  );
}
