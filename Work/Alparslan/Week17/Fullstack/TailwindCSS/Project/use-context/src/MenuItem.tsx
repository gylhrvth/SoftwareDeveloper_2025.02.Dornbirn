import { useContext } from 'react';
import { MyContext } from './ContextProvider';


export function MenuItem({ title, url }: { title: string; url: string }) {
  const { value, _setValue } = useContext(MyContext);

  return (
    <a href={url} className="menu-item">
        <div className={ value }>{title}</div>
    </a>
  );
}
