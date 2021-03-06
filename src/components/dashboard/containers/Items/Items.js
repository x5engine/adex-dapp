import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from 'actions'
import ItemsList from 'components/dashboard/containers/ItemsList'
import Translate from 'components/translate/Translate'

class Items extends Component {

	componentWillMount() {
		this.props.actions.updateNav('navTitle', this.props.header)
	}

	render() {
		const { classes, itemType, ...rest } = this.props
		const items = Array.from(Object.values(this.props.items || {})) || []

		return (
			<div>
				{!!this.props.newItemBtn && <this.props.newItemBtn />}

				<ItemsList
					{...rest}
					itemType={itemType}
					items={items}
					viewModeId={this.props.viewModeId}
					archive
				/>
			</div>
		)
	}
}

Items.propTypes = {
	actions: PropTypes.object.isRequired,
	account: PropTypes.object.isRequired,
	items: PropTypes.object.isRequired,
	viewModeId: PropTypes.string.isRequired,
	header: PropTypes.string.isRequired,
	objModel: PropTypes.func.isRequired,
	itemType: PropTypes.string.isRequired,
	sortProperties: PropTypes.array.isRequired
}

function mapStateToProps(state, props) {
	const { persist, memory } = state
	return {
		account: persist.account,
		items: persist.items[props.itemType] || [],
		side: memory.nav.side,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Translate(Items))
