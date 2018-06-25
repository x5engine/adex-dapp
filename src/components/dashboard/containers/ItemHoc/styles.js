export const styles = theme => {
    const spacing = theme.spacing.unit * 1

    return {
        mediaRoot: {
            height: 0,
            paddingTop: '56.25%', // 16:9
            position: 'relative',
            overflow: 'hidden'
        },
        img: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            margin: 'auto',
            minWidth: '50%',
            minHeight: '50%',
            height: 'auto',
            width: '100%'
        },
        buttonRight: {
            marginLeft: spacing
        },
        buttonLeft: {
            marginRight: spacing
        },
        error: {
            color: theme.palette.error.main
        },
        textField: {
            marginBottom: spacing,
            marginRight: spacing
        },
        top: {
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            maxWidth: '70%'
        },
        changesLine: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            color: theme.palette.secondary.main,
            marginBottom: spacing
        },
        changeChip: {
            margin: spacing,
            marginLeft: 0
        }
    }
}