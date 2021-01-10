import dynamic from 'next/dynamic'
import ExtLink from './Extlink'

export default {
  // default tags
  ol: 'ol',
  ul: 'ul',
  li: 'li',
  p: 'p',
  blockquote: 'blockquote',
  a: ExtLink,

  Code: dynamic(() => import('./Code')),
  Counter: dynamic(() => import('./Counter')),
}
