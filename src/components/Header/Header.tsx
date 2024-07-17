import { useState } from "react";
import "./Header.css";
import Logo from "/Avatar.svg"


export default function Header() {
    const [nickname, _setNickname] = useState("nick.name");

    return (
        <header className="main-header">
            <div className="main-logo inter-font">Opti</div>
            <div className="user-info-container">
                <div className="nickname inter-font">{nickname}</div>
                <img src={Logo} alt="" className="logo-img"/>
            </div>
        </header>
    )
}