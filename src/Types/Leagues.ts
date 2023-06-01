
type League = {
    id: number;
    area: {
      id: number;
      name: string;
      code: string;
      flag: string;
    };
    name: string;
    code: string;
    type: "LEAGUE" | "CUP";
    emblem: string;
    plan: string;
    currentSeason: {
      id: number;
      startDate: string;
      endDate: string;
      currentMatchday: number;
      winner: any | null;
    };
    numberOfAvailableSeasons: number;
    lastUpdated: string;
  };
