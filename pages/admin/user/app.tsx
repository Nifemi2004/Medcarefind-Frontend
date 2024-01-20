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

interface App {
    id: string | null;
    code: string;
    name: string;
    description: string;
}

export default function AppTable() {
    let emptyApp: App = {
        id: null,
        code: '',
        name: '',
        description: ''
    };

    const [apps, setApps] = useState<App[]>([]);
    const [appDialog, setAppDialog] = useState<boolean>(false);
    const [deleteAppDialog, setDeleteAppDialog] = useState<boolean>(false);
    const [deleteAppsDialog, setDeleteAppsDialog] = useState<boolean>(false);
    const [app, setApp] = useState<App>(emptyApp);
    const [selectedApps, setSelectedApps] = useState<App[]>([]);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<App[]>>(null);
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
        setApp(emptyApp);
        setSubmitted(false);
        setFile('');
        setAppDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setAppDialog(false);
    };

    const hideDeleteAppDialog = () => {
        setDeleteAppDialog(false);
    };

    const hideDeleteAppsDialog = () => {
        setDeleteAppsDialog(false);
    };

    const saveApp = () => {
        setSubmitted(true);

        if (app.name.trim()) {
            let _apps = [...apps];
            let _app = { ...app };

            if (app.id) {
                const index = findIndexById(app.id);

                _apps[index] = _app;
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'App Updated', life: 3000 });
            } else {
                _app.id = createId();
                _apps.push(_app);
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'App Created', life: 3000 });
            }

            setApps(_apps);
            setAppDialog(false);
            setApp(emptyApp);
        }
    };

    const editapp = (app: App) => {
        setApp({ ...app });
        setAppDialog(true);
    };

    const confirmDeleteApp = (app: App) => {
        setApp(app);
        setDeleteAppDialog(true);
    };

    const deleteApp = () => {
        let _apps = apps.filter((val) => val.id !== app.id);

        setApps(_apps);
        setDeleteAppDialog(false);
        setApp(emptyApp);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'App Deleted', life: 3000 });
    };

    const findIndexById = (id: string) => {
        let index = -1;

        for (let i = 0; i < apps.length; i++) {
            if (apps[i].id === id) {
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
        setDeleteAppsDialog(true);
    };

    const deleteSelectedApps = () => {
        let _apps = apps.filter((val) => !selectedApps.includes(val));

        setApps(_apps);
        setDeleteAppsDialog(false);
        setSelectedApps([]);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Apps Deleted', life: 3000 });
    };

    const onSpecialtyChange = (rowData: any, e: any) => {
        const updatedData = apps.map((item: any) => (item.id === rowData.id ? { ...item, role: e.value } : item));
        setApps(updatedData);
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _app = { ...app };

        // @ts-ignore
        _app[`${name}`] = val;

        setApp(_app);
    };

    const onInputNumberChange = (e: InputNumberChangeEvent, name: string) => {
        const val = e.value || 0;
        let _app = { ...app };

        // @ts-ignore
        _app[`${name}`] = val;

        setApp(_app);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedApps || !selectedApps.length}/>
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Back" icon="pi pi-arrow-left" onClick={() => router.push('/admin/administration/userManagement')} />;
    };

    const actionBodyTemplate = (rowData: App) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editapp(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteApp(rowData)} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Apps</h4>
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
    const appDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveApp} />
        </React.Fragment>
    );
    const deleteAppDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteAppDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteApp} />
        </React.Fragment>
    );
    const deleteAppsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteAppsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedApps} />
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable
                    ref={dt}
                    value={apps}
                    selection={selectedApps}
                    onSelectionChange={(e) => {
                        if (Array.isArray(e.value)) {
                            setSelectedApps(e.value);
                        }
                    }}
                    dataKey="id"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} apps"
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

            <Dialog visible={appDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="App Details" modal className="p-fluid" footer={appDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Name
                    </label>
                    <InputText id="name" value={app.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !app.name })} />
                    {submitted && !app.name && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="code" className="font-bold">
                        Code
                    </label>
                    <InputText id="code" value={app.code} onChange={(e) => onInputChange(e, 'code')} required autoFocus className={classNames({ 'p-invalid': submitted && !app.code })} />
                    {submitted && !app.name && <small className="p-error">Code is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="description" className="font-bold">
                        Description
                    </label>
                    <InputTextarea id="description" value={app.description} onChange={(e: any) => onInputChange(e, 'description')} required rows={3} cols={20} />
                </div>
            </Dialog>

            <Dialog visible={deleteAppDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteAppDialogFooter} onHide={hideDeleteAppDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {app && (
                        <span>
                            Are you sure you want to delete <b>{app.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteAppsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteAppsDialogFooter} onHide={hideDeleteAppsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {app && <span>Are you sure you want to delete the selected apps?</span>}
                </div>
            </Dialog>
        </div>
    );
}
