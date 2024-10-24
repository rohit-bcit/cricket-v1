import React from 'react';
import SeriesFilter from '../components/SeriesFilter';
import SeriesTable from '../components/SeriesTable';
import { seriesData } from '../assets/data'; // Adjusted to match your export

function Series() {
    const series = seriesData.series;

    // Grouping series by month
    const groupedSeries = series.reduce((acc, current) => {
        const month = current.month;
        if (!acc[month]) {
            acc[month] = [];
        }
        acc[month].push(current);
        return acc;
    }, {});

    return (
        <div>
            <SeriesFilter />
            <SeriesTable groupedSeries={groupedSeries} />
        </div>
    );
}

export default Series;
