export type StatusOcorrencia = 'aberto' | 'em_execucao' | 'resolvido';
export type Tipo = 'buraco' | 'calçada' | 'iluminação' | 'outro';

export type Ocorrencia = {
  id: string;
  titulo: string;
  descricao?: string;
  tipo: Tipo;
  status: StatusOcorrencia;
  criadoEm?: any; // Timestamp do Firebase
  latitude: number;
  longitude: number;
}