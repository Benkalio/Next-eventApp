import { Fragment } from "react";

import { getAllEvents } from "../../dummy-data";
import EventSearch from '../../components/events/event-search'
import EventList from "../../components/events/event-list";

function EventPage() {
    const events = getAllEvents();

    return (
        <Fragment>
            <EventSearch />
            <EventList items={events}/>
        </Fragment>
    );
}

export default EventPage;
