import type {ReactNode} from 'react'

export function Board({children}: { children: ReactNode }) {
    return (
        <div className="board">{/* Div-Element als Wrapper um Children zu verschachteln */}
            {children}
        </div>
    )
}