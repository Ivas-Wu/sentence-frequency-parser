import axios from 'axios';
import { DuplicateMapping } from '../types/api';

const API_BASE_URL = process.env.REACT_APP_API_URL;

export const getDuplicates = async (
    text: string,
    numSentences: number,
    sb: string,
    wb: string,
    exceptions: string,
): Promise<DuplicateMapping> => {
    const response = await axios.post<DuplicateMapping>(`${API_BASE_URL}/get-duplicates`, {
        text,
        num_sentences: numSentences,
        sb: sb,
        wb: wb,
        exceptions: exceptions,
    });
    return response.data;
};
