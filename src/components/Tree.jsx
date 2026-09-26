import { Link } from "react-router-dom"
import { FolderIcon } from "./FolderIcon"
import { FileIcon } from "./FileIcon"

export function Tree({ node, basePath = '', depth = 0 }) {
   const entries = Object.entries(node.children || {})


   return (
      <div className="tree" role={depth === 0 ? 'tree' : undefined}>
         {entries.map(([name, child]) => {
            const encodedPath = `${basePath}/${encodeURIComponent(name)}`
            const isFolder = child.type === 'folder'

            return (
               <div className="tree-item" key={`${encodedPath}-${child.type}`}>
                  <div
                     className={`tree-row ${isFolder ? 'tree-row-folder' : 'tree-row-file'}`}
                     style={{ '--depth': depth }}
                  >
                     {isFolder ? (
                        <Link
                           to={`/root${encodedPath}`}
                           className="tree-link"
                           title={`Открыть папку ${name}`}
                        >
                           <FolderIcon />
                           <span>{name}</span>
                        </Link>
                     ) : (
                        <div className="tree-link">
                           <FileIcon />
                           <span>{name}</span>
                        </div>
                     )}
                  </div>

                  {isFolder && child.children && (
                     <Tree
                        node={child}
                        basePath={encodedPath}
                        depth={depth + 1}
                     />
                  )}
               </div>
            )
         })}
      </div>
   )
}
