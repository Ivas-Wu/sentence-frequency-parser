import { useState } from 'react';
import { getDuplicates } from '../services/api';
import { DuplicateMapping } from '../types/api';

const ParserComponent: React.FC = () => {
    const [text, setText] = useState<string>('');
    const [numSentences, setNumSentences] = useState<number>(2);
    const [duplicates, setDuplicates] = useState<DuplicateMapping | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        setDuplicates(null);

        try {
            const data = await getDuplicates(text, numSentences);
            setDuplicates(data);
        } catch (err) {
            setError('Failed to fetch data from the server.');
        } finally {
            setLoading(false);
        }
    };

    const renderTextWithHighlights = (duplicates: DuplicateMapping) => {    
        let highlightedText = [];
        let count = 0;
    
        for (let i = 0; i < duplicates.originalString.length; i++) {
            const char = duplicates.originalString[i];
            count += duplicates.mapping[i];
    
            if (count > 0) {
                highlightedText.push(
                    <span key={i} className="bg-yellow-300">{char}</span>
                );
            } else {
                highlightedText.push(
                    <span key={i}>{char}</span>
                );
            }
        }
    
        return <>{highlightedText}</>;
    };    

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-3xl font-semibold text-center mb-4">Frequency Checker</h1>

            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your paragraph here..."
                rows={6}
                className="w-full mb-4 p-2 border border-gray-300 rounded-md"
            />

            <div className="mb-4">
                <label className="block text-sm font-medium">Number of Sentences:</label>
                <input
                    type="number"
                    value={numSentences}
                    onChange={(e) => setNumSentences(Number(e.target.value))}
                    min={1}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
            </div>

            <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none"
            >
                {loading ? 'Processing...' : 'Get Duplicates'}
            </button>

            {error && <p className="text-red-600 mt-4">{error}</p>}

            {duplicates && (
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold mb-2">Text with Duplicates Highlighted:</h2>
                    <div className="text-lg leading-relaxed">
                        {renderTextWithHighlights(duplicates)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ParserComponent;
