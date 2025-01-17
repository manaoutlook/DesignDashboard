export type TranslationKeys = {
  common: {
    language: string;
    dashboard: string;
    locations: string;
    cars: string;
    spareParts: string;
    overview: string;
    revenue: string;
    activities: string;
    settings: string;
  };
  dashboard: {
    title: string;
    welcome: string;
    metrics: {
      totalRevenue: string;
      activeUsers: string;
      totalOrders: string;
    };
  };
  locations: {
    title: string;
    addLocation: string;
    locationDetails: string;
    address: string;
    type: string;
    capacity: string;
  };
  cars: {
    title: string;
    addCar: string;
    carDetails: string;
    vinNumber: string;
    manufacturer: string;
    model: string;
    year: string;
  };
  spareParts: {
    title: string;
    addPart: string;
    partDetails: string;
    partNumber: string;
    name: string;
    manufacturer: string;
    price: string;
    quantity: string;
    alertThreshold: string;
    location: string;
  };
};

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: TranslationKeys;
    };
  }
}