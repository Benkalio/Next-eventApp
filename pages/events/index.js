import { Fragment } from "react";
import { useRouter } from 'next/router';

import { getAllEvents } from "../../dummy-data";
import EventSearch from '../../components/events/event-search'
import EventList from "../../components/events/event-list";

function EventPage() {
    const router = useRouter();
    const events = getAllEvents();

    function findEventsHandler(year, month) {
        const fullPath = `/events/${year}/${month}`;
        
        router.push(fullPath);
    }

    return (
        <Fragment>
            <EventSearch onSearch={findEventsHandler} />
            <EventList items={events}/>
        </Fragment>
    );
}

export default EventPage;
