import { useAuth } from "@/hooks/use-auth";
import { useCidade } from "@/hooks/use-cidade";
import { criarReporte } from "@/services/reportes";
import { cores } from "@/styles";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Tipo } from "@/types/ocorrencia";

//Exporta a função NovoReporte, que cria a tela de novo reporte
export default function NovoReporte() {

  const TIPOS: { valor: Tipo; rotulo: string }[] = [
  { valor: "buraco", rotulo: "Buraco" },
  { valor: "calçada", rotulo: "Calçada" },
  { valor: "iluminação", rotulo: "Iluminação" },
  { valor: "outro", rotulo: "Outro" },
];
  //Hooks do React para navegação do Expo Router, autenticação do usuário e localização da cidade
  const roteador = useRouter();
  const { user: usuario } = useAuth();
  const { coordenadas } = useCidade();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState<Tipo>("buraco"); //armazena o tipo de ocorrência
  const [enviando, setEnviando] = useState(false);

  //Verifica se os campos e dados necessarios estão preenchidos e não estão vazios(Só com espaços em branco)
  async function enviar() {
    if (!titulo.trim()) {
      Alert.alert("Título obrigatório", "Diga onde está o problema.");
      return;
    }
    if (!tipo) {
      Alert.alert("Tipo de ocorrência obrigatório", "Selecione o tipo de ocorrência.");
      return;
    }
    if (!usuario) {
      Alert.alert("Login necessário", "Entre com a sua conta para reportar.");
      return;
    }
    if (!coordenadas) {
      Alert.alert("Localização indisponível", "Ative a localização do aparelho.");
      return;
    }

    //Inicia o envio do reporte, chamando a função criarReporte() e passando os parametros
    setEnviando(true);
    try {
      await criarReporte({
        idNotificante: usuario.uid,
        titulo,
        descricao,
        latitude: coordenadas.latitude,
        longitude: coordenadas.longitude,
        tipo,
      });
      //Se der certo exibe uma mensagem de sucesso e volta para a tela anterior
      Alert.alert("Reporte enviado", "Obrigado por ajudar a cidade!", [
        { text: "OK", onPress: () => roteador.back() },
      ]);
      //Senão exibe uma mensagem de erro para o usuário e exibe o erro no console
    } catch (erro) {
      console.warn("Falha ao gravar o reporte", erro);
      Alert.alert("Não foi possível enviar", "Tente de novo em instantes.");
    } finally {
      //Depois de tentar enviar volta o estado de envio para falso
      setEnviando(false);
    }
  }

  //Aqui exibe a tela de novo reporte com os campos
  //O valor inserido nos campos são setados nas variaveis de NovoReporte()
  return (
    <SafeAreaView style={estilos.container}>
      <Text style={estilos.titulo}>Novo reporte</Text>
      <TextInput
        style={estilos.campo}
        placeholder="Título (ex.: Buraco na Rua das Palmeiras)"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        style={[estilos.campo, estilos.campoGrande]}
        placeholder="Descrição (opcional)"
        value={descricao}
        onChangeText={setDescricao}
        multiline
      />
      <Text style={estilos.titulo}>Tipo de ocorrência</Text>
      <View style={estilos.containerTipos}>
        {TIPOS.map((item) => {
        const selecionado = tipo === item.valor;
        return (
        <TouchableOpacity
          key={item.valor}
          style={[estilos.botaoTipo, selecionado && estilos.botaoTipoAtivo]}
          onPress={() => setTipo(item.valor)}
          activeOpacity={0.7}
        >
        <Text
          style={[estilos.textoTipo, selecionado && estilos.textoTipoAtivo]}
        >
          {item.rotulo}
        </Text>
      </TouchableOpacity>
    );
  })}
</View>
      {/*chama a função enviar com os dados das váriaveis e desabilita o botão enquanto enviando for true*/}
      <TouchableOpacity style={estilos.botao} onPress={enviar} disabled={enviando}>
        {enviando ? (<ActivityIndicator color={cores.branco} />) : (
        <Text style={estilos.textoDoBotao}>
          {enviando ? "Enviando..." : "Enviar reporte"}
        </Text>)}
      </TouchableOpacity>
      {/*Botão de cancelar que volta para a tela anterior*/}
      <TouchableOpacity onPress={() => roteador.back()}>
        <Text style={estilos.cancelar}>Cancelar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 12,
    backgroundColor: cores.bgBrancoGelo,
  },
  containerTipos: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  botaoTipo: {
    backgroundColor: cores.branco,
    borderRadius: 12,
    borderColor: cores.cinzaClaro,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  botaoTipoAtivo: {
    backgroundColor: cores.verde,
    borderColor: cores.verdeEscuro,
  },
  textoTipo: {
    color: cores.preto,
    fontWeight: "500",
  },
  textoTipoAtivo: {
    color: cores.branco,
    fontWeight: "700",
  },
  titulo: { fontSize: 22, fontWeight: "700", color: cores.preto },
  campo: {
    backgroundColor: cores.branco,
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
  },
  campoGrande: { minHeight: 100, textAlignVertical: "top" },
  botao: {
    backgroundColor: cores.verde,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  textoDoBotao: { color: cores.branco, fontWeight: "700", fontSize: 16 },
  cancelar: { textAlign: "center", color: cores.cinzaEscuro, padding: 8 },
});