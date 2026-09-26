import { Link } from "react-router-dom"

export function Breadcrumbs({ parts }) {
   return (
      <nav className="breadcrumbs" aria-label="Навигация по папкам">
         <Link to="/root" className="breadcrumb">root</Link>
         {parts.map((part, index) => {
            const path = `/root/${parts
               .slice(0, index + 1)
               .map(encodeURIComponent)
               .join('/')}`

            return (
               <span className="breadcrumb-group" key={path}>
                  <span className="separator">/</span>
                  <Link to={path} className="breadcrumb">{part}</Link>
               </span>
            )
         })}
      </nav>
   )
}
