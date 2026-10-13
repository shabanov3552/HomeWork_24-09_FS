export default function normalizeResponse(payload) {
   const root = payload?.root ?? payload

   return {
      name: 'root',
      type: 'folder',
      children: root && typeof root === 'object' ? root : {},
   }
}
