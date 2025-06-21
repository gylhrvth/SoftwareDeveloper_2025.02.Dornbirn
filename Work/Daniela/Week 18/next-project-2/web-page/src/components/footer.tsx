import React from "react";

interface FooterProps {
    text: string;
}

const Footer: React.FC<FooterProps> = ({ text }) => (
    <footer style={{ padding: "1rem", textAlign: "center", background: "#f1f1f1" }}>
        <small>{text}</small>
    </footer>
);

export default Footer;