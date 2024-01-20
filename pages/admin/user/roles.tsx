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

interface Role {
    id: string | null;
    code: string;
    name: string;
    description: string;
}

export default function RoleTable() {
    let emptyRole: Role = {
        id: null,
        code: '',
        name: '',
        description: ''
    };

    const [roles, setRoles] = useState<Role[]>([]);
    const [roleDialog, setRoleDialog] = useState<boolean>(false);
    const [deleteRoleDialog, setDeleteRoleDialog] = useState<boolean>(false);
    const [deleteRolesDialog, setDeleteRolesDialog] = useState<boolean>(false);
    const [role, setRole] = useState<Role>(emptyRole);
    const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<Role[]>>(null);
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
        setRole(emptyRole);
        setSubmitted(false);
        setFile('');
        setRoleDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setRoleDialog(false);
    };

    const hideDeleteRoleDialog = () => {
        setDeleteRoleDialog(false);
    };

    const hideDeleteRolesDialog = () => {
        setDeleteRolesDialog(false);
    };

    const saveRole = () => {
        setSubmitted(true);

        if (role.name.trim()) {
            let _roles = [...roles];
            let _role = { ...role };

            if (role.id) {
                const index = findIndexById(role.id);

                _roles[index] = _role;
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Role Updated', life: 3000 });
            } else {
                _role.id = createId();
                _roles.push(_role);
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Role Created', life: 3000 });
            }

            setRoles(_roles);
            setRoleDialog(false);
            setRole(emptyRole);
        }
    };

    const editrole = (role: Role) => {
        setRole({ ...role });
        setRoleDialog(true);
    };

    const confirmDeleteRole = (role: Role) => {
        setRole(role);
        setDeleteRoleDialog(true);
    };

    const deleteRole = () => {
        let _roles = roles.filter((val) => val.id !== role.id);

        setRoles(_roles);
        setDeleteRoleDialog(false);
        setRole(emptyRole);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Role Deleted', life: 3000 });
    };

    const findIndexById = (id: string) => {
        let index = -1;

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].id === id) {
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
        setDeleteRolesDialog(true);
    };

    const deleteSelectedRoles = () => {
        let _roles = roles.filter((val) => !selectedRoles.includes(val));

        setRoles(_roles);
        setDeleteRolesDialog(false);
        setSelectedRoles([]);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Roles Deleted', life: 3000 });
    };

    const onSpecialtyChange = (rowData: any, e: any) => {
        const updatedData = roles.map((item: any) => (item.id === rowData.id ? { ...item, role: e.value } : item));
        setRoles(updatedData);
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _role = { ...role };

        // @ts-ignore
        _role[`${name}`] = val;

        setRole(_role);
    };

    const onInputNumberChange = (e: InputNumberChangeEvent, name: string) => {
        const val = e.value || 0;
        let _role = { ...role };

        // @ts-ignore
        _role[`${name}`] = val;

        setRole(_role);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedRoles || !selectedRoles.length}/>
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Back" icon="pi pi-arrow-left" onClick={() => router.push('/admin/administration/userManagement')} />;
    };

    const actionBodyTemplate = (rowData: Role) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editrole(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteRole(rowData)} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Roles</h4>
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
    const roleDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveRole} />
        </React.Fragment>
    );
    const deleteRoleDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteRoleDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteRole} />
        </React.Fragment>
    );
    const deleteRolesDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteRolesDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedRoles} />
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable
                    ref={dt}
                    value={roles}
                    selection={selectedRoles}
                    onSelectionChange={(e) => {
                        if (Array.isArray(e.value)) {
                            setSelectedRoles(e.value);
                        }
                    }}
                    dataKey="id"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} roles"
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

            <Dialog visible={roleDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Role Details" modal className="p-fluid" footer={roleDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Name
                    </label>
                    <InputText id="name" value={role.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !role.name })} />
                    {submitted && !role.name && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="code" className="font-bold">
                        Code
                    </label>
                    <InputText id="code" value={role.code} onChange={(e) => onInputChange(e, 'code')} required autoFocus className={classNames({ 'p-invalid': submitted && !role.code })} />
                    {submitted && !role.name && <small className="p-error">Code is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="description" className="font-bold">
                        Description
                    </label>
                    <InputTextarea id="description" value={role.description} onChange={(e: any) => onInputChange(e, 'description')} required rows={3} cols={20} />
                </div>
            </Dialog>

            <Dialog visible={deleteRoleDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteRoleDialogFooter} onHide={hideDeleteRoleDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {role && (
                        <span>
                            Are you sure you want to delete <b>{role.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteRolesDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteRolesDialogFooter} onHide={hideDeleteRolesDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {role && <span>Are you sure you want to delete the selected roles?</span>}
                </div>
            </Dialog>
        </div>
    );
}
