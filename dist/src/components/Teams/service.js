"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findManyTeams = exports.createManyTeams = void 0;
const client_1 = require("@prisma/client");
const axios_1 = __importDefault(require("axios"));
const metrics_1 = require("../../utils/metrics");
const prisma = new client_1.PrismaClient();
function createManyTeams() {
    return __awaiter(this, void 0, void 0, function* () {
        const teams = yield (0, axios_1.default)('https://api.football-data.org/v4/competitions/PL/teams', {
            headers: {
                'X-Auth-Token': process.env.API_KEY
            }
        });
        console.log('TEAMSssss', teams.data);
        try {
            for (const item of teams.data.teams) {
                // Create an Area record
                const createdArea = yield prisma.area.create({
                    data: {
                        name: item.area.name,
                        code: item.area.code,
                        flag: item.area.flag,
                    },
                });
                // Create a Club record
                const createdClub = yield prisma.team.create({
                    data: {
                        name: item.name,
                        shortName: item.shortName,
                        tla: item.tla,
                        crest: item.crest,
                        address: item.address,
                        website: item.website,
                        founded: item.founded,
                        clubColors: item.clubColors,
                        venue: item.venue,
                        lastUpdated: new Date(item.lastUpdated).toDateString(),
                        areaId: createdArea.id,
                    },
                });
                // Create RunningCompetition records
                for (const runningCompetition of item.runningCompetitions) {
                    yield prisma.runningCompetitions.create({
                        data: {
                            name: runningCompetition.name,
                            code: runningCompetition.code,
                            emblemUrl: runningCompetition.emblem,
                        },
                    });
                }
                // Create Coach record
                const createdCoach = yield prisma.coach.create({
                    data: {
                        firstName: item.coach.firstName,
                        lastName: item.coach.lastName,
                        name: item.coach.name,
                        dateOfBirth: new Date(item.coach.dateOfBirth).toString(),
                        nationality: item.coach.nationality,
                        coachContract: {
                            create: {
                                startDate: new Date(item.coach.contract.start).toString(),
                                endDate: new Date(item.coach.contract.until).toString(),
                                coachId: item.coach.id,
                            }
                        },
                        team: {
                            connect: {
                                id: createdClub.id
                            }
                        }
                    },
                });
                const num = 643;
                for (const squadMember of item.squad) {
                    yield prisma.squad.create({
                        data: {
                            player: {
                                create: {
                                    position: squadMember.position,
                                    dateOfBirth: new Date(squadMember.dateOfBirth).toString(),
                                    nationality: squadMember.nationality,
                                    name: squadMember.name,
                                },
                            },
                        },
                    });
                }
                ;
            }
            console.log('Data inserted successfully');
        }
        catch (error) {
            console.error('Error inserting data:', error);
        }
        finally {
            yield prisma.$disconnect(); // Disconnect Prisma client
        }
        // Usage
        const apiResponseData = []; // Your API response data
    });
}
exports.createManyTeams = createManyTeams;
function findManyTeams() {
    return __awaiter(this, void 0, void 0, function* () {
        const metricsLabels = {
            operation: 'findManyTeams',
        };
        const timer = metrics_1.databaseResponseTimeHistogram.startTimer();
        try {
            const teams = yield prisma.team.findMany();
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'true' }));
            console.log('Teams:', teams);
            return teams;
        }
        catch (error) {
            timer(Object.assign(Object.assign({}, metricsLabels), { success: 'false' }));
            throw error;
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.findManyTeams = findManyTeams;
