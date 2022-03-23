import Link from "next/link";
import classes from './main-header.module.css';

function MainHeader() {
    return (
        <header className={classes.header}>
            <div className={classes.logo}>
                <Link href='/'>Events</Link>
            </div>
            <nav className={classes.navigation}>
                <ul>
                    <li>
                        <Link href='/events'>Check Out Events</Link>
                    </li>
                </ul>
            </nav>
            <form>
                <label htmlFor="search" />
                <input htmlFor='search' type='search' id="search" />
            </form>
        </header>
    );
}

export default MainHeader;
