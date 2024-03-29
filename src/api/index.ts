export interface LastHumidity {
  last: number;
}

export interface LastLuminosity {
  last: number;
}

export interface LastTemperature {
  last: number;
}

export interface HistoricData {
  id: number;
  temperature: number;
  humidity: number;
  luminosity: number;
  createdAt: Date;
}

export interface Historic {
  historic: HistoricData[];
  count: number;
}

export const fetchApiAvailability = (): Promise<Response> =>
  fetch("https://senlogy.inpacta.ect.ufrn.br/api/docs/");

export const fetchLastHumidity = (): Promise<LastHumidity> =>
  fetch("https://senlogy.inpacta.ect.ufrn.br/api/last-humidity").then(
    (response) => response.json()
  );

export const fetchLastLuminosity = (): Promise<LastLuminosity> =>
  fetch("https://senlogy.inpacta.ect.ufrn.br/api/last-luminosity").then(
    (response) => response.json()
  );

export const fetchLastTemperature = (): Promise<LastTemperature> =>
  fetch("https://senlogy.inpacta.ect.ufrn.br//api/last-temperature").then(
    (response) => response.json()
  );

export const fetchHistoric = (page: number, total = 10): Promise<Historic> =>
  fetch(
    "https://senlogy.inpacta.ect.ufrn.br/api/historic?" +
      new URLSearchParams({
        total: total.toString(),
        page: page.toString(),
      })
  ).then((response) => response.json());
