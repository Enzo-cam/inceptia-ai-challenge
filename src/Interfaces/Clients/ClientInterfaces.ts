// Tipos para el estado y las acciones
export interface ClientState {
  bots: Bot[];
  inboundCases: InboundCasesResponse;  // Actualizado para usar la nueva interfaz
  loadingBots: boolean;
  loadingCases: boolean;
  errorBots: string | null;
  errorCases: string | null;
  dateFilter: {
    from: string;
    until: string;
  };
  activeFilter: string;
}

export interface Bot {
  id: number;
  name: string;
  // Otros campos relevantes para los bots
}

export interface GetInboundCasesParams {
  botId: number;
  startDate: string;
  endDate: string;
}

export interface InboundCasesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: InboundCase[];
}

export interface InboundCase {
  id: number;
  client: {
    id: number;
    name: string;
  };
  case_uuid: string;
  phone: number;
  first_name: string;
  last_name: string;
  code: null | string;
  case_result: {
    result_id: number;
    name: string;
    is_final: boolean;
    contacted: boolean;
  };
  case_duration: string;
  case_log: {
    responses: CaseLogResponse[];
    result_id: number;
    commitment: string;
    got_promise: boolean;
    transcription: CaseTranscription[];
    final_sip_code: number;
  };
  extra_metadata: {
    dni: string;
    grupo: string;
    orden: string;
  };
  recording: string;
  is_complete: boolean;
  status: string;
  last_updated: string;
  is_active: boolean;
}

  
export interface CaseLogResponse {
  text: string;
  time: number;
  confidence: number;
}

export interface CaseTranscription {
  text: string;
  time: number;
  confidence: number;
}
