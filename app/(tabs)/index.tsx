
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

function GoogleLogo({ size = 24 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      <Path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <Path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <Path
        fill="#FBBC05"
        d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <Path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </Svg>
  );
}
/**
 * Paleta de cores que será usado no projeto por completo
 * Deve ser usado em todas as telas.
 */
const cores = {
  verde: '#108245',      // verde de marca — botão primário, logo
  verdeEscuro: '#0c6b38',  // verde mais escuro — usado em estado "pressed"
  preto: '#161a20',         // cor do texto principal (títulos)
  cinzaEscuro: '#5b6472',       // cor do texto secundário (subtítulo)
  cinzaClaro: '#8a93a1',       // cor do texto mais apagado (texto legal/LGPD)
  bgBrancoGelo: '#f6f8fa',          // fundo geral da tela
  branco: '#ffffff',
}
export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.logoText}>BC</Text>
      </View>
      <Text style={styles.titulo}>Falaa buraco!</Text>
      <Text style={styles.subtitulo}>Reporte, acompanhe e confirme a correção
        de buracos na sua cidade.</Text>

      <TouchableOpacity activeOpacity={0.8}
        style={styles.botao}
      >
        <View style={styles.googleIconCircle}>
          <GoogleLogo size={20} />
        </View>
        <Text style={styles.textoBotao}>
          Entrar com o Google
        </Text>
      </TouchableOpacity>
      <Text style={styles.rodape}>
        Ao continuar, você concorda com os Termos e a Política de Privacidade (LGPD).
      </Text>
      <Text style={styles.mapaSemLogin}>
        Ver mapa sem login `{'>'}`
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.bgBrancoGelo,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 30,
    backgroundColor: cores.verde,
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    color: "white",
    fontSize: 40,
    fontWeight: 900
  },
  titulo: {
    color: cores.preto, //Troca a cor da fonte
    fontSize: 40, //Troca o tamanho da fonte
    marginVertical: 20,
    fontWeight: 800 /*Coloca o efeito para a fonte ficar mais forte ou mais fraca*/,
  },
  subtitulo: {
    color: cores.cinzaClaro, //Troca a cor da fonte
    fontSize: 18, //Troca o tamanho da fonte
    marginBottom: 20,
    textAlign: "center", //Centraliza o texto
    fontWeight: 800 /*Coloca o efeito para a fonte ficar mais forte ou mais fraca*/,
  },

  rodape: {
    color: cores.cinzaClaro, //Troca a cor da fonte
    justifyContent: "center", //Centraliza o texto
    fontSize: 15, //Troca o tamanho da fonte
    fontWeight: 400 /*Coloca o efeito para a fonte ficar mais forte ou mais fraca*/,
    alignItems: "center", //Centraliza o texto
    textAlign: "center", //Centraliza o texto
    marginTop: 15,
  },
  botao: {
    backgroundColor: cores.verde,
    width: 300,
    height: "auto",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    flexDirection: "row", // Adiciona a propriedade flexDirection para alinhar os elementos horizontalmente
  },
  textoBotao: {
    marginStart:10,
    color: cores.branco,
    fontSize: 20,
    fontWeight: 800
  },
  mapaSemLogin: {
    fontSize: 12,
    fontWeight: '700',
    color: cores.verde,
    marginTop: 10,
  },
  googleIconText:{
    color: cores.branco,
    fontSize: 20,
    fontWeight: 800,
    marginBottom: 10,
    marginRight: 10,
  },
  googleIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: cores.branco,
    alignItems: "center",
    justifyContent: "center",
  },
});
