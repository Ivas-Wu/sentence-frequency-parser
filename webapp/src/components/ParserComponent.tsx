import { useState } from 'react';
import { getDuplicates } from '../services/api';
import { DuplicateMapping } from '../types/api';
import { motion } from "framer-motion";
import { Cog6ToothIcon } from '@heroicons/react/24/outline';

const ParserComponent: React.FC = () => {
    const [text, setText] = useState<string>('');
    const [numSentences, setNumSentences] = useState<number>(2);
    const [sb, setSb] = useState<string>(". ? !");
    const [wb, setWb] = useState<string>(", [ ] ( ) { } |");
    const [exception, setException] = useState<string>("a, the, of");
    const [duplicates, setDuplicates] = useState<DuplicateMapping | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);


    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        setDuplicates(null);

        try {
            const data = await getDuplicates(text, numSentences, sb, wb, exception);
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
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-semibold text-center mb-4">Frequency Checker</h1>
            <div className='flex flex row h-96'>
                <motion.div
                    initial={{ width: "0px", height: "auto", opacity: 0 }}
                    animate={{
                        width: !isOpen ? "100%" : "0px",
                        opacity: !isOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    style={{
                        overflow: "hidden",
                    }}
                >
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter your paragraph here..."
                        rows={12}
                        className="w-full mb-4 p-2 mr-4 border border-gray-300 rounded-md"
                    />
                </motion.div>
                <motion.div
                    className="flex flex-col"
                    initial={{ width: "0px", height: "0px", opacity: 0 }}
                    animate={{
                        width: isOpen ? "100%" : "0px",
                        height: isOpen ? "auto" : "0px",
                        opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    style={{
                        overflow: "hidden",
                    }}
                >
                    <div className="p-4">
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
                        <div className="mb-4">
                            <label className="block text-sm font-medium">Sentence ending characters:</label>
                            <input
                                type="string"
                                value={sb}
                                onChange={(e) => setSb(e.target.value)}
                                placeholder="Chars that notate the end of a sentence..."
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium">Sentence splitting characters:</label>
                            <input
                                type="string"
                                value={wb}
                                onChange={(e) => setWb(e.target.value)}
                                placeholder="Chars that notate a break in a sentence..."
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium">Words to ignore:</label>
                            <input
                                type="string"
                                value={exception}
                                onChange={(e) => setException(e.target.value)}
                                placeholder="Words to ignore..."
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
            <div className="flex items-end">
                {/* Cog Icon Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 flex-shrink-0"
                >
                    <Cog6ToothIcon
                        className={`w-6 h-6 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"
                            }`}
                    />
                </button>

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-grow py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none"
                >
                    {loading ? "Processing..." : "Get Duplicates"}
                </button>
            </div>



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
