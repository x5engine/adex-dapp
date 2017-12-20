import { registry, web3, token, cfg } from 'services/smart-contracts/ADX'
import { GAS_PRICE } from 'services/smart-contracts/constants'
import { toHexParam } from 'services/smart-contracts/utils'
import Account from 'models/Account'

const GAS_LIMIT_REGISTER_ACCOUNT = 150000
const GAS_LIMIT_REGISTER_ITEM = 180000

export const registerAccountEstimateGas = ({ _addr, _name = '', _wallet = 0, _ipfs = 0, _sig = 0, _meta = {}, prKey } = {}) => {
    _name = _name || 'no-name'

    return new Promise((resolve, reject) => {
        registry.methods.register(
            toHexParam(_name),
            _addr, //_wallet,
            toHexParam(_ipfs),
            toHexParam(_sig),
            toHexParam(_meta)
        )
            .estimateGas({ from: _addr })
            .then((result) => {
                console.log('registerAccountEstimateGas result', result)
                return resolve(result)
            })
            .catch((err) => {
                console.log('registerAccountEstimateGas err', err)
                return reject(err)
            })
    })
}


// NOTE: Actions accepts decoded to ascii string values from models

/**
 * can be called over and over to update the data
 * @param {string} _name - name
 * @param {string} _wallet - (eth address) wallet
 * @param {string} _ipfs - ipfs hash
 * @param {string} _sig - signature
 * @param {string} _meta - meta
 * @param {string} prKey - account private key (optional)
 */
export const registerAccount = ({ _addr, _name = '', _wallet = 0, _ipfs = 0, _sig = 0, _meta = {}, prKey } = {}) => {

    // TODO: fix prKey and addr flow
    // NOTE: Temp addr is provide because in development mode the address and the private Key of eb3 wallet does not match

    _name = _name || 'no-name'

    return new Promise((resolve, reject) => {
        registry.methods.register(
            toHexParam(_name),
            _addr, //_wallet,
            toHexParam(_ipfs),
            toHexParam(_sig),
            toHexParam(_meta)
        )
            .send({ from: _addr, gas: GAS_LIMIT_REGISTER_ACCOUNT, gasPrice: GAS_PRICE })
            .then((result) => {
                console.log('registerAccount result', result)
                return resolve(result)
            })
            .catch((err) => {
                console.log('registerAccount err', err)
                return reject(err)
            })
    })
}

/**
 * use _id = 0 to create a new item, otherwise modify existing
 * @param {number} _type - type (integer) 
 * @param {number} _id - id (integer)
 * @param {string} _ipfs - ipfs hash
 * @param {string} _name - name
 * @param {string} _meta - meta
 */
export const registerItem = ({ _type, _id, _ipfs = 0, _name = '', _meta = 0, prKey, _addr } = {}) => {

    return new Promise((resolve, reject) => {

        registry.methods
            .registerItem(
            toHexParam(_type),
            toHexParam(_id),
            toHexParam(_ipfs),
            toHexParam(_name),
            toHexParam(_meta)
            )
            .send({ from: _addr, gas: GAS_LIMIT_REGISTER_ITEM, gasPrice: GAS_PRICE })
            .then((result) => {
                console.log('registerItem result', result)
                resolve(result)
            })
            .catch((err) => {
                console.log('registerItem err', err)
                reject(err)
            })
    })
}

export const getAccountStats = ({ _addr }) => {
    return new Promise((resolve, reject) => {
        let balanceEth = web3.eth.getBalance(_addr)
        let balanceAdx = token.methods.balanceOf(_addr).call()
        let allowance = token.methods.allowance(_addr, cfg.addr.exchange).call()
        let isRegistered = registry.methods.isRegistered(_addr).call()
        let acc = registry.methods.accounts(_addr).call()

        let all = [balanceEth, balanceAdx, allowance, isRegistered, acc]

        Promise.all(all)
            .then(([balEth, balAdx, allow, isReg, account]) => {
                return resolve({
                    balanceEth: balEth,
                    balanceAdx: balAdx,
                    allowance: allow,
                    isRegistered: isReg,
                    acc: Account.decodeFromWeb3(account)
                })
            })
            .catch((err) => {
                console.log('getAccountStats err', err)
                reject(err)
            })
    })
}