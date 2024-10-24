import React from 'react';
import { recentMatches } from '../assets/data.js';
import MatchCard from './MatchCard.jsx';
import Button from './Button.jsx';

function RecentMatch() {
    // Extract tournaments from recentMatches
    const tournaments = recentMatches.tournaments;


    return (
        <div className='flex flex-col bg-[#F5F5F5] pt-0 p-5 mb-20'>
            {Object.entries(tournaments).map(([tournamentKey, tournament]) => {
                return (
                    <div className='mt-5 flex flex-col gap-[5px]' key={tournamentKey}>
                        <h2 className='text-[#292929] text-[16px] leading-[18.75px] font-semibold uppercase'>{tournamentKey}</h2>
                        {tournament.matches.map((match, index) => (
                            <MatchCard
                                key={index}
                                match={match}
                                tournamentName={tournamentKey}
                                tournamentType={tournament.type}
                            />
                        ))}
                        <Button />
                    </div>
                );
            })}
        </div>
    );
}

export default RecentMatch;
