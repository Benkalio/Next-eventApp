import { getFeaturedEvents } from '../dummy-data';


function RootPage() {
    const featuredEvents = getFeaturedEvents();

    return (
        <div>
            <h1>Home</h1>
        </div>
    );
}

export default RootPage;
