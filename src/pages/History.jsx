import React from 'react';
import HistorySection from '../components/HistorySection';
import { cricketArchives } from '../assets/data.js';

function History() {
    const archivesMatch = cricketArchives.cricketTours;
    const internationalArchives = archivesMatch.international;
    const domesticArchives = archivesMatch.domestic;
    const t20Archives = archivesMatch.t20;
    const womenArchives = archivesMatch.women;

    return (
        <div className='bg-[#F5F5F5] py-5 px-4 mb-20'>
            <h2 className='text-[#292929] font-semibold text-[16px] leading-[18.75px] uppercase'>
                Cricket Match Archives
            </h2>
            <p className='text-[#292929] font-semibold text-[14px] leading-[16.41px] mt-2'>
                2024
            </p>

            {/* International Section */}
            <HistorySection heading="International" archives={internationalArchives} />

            {/* Domestic Section */}
            <HistorySection heading="Domestic" archives={domesticArchives} />
            {/* T20 Section */}
            <HistorySection heading="Women" archives={womenArchives} />
            {/* Women Section */}
            <HistorySection heading="T20" archives={t20Archives} />
        </div>
    );
}

export default History;
