import React, { Component } from 'react'
import theme from './theme.css'
import PublisherLogo from './../../common/icons/AdexPublisher'
import AdvertiserLogo from './../../common/icons/AdexAdvertiser'
// import { Link } from 'react-router-dom'
import Dialog from 'react-toolbox/lib/dialog'
import { withReactRouterLink } from './../../common/rr_hoc/RRHoc.js'

const SideBox = ({ salePoints, linkTitle, icon, title, ...other }) => (
  <div {...other} className={theme.sideBox}>
    <div className={theme.icon}>
      {icon}
    </div>
    <h2>{title}</h2>
    <ul className={theme.salePoints}>
      {salePoints.map(function (point, key) {
        return (<li key={key}> {point} </li>)
      })}
    </ul>
  </div>
)

const RRSideBox = withReactRouterLink(SideBox)

class SideSelect extends Component {

  render() {
    console.log('theme.signinContainer', theme);
    return (
      <div >
        <Dialog
          active={true}
          title='Choose a your side'
        >

          <RRSideBox
            title="Advertiser"
            icon={<AdvertiserLogo />}
            salePoints={['Have Something to sell', 'Have ADX']}
            to="/dashboard/advertiser"
            linkTitle="Go to advertiser to advertise"
          />

          <RRSideBox
            title="Publisher"
            icon={<PublisherLogo />}
            salePoints={['Decentralization', 'Want ADX']}
            to="/dashboard/publisher"
            linkTitle="Go to publisher to publish"
          />

        </Dialog>
      </div>
    );
  }
}

export default SideSelect;