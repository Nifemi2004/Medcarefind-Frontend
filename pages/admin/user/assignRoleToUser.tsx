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

interface AssignRole {
    id: string | null;
    code: string;
    name: string;
    description: string;
    appName: string;
    role: string;
}

export default function AssignRoleTable() {
    let emptyAssignRole: AssignRole = {
        id: null,
        code: '',
        name: '',
        description: '',
        appName: '',
        role: '',
    };

    const roles = [
        { name: 'User', value: 'user' },
        { name: 'Moderator', value: 'moderator' },
        { name: 'Admin', value: 'admin' }
    ];

    const appNames = [{ name: 'AdminUserManagementComponent', value: 'AdminUserManagementComponent' }];

    const [assignRoles, setAssignRoles] = useState<AssignRole[]>([]);
    const [assignRoleDialog, setAssignRoleDialog] = useState<boolean>(false);
    const [deleteAssignRoleDialog, setDeleteAssignRoleDialog] = useState<boolean>(false);
    const [deleteAssignRolesDialog, setDeleteAssignRolesDialog] = useState<boolean>(false);
    const [assignRole, setAssignRole] = useState<AssignRole>(emptyAssignRole);
    const [selectedAssignRoles, setSelectedAssignRoles] = useState<AssignRole[]>([]);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<AssignRole[]>>(null);
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
        setAssignRole(emptyAssignRole);
        setSubmitted(false);
        setFile('');
        setAssignRoleDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setAssignRoleDialog(false);
    };

    const hideDeleteAssignRoleDialog = () => {
        setDeleteAssignRoleDialog(false);
    };

    const hideDeleteAssignRolesDialog = () => {
        setDeleteAssignRolesDialog(false);
    };

    const saveAssignRole = () => {
        setSubmitted(true);

        if (assignRole.name.trim()) {
            let _assignRoles = [...assignRoles];
            let _assignRole = { ...assignRole };

            if (assignRole.id) {
                const index = findIndexById(assignRole.id);

                _assignRoles[index] = _assignRole;
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'AssignRole Updated', life: 3000 });
            } else {
                _assignRole.id = createId();
                _assignRoles.push(_assignRole);
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'AssignRole Created', life: 3000 });
            }

            setAssignRoles(_assignRoles);
            setAssignRoleDialog(false);
            setAssignRole(emptyAssignRole);
        }
    };

    const editassignRole = (assignRole: AssignRole) => {
        setAssignRole({ ...assignRole });
        setAssignRoleDialog(true);
    };

    const confirmDeleteAssignRole = (assignRole: AssignRole) => {
        setAssignRole(assignRole);
        setDeleteAssignRoleDialog(true);
    };

    const deleteAssignRole = () => {
        let _assignRoles = assignRoles.filter((val) => val.id !== assignRole.id);

        setAssignRoles(_assignRoles);
        setDeleteAssignRoleDialog(false);
        setAssignRole(emptyAssignRole);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'AssignRole Deleted', life: 3000 });
    };

    const findIndexById = (id: string) => {
        let index = -1;

        for (let i = 0; i < assignRoles.length; i++) {
            if (assignRoles[i].id === id) {
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
        setDeleteAssignRolesDialog(true);
    };

    const deleteSelectedAssignRoles = () => {
        let _assignRoles = assignRoles.filter((val) => !selectedAssignRoles.includes(val));

        setAssignRoles(_assignRoles);
        setDeleteAssignRolesDialog(false);
        setSelectedAssignRoles([]);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'AssignRoles Deleted', life: 3000 });
    };

    const onSpecialtyChange = (rowData: any, e: any) => {
        const updatedData = assignRoles.map((item: any) => (item.id === rowData.id ? { ...item, role: e.value } : item));
        setAssignRoles(updatedData);
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _assignRole = { ...assignRole };

        // @ts-ignore
        _assignRole[`${name}`] = val;

        setAssignRole(_assignRole);
    };

    const onInputNumberChange = (e: InputNumberChangeEvent, name: string) => {
        const val = e.value || 0;
        let _assignRole = { ...assignRole };

        // @ts-ignore
        _assignRole[`${name}`] = val;

        setAssignRole(_assignRole);
    };

    const onDropdownChange = (e: any, name: string) => {
        let _assignRole = { ...assignRole };

        // @ts-ignore
        _assignRole[`${name}`] = e.value;
        setAssignRole(_assignRole);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedAssignRoles || !selectedAssignRoles.length}/>
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Back" icon="pi pi-arrow-left" onClick={() => router.push('/admin/administration/userManagement')} />;
    };

    const actionBodyTemplate = (rowData: AssignRole) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editassignRole(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteAssignRole(rowData)} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Assignment of Roles</h4>
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
    const assignRoleDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveAssignRole} />
        </React.Fragment>
    );
    const deleteAssignRoleDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteAssignRoleDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteAssignRole} />
        </React.Fragment>
    );
    const deleteAssignRolesDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteAssignRolesDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedAssignRoles} />
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable
                    ref={dt}
                    value={assignRoles}
                    selection={selectedAssignRoles}
                    onSelectionChange={(e) => {
                        if (Array.isArray(e.value)) {
                            setSelectedAssignRoles(e.value);
                        }
                    }}
                    dataKey="id"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} assignRoles"
                    globalFilter={globalFilter}
                    header={header}
                >
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="name" header="Name" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="code" header="Code" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="description" header="Description" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={assignRoleDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="AssignRole Details" modal className="p-fluid" footer={assignRoleDialogFooter} onHide={hideDialog}>
            <div className="field w-full">
                        <label htmlFor="roles" className="font-bold">
                            App Name
                        </label>
                        <Dropdown id="appName"  value={assignRole.appName} onChange={(e) => onDropdownChange(e, 'appName')} options={appNames} optionLabel="name" placeholder="Select an App Name" className=" field w-full " />
                    </div>
                    <div className="field">
                        <label htmlFor="roles" className="font-bold">
                            Role
                        </label>
                        <Dropdown id="role" value={assignRole.role} onChange={(e) => onDropdownChange(e, 'role')} options={roles} optionLabel="name" placeholder="Select a role" className=" field w-full" />
                    </div>
            </Dialog>

            <Dialog visible={deleteAssignRoleDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteAssignRoleDialogFooter} onHide={hideDeleteAssignRoleDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {assignRole && (
                        <span>
                            Are you sure you want to delete <b>{assignRole.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteAssignRolesDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteAssignRolesDialogFooter} onHide={hideDeleteAssignRolesDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {assignRole && <span>Are you sure you want to delete the selected assignRoles?</span>}
                </div>
            </Dialog>
        </div>
    );
}
