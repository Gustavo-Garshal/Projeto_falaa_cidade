import { STATUS } from "@/constants/status";
import { useCidade } from "@/hooks/use-cidade";
import { useOcorrencias } from "@/hooks/use-ocorrencias";
import { cores } from "@/styles";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//lista os reportes que estão no banco
export default function ListaDeReportes() {
    //Pega as coordenadas de useCidade() e passa para useOcorrencias() que retorna as ocorrencias
    const { coordenadas } = useCidade();
    const { ocorrencias, carregando } = useOcorrencias(coordenadas);

    return (
        <SafeAreaView style={estilos.container}>
            <Text style={estilos.titulo}>Reportes</Text>
            {/*exibe um icone de carregando enquanto carregando é true*/}
            {carregando && <ActivityIndicator color={cores.verde} />}
            {/*se useOcorrencias retornar nenhuma ocorrencia e carregando false exibe o texto*/}
            {!carregando && ocorrencias.length === 0 && (
                <Text style={estilos.vazio}>Nenhum reporte ainda.</Text>
            )}
            <FlatList
            //Pega as ocorrencias e exibe na lista
                data={ocorrencias}
                keyExtractor={(ocorrencia) => ocorrencia.id}
                //define a renderização de cada item da lista de ocorrencias de acordo com os dados presentes no item
                renderItem={({ item }) => (
                <View style={estilos.cartao}>
                    <View
                    style={[
                        estilos.bolinha,
                        { backgroundColor: STATUS[item.status].cor },
                    ]}
                    />
                    <View style={estilos.textos}>
                    <Text style={estilos.tituloDoReporte}>{item.titulo}</Text>
                    {/*Se o item tiver descricao exibe a descricao do reporte*/}
                    {item.descricao && (
                        <Text style={estilos.descricao}>{item.descricao}</Text>
                    )}
                    <Text style={estilos.tipo}>
                      {item.tipo} 
                    </Text>
                    <Text style={estilos.situacao}>
                        {STATUS[item.status].rotulo}
                    </Text>
                    <Text style={estilos.situacao}>
                        {item.criadoEm?.toDate().toLocaleString("pt-BR")}
                    </Text>
                    </View>
                </View>
                )}
            />
        </SafeAreaView>
    );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: cores.bgBrancoGelo,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "700",
    color: cores.preto,
    marginBottom: 12,
  },
  vazio: {
    textAlign: "center",
    color: cores.cinzaEscuro,
    marginTop: 24,
  },
  cartao: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: cores.branco,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  bolinha: { width: 10, height: 10, borderRadius: 5, marginTop: 5 },
  textos: { flex: 1 },
  tituloDoReporte: {
    fontSize: 16,
    fontWeight: "700",
    color: cores.preto,
  },
  descricao: {
    fontSize: 14,
    color: cores.cinzaEscuro,
    marginTop: 2,
  },
  tipo: {
    fontSize: 14,
    color: cores.preto,
    marginTop: 2,
    textTransform: "capitalize",
  },
  situacao: {
    fontSize: 12,
    color: cores.cinzaClaro,
    marginTop: 4,
  },
});