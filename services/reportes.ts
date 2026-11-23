import { db } from "@/firebase-config";
import { Tipo } from "@/types/ocorrencia";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

//exporta o tipo de dados que a função criarReporte() espera receber
export type DadosDoReporte = {
  idNotificante: string; // uid de quem está reportando
  titulo: string;
  tipo: Tipo;
  descricao: string;
  latitude: number;
  longitude: number;
};
/** Grava um reporte na coleção "ocorrencias" e devolve o id do documento criado. */
//Cria um documento em Ocorrencias com os dados do reporte, e retorna o id que o firebase criou para o documento
export async function criarReporte(dados: DadosDoReporte): Promise<string> {
  const documento = await addDoc(collection(db, "ocorrencias"), {
    idNotificante: dados.idNotificante,
    titulo: dados.titulo.trim(),
    descricao: dados.descricao.trim() || null,
    tipo: dados.tipo,
    status: "aberto",
    latitude: dados.latitude,
    longitude: dados.longitude,
    criadoEm: serverTimestamp(), // horário do servidor do Firebase
  });
  return documento.id;
}