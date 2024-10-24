import cricket from '../assets/img/cricket.jpg'
import Schedule from '../pages/Schedule';

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };

    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();

    const time = new Intl.DateTimeFormat('en-US', options).format(date);

    return isToday ? `Today, ${time}` : date.toLocaleString('en-US', { weekday: 'long', hour: '2-digit', minute: '2-digit', hour12: true });
};

export const cricdata = {
    "tournaments": [
        {
            "name": "ICC Cricket World Cup",
            "type": "ODI",
            "matches": [
                {
                    "team1": {
                        "name": "India",
                        "shortName": "IND",
                        "flag": "https://www.worldometers.info/img/flags/small/tn_in-flag.gif"
                    },
                    "team2": {
                        "name": "Australia",
                        "shortName": "AUS",
                        "flag": "https://www.worldometers.info/img/flags/small/tn_as-flag.gif"
                    },
                    "time": "2024-09-26T14:00:00Z"
                },
                {
                    "team1": {
                        "name": "England",
                        "shortName": "ENG",
                        "flag": "https://www.worldometers.info/img/flags/uk-flag.gif"
                    },
                    "team2": {
                        "name": "Pakistan",
                        "shortName": "PAK",
                        "flag": "https://www.worldometers.info/img/flags/small/tn_pk-flag.gif"
                    },
                    "time": "2024-10-06T14:00:00Z"
                }
            ]
        },
        {
            "name": "Test Series - Ashes",
            "type": "Test",
            "matches": [
                {
                    "team1": {
                        "name": "Australia",
                        "shortName": "AUS",
                        "flag": "https://www.worldometers.info/img/flags/small/tn_as-flag.gif"
                    },
                    "team2": {
                        "name": "England",
                        "shortName": "ENG",
                        "flag": "https://www.worldometers.info/img/flags/uk-flag.gif"
                    },
                    "time": "2024-12-10T10:00:00Z"
                }
            ]
        },
        {
            "name": "T20 World Cup",
            "type": "T20",
            "matches": [
                {
                    "team1": {
                        "name": "West Indies",
                        "shortName": "WI",
                        "flag": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIsrc2P7xiJkItmP7c16ZDxYAKDKoGQ73Uwg&s"
                    },
                    "team2": {
                        "name": "South Africa",
                        "shortName": "SA",
                        "flag": "https://www.worldometers.info/img/flags/sf-flag.gif"
                    },
                    "time": "2024-11-20T18:00:00Z"
                }
            ]
        }
    ]
};

export const blog = {
    "blogs": [
        {
            "title": "Guileful Afghanistan, New Conditions Pose Fresh Challenge for India",
            "category": "T20 WORLD CUP - SUPER EIGHT",
            "description": "Rohit Sharma's men will play their first game in West Indies while Afghanistan have already started their campaign here.",
            "img": cricket,
            "similar": ["Barbados Data Watch: More Runs & Better Returns for Space When Bumrah The Kohli Roar", "David Pleased with India’s Flexibility Across Varied Conditions"],
            "date": "Sep 27 2024"
        },
        {
            "title": "Bairstow's Explosive Innings",
            "category": "T20 WORLD CUP, 2024",
            "description": "Jonny Bairstow's powerful batting secured a crucial victory for the team.",
            "img": cricket,
            "similar": ["Salt Pleased with ‘First Step in Right Direction"],
            "date": "Sep 26 2024"
        },
        {
            "title": "The Rise of T20 Cricket",
            "category": "Cricket",
            "description": "Exploring the popularity and impact of T20 format in modern cricket.",
            "img": cricket,
            "similar": ["Barbados Data Watch: More Runs & Better Returns for Space When Bumrah The Kohli Roar", "David Pleased with India’s Flexibility Across Varied Conditions"],
            "date": "Sep 25 2024"
        },
        {
            "title": "Top Bowlers of the Year",
            "category": "Cricket",
            "description": "A look at the standout bowlers who made an impact this season.",
            "img": cricket,
            "similar": ["Barbados Data Watch: More Runs & Better Returns for Space When Bumrah The Kohli Roar", "David Pleased with India’s Flexibility Across Varied Conditions"],
            "date": "Sep 24 2024"
        },
        {
            "title": "Historic Matches: A Retrospective",
            "category": "Cricket",
            "description": "Reflecting on some of the most thrilling matches in cricket history.",
            "img": cricket,
            "similar": ["Barbados Data Watch: More Runs & Better Returns for Space When Bumrah The Kohli Roar", "David Pleased with India’s Flexibility Across Varied Conditions"],
            "date": "Sep 23 2024"
        },
        {
            "title": "Emerging Talents in Cricket",
            "category": "Cricket",
            "description": "Highlighting the young players who are set to shape the future of the game.",
            "img": cricket,
            "similar": ["Barbados Data Watch: More Runs & Better Returns for Space When Bumrah The Kohli Roar", "David Pleased with India’s Flexibility Across Varied Conditions"],
            "date": "Sep 22 2024"
        }
    ]
};



export const recentMatches = {
    "tournaments": {
        "ICC Cricket World Cup": {
            "type": "ODI",
            "matches": [
                {
                    "team1": {
                        "name": "India",
                        "shortName": "IND",
                        "flag": "https://www.worldometers.info/img/flags/small/tn_in-flag.gif"
                    },
                    "team2": {
                        "name": "Australia",
                        "shortName": "AUS",
                        "flag": "https://www.worldometers.info/img/flags/small/tn_as-flag.gif"
                    },
                    "result": "India won by 10 runs",
                    "scorecard": "250/6 (50)",
                    "scores": {
                        "team1": "250/6 (50)",
                        "team2": "240/10 (49)"
                    }
                },
                {
                    "team1": {
                        "name": "England",
                        "shortName": "ENG",
                        "flag": "https://www.worldometers.info/img/flags/uk-flag.gif"
                    },
                    "team2": {
                        "name": "Pakistan",
                        "shortName": "PAK",
                        "flag": "https://www.worldometers.info/img/flags/small/tn_pk-flag.gif"
                    },
                    "result": "England won by 10 runs",
                    "scorecard": "300/8 (50)",
                    "scores": {
                        "team1": "300/8 (50)",
                        "team2": "290/10 (49)"
                    }
                }
            ]
        },
        "Test Series - Ashes": {
            "type": "Test",
            "matches": [
                {
                    "team1": {
                        "name": "Australia",
                        "shortName": "AUS",
                        "flag": "https://www.worldometers.info/img/flags/small/tn_as-flag.gif"
                    },
                    "team2": {
                        "name": "England",
                        "shortName": "ENG",
                        "flag": "https://www.worldometers.info/img/flags/uk-flag.gif"
                    },
                    "result": "Australia won by 50 runs",
                    "scorecard": "450 all out (120)",
                    "scores": {
                        "team1": "450 all out (120)",
                        "team2": "400 all out (120)"
                    }
                }
            ]
        },
        "T20 World Cup": {
            "type": "T20",
            "matches": [
                {
                    "team1": {
                        "name": "West Indies",
                        "shortName": "WI",
                        "flag": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIsrc2P7xiJkItmP7c16ZDxYAKDKoGQ73Uwg&s"
                    },
                    "team2": {
                        "name": "South Africa",
                        "shortName": "SA",
                        "flag": "https://www.worldometers.info/img/flags/sf-flag.gif"
                    },
                    "result": "West Indies won by 9 wickets",
                    "scorecard": "130/1 (10.5)",
                    "scores": {
                        "team1": "130/1 (10.5)",
                        "team2": "129/10 (20)"
                    }
                }
            ]
        },
        "Asia Cup": {
            "type": "ODI",
            "matches": [
                {
                    "team1": {
                        "name": "Bangladesh",
                        "shortName": "BAN",
                        "flag": "https://www.worldometers.info/img/flags/small/tn_bd-flag.gif"
                    },
                    "team2": {
                        "name": "Sri Lanka",
                        "shortName": "SL",
                        "flag": "https://t3.ftcdn.net/jpg/01/05/11/84/360_F_105118431_yqpI8jozDeRLAXmWVk5P9dIoI6DkXmiL.jpg"
                    },
                    "result": "Bangladesh won by 5 wickets",
                    "scorecard": "128 (19.5)",
                    "scores": {
                        "team1": "128/5 (19.5)",
                        "team2": "120/10 (20)"
                    }
                }
            ]
        },
        "International Test Series": {
            "type": "Test",
            "matches": [
                {
                    "team1": {
                        "name": "South Africa",
                        "shortName": "SA",
                        "flag": "https://www.worldometers.info/img/flags/sf-flag.gif"
                    },
                    "team2": {
                        "name": "New Zealand",
                        "shortName": "NZ",
                        "flag": "https://www.worldometers.info/img/flags/small/tn_nz-flag.gif"
                    },
                    "result": "South Africa won by 25 runs",
                    "scorecard": "325 all out (95)",
                    "scores": {
                        "team1": "325 all out (95)",
                        "team2": "300 all out (100)"
                    }
                }
            ]
        }
    }
};


export const cricketflag = {
    "teams": [
        {
            "name": "India",
            "shortName": "IND",
            "flag": "https://www.worldometers.info/img/flags/small/tn_in-flag.gif"
        },
        {
            "name": "Australia",
            "shortName": "AUS",
            "flag": "https://www.worldometers.info/img/flags/small/tn_as-flag.gif"
        },
        {
            "name": "England",
            "shortName": "ENG",
            "flag": "https://www.worldometers.info/img/flags/uk-flag.gif"
        },
        {
            "name": "Pakistan",
            "shortName": "PAK",
            "flag": "https://www.worldometers.info/img/flags/small/tn_pk-flag.gif"
        },
        {
            "name": "South Africa",
            "shortName": "SA",
            "flag": "https://www.worldometers.info/img/flags/sf-flag.gif"
        },
        {
            "name": "West Indies",
            "shortName": "WI",
            "flag": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIsrc2P7xiJkItmP7c16ZDxYAKDKoGQ73Uwg&s"
        },
        {
            "name": "New Zealand",
            "shortName": "NZ",
            "flag": "https://www.worldometers.info/img/flags/small/tn_nz-flag.gif"
        },
        {
            "name": "Sri Lanka",
            "shortName": "SL",
            "flag": "https://t3.ftcdn.net/jpg/01/05/11/84/360_F_105118431_yqpI8jozDeRLAXmWVk5P9dIoI6DkXmiL.jpg"
        },
        {
            "name": "Bangladesh",
            "shortName": "BAN",
            "flag": "https://www.worldometers.info/img/flags/small/tn_bd-flag.gif"
        },
        {
            "name": "Afghanistan",
            "shortName": "AFG",
            "flag": "https://www.worldometers.info/img/flags/small/tn_af-flag.gif"
        }
    ]
}


export const Schedules = {
    "tournaments": [
        {
            "name": "ICC Cricket World Cup",
            "type": "ODI",
            "matches": [
                {
                    "team1": {
                        "name": "India",
                        "shortName": "IND",
                        "flag": "https://www.worldometers.info/img/flags/small/tn_in-flag.gif"
                    },
                    "team2": {
                        "name": "Australia",
                        "shortName": "AUS",
                        "flag": "https://www.worldometers.info/img/flags/small/tn_as-flag.gif"
                    },
                    "date": "SUN, SEP 26 2024",
                    "time": "8:00 PM - 02:30 PM GMT/10:30 AM LOCAL"
                },
                {
                    "team1": {
                        "name": "New Zealand",
                        "shortName": "NZ",
                        "flag": "https://www.worldometers.info/img/flags/small/tn_nz-flag.gif"
                    },
                    "team2": {
                        "name": "Sri Lanka",
                        "shortName": "SL",
                        "flag": "https://t3.ftcdn.net/jpg/01/05/11/84/360_F_105118431_yqpI8jozDeRLAXmWVk5P9dIoI6DkXmiL.jpg"
                    },
                    "date": "SUN, SEP 26 2024",
                    "time": "2:00 PM - 08:30 AM GMT/06:30 AM LOCAL"
                },
                {
                    "team1": {
                        "name": "South Africa",
                        "shortName": "SA",
                        "flag": "https://www.worldometers.info/img/flags/sf-flag.gif"
                    },
                    "team2": {
                        "name": "Bangladesh",
                        "shortName": "BAN",
                        "flag": "https://www.worldometers.info/img/flags/small/tn_bd-flag.gif"
                    },
                    "date": "SUN, SEP 26 2024",
                    "time": "10:30 AM - 05:00 AM GMT/03:00 AM LOCAL"
                },
                {
                    "team1": {
                        "name": "Pakistan",
                        "shortName": "PAK",
                        "flag": "https://www.worldometers.info/img/flags/small/tn_pk-flag.gif"
                    },
                    "team2": {
                        "name": "West Indies",
                        "shortName": "WI",
                        "flag": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIsrc2P7xiJkItmP7c16ZDxYAKDKoGQ73Uwg&s"
                    },
                    "date": "SUN, SEP 26 2024",
                    "time": "5:00 PM - 11:30 AM GMT/07:30 AM LOCAL"
                }
            ]
        },
        {
            "name": "Test Series - Ashes",
            "type": "Test",
            "matches": [
                {
                    "team1": {
                        "name": "Australia",
                        "shortName": "AUS",
                        "flag": "https://www.worldometers.info/img/flags/small/tn_as-flag.gif"
                    },
                    "team2": {
                        "name": "England",
                        "shortName": "ENG",
                        "flag": "https://www.worldometers.info/img/flags/uk-flag.gif"
                    },
                    "date": "TUE, DEC 10 2024",
                    "time": "8:00 PM - 02:30 PM GMT/10:30 AM LOCAL"
                },
                {
                    "team1": {
                        "name": "Australia",
                        "shortName": "AUS",
                        "flag": "https://www.worldometers.info/img/flags/small/tn_as-flag.gif"
                    },
                    "team2": {
                        "name": "England",
                        "shortName": "ENG",
                        "flag": "https://www.worldometers.info/img/flags/uk-flag.gif"
                    },
                    "date": "TUE, DEC 10 2024",
                    "time": "3:00 PM - 09:30 AM GMT/04:30 AM LOCAL"
                }
            ]
        },
        {
            "name": "T20 World Cup",
            "type": "T20",
            "matches": [
                {
                    "team1": {
                        "name": "West Indies",
                        "shortName": "WI",
                        "flag": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIsrc2P7xiJkItmP7c16ZDxYAKDKoGQ73Uwg&s"
                    },
                    "team2": {
                        "name": "South Africa",
                        "shortName": "SA",
                        "flag": "https://www.worldometers.info/img/flags/sf-flag.gif"
                    },
                    "date": "WED, NOV 20 2024",
                    "time": "8:00 PM - 02:30 PM GMT/10:30 AM LOCAL"
                },
                {
                    "team1": {
                        "name": "India",
                        "shortName": "IND",
                        "flag": "https://www.worldometers.info/img/flags/small/tn_in-flag.gif"
                    },
                    "team2": {
                        "name": "Pakistan",
                        "shortName": "PAK",
                        "flag": "https://www.worldometers.info/img/flags/small/tn_pk-flag.gif"
                    },
                    "date": "WED, NOV 20 2024",
                    "time": "3:00 PM - 09:30 AM GMT/04:30 AM LOCAL"
                }
            ]
        }
    ]
}

export const cricketArchives = {
    "cricketTours": {
        "international": [
            {
                "title": "Serbia tour of Slovenia, 2024",
                "dates": "Jun 29 - Jun 30"
            },
            {
                "title": "India tour of Australia, 2024",
                "dates": "Jan 15 - Jan 30"
            },
            {
                "title": "South Africa tour of New Zealand, 2024",
                "dates": "Feb 10 - Feb 25"
            }
        ],
        "domestic": [
            {
                "title": "State Championship Finals, 2024",
                "dates": "Mar 5 - Mar 7"
            },
            {
                "title": "City League: Summer Edition, 2024",
                "dates": "Apr 12 - Apr 30"
            },
            {
                "title": "Regional T20 Tournament, 2024",
                "dates": "May 1 - May 15"
            }
        ],
        "t20": [
            {
                "title": "T20 World Cup, 2024",
                "dates": "Oct 1 - Oct 15"
            },
            {
                "title": "T20 Series: India vs Australia, 2024",
                "dates": "Sep 20 - Sep 30"
            }
        ],
        "women": [
            {
                "title": "Women’s World Cup, 2024",
                "dates": "Mar 5 - Apr 10"
            },
            {
                "title": "Women’s T20 Challenge, 2024",
                "dates": "May 20 - May 30"
            }
        ]
    }
};

export const seriesData = {
    "series": [
        {
            "month": "April 2024",
            "name": "County Championship Division One 2024",
            "dates": "Apr 05 - Sep 29"
        },
        {
            "month": "April 2024",
            "name": "Domestic T20 League 2024",
            "dates": "Apr 15 - May 10"
        },
        {
            "month": "May 2024",
            "name": "Indian Premier League 2024",
            "dates": "May 01 - May 29"
        },
        {
            "month": "May 2024",
            "name": "International ODI Series: Australia vs South Africa",
            "dates": "May 15 - May 30"
        },
        {
            "month": "June 2024",
            "name": "International T20 Series: England vs India",
            "dates": "Jun 10 - Jun 25"
        },
        {
            "month": "June 2024",
            "name": "T20 Blast 2024",
            "dates": "Jun 15 - Aug 01"
        },
        {
            "month": "July 2024",
            "name": "Ashes Series 2024",
            "dates": "Jul 05 - Aug 30"
        },
        {
            "month": "August 2024",
            "name": "Asia Cup 2024",
            "dates": "Aug 15 - Sep 01"
        },
        {
            "month": "August 2024",
            "name": "Women's T20 Challenge 2024",
            "dates": "Aug 20 - Aug 30"
        }
    ]
};



