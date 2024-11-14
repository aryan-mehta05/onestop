import Feed from "./feed";

export default function Home() {
    return (
        <div>
            <div>To Do:</div>
            <ul>
                <li>Add Login and Sign Up Buttons</li>
                <li>Implement Feed logic when signed in vs. when not signed in</li>
                <li>Set up basic routing</li>
                <li>Add navigation to other pages
                    <ul>
                        <li>Navigation / menu can go across the top and collapse at a certain screen width</li>
                    </ul>
                </li>
                <li>What else should we include on this page?
                    <ul>
                        <li>menu?</li>
                    </ul>
                </li>
                <li>Formatting and layout
                    <ul>
                    <li>
                        center page content
                    </li>
                    <li>
                        layout posts in grid
                    </li>
                    </ul>
                </li>
            </ul>
            <hr />


            <h1>Home!!!</h1>
            <Feed />
        </div>

    );
}