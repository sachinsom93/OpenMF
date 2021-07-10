/*
    Component to render all the cases.
*/

import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { loadCases } from '../../store/actions/case';
import CaseFolderButton from '../Utils/CaseFolderButton';
import {
    Container,
    Typography,
    Box,
    Divider
} from '@material-ui/core';


// custom styles
const useStyle = makeStyles((theme) => ({
    root: {
        width: '80vw',
        overflowX: 'auto',
        marginTop: '10vh',
        height: '82.5vh',
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    caseList: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    }
}))

function FileExplorer() {

    // invoke custom styles
    const classes = useStyle()

    // dispatcher
    const dispatch = useDispatch()

    // get case reducer
    const caseReducer = useSelector(state => state.case)

    // useEffect
    useEffect(() => {
        dispatch(loadCases())
    }, [dispatch])

    return (
        <Container component="main" className={classes.root}>
            <Typography component="h1" variant="h5">
                All Cases
            </Typography>

            <Divider style={{width: '100%', marginTop: '1em'}} />

            <Box component="div" className={classes.caseList}>
                {
                    (caseReducer.cases && caseReducer.cases.length > 0) ?
                        caseReducer.cases.map((caseItem) => {
                            return (<CaseFolderButton key={caseItem.case_name} dirName={caseItem.case_name} parentDir='file-explorer'/>)
                        })
                    : (
                        <span> Cases Not Found.</span>
                    )
                }
            </Box>
        </Container>
    )
}

export default FileExplorer
