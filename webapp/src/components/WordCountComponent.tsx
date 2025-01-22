import { useState } from 'react';
import { getDuplicates, getWordCount } from '../services/api';
import { DuplicateMapping, WordCountMapping } from '../types/api';
import { motion } from "framer-motion";
import { Cog6ToothIcon } from '@heroicons/react/24/outline';

const WordCountComponent: React.FC = () => {
    const [text, setText] = useState<string>('');
    const [breakers, setBreakers] = useState<string>("() \"\"");
    const [wb, setWb] = useState<string>(",");
    const [wordCount, setWordCount] = useState<WordCountMapping | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);


    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        setWordCount(null);

        try {
            const data = await getWordCount(text, wb, breakers);
            setWordCount(data);
        } catch (err) {
            setError('Failed to fetch data from the server.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-semibold text-center mb-4">Word Counter</h1>
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
                        rows={14}
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
                            <label className="block text-sm font-medium">Breakers:</label>
                            <input
                                type="string"
                                value={breakers}
                                onChange={(e) => setBreakers(e.target.value)}
                                min={1}
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
                    </div>
                </motion.div>
            </div>
            <div className="flex items-end">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`px-4 py-2 ${isOpen ? "bg-gray-300 text-gray-600 rounded-md hover:bg-gray-400" : "bg-gray-600 text-gray-200 rounded-md hover:bg-gray-700"}  flex-shrink-0`}
                >
                    <Cog6ToothIcon
                        className={`w-6 h-6 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
                    />
                </button>

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-grow py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none"
                >
                    {loading ? "Processing..." : "Get Word Count"}
                </button>
            </div>



            {error && <p className="text-red-600 mt-4">{error}</p>}

            {wordCount && (
                <div className="mt-6">
                    <div className="text-lg leading-relaxed">
                        Total Word Count: {wordCount.totalCount} <br />
                        W/O Breaker Text: {wordCount.count} 
                    </div>
                </div>
            )}
        </div>
    );
};

export default WordCountComponent;
