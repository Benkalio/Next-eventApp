import Head from 'next/head';
import { Fragment } from 'react';

import { getFeaturedEvents } from '../helper/api-util';
import EventList from '../components/events/event-list';
import EventsSearch from '../components/events/events-search';

function RootPage(props) {
    return (
        <Fragment>
            <Head>
                <title>NextJS Events</title>
                <meta
                    name='description'
                    content='Find events that help expand your knowledge and get involved.'     
                />
            </Head>
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
