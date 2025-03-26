export interface Country {
  cca3: string;
  name: {
    common: string;
    official: string;
  };
  flags: {
    svg: string;
    png: string;
  };
  population: number;
  region: string;
  translations?: {
    rus: {
      official?: string;
    };
  };
}
