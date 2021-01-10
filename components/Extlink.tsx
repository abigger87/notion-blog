const Extlink = props => (
  <a {...props} rel="noopener" target={props.target || '_blank'} />
)

export default Extlink
