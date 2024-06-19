'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Filter({ params, filters }) {
    console.log(params);

    const router = useRouter();

    const [selectedType, setSelectedType] = useState(filters?.titleOne);
    const [searchText, setSearchText] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedBedroom, setSelectedBedroom] = useState('');

    const handleSearch = () => {
        let query;
        if (selectedType === 'سكني' && params?.lang === 'ar') {
            query = `/properties/residential`;
        } else if (selectedType === 'تجاري' && params?.lang === 'ar') {
            query = `/properties/commercial`;
        }else{
          let  lowercase = selectedType.toLowerCase()
            query = `/properties/${lowercase}`
        }

        let queryParams = [];

        if (searchText) {
            queryParams.push(`searchText=${encodeURIComponent(searchText)}`);
        }

        if (selectedOption) {
            queryParams.push(`type=${encodeURIComponent(selectedOption)}`);
        }

        if (selectedBedroom) {
            queryParams.push(`bedroom=${encodeURIComponent(selectedBedroom[0])}`);
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
                        onClick={() => setSelectedType(filters?.titleOne)}
                        className="p-2 rounded-top-3"
                        style={{
                            backgroundColor: selectedType === filters?.titleOne ? '#002245' : '',
                            cursor: 'pointer',
                        }}
                    >
                        {filters?.titleOne}
                    </div>
                    <div
                        onClick={() => setSelectedType(filters?.titleTwo)}
                        className="p-2 rounded-top-3"
                        style={{
                            backgroundColor: selectedType === filters?.titleTwo ? '#002245' : '',
                            cursor: 'pointer',
                        }}
                    >
                        {filters?.titleTwo}
                    </div>
                </div>
                <div className="bg-white p-4 rounded-4">
                    <div className=" d-flex flex-md-row flex-column">
                        <div className={` ${params?.lang === 'en' ? 'search-bar' : 'search-bar-ar'}  d-flex flex-md-row flex-column w-100`}>
                            <input
                                type="text"
                                className="form-control flex-grow-1"
                                // placeholder={window.innerWidth < 768.92 ? 'Search...' : ''}
                                placeholder={filters?.searchPlaceholder}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                            {selectedType == filters?.titleTwo ?
                                <select
                                    className=" filterTypeInput form-select form-control"
                                    style={{ width: '150px' }}
                                    onChange={(e) => setSelectedOption(e.target.value)}
                                >
                                    {filters?.typesCommercial && params?.lang === 'en'
                                        ?
                                        filters?.typesCommercial && filters?.typesCommercial.map((item, i) => {
                                            return (
                                                <option key={i} value={item === "Type" ? '' : item} className={`${item === "Type" ? "fw-bold" : ''}`}>{item}</option>
                                            )
                                        })
                                        :
                                        filters?.typesCommercialAR && filters?.typesCommercialAR.map((item, i) => {
                                            return (
                                                <option key={i} value={item === "Type" ? '' : item} className={`${item === "Type" ? "fw-bold" : ''}`}>{item}</option>
                                            )
                                        })

                                    }
                                </select>
                                : <select
                                    className="filterTypeInput form-control"
                                    style={{ width: '150px' }}
                                    onChange={(e) => setSelectedOption(e.target.value)}
                                >
                                    {filters?.types && params?.lang === 'en'
                                        ?
                                        filters?.types && filters?.types.map((item, i) => {
                                            return (
                                                <option key={i} value={item === "Type" ? '' : item} className={`${item === "Type" ? "fw-bold" : ''} `}>{item}</option>
                                            )
                                        })
                                        :
                                        filters?.typesAR && filters?.typesAR.map((item, i) => {
                                            return (
                                                <option key={i} value={item === "Type" ? '' : item} className={`${item === "Type" ? "fw-bold" : ''} `}>{item}</option>
                                            )
                                        })
                                    }
                                </select>}
                            {selectedType != filters?.titleTwo && <select
                                className="filterBedroom form-control"
                                style={{ width: '150px' }}
                                onChange={(e) => setSelectedBedroom(e.target.value)}
                            >
                                {filters?.bedRooms && params?.lang === 'en'
                                    ?
                                    filters?.bedRooms && filters?.bedRooms.map((item, i) => {
                                        return (
                                            <option key={i} value={item === "Badrooms" ? '' : item} className={`${item === "Badrooms" ? "fw-bold" : ''} `}>{item}</option>
                                        )
                                    })
                                    :
                                    filters?.bedRoomsAR && filters?.bedRoomsAR.map((item, i) => {
                                        return (
                                            <option key={i} value={item === "Badrooms" ? '' : item} className={`${item === "Badrooms" ? "fw-bold" : ''} `}>{item}</option>
                                        )
                                    })
                                }
                            </select>}
                        </div>
                        <button className={`${params?.lang === 'en' ? 'btn-new' : 'btn-new-ar'}`} style={{ width: '100px' }} onClick={handleSearch}>
                            {filters?.SearchBTN ? filters?.SearchBTN : 'Search'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
