import { Competition } from "@prisma/client";
import axios from "axios";

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Assuming you have received the API response data as `responseData`

export async function createOne() {
  try {
    // Extract relevant data from the API response
    const responseData = await axios('https://api.football-data.org/v2/competitions/PL',{
        headers: {
            'X-Auth-Token': process.env.API_KEY
        }
    });

    const data = responseData.data;

    // Create a new Area record
    const createdArea = await prisma.area.create({
      data: {
        name: data.area.name,
        code: 'data.area.code',
        flag: 'data.area.flag',
      },
    });

    // Create a new Competition record
    const createdCompetition = await prisma.competition.create({
      data: {
        name: data.name,
        code: data.code,
        emblemUrl: data.emblemUrl,
        plan: data.plan,

      },
    });

    // Create a new Season record
    const seasons = responseData.data.seasons;
    for (const seasonData of seasons) {
      console.log('seasonData123', seasonData)
      const createdSeason = await prisma.season.create({
        data: {
          id: seasonData.id,
          startDate: '2022-08-05',
          endDate: '2023-05-28',
          winner: {
            create: {
              name: 'Manchester City FC',
              shortName: 'Man City',
              tla: 'MCI',
              crest: 'https://crests.football-data.org/65.png',
              address: 'SportCity Manchester M11 3FF',
              website: 'https://www.mancity.com',
              founded: 1880,
              clubColors: 'Sky Blue / White',
              venue: 'Etihad Stadium',
              lastUpdated: '2022-02-10T19:48:37Z',
            },
          },
        },
      });

console.log(JSON.stringify(createdSeason, null, 2))



    console.log('API response data saved to the database.');
  } catch (error) {
    console.error('Error saving API response data:', error);
  } finally {
    await prisma.$disconnect();
  }
}


