import React, { useState, useEffect } from 'react'
import { fetchUsers, createUser, updateUser } from '../../services/UserService';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import {
    Button, Stack, Typography, Modal, Paper, FormControl, InputAdornment, InputLabel,
    Input, TextField, MenuItem, Select, Switch
} from '@mui/material';
import { useDemoData } from '@mui/x-data-grid-generator';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { grey } from '@mui/material/colors';

const color = grey[500];

// const columns = [
//     { field: 'id', headerName: 'ID', width: 90 },
//     {
//         field: 'firstName',
//         headerName: 'First name',
//         width: 150,
//         editable: true,
//     },
//     {
//         field: 'lastName',
//         headerName: 'Last name',
//         width: 150,
//         editable: true,
//     },
//     {
//         field: 'age',
//         headerName: 'Age',
//         type: 'number',
//         width: 110,
//         editable: true,
//     },
//     {
//         field: 'fullName',
//         headerName: 'Full name',
//         description: 'This column has a value getter and is not sortable.',
//         sortable: false,
//         width: 160,
//         valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
//     },
// ];

// const rows = [
//     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
//     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
//     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
//     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
//     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const UserListPage = () => {
    const { data } = useDemoData({
        dataSet: 'Commodity',
        rowLength: 5,
        maxColumns: 6,
    });
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // Track if editing
    const [editUserId, setEditUserId] = useState(null); // Track the user being edited
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newUser, setNewUser] = useState({
        firstName: '',
        lastName: '',
        age: '',
        gender: '',
        contactNumber: '',
        email: '',
        username: '',
        password: '',
        address: '',
        isActive: true,
    });

    const loadUsers = async () => {
        try {
            setLoading(true);
            const { data } = await fetchUsers();
            setUsers(data.users);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleOpen = () => {
        setIsEditing(false); // Reset to "Add" mode
        setNewUser({
            firstName: '',
            lastName: '',
            age: '',
            gender: '',
            contactNumber: '',
            email: '',
            username: '',
            password: '',
            address: '',
            isActive: true,
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setIsEditing(false);
        setEditUserId(null);
    };

    const handleEdit = (id) => {
        const userToEdit = users.find((user) => user._id === id);
        if (userToEdit) {
            setNewUser({ ...userToEdit, password: '' }); // Set password to an empty string
            setEditUserId(id); // Track the user being edited
            setIsEditing(true); // Switch to "Edit" mode
            setOpen(true); // Open the modal
        }
    };

    const handleSaveUser = async () => {
        try {
            if (isEditing) {
                // Update user
                const updatedUser = { ...newUser };
                if (!updatedUser.password) {
                    delete updatedUser.password; // Exclude password if it's empty
                }
                await updateUser(editUserId, updatedUser);
            } else {
                // Add new user
                await createUser(newUser);
            }
            loadUsers(); // Reload users
            handleClose(); // Close modal
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    const handleToggleActive = async (id, isActive) => {
        try {
            await updateUser(id, { isActive: !isActive });
            loadUsers(); // Reload users after toggling
        } catch (error) {
            console.error('Error toggling user status:', error);
        }
    };

    const columns1 = [
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,

            valueGetter: (value, params) => `${params.firstName || ''} ${params.lastName || ''}`,
        },
        { field: 'age', headerName: 'Age', flex: 1, sortable: true },
        { field: 'gender', headerName: 'Gender', flex: 1, sortable: true },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'type', headerName: 'Type', flex: 1, sortable: true },
        { field: 'contactNumber', headerName: 'Contact', flex: 1 },
        { field: 'username', headerName: 'Username', flex: 1 },
        { field: 'address', headerName: 'Address', flex: 1 },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleEdit(params.row._id)}
                    >
                        Edit
                    </Button>
                    <Switch
                        checked={params.row.isActive}
                        onChange={() => handleToggleActive(params.row._id, params.row.isActive)}
                        color="primary"
                    />
                </Box>
            ),
        },
    ];

    return (
        <>
            <Stack direction="row" sx={{ marginBottom: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h2" fontWeight="bold">
                    Users
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddCircleIcon />}
                    onClick={handleOpen}
                    sx={{
                        position: 'fixed',
                        right: '20px',
                        top: '100px',
                        zIndex: 1000,
                    }}
                >
                    Add User
                </Button>
            </Stack>

            {/* Modal for Add/Edit User */}
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="add-user-modal"
                aria-describedby="add-user-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="keep-mounted-modal-title" variant="h4" component="h2">
                        {isEditing ? 'Edit User' : 'Add User'}
                    </Typography>
                    <Stack id="transition-modal-description" direction="column" spacing={3} sx={{ mt: 2 }}>
                        <FormControl fullWidth variant="standard"  >
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField fullWidth id="input-with-sx" label="Enter first name" variant="standard"
                                    value={newUser.firstName}
                                    onChange={(e) =>
                                        setNewUser({ ...newUser, firstName: e.target.value })
                                    }
                                />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField fullWidth id="input-with-sx" label="Enter last name" variant="standard"
                                    value={newUser.lastName}
                                    onChange={(e) =>
                                        setNewUser({ ...newUser, lastName: e.target.value })
                                    }
                                />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField fullWidth id="input-with-sx" label="Enter age" variant="standard"
                                    value={newUser.age}
                                    onChange={(e) =>
                                        setNewUser({ ...newUser, age: e.target.value })
                                    }
                                />
                            </Box>

                            <Stack direction='row' sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                                <AccountCircle color={color} sx={{ mr: 1 }} />
                                <FormControl fullWidth variant="standard">
                                    <InputLabel id="demo-simple-select-standard-label">Gender</InputLabel>
                                    <Select
                                        IconComponent={ExpandMoreIcon}
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={newUser.gender}
                                        onChange={(e) =>
                                            setNewUser({ ...newUser, gender: e.target.value })
                                        }
                                    >
                                        <MenuItem value="Male">Male</MenuItem>
                                        <MenuItem value="Female">Female</MenuItem>
                                    </Select>
                                </FormControl>
                            </Stack>

                            <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField fullWidth id="input-with-sx" label="Enter mobile" variant="standard"
                                    value={newUser.contactNumber}
                                    onChange={(e) =>
                                        setNewUser({ ...newUser, contactNumber: e.target.value })
                                    }
                                />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField fullWidth id="input-with-sx" label="Enter address" variant="standard"
                                    value={newUser.address}
                                    onChange={(e) =>
                                        setNewUser({ ...newUser, address: e.target.value })
                                    }
                                />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField fullWidth id="input-with-sx" label="Enter email" variant="standard"
                                    value={newUser.email}
                                    onChange={(e) =>
                                        setNewUser({ ...newUser, email: e.target.value })
                                    }
                                />
                            </Box>
                            <Stack direction='row' sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                                <AccountCircle color={color} sx={{ mr: 1 }} />
                                <FormControl fullWidth variant="standard">
                                    <InputLabel id="type-label">Type</InputLabel>
                                    <Select
                                        labelId="type-label"
                                        value={newUser.type || 'viewer'}
                                        onChange={(e) => setNewUser({ ...newUser, type: e.target.value })}
                                    >
                                        <MenuItem value="admin">Admin</MenuItem>
                                        <MenuItem value="editor">Editor</MenuItem>
                                        <MenuItem value="viewer">Viewer</MenuItem>
                                    </Select>
                                </FormControl>
                            </Stack>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField fullWidth id="input-with-sx" label="Enter username" variant="standard"
                                    value={newUser.username}
                                    onChange={(e) =>
                                        setNewUser({ ...newUser, username: e.target.value })
                                    }
                                />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField
                                    fullWidth
                                    id="input-with-sx"
                                    label="Enter password"
                                    variant="standard"
                                    type="password"
                                    value={newUser.password}
                                    onChange={(e) =>
                                        setNewUser({ ...newUser, password: e.target.value })
                                    }
                                />
                            </Box>
                        </FormControl>
                    </Stack>
                    <Stack spacing={2} direction="row">
                        <Button variant="outlined" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={handleSaveUser}>
                            {isEditing ? 'Save Changes' : 'Add'}
                        </Button>
                    </Stack>
                </Box>
            </Modal>

            <Box sx={{ height: 500, width: '100%', mb: 5 }}>
                <DataGrid
                    rows={users}
                    columns={columns1}
                    getRowId={(row) => row._id}
                    loading={loading}
                    pageSize={10}
                    rowsPerPageOptions={[10, 20, 50]}
                    disableSelectionOnClick
                />
            </Box>
            {/* <Box sx={{ height: 300, width: '100%', marginBottom: '20px' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
            <h3 >
                Brokers List
            </h3>
            <div style={{ width: '100%' }}>
                <div style={{ height: 350, width: '100%' }}>
                    <DataGrid {...data} />
                </div>
            </div> */}
        </>
    )
}

export default UserListPage

