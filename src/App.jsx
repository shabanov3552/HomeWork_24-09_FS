import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Breadcrumbs } from './components/Breadcrumbs';
import { Tree } from './components/Tree';
import { FolderIcon } from './components/FolderIcon';
import { FileIcon } from './components/FileIcon';

import normalizeResponse from './helpers/normalizeResponse'
import getNodeByPath from './helpers/getNodeByPath'
import getPathParts from './helpers/getPathParts'

const API_URL = 'http://localhost:3001/root'

export default function App() {
   const location = useLocation()
   const navigate = useNavigate()
   const [root, setRoot] = useState(null)
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState('')

   const parts = useMemo(() => getPathParts(location.pathname), [location.pathname])
   const currentNode = useMemo(
      () => root ? getNodeByPath(root, parts) : null,
      [root, parts]
   )

   useEffect(() => {
      let cancelled = false

      async function load() {
         try {
            setLoading(true)
            setError('')

            const response = await fetch(API_URL)
            if (!response.ok) {
               throw new Error(`HTTP ${response.status}`)
            }

            const payload = await response.json()
            if (!cancelled) setRoot(normalizeResponse(payload))

         } catch {
            if (!cancelled) {
               setError(
                  `Не удалось загрузить структуру файлов. Проверьте, что API доступен по ${API_URL}.`
               )
            }
         } finally {
            if (!cancelled) setLoading(false)
         }
      }

      load()
      return () => { cancelled = true }
   }, [])

   useEffect(() => {
      if (!loading && root && !currentNode) {
         navigate('/root', { replace: true })
      }
   }, [loading, root, currentNode, navigate])

   if (loading) {
      return (
         <main className="page">
            <section className="app-card state-card">
               <div className="spinner" />
               <p>Загрузка файловой структуры…</p>
            </section>
         </main>
      )
   }

   if (error) {
      return (
         <main className="page">
            <section className="app-card state-card">
               <div className="state-icon">!</div>
               <h1>Ошибка загрузки</h1>
               <p>{error}</p>
               <button className="button" onClick={() => window.location.reload()}>
                  Повторить
               </button>
            </section>
         </main>
      )
   }

   const isRoot = parts.length === 0
   const title = isRoot ? 'Файловая структура' : parts[parts.length - 1]

   return (
      <main className="page">
         <section className="app-card">
            <header className="header">
               <div>
                  <div className="eyebrow">FILE SYSTEM</div>
                  <h1>{title}</h1>
               </div>
            </header>

            <Breadcrumbs parts={parts} />

            {!isRoot && (
               <div className="toolbar">
                  <Link to="/root" className="back-link">← К корню</Link>
               </div>
            )}

            <div className="content">
               {isRoot ? (
                  <Tree node={root} />
               ) : (
                  <div className="folder-view">
                     {Object.entries(currentNode.children || {}).map(([name, child]) => {
                        const path = `/root/${parts.map(encodeURIComponent).join('/')}/${encodeURIComponent(name)}`
                        return child.type === 'folder' ? (
                           <Link className="entry-card" to={path} key={name}>
                              <FolderIcon />
                              <span>{name}</span>
                           </Link>
                        ) : (
                           <div className="entry-card file-entry" key={name}>
                              <FileIcon />
                              <span>{name}</span>
                           </div>
                        )
                     })}
                  </div>
               )}
            </div>
         </section>
      </main>
   )
}
