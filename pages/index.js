import { Fragment } from 'react';

import { getFeaturedEvents } from '../dummy-data';
import EventList from '../components/events/event-list';
import EventSearch from '../../components/events/event-search';

function RootPage() {
    const featuredEvents = getFeaturedEvents();

    return (
        <Fragment>
            <EventSearch />
            <EventList items={featuredEvents}/>
        </Fragment>
    );
}

export default RootPage;
