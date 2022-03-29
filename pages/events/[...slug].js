import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from 'swr';

import { getFilteredEvents } from "../../helper/api-utils";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

function FilteredEventsPage(props) {
    const [loadedEvents, setLoadedEvents] = useState();
    const router = useRouter();

    const filterData = router.query.slug;

    const { data, error } = useSWR('https://nextjs-clientsidedatafetch-default-rtdb.firebaseio.com/sales/events.json');

    useEffect(() => {
        if (data) {
            const events = []

            for (const key in data) {
                events.push({
                    id: key,
                    ...data[key]
                });
            }
        
            setLoadedEvents(events);
        }
    }, [data])

    if (!loadedEvents) {
        return <p className='center'>Loading...</p>;
    }

    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];

    // AUTOMATICALLY CONVERT YEAR AND MONTH TO NUMBERS 
    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    // CHECKING INVALID VALUE
    if (isNaN(numYear) ||
        isNaN(numMonth) ||
        numYear > 2030 ||
        numYear < 2021 ||
        numMonth < 1 ||
        numMonth > 12)  {
        return (
            <Fragment>
                <ErrorAlert>
                    <p>Invalid filter. Please adjust your values!</p>
                </ErrorAlert>
                <div className="center">
                    <Button link='/events'>Open All Events</Button>
                </div>
            </Fragment>  
        );
    }

    //EXTRACT DATA
    const filteredEvents = loadedEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === year &&
            eventDate.getMonth() === month - 1;
    });

    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <Fragment>
                <ErrorAlert><p>No events found for selected filter!</p></ErrorAlert>
                <div className="center">
                    <Button link='/events'>Display All Events</Button>
                </div>
            </Fragment>
        );
    }

    // 1 IS DEDUCTED FROM THE MONTH BELOW BECAUSE THE DATE CONSTRUCTOR
    // EXPECTS THE MONTH TO START IN A SERIAL FORM
    const date = new Date(numYear, numMonth - 1);

    return (
        <Fragment>
            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </Fragment>
    );
}

// export async function getServerSideProps(context) {
//     const { params } = context;

//     const filterData = params.slug;

//     const filteredYear = filterData[0];
//     const filteredMonth = filterData[1];

//     // AUTOMATICALLY CONVERT YEAR AND MONTH TO NUMBERS 
//     const numYear = +filteredYear;
//     const numMonth = +filteredMonth;

//     // CHECKING INVALID VALUE
//     if (isNaN(numYear) ||
//         isNaN(numMonth) ||
//         numYear > 2030 ||
//         numYear < 2021 ||
//         numMonth < 1 ||
//         numMonth > 12 || 
//         error) {
//         return {
//             props: { hasError: true },
//             // notFound: true,
//         };
//     }

//     // CHECKING VALID VALUE 
//     const filteredEvents = getFilteredEvents({
//         year: numYear,
//         month: numMonth
//     });

//     return {
//         props: {
//             events: filteredEvents,
//             date: {
//                 year: numYear,
//                 month: numMonth
//             }
//         }
//     }
// }

export default FilteredEventsPage;
