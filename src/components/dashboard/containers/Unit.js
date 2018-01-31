import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from 'actions'
import Dropdown from 'react-toolbox/lib/dropdown'
import Input from 'react-toolbox/lib/input'
import ItemHoc from './ItemHoc'
import Img from 'components/common/img/Img'
import { Item, AdUnit } from 'adex-models'
import theme from './theme.css'
import { IconButton, Button } from 'react-toolbox/lib/button'
// import UnitSlots from './UnitSlots'
import { Tab, Tabs } from 'react-toolbox'
import UnitTargets from './UnitTargets'
import { Card, CardMedia, CardTitle, CardActions } from 'react-toolbox/lib/card'
import Tooltip from 'react-toolbox/lib/tooltip'
import Translate from 'components/translate/Translate'
import NewItemWithDialog from 'components/dashboard/forms/items/NewItemWithDialog'
import NewBidSteps from 'components/dashboard/forms/bids/NewBidSteps'
import UnitBids from './UnitBids'
import { items as ItemsConstants } from 'adex-constants'
import { BasicProps } from './ItemCommon'

const { ItemsTypes, AdTypes, AdSizes, AdSizesByValue, AdTypesByValue } = ItemsConstants
const TooltipButton = Tooltip(Button)
const BidFormWithDialog = NewItemWithDialog(NewBidSteps)

export class Unit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tabIndex: 0
        }
    }

    handleTabChange = (index) => {
        this.setState({ tabIndex: index })
    }

    render() {
        let item = this.props.item
        let t = this.props.t

        if (!item) return (<h1>Unit '404'</h1>)

        console.log('item', item)

        return (
            <div>
                <BidFormWithDialog
                    btnLabel='PLACE_BID'
                    title={this.props.t('PLACE_BID_FOR', { args: [item.fullName] })}
                    floating
                    primary
                    bidId={item._id}
                    icon='check_circle'
                    adUnit={item}
                />
                <BasicProps
                    item={item}
                    t={t}
                    url={item.adUrl}
                    rightComponent={<UnitTargets {...this.props} meta={item.meta} t={t} />}
                />
                <div>
                    <Tabs
                        theme={theme}
                        index={this.state.tabIndex}
                        onChange={this.handleTabChange.bind(this)}
                    >
                        <Tab label={t('BIDS')}>
                            <UnitBids item={item} />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        )
    }
}

Unit.propTypes = {
    actions: PropTypes.object.isRequired,
    // account: PropTypes.object.isRequired,
    // items: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    // slots: PropTypes.array.isRequired,
    spinner: PropTypes.bool
};

function mapStateToProps(state) {
    let persist = state.persist
    let memory = state.memory
    return {
        // account: persist.account,
        // items: persist.items[ItemsTypes.AdUnit.id],
        // slots: Array.from(Object.values(persist.items[ItemsTypes.AdSlot.id])),
        // item: state.currentItem,
        spinner: memory.spinners[ItemsTypes.AdUnit.name],
        objModel: AdUnit,
        itemType: ItemsTypes.AdUnit.id
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

const UnitItem = ItemHoc(Unit)
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Translate(UnitItem))
