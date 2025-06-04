import type { HeaderProps } from './Header_Types';



export function Header( {title, subtitle, className = ''} : HeaderProps){
    return(
        <header className={`Header ${className}`}>
            <h1>{title}</h1>
            {subtitle && <p className="subtitle">{subtitle}</p>}
        </header>
    );
}