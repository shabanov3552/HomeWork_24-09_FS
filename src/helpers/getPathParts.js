export default function getPathParts(pathname) {
   return pathname
      .replace(/^\/root\/?/, '')
      .split('/')
      .filter(Boolean)
      .map(decodeURIComponent)
}
