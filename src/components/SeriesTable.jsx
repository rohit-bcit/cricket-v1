import React from 'react';

function SeriesTable({ groupedSeries }) {
    return (
        <div className='bg-[#F5F5F5] px-4 py-5 mb-20'>
            <div className='bg-[#D1EEEE] text-[#292929] text-[14px] leading-3 rounded-md py-3 px-4 flex gap-5 font-medium'>
                <span className='min-w-[80px]'>Month</span>
                <span className='min-w-[80px] '>Series Name</span>
            </div>
            {Object.entries(groupedSeries).map(([month, seriesList]) => (
                <div key={month} className='mt-4 flex w-full gap-5 bg-white py-4 px-3 rounded-[10px]'>
                    <div className='text-[#292929] font-medium text-[13px] leading-3 min-w-[80px]'>{month}</div>
                    <div className=' flex flex-col gap-2' >
                        {seriesList.map((series, index) => (
                            <div key={index} className='text-[#292929] flex flex-col min-w-[80px]'>
                                <span className='text-[12px] leading-4 '>{series.name}</span>
                                <span className='text-[10px] leading-3'>{series.dates}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SeriesTable;
