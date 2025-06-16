import { MenuItem } from "./MenuItem";

export function Menu() {
  return (
    <div className="menu">
      
        <MenuItem title="Home" url="/" />
        <MenuItem title="About" url="/about" />
        <MenuItem title="Contact" url="/contact" />
      
    </div>
  );
}
