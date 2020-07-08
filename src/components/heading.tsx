const collectText = (el, acc = []) => {
  if (el) {
    if (typeof el === 'string') acc.push(el)
    if (Array.isArray(el)) el.map(item => collectText(item, acc))
    if (typeof el === 'object') collectText(el.props && el.props.children, acc)
  }
  return acc.join('').trim()
}

export default ({
  children: component,
  id,
  style,
}: {
  children: any
  id?: any
  style?: any
}) => {
  const children = component.props.children || ''
  let text = children

  if (null == id) {
    id = collectText(text)
      .toLowerCase()
      .replace(/\s/g, '-')
      .replace(/[?!:]/g, '')
  }

  console.log('style: ' + style)
  console.log(style)

  return (
    <a href={`#${id}`} id={id} style={{ color: 'inherit', ...style }}>
      {console.log('style: ' + style)}
      {console.log(style)}
      {component}
    </a>
  )
}
