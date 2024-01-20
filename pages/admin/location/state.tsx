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
import { useRouter } from 'next/router';
import { Dropdown } from 'primereact/dropdown';

interface State {
    id: string | null;
    code: string;
    nationality: string;
    name: string;
    description: string;
}

export default function StateTable() {
    let emptyState: State = {
        id: null,
        code: '',
        nationality: '',
        name: '',
        description: ''
    };

    const nationality = [
        { name: 'Nigeria', value: 'Nigeria' },
        { name: 'Canada', value: 'Canada' }
    ];

    const [states, setStates] = useState<State[]>([]);
    const [stateDialog, setStateDialog] = useState<boolean>(false);
    const [deleteStateDialog, setDeleteStateDialog] = useState<boolean>(false);
    const [deleteStatesDialog, setDeleteStatesDialog] = useState<boolean>(false);
    const [state, setState] = useState<State>(emptyState);
    const [selectedStates, setSelectedStates] = useState<State[]>([]);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<State[]>>(null);
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
        setState(emptyState);
        setSubmitted(false);
        setFile('');
        setStateDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setStateDialog(false);
    };

    const hideDeleteStateDialog = () => {
        setDeleteStateDialog(false);
    };

    const hideDeleteStatesDialog = () => {
        setDeleteStatesDialog(false);
    };

    const saveState = () => {
        setSubmitted(true);

        if (state.name.trim()) {
            let _states = [...states];
            let _state = { ...state };

            if (state.id) {
                const index = findIndexById(state.id);

                _states[index] = _state;
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'State/Province Updated', life: 3000 });
            } else {
                _state.id = createId();
                _states.push(_state);
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'State/Province Created', life: 3000 });
            }

            setStates(_states);
            setStateDialog(false);
            setState(emptyState);
        }
    };

    const editstate = (state: State) => {
        setState({ ...state });
        setStateDialog(true);
    };

    const confirmDeleteState = (state: State) => {
        setState(state);
        setDeleteStateDialog(true);
    };

    const deleteState = () => {
        let _states = states.filter((val) => val.id !== state.id);

        setStates(_states);
        setDeleteStateDialog(false);
        setState(emptyState);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'State/Province Deleted', life: 3000 });
    };

    const findIndexById = (id: string) => {
        let index = -1;

        for (let i = 0; i < states.length; i++) {
            if (states[i].id === id) {
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
        setDeleteStatesDialog(true);
    };

    const deleteSelectedStates = () => {
        let _states = states.filter((val) => !selectedStates.includes(val));

        setStates(_states);
        setDeleteStatesDialog(false);
        setSelectedStates([]);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'States/Provinces Deleted', life: 3000 });
    };

    const onSpecialtyChange = (rowData: any, e: any) => {
        const updatedData = states.map((item: any) => (item.id === rowData.id ? { ...item, role: e.value } : item));
        setStates(updatedData);
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _state = { ...state };

        // @ts-ignore
        _state[`${name}`] = val;

        setState(_state);
    };

    const onInputNumberChange = (e: InputNumberChangeEvent, name: string) => {
        const val = e.value || 0;
        let _state = { ...state };

        // @ts-ignore
        _state[`${name}`] = val;

        setState(_state);
    };

    const onNationalityChange = (rowData: any, e: any) => {
        const updatedData = states.map((item: any) => (item.id === rowData.id ? { ...item, role: e.value } : item));
        setStates(updatedData);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedStates || !selectedStates.length}/>  
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Back" icon="pi pi-arrow-left" onClick={() => router.push('/admin/administration/metadata')} />;
    };

    const actionBodyTemplate = (rowData: State) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editstate(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteState(rowData)} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage States/Province</h4>
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
    const stateDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveState} />
        </React.Fragment>
    );
    const deleteStateDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteStateDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteState} />
        </React.Fragment>
    );
    const deleteStatesDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteStatesDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedStates} />
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable
                    ref={dt}
                    value={states}
                    selection={selectedStates}
                    onSelectionChange={(e) => {
                        if (Array.isArray(e.value)) {
                            setSelectedStates(e.value);
                        }
                    }}
                    dataKey="id"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} states"
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

            <Dialog visible={stateDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="State Details" modal className="p-fluid" footer={stateDialogFooter} onHide={hideDialog}>
                <div className="field w-full">
                    <Dropdown id="specialty" value={state.nationality} onChange={(e) => onSpecialtyChange(state, e)} options={nationality} optionLabel="name" placeholder="Select a Nationality" className=" field w-full md:w-14rem" />
                </div>
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Name
                    </label>
                    <InputText id="name" value={state.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !state.name })} />
                    {submitted && !state.name && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="code" className="font-bold">
                        Code
                    </label>
                    <InputText id="code" value={state.code} onChange={(e) => onInputChange(e, 'code')} required autoFocus className={classNames({ 'p-invalid': submitted && !state.code })} />
                    {submitted && !state.name && <small className="p-error">Code is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="description" className="font-bold">
                        Description
                    </label>
                    <InputTextarea id="description" value={state.description} onChange={(e: any) => onInputChange(e, 'description')} required rows={3} cols={20} />
                </div>
            </Dialog>

            <Dialog visible={deleteStateDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteStateDialogFooter} onHide={hideDeleteStateDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {state && (
                        <span>
                            Are you sure you want to delete <b>{state.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteStatesDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteStatesDialogFooter} onHide={hideDeleteStatesDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {state && <span>Are you sure you want to delete the selected States/Provinces?</span>}
                </div>
            </Dialog>
        </div>
    );
}
