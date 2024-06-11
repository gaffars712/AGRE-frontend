'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Filter() {

    const router = useRouter();

    const [selectedType, setSelectedType] = useState('residential');
    const [searchText, setSearchText] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedBedroom, setSelectedBedroom] = useState('');

    const handleSearch = () => {
        let query = `/properties/${selectedType}`;

        let queryParams = [];

        if (searchText) {
            queryParams.push(`searchText=${encodeURIComponent(searchText)}`);
        }

        if (selectedOption) {
            queryParams.push(`type=${encodeURIComponent(selectedOption)}`);
        }

        if (selectedBedroom) {
            queryParams.push(`bedroom=${encodeURIComponent(selectedBedroom)}`);
        }

        if (queryParams.length > 0) {
            query += `?${queryParams.join('&')}`;
        }
        if (searchText || selectedOption || selectedBedroom) {
            router.push(query);
        }
    };

    return (
        <div
            className="w-100 d-flex justify-content-center z-5 position-absolute navbar-padding filter-container"
            style={{ bottom: '-50px', width: '90%' }}
        >
            <div className="bg-backgroundClr p-3 w-100 rounded-4">
                <div className="d-flex mx-3">
                    <div
                        onClick={() => setSelectedType('residential')}
                        className="p-2 rounded-top-3"
                        style={{
                            backgroundColor: selectedType === 'residential' ? '#002245' : '',
                            cursor: 'pointer',
                        }}
                    >
                        Residential
                    </div>
                    <div
                        onClick={() => setSelectedType('commercial')}
                        className="p-2 rounded-top-3"
                        style={{
                            backgroundColor: selectedType === 'commercial' ? '#002245' : '',
                            cursor: 'pointer',
                        }}
                    >
                        Commercial
                    </div>
                </div>
                <div className="bg-white p-4 rounded-4">
                    <div className=" d-flex flex-md-row flex-column">
                        <div className="search-bar d-flex flex-md-row flex-column w-100">
                            <input
                                type="text"
                                className="form-control flex-grow-1"
                                placeholder={window.innerWidth < 768.92 ? 'Search...' : ''}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                            {selectedType == 'commercial' ?
                                <select
                                    className=" filterTypeInput form-select form-control"
                                    style={{ width: '150px' }}
                                    onChange={(e) => setSelectedOption(e.target.value)}
                                >
                                    <option value="" className=' fw-bold'>Type</option>
                                    <option value="office">Office</option>
                                    <option value="retail">Retail</option>
                                </select>
                                : <select
                                    className="filterTypeInput form-control"
                                    style={{ width: '150px' }}
                                    onChange={(e) => setSelectedOption(e.target.value)}
                                >
                                    <option value="" className=' fw-bold'>Type</option>
                                    <option value="villa">Villa</option>
                                    <option value="apartment">Apartment</option>
                                </select>}
                            {selectedType != 'commercial' && <select
                                className="filterBedroom form-control"
                                style={{ width: '150px' }}
                                onChange={(e) => setSelectedBedroom(e.target.value)}
                            >
                                <option value="" className=' fw-bold'> Bedrooms</option>
                                <option value="1">1 Bedroom</option>
                                <option value="2">2 Bedroom</option>
                                <option value="3">3 Bedroom</option>
                                <option value="4">4 Bedroom</option>
                                <option value="5">5 Bedroom</option>
                            </select>}
                        </div>
                        <button className="btn-new" style={{ width: '100px' }} onClick={handleSearch}>
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
