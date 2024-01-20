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

interface Symptom {
    id: string | null;
    code: string;
    name: string;
    description: string;
}

export default function SymptomTable() {
    let emptySymptom: Symptom = {
        id: null,
        code: '',
        name: '',
        description: ''
    };

    const [symptoms, setSymptoms] = useState<Symptom[]>([]);
    const [symptomDialog, setSymptomDialog] = useState<boolean>(false);
    const [deleteSymptomDialog, setDeleteSymptomDialog] = useState<boolean>(false);
    const [deleteSymptomsDialog, setDeleteSymptomsDialog] = useState<boolean>(false);
    const [symptom, setSymptom] = useState<Symptom>(emptySymptom);
    const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<Symptom[]>>(null);
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
        setSymptom(emptySymptom);
        setSubmitted(false);
        setFile('');
        setSymptomDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setSymptomDialog(false);
    };

    const hideDeleteSymptomDialog = () => {
        setDeleteSymptomDialog(false);
    };

    const hideDeleteSymptomsDialog = () => {
        setDeleteSymptomsDialog(false);
    };

    const saveSymptom = () => {
        setSubmitted(true);

        if (symptom.name.trim()) {
            let _symptoms = [...symptoms];
            let _symptom = { ...symptom };

            if (symptom.id) {
                const index = findIndexById(symptom.id);

                _symptoms[index] = _symptom;
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Symptom Updated', life: 3000 });
            } else {
                _symptom.id = createId();
                _symptoms.push(_symptom);
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Symptom Created', life: 3000 });
            }

            setSymptoms(_symptoms);
            setSymptomDialog(false);
            setSymptom(emptySymptom);
        }
    };

    const editsymptom = (symptom: Symptom) => {
        setSymptom({ ...symptom });
        setSymptomDialog(true);
    };

    const confirmDeleteSymptom = (symptom: Symptom) => {
        setSymptom(symptom);
        setDeleteSymptomDialog(true);
    };

    const deleteSymptom = () => {
        let _symptoms = symptoms.filter((val) => val.id !== symptom.id);

        setSymptoms(_symptoms);
        setDeleteSymptomDialog(false);
        setSymptom(emptySymptom);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Symptom Deleted', life: 3000 });
    };

    const findIndexById = (id: string) => {
        let index = -1;

        for (let i = 0; i < symptoms.length; i++) {
            if (symptoms[i].id === id) {
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
        setDeleteSymptomsDialog(true);
    };

    const deleteSelectedSymptoms = () => {
        let _symptoms = symptoms.filter((val) => !selectedSymptoms.includes(val));

        setSymptoms(_symptoms);
        setDeleteSymptomsDialog(false);
        setSelectedSymptoms([]);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Symptoms Deleted', life: 3000 });
    };

    const onSpecialtyChange = (rowData: any, e: any) => {
        const updatedData = symptoms.map((item: any) => (item.id === rowData.id ? { ...item, role: e.value } : item));
        setSymptoms(updatedData);
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _symptom = { ...symptom };

        // @ts-ignore
        _symptom[`${name}`] = val;

        setSymptom(_symptom);
    };

    const onInputNumberChange = (e: InputNumberChangeEvent, name: string) => {
        const val = e.value || 0;
        let _symptom = { ...symptom };

        // @ts-ignore
        _symptom[`${name}`] = val;

        setSymptom(_symptom);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedSymptoms || !selectedSymptoms.length}/>
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Back" icon="pi pi-arrow-left" onClick={() => router.push('/admin/administration/metadata')} />;
    };

    const actionBodyTemplate = (rowData: Symptom) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editsymptom(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteSymptom(rowData)} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Symptoms</h4>
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
    const symptomDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveSymptom} />
        </React.Fragment>
    );
    const deleteSymptomDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteSymptomDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSymptom} />
        </React.Fragment>
    );
    const deleteSymptomsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteSymptomsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedSymptoms} />
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable
                    ref={dt}
                    value={symptoms}
                    selection={selectedSymptoms}
                    onSelectionChange={(e) => {
                        if (Array.isArray(e.value)) {
                            setSelectedSymptoms(e.value);
                        }
                    }}
                    dataKey="id"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} symptoms"
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

            <Dialog visible={symptomDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Symptom Details" modal className="p-fluid" footer={symptomDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Name
                    </label>
                    <InputText id="name" value={symptom.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !symptom.name })} />
                    {submitted && !symptom.name && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="code" className="font-bold">
                        Code
                    </label>
                    <InputText id="code" value={symptom.code} onChange={(e) => onInputChange(e, 'code')} required autoFocus className={classNames({ 'p-invalid': submitted && !symptom.code })} />
                    {submitted && !symptom.name && <small className="p-error">Code is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="description" className="font-bold">
                        Description
                    </label>
                    <InputTextarea id="description" value={symptom.description} onChange={(e: any) => onInputChange(e, 'description')} required rows={3} cols={20} />
                </div>
            </Dialog>

            <Dialog visible={deleteSymptomDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteSymptomDialogFooter} onHide={hideDeleteSymptomDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {symptom && (
                        <span>
                            Are you sure you want to delete <b>{symptom.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteSymptomsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteSymptomsDialogFooter} onHide={hideDeleteSymptomsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {symptom && <span>Are you sure you want to delete the selected symptoms?</span>}
                </div>
            </Dialog>
        </div>
    );
}
