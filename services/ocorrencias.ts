import { Coordenadas } from "@/context/cidade-context";
import { db } from "@/firebase-config";
import { Ocorrencia } from "@/types/ocorrencia";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

/**
 * Busca no Firebase os últimos 50 reportes, do mais novo para o mais antigo.
 * O parâmetro `_centro` ainda não é usado (desafio extra: filtrar por proximidade).
 */
//Função de buscar ocorrencias no banco atráves da query de consulta, que já ordena os dados
export async function buscarOcorrencias(_centro: Coordenadas): Promise<Ocorrencia[]> {
  const consulta = query(
    collection(db, "ocorrencias"),
    orderBy("criadoEm", "desc"),
    limit(50)
  );
  const resultado = await getDocs(consulta);
  //Mapeia os documentos retornados para dentro de documento
  return resultado.docs.map((documento) => {
    //transforma os dados em objeto
    const dados = documento.data();
    //retorna os dados com os devidos campos mapeados
    return {
      id: documento.id,
      titulo: dados.titulo,
      descricao: dados.descricao ?? undefined,
      status: dados.status,
      latitude: dados.latitude,
      longitude: dados.longitude,
    };
  });
}