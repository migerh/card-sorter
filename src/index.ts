import axios from 'axios';
import { Card } from './card';

const SET = 'SNC';
const COLOR = 'm';

interface Response<T> {
    data: T[];
}

async function fetchCards(): Promise<Card[]> {
    const URL = `https://api.scryfall.com/cards/search?q=set%3A${SET}+id%3D${COLOR}+r%3Cr+%2Dt%3Aland`;

    try {
        const response = await axios.get<Response<Card>>(URL);
        return response.data.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(`Fetch error: ${error.message}`);
        } else {
            console.error(`Unexpected error: ${error}`);
        }
    }

    return [];
}

async function main(): Promise<void> {
    const data = await fetchCards();

    const CARDS_PER_ROW = 9;
    const len = data.length;
    const rows = len / CARDS_PER_ROW;
    const extra = len % CARDS_PER_ROW === 0 ? 0 : 1;

    console.log(`Total cards: ${len}`);
    for (let row = 0; row < rows + extra; row++) {
        for (let col = 0; col < CARDS_PER_ROW; col++) {
            const index = CARDS_PER_ROW * row + col;

            if (index >= len) {
                break;
            }

            const card = data[index];
            console.log(`${col + 1}: ${card.name}`);
        }

        console.log('');
        console.log('--');
        console.log('');
    }
}

main().catch(console.error);
