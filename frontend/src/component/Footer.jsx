import React from "react";

function Footer(){
    const year = new Date().getFullYear();
    return <footer>
        <p className="footer">Copyright © {year}, Manish</p>
    </footer>
}

export default Footer;