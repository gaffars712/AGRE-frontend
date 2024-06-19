import { usePathname } from 'next/navigation';


export default function Filter({ typeLabels, params, handleSearch, search, setSearch, selectedOption, setSelectedOption, selectedBedroom, setSelectedBedroom }) {
    const pathname = usePathname();
    console.log(typeLabels);
    return (
        <div className="w-100 d-flex justify-content-center z-5 mb-5">
            <div className="bg-backgroundClr p-3 w-100 rounded-4">
                <div className="d-flex mx-3">
                    <div
                        className="p-2 rounded-top-3 text-white"
                        style={{
                            backgroundColor: '#002245',
                        }}
                    >
                        {pathname.includes('commercial') ? typeLabels?.titleTwo : typeLabels?.titleOne}
                    </div>
                </div>
                <div className="bg-white p-4 rounded-4">
                    <div className=" d-flex flex-md-row flex-column">
                        <div className={`${params?.lang === 'en' ? 'search-bar' : 'search-bar-ar'}  d-flex flex-md-row flex-column w-100`}>
                            <input
                                value={search}
                                type="text"
                                // placeholder={window.innerWidth < 768.92 ? 'Search...' : ''}
                                className="form-control flex-grow-1"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            {pathname.includes('commercial') ?
                                <select
                                    value={selectedOption}
                                    className="filterTypeInput form-control"
                                    style={{ width: '150px' }}
                                    onChange={(e) => setSelectedOption(e.target.value)}
                                >
                                    {typeLabels?.typesCommercial && params?.lang === 'en'
                                        ?
                                        typeLabels?.typesCommercial && typeLabels?.typesCommercial.map((item, i) => {
                                            return (
                                                <option key={i} value={item === "Type" ? '' : item} className={`${item === "Type" ? "fw-bold" : ''}`}>{item}</option>
                                            )
                                        })
                                        :
                                        typeLabels?.typesCommercialAR && typeLabels?.typesCommercialAR.map((item, i) => {
                                            return (
                                                <option key={i} value={item === "Type" ? '' : item} className={`${item === "Type" ? "fw-bold" : ''}`}>{item}</option>
                                            )
                                        })

                                    }
                                </select>
                                :
                                <select
                                    value={selectedOption}
                                    className="filterTypeInput form-control"
                                    style={{ width: '150px' }}
                                    onChange={(e) => setSelectedOption(e.target.value)}
                                >
                                    {typeLabels?.types && params?.lang === 'en'
                                        ?
                                        typeLabels?.types && typeLabels?.types.map((item, i) => {
                                            return (
                                                <option key={i} value={item === "Type" ? '' : item} className={`${item === "Type" ? "fw-bold" : ''} `}>{item}</option>
                                            )
                                        })
                                        :
                                        typeLabels?.typesAR && typeLabels?.typesAR.map((item, i) => {
                                            return (
                                                <option key={i} value={item === "Type" ? '' : item} className={`${item === "Type" ? "fw-bold" : ''} `}>{item}</option>
                                            )
                                        })
                                    }
                                </select>}
                            {pathname.includes('residential') && <select
                                value={selectedBedroom}
                                className="filterBedroom form-control"
                                style={{ width: '150px' }}
                                onChange={(e) => setSelectedBedroom(e.target.value)}
                            >
                                {typeLabels?.bedRooms && params?.lang === 'en'
                                    ?
                                    typeLabels?.bedRooms && typeLabels?.bedRooms.map((item, i) => {
                                        return (
                                            <option key={i} value={item === "Badrooms" ? '' : item} className={`${item === "Badrooms" ? "fw-bold" : ''} `}>{item}</option>
                                        )
                                    })
                                    :
                                    typeLabels?.bedRoomsAR && typeLabels?.bedRoomsAR.map((item, i) => {
                                        return (
                                            <option key={i} value={item === "Badrooms" ? '' : item} className={`${item === "Badrooms" ? "fw-bold" : ''} `}>{item}</option>
                                        )
                                    })
                                }
                            </select>}
                        </div>
                        <button className={` ${params?.lang === 'en' ? 'btn-new' : 'btn-new-ar'}`} style={{ width: '100px' }} onClick={handleSearch}>
                        {typeLabels?.SearchBTN ? typeLabels?.SearchBTN : 'Search'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
