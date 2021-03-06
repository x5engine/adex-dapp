import { exchange as ExchangeConstants } from 'adex-constants'
import { constants } from 'adex-models'
const { BID_STATES, TIMEOUTS } = ExchangeConstants
const { SignatureModes } = constants
const AdTypes = constants.AdUnitsTypes
	.map(type => {
		return {
			value: type,
			label: type.split('_')[1]
		}
	})

export const AVATAR_MAX_WIDTH = 600
export const AVATAR_MAX_HEIGHT = 400

export const SORT_PROPERTIES_BIDS = [
	{ value: '_state', label: '' },
	{ value: '_target', label: '' },
	{ value: '_amount', label: '' },
	{ value: '_timeout', label: '' }
]

export const FILTER_PROPERTIES_BIDS = {
	_state: { label: '_state', labelIsProp: true, values: Object.keys(BID_STATES).map((key) => { return { value: BID_STATES[key].id, label: BID_STATES[key].label } }) },
	_timeout: { label: '_timeout', labelIsProp: true, values: TIMEOUTS }
}

export const FILTER_PROPERTIES_BIDS_NO_STATE = {
	_timeout: FILTER_PROPERTIES_BIDS._timeout
}

export const SORT_PROPERTIES_ITEMS = [
	{ value: 'title' },
	{ value: 'created' },
	{ value: 'type' },
]

export const SORT_PROPERTIES_COLLECTION = [
	{ value: 'title' },
	{ value: 'created' }
]

export const FILTER_PROPERTIES_ITEMS = {
	'type': { label: 'type', labelIsProp: true, values: AdTypes },
}

export const AUTH_TYPES = {
	METAMASK: { name: 'metamask', signType: SignatureModes.GETH, limit: 0 },
	TREZOR: { name: 'trezor', signType: SignatureModes.GETH, limit: 0 },
	LEDGER: { name: 'ledger', signType: SignatureModes.GETH, limit: 0 },
	DEMO: { name: 'demo', signType: SignatureModes.GETH, limit: 0 },
	GRANT: { name: 'grant', signType: SignatureModes.GETH, limit: 50 },
	SEED: { name: 'seed', signType: SignatureModes.GETH, limit: 500 }
}

export const NETWORK_STATUS = {
	0: 'pending',
	1: 'success',
	2: 'failed'
}

export const SORT_PROPERTIES_CAMPAIGN = [
	{ value: 'status.name', label: 'Status' },
	{ value: 'created', label: 'Created' },
	{ value: 'withdrawPeriodStart', label: 'Ends' },
	{ value: 'activeFrom', label: 'Starts' },
	{ value: 'depositAmount', label: 'depositAmount' },
	{ value: 'maxPerImpression', label: 'cpm' },
]

export const FILTER_PROPERTIES_CAMPAIGN = {
	'status.name': {
		label: 'ststus',
		labelIsProp: true,
		values: [
			{ value: 'Pending', label: 'Pending' }, // UI only state
			{ value: 'Initializing', label: 'Initializing' },
			{ value: 'Offline', label: 'Offline' },
			{ value: 'Disconnected', label: 'Disconnected' },
			{ value: 'Invalid', label: 'Invalid' },
			{ value: 'Unhealthy', label: 'Unhealthy' },
			{ value: 'Ready', label: 'Ready' },
			{ value: 'Active', label: 'Active' },
			{ value: 'Exhausted', label: 'Exhausted' },
			{ value: 'Expired', label: 'Expired' },
		]
	},
}