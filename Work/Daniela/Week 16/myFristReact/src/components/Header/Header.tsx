import type { HeaderProps } from './Header_Types';



export function Header({ title, subtitle, isOn }: HeaderProps) {
    const className = `Header ${isOn ? 'on' : 'off'}`

    return (
        <header 
        className={className}>
            <h1>{title}</h1>
            <p>{subtitle}</p>
        </header>
    );
}