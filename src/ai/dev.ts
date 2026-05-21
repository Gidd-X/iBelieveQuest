import { config } from 'dotenv';
config();

import { initFlows } from '@/ai/flows/suggest-religious-passages';
initFlows().catch(console.error);