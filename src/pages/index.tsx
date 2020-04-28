import Header from '../components/header'
import sharedStyles from '../styles/shared.module.css'

export default () => (
  <>
    <Header titlePre="Home" />
    <div className={sharedStyles.absolutecenter}>
      <img src="/avatar.png" alt="AB Castle Avatar" height="200vw" />
    </div>
  </>
)
