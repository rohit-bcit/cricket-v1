import React from 'react';
import { Schedules } from '../assets/data';
import ScheduleCard from '../components/ScheduleCard';

function Schedule() {
    const scheduleData = Schedules.tournaments;

    // Create an object to group matches by date
    const matchesByDate = {};

    scheduleData.forEach(tournament => {
        tournament.matches.forEach(match => {
            const matchDate = match.date;
            if (!matchesByDate[matchDate]) {
                matchesByDate[matchDate] = [];
            }
            matchesByDate[matchDate].push({ match, tournament });
        });
    });

    // Get an array of dates to iterate over
    const dates = Object.keys(matchesByDate).sort();

    return (
        <div className='bg-[#F5F5F5] p-5 pt-0 flex flex-col gap-5'>
            {dates.map(date => (
                <div key={date} className='mt-[15px]'>
                    {/* Date Header */}
                    <div className='bg-[#D1EEEE] text-[#292929] py-3 p-[16px] rounded-[6px] flex items-center'>
                        <h3 className='text-[#292929] text-[16px] leading-[21.09px] font-medium '>{date}</h3>
                    </div>
                    {/* Matches for the date */}
                    {matchesByDate[date].map(({ match, tournament }, matchIndex) => (
                        <div key={matchIndex} className='mb-3'>
                            <ScheduleCard match={match} tournamentName={tournament.name} tournamentType={tournament.type} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Schedule;
