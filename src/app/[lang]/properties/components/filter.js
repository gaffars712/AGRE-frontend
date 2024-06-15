import { usePathname } from 'next/navigation';


export default function Filter({ params, handleSearch, search, setSearch, selectedOption, setSelectedOption, selectedBedroom, setSelectedBedroom }) {
    const pathname = usePathname();
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
                        {pathname.includes('commercial') ? 'Commercial' : "Residential"}
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
                                    <option value="" className='fw-bold'>Type</option>
                                    <option value="office">Office</option>
                                    <option value="retail">Retail</option>
                                </select>
                                :
                                <select
                                    value={selectedOption}
                                    className="filterTypeInput form-control"
                                    style={{ width: '150px' }}
                                    onChange={(e) => setSelectedOption(e.target.value)}
                                >
                                    <option value="" className='fw-bold'>Type</option>
                                    <option value="villa">Villa</option>
                                    <option value="apartment">Apartment</option>
                                </select>}
                            {pathname.includes('residential') && <select
                                value={selectedBedroom}
                                className="filterBedroom form-control"
                                style={{ width: '150px' }}
                                onChange={(e) => setSelectedBedroom(e.target.value)}
                            >
                                <option value="" className='fw-bold'> Bedrooms</option>
                                <option value="1">1 Bedroom</option>
                                <option value="2">2 Bedroom</option>
                                <option value="3">3 Bedroom</option>
                                <option value="4">4 Bedroom</option>
                                <option value="5">5 Bedroom</option>
                            </select>}
                        </div>
                        <button className={` ${params?.lang === 'en' ? 'btn-new' : 'btn-new-ar'}`} style={{ width: '100px' }} onClick={handleSearch}>
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
