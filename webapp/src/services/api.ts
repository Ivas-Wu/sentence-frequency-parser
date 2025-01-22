import axios from 'axios';
import { DuplicateMapping } from '../types/api';

const API_BASE_URL = 'http://127.0.0.1:8000';

export const getDuplicates = async (
    text: string,
    numSentences: number
): Promise<DuplicateMapping> => {
    const response = await axios.post<DuplicateMapping>(`${API_BASE_URL}/get-duplicates`, {
        text,
        num_sentences: numSentences,
    });
    return response.data;
};
