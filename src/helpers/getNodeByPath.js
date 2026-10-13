export default function getNodeByPath(root, pathParts) {
   return pathParts.reduce((node, part) => {
      if (!node || node.type !== 'folder' || !node.children?.[part]) return null
      return { ...node.children[part], name: part }
   }, root)
}
