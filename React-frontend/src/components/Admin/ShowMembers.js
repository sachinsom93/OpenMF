import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import {DataGrid} from '@material-ui/data-grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch } from 'react-redux';
import { selectUser } from '../../store/actions/admin';
import { fetch_extracted_cases } from '../../store/actions/extractor';



// Columns for table representation
const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Full Name', flex:1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'role', headerName: 'Role', flex: 1},
    { field: 'varified', headerName: 'Varified', flex:1}

]
// styles
const useStyle = makeStyles((theme) => ({
    root: {
        marginTop: '10vh',
        height: '82.5vh',
        padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    title: {
        fontWeight: 600,
    },
    table: {
        marginTop: theme.spacing(1),
        height: '41vh',
        width: '70vw',
        minWidth: '50vw',
        maxWidth: '100vw',
        '&:focus': {
            outline: 'none',
            border: 'none'
        }
    },
}))


function ShowMembers({ extractors, managements, isLoading }) {
    const classes = useStyle()
    const history = useHistory()
    const dispatch = useDispatch()

    // Row definition for extractor members
    const extractorRows = extractors.map((member, index) => (
        {
            id: index+1,
            name: member.name,
            email: member.email,
            role: member.role,
            varified: member.varified
        }
    ))

    // Row definition for management members
    const managementRows = managements.map((member, index) => (
        {
            id: index+1,
            name: member.name,
            email: member.email,
            role: member.role,
            varified: member.varified
        }
    ))


    function handleCellClick(gridCellParam){

        // Dispatch selected user
        dispatch(selectUser(gridCellParam.row))

        // Dispatch extracted cases
        // Only if role is extractor
        if(gridCellParam.row.role === "extractor"){
            dispatch(fetch_extracted_cases(gridCellParam.row.email))
        }

        // Redireect to member deails
        history.push('/list-members/member/'+gridCellParam.row.id)
    }

    return (
        <Container className={classes.root}>
            <Typography component="h1" variant="h5" className={classes.title}>
                All Members
            </Typography>
            <DataGrid
                rows={extractorRows}
                columns={columns}
                pageSize={3}
                checkboxSelection={false}
                paginationMode="client"
                className={classes.table}
                onCellDoubleClick={handleCellClick}
                hideFooterSelectedRowCount={true}
                loading={isLoading ? CircularProgress : null}

            />
            <DataGrid
                rows={managementRows}
                columns={columns}
                pageSize={3}
                autoHeight={false}
                paginationMode="client"
                className={classes.table}
                onCellDoubleClick={handleCellClick}
                hideFooterSelectedRowCount={true}
                loading={isLoading ? CircularProgress : null}
            />
        </Container>
    )
}

export default ShowMembers
