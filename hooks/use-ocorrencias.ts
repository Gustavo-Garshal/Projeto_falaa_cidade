import { Coordenadas } from "@/context/cidade-context";
import { buscarOcorrencias } from "@/services/ocorrencias";
import { Ocorrencia } from "@/types/ocorrencia";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

/**
 * Carrega as ocorrências. A busca roda toda vez que a tela volta a ficar em foco,
 * assim um reporte recém-criado já aparece ao voltar da tela "Novo reporte".
 */
//Função que retorna uma lista de ocorrencias e atualiza a página com elas, pega as coordenadas do contexto da cidade
export function useOcorrencias(coordenadas: Coordenadas | null) {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [carregando, setCarregando] = useState(false);

  //renderiza as ocorrencias sempre que a tela tem foco, atualizando as ocorrencias no mapa
  useFocusEffect(
    useCallback(() => {
      //Se não tiver coordenadas não faz nada
      if (!coordenadas) {
        return;
      }

      let ativo = true; // evita atualizar o estado depois que a tela mudou
      setCarregando(true);
      //busca as ocorrencias no banco e depois que retorna armazena em lista, então seta em ocorrencias
      buscarOcorrencias(coordenadas)
        .then((lista) => ativo && setOcorrencias(lista))
        .finally(() => ativo && setCarregando(false));
      
      //Desativa a busca de ocorrencias quando a tela sai de foco,
      //para evitar de atualizar uma tela que não existe mais
      return () => {
        ativo = false;
      };
    }, [coordenadas])
  );

  return { ocorrencias, carregando };
}