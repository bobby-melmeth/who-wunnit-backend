import { Area } from "../../League/Types/CompetitionTypes"

export interface Team {
    area: Area
    id: number
    name: string
    shortName: string
    tla: string
    crest: string
    address: string
    website: string
    founded: number
    clubColors: string
    venue: string
    runningCompetitions: RunningCompetition[]
    coach: Coach
    squad: Squad[]
    staff: Staff[]
    lastUpdated: string
  }

  export interface RunningCompetition {
    id: number
    name: string
    code: string
    type: string
    emblem: string
  }

  export interface Coach {
    id: number
    firstName: string
    lastName?: string
    name: string
    dateOfBirth: string
    nationality: string
    contract: Contract
  }

  export interface Contract {
    start?: string
    until?: string
  }

  export interface Squad {
    id: number
    name: string
    position: string
    dateOfBirth: string
    nationality: string
  }

  export interface Staff {
    id: number
    firstName: string
    lastName: string
    name: string
    dateOfBirth: string
    nationality: string
    contract: Contract2
  }

  export interface Contract2 {
    start: string
    until: string
  }