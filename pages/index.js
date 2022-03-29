import { Fragment } from 'react';

import { getFeaturedEvents } from '../helpers/api-utils';
import EventList from '../components/events/event-list';
import EventsSearch from '../components/events/events-search';

function RootPage(props) {
    return (
        <Fragment>
            <EventsSearch />
            <EventList items={props.events}/>
        </Fragment>
    );
}

// USING GETSTATICPROPS FOR STATIC GENERATION
export async function getStaticProps() {
    const featuredEvents = await getFeaturedEvents();
    return {
        props: {
            events: featuredEvents 
        },
        revalidate: 1800
    }
}

export default RootPage;
