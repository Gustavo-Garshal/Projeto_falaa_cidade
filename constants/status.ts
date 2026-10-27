import {StatusOcorrencia} from "@/types/ocorrencia";
import {cores} from "@/styles/cores";

export const STATUS: Record<StatusOcorrencia, { rotulo: string, cor: string }> = {
    aberto: {rotulo: "Aberto", cor: "orange"},
    em_execucao: {rotulo: "Em execução", cor: cores.alerta},
    resolvido: {rotulo: "Resolvido", cor: cores.verde},
}