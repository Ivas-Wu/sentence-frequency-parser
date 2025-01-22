import axios from 'axios';
import { DuplicateMapping, WordCountMapping } from '../types/api';

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

export const getWordCount= async (
    text: string,
    wb: string,
    breakers: string,
): Promise<WordCountMapping> => {
    const response = await axios.post<WordCountMapping>(`${API_BASE_URL}/get-wordcount`, {
        text,
        wb: wb,
        breakers: breakers,
    });
    return response.data;
};
