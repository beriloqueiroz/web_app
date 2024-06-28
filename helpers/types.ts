
export interface Notification {
  ID: string,
  ScheduleNotification: {
    ID: string
  }
  User: {
    ID: string,
    Email: string,
    Location: {
      City: string,
      State: string
    }
  },
  Message: PrevisaoRoot
}

export interface PrevisaoRoot {
  Clima: Clima
  Ondas: Ondas
}

export interface Clima {
  Text: string
  Nome: string
  Uf: string
  Atualizacao: string
  Previsao: Previsao[]
}

export interface Previsao {
  Text: string
  Dia: string
  Tempo: string
  Maxima: string
  Minima: string
  Iuv: string
}

export interface Ondas {
  XMLName: Xmlname
  Text: string
  Nome: string
  Uf: string
  Atualizacao: string
  Manha: Manha
  Tarde: Tarde
  Noite: Noite
}

export interface Xmlname {
  Space: string
  Local: string
}

export interface Manha {
  Text: string
  Dia: string
  Agitacao: string
  Altura: string
  Direcao: string
  Vento: string
  VentoDir: string
}

export interface Tarde {
  Text: string
  Dia: string
  Agitacao: string
  Altura: string
  Direcao: string
  Vento: string
  VentoDir: string
}

export interface Noite {
  Text: string
  Dia: string
  Agitacao: string
  Altura: string
  Direcao: string
  Vento: string
  VentoDir: string
}
