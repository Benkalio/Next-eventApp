import { Fragment } from "react";
import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

function FilteredEventsPage() {
    const router = useRouter();

    const filterData = router.query.slug;

    if (!filterData) {
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
        numMonth > 12) {
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

    // CHECKING VALID VALUE 
    const filteredEvents = getFilteredEvents({
        year: numYear,
        month: numMonth
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

export default FilteredEventsPage;
