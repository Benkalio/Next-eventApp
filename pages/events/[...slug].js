import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from 'swr';
import Head from "next/head";

import { getFilteredEvents } from "../../helper/api-util";
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
    }, [data]);

    let pageHeadData = (
        <Head>
            <title>Filtered Events</title>
            <meta
                name='description'
                content={`List of filtered events.`}
            />
        </Head>
    )

    if (!loadedEvents) {
        return (
            <Fragment>
                {pageHeadData}
                <p className='center'>Loading...</p>
            </Fragment>
        );
    }

    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];

// AUTOMATICALLY CONVERT YEAR AND MONTH TO NUMBERS 
    const numYear = +filteredYear;
    const numMonth = +filteredMonth;


//VARIABLE THAT HOLDS THE REUSABLE HEAD AND META DATA VALUES
    pageHeadData = (
        <Head>
            <title>Filtered Events</title>
            <meta
                name='description'
                content={`All events for ${numMonth}/${numYear}.`}
            />
        </Head>
    );

    // CHECKING INVALID VALUE
    if (isNaN(numYear) ||
        isNaN(numMonth) ||
        numYear > 2030 ||
        numYear < 2021 ||
        numMonth < 1 ||
        numMonth > 12)  {
        return (
            <Fragment>
                {pageHeadData}
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
                {pageHeadData}
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
            {pageHeadData}
            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </Fragment>
    );
}


export default FilteredEventsPage;
