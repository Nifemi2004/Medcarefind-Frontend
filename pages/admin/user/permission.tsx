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
import { Checkbox } from 'primereact/checkbox';
import { useRouter } from 'next/router';
import { Dropdown } from 'primereact/dropdown';

interface Permission {
    id: string | null;
    appName: string;
    role: string;
    canView: boolean;
    canCreate: boolean;
    canUpdate: boolean;
    canDelete: boolean;
    superUser: boolean;
}

export default function PermissionTable() {
    let emptyPermission: Permission = {
        id: null,
        appName: '',
        role: '',
        canView: false,
        canCreate: false,
        canUpdate: false,
        canDelete: false,
        superUser: false
    };

    const roles = [
        { name: 'User', value: 'user' },
        { name: 'Moderator', value: 'moderator' },
        { name: 'Admin', value: 'admin' }
    ];

    const appNames = [{ name: 'AdminUserManagementComponent', value: 'AdminUserManagementComponent' }];

    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [permissionDialog, setPermissionDialog] = useState<boolean>(false);
    const [deletePermissionDialog, setDeletePermissionDialog] = useState<boolean>(false);
    const [deletePermissionsDialog, setDeletePermissionsDialog] = useState<boolean>(false);
    const [permission, setPermission] = useState<Permission>(emptyPermission);
    const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>([]);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<Permission[]>>(null);
    const [file, setFile] = useState<string>();
    const [create, setCreate] = useState<boolean>(false);
    const [update, setUpdate] = useState<boolean>(false);
    const [view, setView] = useState<boolean>(false);
    const [deleted, setDeleted] = useState<boolean>(false);
    const [superuser, setSuperuser] = useState<boolean>(false);



    const router = useRouter();

    const formatCurrency = (value: number) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    function handleChange(e: any) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    const openNew = () => {
        setPermission(emptyPermission);
        setSubmitted(false);
        setFile('');
        setPermissionDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setPermissionDialog(false);
    };

    const hideDeletePermissionDialog = () => {
        setDeletePermissionDialog(false);
    };

    const hideDeletePermissionsDialog = () => {
        setDeletePermissionsDialog(false);
    };

    const savePermission = () => {
        setSubmitted(true);

        if (permission.appName.trim()) {
            let _permissions = [...permissions];
            let _permission = { ...permission };

            if (permission.id) {
                const index = findIndexById(permission.id);

                _permissions[index] = _permission;
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Permission Updated', life: 3000 });
            } else {
                _permission.id = createId();
                _permissions.push(_permission);
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Permission Created', life: 3000 });
            }

            setCreate(false)
            setDeleted(false)
            setUpdate(false)
            setSuperuser(false)
            setView(false)      
            setPermissions(_permissions);
            setPermissionDialog(false);
            setPermission(emptyPermission);
        }
    };

    const editpermission = (permission: Permission) => {
        setPermission({ ...permission });
        setPermissionDialog(true);
    };

    const confirmDeletePermission = (permission: Permission) => {
        setPermission(permission);
        setDeletePermissionDialog(true);
    };

    const deletePermission = () => {
        let _permissions = permissions.filter((val) => val.id !== permission.id);

        setPermissions(_permissions);
        setDeletePermissionDialog(false);
        setPermission(emptyPermission);
        setCreate(false)
        setDeleted(false)
        setUpdate(false)
        setSuperuser(false)
        setView(false)
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Permission Deleted', life: 3000 });
    };

    const findIndexById = (id: string) => {
        let index = -1;

        for (let i = 0; i < permissions.length; i++) {
            if (permissions[i].id === id) {
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
        setDeletePermissionsDialog(true);
    };

    const deleteSelectedPermissions = () => {
        let _permissions = permissions.filter((val) => !selectedPermissions.includes(val));

        setPermissions(_permissions);
        setDeletePermissionsDialog(false);
        setSelectedPermissions([]);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Permissions Deleted', life: 3000 });
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _permission = { ...permission };

        // @ts-ignore
        _permission[`${name}`] = val;

        setPermission(_permission);
    };

    const onInputNumberChange = (e: InputNumberChangeEvent, name: string) => {
        const val = e.value || 0;
        let _permission = { ...permission };

        // @ts-ignore
        _permission[`${name}`] = val;

        setPermission(_permission);
    };

    const onDropdownChange = (e: any, name: string) => {
        let _permission = { ...permission };

        // @ts-ignore
        _permission[`${name}`] = e.value;
        setPermission(_permission);
    };

    const onCreateChange = (e:any, name: string) => {
        let _permission = { ...permission };
        setCreate(e.checked)   

        // @ts-ignore
        _permission[`${name}`] = true
        console.log(_permission)
        setPermission(_permission)
    }

    const onUpdateChange = (e:any, name: string) => {
        let _permission = { ...permission };
        setUpdate(e.checked)   

        // @ts-ignore
        _permission[`${name}`] = true
        console.log(_permission)
        setPermission(_permission)
    }

    const onDeleteChange = (e:any, name: string) => {
        let _permission = { ...permission };
        setDeleted(e.checked)   

        // @ts-ignore
        _permission[`${name}`] = true
        console.log(_permission)
        setPermission(_permission)
    }

    const onViewChange = (e:any, name: string) => {
        let _permission = { ...permission };
        setView(e.checked)   

        // @ts-ignore
        _permission[`${name}`] = true
        console.log(_permission)
        setPermission(_permission)
    }

    const onSuperChange = (e:any, name: string) => {
        let _permission = { ...permission };
        setSuperuser(e.checked)   

        // @ts-ignore
        _permission[`${name}`] = true
        console.log(_permission)
        setPermission(_permission)
    }

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedPermissions || !selectedPermissions.length} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Back" icon="pi pi-arrow-left" onClick={() => router.push('/admin/administration/userManagement')} />;
    };

    const actionBodyTemplate = (rowData: Permission) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editpermission(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeletePermission(rowData)} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Permissions</h4>
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
    const permissionDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={savePermission} />
        </React.Fragment>
    );
    const deletePermissionDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeletePermissionDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deletePermission} />
        </React.Fragment>
    );
    const deletePermissionsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeletePermissionsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedPermissions} />
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable
                    ref={dt}
                    value={permissions}
                    selection={selectedPermissions}
                    onSelectionChange={(e) => {
                        if (Array.isArray(e.value)) {
                            setSelectedPermissions(e.value);
                        }
                    }}
                    dataKey="id"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} permissions"
                    globalFilter={globalFilter}
                    header={header}
                >
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="appName" header="App Name" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="canView" header="Can View" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="canCreate" header="Can Create" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="canUpdate" header="Can Update" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="canDelete" header="Can Delete" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="superUser" header="Super User" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={permissionDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Permission Details" modal className="p-fluid" footer={permissionDialogFooter} onHide={hideDialog}>
                    <div className="field w-full">
                        <label htmlFor="roles" className="font-bold">
                            App Name
                        </label>
                        <Dropdown id="appName"  value={permission.appName} onChange={(e) => onDropdownChange(e, 'appName')} options={appNames} optionLabel="name" placeholder="Select an App Name" className=" field w-full " />
                    </div>
                    <div className="field">
                        <label htmlFor="roles" className="font-bold">
                            Role
                        </label>
                        <Dropdown id="role" value={permission.role} onChange={(e) => onDropdownChange(e, 'role')} options={roles} optionLabel="name" placeholder="Select a role" className=" field w-full" />
                    </div>
                    <div className="field flex flex-column">
                    <label className='text-2xl'>
                        Can Create
                    </label>
                    <Checkbox onChange={(e) => onCreateChange(e, 'canCreate') } checked={create}></Checkbox>       
                </div>  
                <div className="field flex flex-column">
                    <label className='text-2xl'>
                        Can Update
                    </label>
                    <Checkbox onChange={(e) => onUpdateChange(e, 'canUpdate') } checked={update}></Checkbox>       
                </div> 
                <div className="field flex flex-column">
                    <label className='text-2xl'>
                        Can View
                    </label>
                    <Checkbox onChange={(e) => onViewChange(e, 'canView') } checked={view}></Checkbox>       
                </div> 
                <div className="field flex flex-column">
                    <label className='text-2xl'>
                        Can Delete
                    </label>
                    <Checkbox onChange={(e) => onDeleteChange(e, 'canDelete') } checked={deleted}></Checkbox>       
                </div> 
                <div className="field flex flex-column">
                    <label className='text-2xl'>
                        Super User
                    </label>
                    <Checkbox onChange={(e) => onSuperChange(e, 'superUser') } checked={superuser}></Checkbox>       
                </div> 
            </Dialog>

            <Dialog visible={deletePermissionDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deletePermissionDialogFooter} onHide={hideDeletePermissionDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {permission && (
                        <span>
                            Are you sure you want to delete <b>{permission.appName}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deletePermissionsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deletePermissionsDialogFooter} onHide={hideDeletePermissionsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {permission && <span>Are you sure you want to delete the selected permissions?</span>}
                </div>
            </Dialog>
        </div>
    );
}
