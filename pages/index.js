import { Fragment } from 'react';

import { getFeaturedEvents } from '../dummy-data';
import EventList from '../components/events/event-list';
import EventsSearch from '../components/events/events-search';

function RootPage() {
    const featuredEvents = getFeaturedEvents();

    return (
        <Fragment>
            <EventsSearch />
            <EventList items={featuredEvents}/>
        </Fragment>
    );
}

export default RootPage;
