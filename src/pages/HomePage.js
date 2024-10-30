import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = () => {
    const [countries, setCountries] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [regionFilter, setRegionFilter] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all');
                setCountries(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch country data');
                setLoading(false);
            }
        };
        fetchCountries();
    }, []);

    // Filter countries based on search and region filter
    const filteredCountries = countries.filter(country => {
        const matchesSearch = country.name.common.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRegion = regionFilter ? country.region === regionFilter : true;
        return matchesSearch && matchesRegion;
    });

    if (loading) {
        return <p className="text-center text-gray-500">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="bg-gray-50 min-h-screen">

            <header className="w-full bg-white shadow-lg flex justify-between items-center p-4">
                <h1 className="text-md font-bold">Where in the world?</h1>


                <div className="flex items-center text-sm font-medium text-gray-600 cursor-pointer">

                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M17.293 13.293a8 8 0 01-9.586-9.586 8 8 0 1010.313 10.313 7.968 7.968 0 01-.727-.727z" />
                    </svg>
                    Dark Mode
                </div>
            </header>

            <div className="md:ml-10 flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-20 p-4">
                {/* Searching functionality */}
                <div className="flex items-center border rounded-lg bg-white shadow-sm p-2 w-full md:w-1/2">

                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m-2.65-4.65a7 7 0 1114 0 7 7 0 01-14 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search for a country..."
                        className="outline-none w-full text-gray-700"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                {/* DD */}
                <div className="relative w-full md:w-1/3">
                    <select
                        value={regionFilter}
                        onChange={(e) => setRegionFilter(e.target.value)}
                        className="md:ml-20 block w-full border bg-white rounded-lg shadow-sm p-2 text-gray-700"
                    >
                        <option value="">Filter by Region</option>
                        <option value="Africa">Africa</option>
                        <option value="Americas">Americas</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="Oceania">Oceania</option>
                    </select>
                </div>
            </div>


            <div className="container mx-auto p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {filteredCountries.map((country) => (
                        <div
                            key={country.cca3}
                            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 border border-gray-200"
                        >

                            <img
                                src={country.flags.png}
                                alt={`${country.name.common} flag`}
                                className="w-full h-40 object-cover rounded-t-lg"
                            />

                            {/* country info. */}
                            <div className="p-6">
                                <h2 className="text-lg font-semibold mb-2">{country.name.common}</h2>
                                <p className="text-gray-700 mb-1">
                                    <strong>Population:</strong> {country.population.toLocaleString()}
                                </p>
                                <p className="text-gray-700 mb-1">
                                    <strong>Region:</strong> {country.region}
                                </p>
                                <p className="text-gray-700">
                                    <strong>Capital:</strong> {country.capital ? country.capital[0] : 'N/A'}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
