
import { Prisma, PrismaClient } from '@prisma/client';
import { Team } from './Types/TeamTypes';
import axios from 'axios';
import { databaseResponseTimeHistogram } from '../../utils/metrics';


const prisma = new PrismaClient();

export async function createManyTeams() {

    const teams: any = await axios('https://api.football-data.org/v4/competitions/PL/teams', {
        headers: {
            'X-Auth-Token': process.env.API_KEY
        }
    })
    console.log('TEAMSssss', teams.data)
    try {
        for (const item of teams.data.teams) {
            // Create an Area record
            const createdArea = await prisma.area.create({
                data: {

                    name: item.area.name,
                    code: item.area.code,
                    flag: item.area.flag,
                },
            });

            // Create a Club record
            const createdClub = await prisma.team.create({
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
                await prisma.runningCompetitions.create({
                    data: {
                        name: runningCompetition.name,
                        code: runningCompetition.code,
                        emblemUrl: runningCompetition.emblem,

                    },
                });
            }

            // Create Coach record
            const createdCoach = await prisma.coach.create({
                data: {

                    firstName: item.coach.firstName,
                    lastName: item.coach.lastName!,
                    name: item.coach.name,
                    dateOfBirth: new Date(item.coach.dateOfBirth).toString(),
                    nationality: item.coach.nationality,
                    coachContract: {
                        create: {
                            startDate: new Date(item.coach.contract.start!).toString(),
                            endDate: new Date(item.coach.contract.until!).toString(),
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
            const num = 643
            for (const squadMember of item.squad) {
                await prisma.squad.create({
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
            };
        }

        console.log('Data inserted successfully');

    } catch (error) {
        console.error('Error inserting data:', error);

    } finally {
        await prisma.$disconnect(); // Disconnect Prisma client
    }


    // Usage
    const apiResponseData = []; // Your API response data


}


export async function findManyTeams() {
    const metricsLabels = {
        operation: 'findManyTeams',
    }
    const timer = databaseResponseTimeHistogram.startTimer();
    try {
        const teams = await prisma.team.findMany();
        timer({ ...metricsLabels, success: 'true' });
        console.log('Teams:', teams);
        return teams;
    } catch (error) {
        timer({ ...metricsLabels, success: 'false' });
        throw error
    } finally {
        await prisma.$disconnect();
    }
}