import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber, InputNumberChangeEvent } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { useRouter } from 'next/router';
import { Dropdown } from 'primereact/dropdown';

interface User {
    id: string | null;
    userName: string;
    password: string;
    email: string;
    provider: string;
    roles: string;
    category: string;
    description: string;
    status: string;
}

export default function UserTable() {
    let emptyUser: User = {
        id: null,
        userName: '',
        password: '',
        email: '',
        provider: '',
        roles: '',
        category: '',
        description: '',
        status: '',
    };

    const roles = [
        { name: 'User', value: 'user' },
        { name: 'Moderator', value: 'moderator' },
        { name: 'Admin', value: 'admin' }
    ];

    const category = [
        { name: 'Specialist', value: 'specialist' },
        { name: 'Patient', value: 'patient' },
        { name: 'Hospital', value: 'hospital'}
    ];

    const [users, setUsers] = useState<User[]>([]);
    const [userDialog, setUserDialog] = useState<boolean>(false);
    const [deleteUserDialog, setDeleteUserDialog] = useState<boolean>(false);
    const [deleteUsersDialog, setDeleteUsersDialog] = useState<boolean>(false);
    const [user, setUser] = useState<User>(emptyUser);
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<User[]>>(null);
    const [file, setFile] = useState<string>();

    const router = useRouter();

    const formatCurrency = (value: number) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    function handleChange(e: any) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    const openNew = () => {
        setUser(emptyUser);
        setSubmitted(false);
        setFile('');
        setUserDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setUserDialog(false);
    };

    const hideDeleteUserDialog = () => {
        setDeleteUserDialog(false);
    };

    const hideDeleteUsersDialog = () => {
        setDeleteUsersDialog(false);
    };

    const saveUser = () => {
        setSubmitted(true);

        if (user.userName.trim()) {
            let _users = [...users];
            let _user = { ...user };

            if (user.id) {
                const index = findIndexById(user.id);

                _users[index] = _user;
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000 });
            } else {
                _user.id = createId();
                _users.push(_user);
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });
            }

            setUsers(_users);
            setUserDialog(false);
            setUser(emptyUser);
        }
    };

    const edituser = (user: User) => {
        setUser({ ...user });
        setUserDialog(true);
    };

    const confirmDeleteUser = (user: User) => {
        setUser(user);
        setDeleteUserDialog(true);
    };

    const deleteUser = () => {
        let _users = users.filter((val) => val.id !== user.id);

        setUsers(_users);
        setDeleteUserDialog(false);
        setUser(emptyUser);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
    };

    const findIndexById = (id: string) => {
        let index = -1;

        for (let i = 0; i < users.length; i++) {
            if (users[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = (): string => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return id;
    };

    const exportCSV = () => {
        dt.current?.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteUsersDialog(true);
    };

    const deleteSelectedUsers = () => {
        let _users = users.filter((val) => !selectedUsers.includes(val));

        setUsers(_users);
        setDeleteUsersDialog(false);
        setSelectedUsers([]);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Users Deleted', life: 3000 });
    };

    const onDropdownChange = (e: any, name: string) => {
        let _user = { ...user };

        // @ts-ignore
        _user[`${name}`] = e.value;
        setUser(_user);
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _user = { ...user };

        // @ts-ignore
        _user[`${name}`] = val;

        setUser(_user);
    };

    const onInputNumberChange = (e: InputNumberChangeEvent, name: string) => {
        const val = e.value || 0;
        let _user = { ...user };

        // @ts-ignore
        _user[`${name}`] = val;

        setUser(_user);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedUsers || !selectedUsers.length} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Back" icon="pi pi-arrow-left" onClick={() => router.push('/admin/administration/userManagement')} />;
    };

    const actionBodyTemplate = (rowData: User) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => edituser(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteUser(rowData)} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Users</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    type="search"
                    placeholder="Search..."
                    onInput={(e) => {
                        const target = e.target as HTMLInputElement;
                        setGlobalFilter(target.value);
                    }}
                />
            </span>
        </div>
    );
    const userDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveUser} />
        </React.Fragment>
    );
    const deleteUserDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteUserDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteUser} />
        </React.Fragment>
    );
    const deleteUsersDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteUsersDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedUsers} />
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable
                    ref={dt}
                    value={users}
                    selection={selectedUsers}
                    onSelectionChange={(e) => {
                        if (Array.isArray(e.value)) {
                            setSelectedUsers(e.value);
                        }
                    }}
                    dataKey="id"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
                    globalFilter={globalFilter}
                    header={header}
                >
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="userName" header="Username" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="email" header="Email" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="provider" header="Provider" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="role" header="Role" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="category" header="Category" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="status" header="Status" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={userDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="User Details" modal className="p-fluid" footer={userDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="userName" className="font-bold">
                        Username
                    </label>
                    <InputText id="userName" value={user.userName} onChange={(e) => onInputChange(e, 'userName')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.userName })} />
                    {submitted && !user.userName && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="password" className="font-bold">
                        Password
                    </label>
                    <InputText id="password" value={user.password} onChange={(e) => onInputChange(e, 'password')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.password })} />
                    {submitted && !user.password && <small className="p-error">Password is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="email" className="font-bold">
                        Email
                    </label>
                    <InputText id="email" value={user.email} onChange={(e) => onInputChange(e, 'email')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.email })} />
                    {submitted && !user.email && <small className="p-error">Email is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="provider" className="font-bold">
                        Provider
                    </label>
                    <InputText id="provider" value={user.provider} onChange={(e) => onInputChange(e, 'provider')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.provider })} />
                    {submitted && !user.provider && <small className="p-error">Email is required.</small>}
                </div>
                <div className='flex gap-2'>
                    <div className="field">
                        <label htmlFor="roles" className="font-bold">
                            Roles
                        </label>
                        <Dropdown id="city" value={user.roles} onChange={(e) => onDropdownChange(e, 'roles')} options={roles} optionLabel="name" placeholder="Select a role" className=" field w-screen md:w-14rem" />
                    </div>
                    <div className="field">
                        <label htmlFor="roles" className="font-bold">
                            Category
                        </label>
                        <Dropdown id="city" value={user.category} onChange={(e) => onDropdownChange(e, 'category')} options={category} optionLabel="name" placeholder="Select a Category" className=" field w-screen md:w-14rem" />
                    </div>
                </div>
                <div className="field">
                    <label htmlFor="description" className="font-bold">
                        Description
                    </label>
                    <InputTextarea id="description" value={user.description} onChange={(e: any) => onInputChange(e, 'description')} required rows={3} cols={20} />
                </div>
            </Dialog>

            <Dialog visible={deleteUserDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteUserDialogFooter} onHide={hideDeleteUserDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {user && (
                        <span>
                            Are you sure you want to delete <b>{user.userName}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteUsersDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteUsersDialogFooter} onHide={hideDeleteUsersDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {user && <span>Are you sure you want to delete the selected users?</span>}
                </div>
            </Dialog>
        </div>
    );
}
