import React, { Component } from 'react'
import { Button, IconButton } from 'react-toolbox/lib/button'
import theme from './theme.css'
import { withReactRouterLink } from './../../common/rr_hoc/RRHoc.js'
import Tooltip from 'react-toolbox/lib/tooltip'
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib//table'
import Img from './../../common/img/Img'

// import classnames from 'classnames';

// const RRButton = withReactRouterLink(Button)

const RRTableCell = withReactRouterLink(TableCell)

const TooltipRRButton = withReactRouterLink(Tooltip(Button))
const TooltipIconButton = Tooltip(IconButton)

class Rows extends Component {

    // TEMP
    onTrashClick(campaign, unit) {
        if (this.props.delete) {
            this.props.delete(unit)
            return
        }

        if (this.props.remove) {
            this.props.remove({item: campaign, toRemove: unit.id})
        }
    }

    render() {
        let side = this.props.side
        let item = this.props.item
        let rows = this.props.rows
        return (
            <div>
                <h1> {item._name} </h1>
                <div>
                    <Table theme={theme}>
                        <TableHead>
                            <TableCell> Img </TableCell>
                            <TableCell> Name </TableCell>
                            <TableCell> Type </TableCell>
                            <TableCell> Size </TableCell>
                            <TableCell> Actions </TableCell>
                        </TableHead>

                        {rows.map((u, i) => {
                            let to = '/dashboard/' + side + '/' + u.typeName + '/' + u.id
                            return (
                                <TableRow key={u.id || i} theme={theme}>
                                    <RRTableCell className={theme.link} to={to} theme={theme}>
                                        <Img className={theme.img} src={u.img} alt={u._name} />
                                    </RRTableCell>
                                    <RRTableCell className={theme.link} to={to}> {u._name} </RRTableCell>
                                    <TableCell> {u.type} </TableCell>
                                    <TableCell> {u.size} </TableCell>
                                    <TableCell>

                                        <TooltipRRButton
                                            to={to} label='view'
                                            raised primary
                                            tooltip='View'
                                            tooltipDelay={1000}
                                            tooltipPosition='top' />
                                        <TooltipIconButton
                                            icon='archive'
                                            label='archive'
                                            tooltip='Archive'
                                            tooltipDelay={1000}
                                            tooltipPosition='top' />
                                        <TooltipIconButton
                                            icon='delete'
                                            label='delete'
                                            accent
                                            onClick={this.onTrashClick.bind(this, item, u)}
                                            tooltip='Delete'
                                            tooltipDelay={1000}
                                            tooltipPosition='top' />

                                    </TableCell>
                                </TableRow>
                            )
                        })
                        })}

                </Table>
                </div>
            </div>
        );
    }
}

export default Rows;
