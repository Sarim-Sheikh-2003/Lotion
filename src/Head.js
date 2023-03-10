import './Head.css'

export default function Head() {
    return (
        <header>
            <div className = "head-buttons">
                <button type = "button" className = "button button-hover" id = "menu" onClick = {menuClicked}>&#9776;</button>
            </div>
            <div className = "heading">
                <h1 className = "text">Lotion</h1>
                <p className = "subheading">Like Notion, but worse.</p>
            </div>
            <div className = "pad"></div>
        </header>
    )
}

var menuState = true
function menuClicked() {
    if (menuState === true) {
        document.getElementById("Sidebar").style.display = 'none';
        menuState = false;
    } else {
        document.getElementById("Sidebar").style.display = '';
        menuState = true;
    }
}