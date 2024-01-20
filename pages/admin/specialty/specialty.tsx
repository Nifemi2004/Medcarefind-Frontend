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

interface Specialty {
    id: string | null;
    code: string;
    name: string;
    description: string;
}

export default function SpecialtyTable() {
    let emptySpecialty: Specialty = {
        id: null,
        code: '',
        name: '',
        description: ''
    };

    const [specialties, setSpecialties] = useState<Specialty[]>([]);
    const [specialtyDialog, setSpecialtyDialog] = useState<boolean>(false);
    const [deleteSpecialtyDialog, setDeleteSpecialtyDialog] = useState<boolean>(false);
    const [deleteSpecialtiesDialog, setDeleteSpecialtiesDialog] = useState<boolean>(false);
    const [specialty, setSpecialty] = useState<Specialty>(emptySpecialty);
    const [selectedSpecialties, setSelectedSpecialties] = useState<Specialty[]>([]);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const toast = useRef<Toast>(null);

    const router = useRouter();

    const dt = useRef<DataTable<Specialty[]>>(null);
    const [file, setFile] = useState<string>();

    const formatCurrency = (value: number) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    function handleChange(e: any) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    const openNew = () => {
        setSpecialty(emptySpecialty);
        setSubmitted(false);
        setFile('');
        setSpecialtyDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setSpecialtyDialog(false);
    };

    const hideDeleteSpecialtyDialog = () => {
        setDeleteSpecialtyDialog(false);
    };

    const hideDeleteSpecialtiesDialog = () => {
        setDeleteSpecialtiesDialog(false);
    };

    const saveSpecialty = () => {
        setSubmitted(true);

        if (specialty.name.trim()) {
            let _specialties = [...specialties];
            let _specialty = { ...specialty };

            if (specialty.id) {
                const index = findIndexById(specialty.id);

                _specialties[index] = _specialty;
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                _specialty.id = createId();
                _specialties.push(_specialty);
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            setSpecialties(_specialties);
            setSpecialtyDialog(false);
            setSpecialty(emptySpecialty);
        }
    };

    const editspecialty = (specialty: Specialty) => {
        setSpecialty({ ...specialty });
        setSpecialtyDialog(true);
    };

    const confirmDeleteSpecialty = (specialty: Specialty) => {
        setSpecialty(specialty);
        setDeleteSpecialtyDialog(true);
    };

    const deleteSpecialty = () => {
        let _specialties = specialties.filter((val) => val.id !== specialty.id);

        setSpecialties(_specialties);
        setDeleteSpecialtyDialog(false);
        setSpecialty(emptySpecialty);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Specialty Deleted', life: 3000 });
    };

    const findIndexById = (id: string) => {
        let index = -1;

        for (let i = 0; i < specialties.length; i++) {
            if (specialties[i].id === id) {
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
        setDeleteSpecialtiesDialog(true);
    };

    const deleteSelectedSpecialties = () => {
        let _specialties = specialties.filter((val) => !selectedSpecialties.includes(val));

        setSpecialties(_specialties);
        setDeleteSpecialtiesDialog(false);
        setSelectedSpecialties([]);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Specialties Deleted', life: 3000 });
    };

    const onSpecialtyChange = (rowData: any, e: any) => {
        const updatedData = specialties.map((item: any) => (item.id === rowData.id ? { ...item, role: e.value } : item));
        setSpecialties(updatedData);
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _specialty = { ...specialty };

        // @ts-ignore
        _specialty[`${name}`] = val;

        setSpecialty(_specialty);
    };

    const onInputNumberChange = (e: InputNumberChangeEvent, name: string) => {
        const val = e.value || 0;
        let _specialty = { ...specialty };

        // @ts-ignore
        _specialty[`${name}`] = val;

        setSpecialty(_specialty);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} />
                {/* disabled={!selectedProducts || !selectedProducts.length} use this if you want to use disabled */}
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Back" icon="pi pi-arrow-left" onClick={() => router.push('/admin/administration/metadata')} />;
    };

    const actionBodyTemplate = (rowData: Specialty) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editspecialty(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteSpecialty(rowData)} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Specialty</h4>
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
    const specialtyDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveSpecialty} />
        </React.Fragment>
    );
    const deleteSpecialtyDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteSpecialtyDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSpecialty} />
        </React.Fragment>
    );
    const deleteSpecialtiesDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteSpecialtiesDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedSpecialties} />
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable
                    ref={dt}
                    value={specialties}
                    selection={selectedSpecialties}
                    onSelectionChange={(e) => {
                        if (Array.isArray(e.value)) {
                            setSelectedSpecialties(e.value);
                        }
                    }}
                    dataKey="id"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
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

            <Dialog visible={specialtyDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Specialty Details" modal className="p-fluid" footer={specialtyDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Name
                    </label>
                    <InputText id="name" value={specialty.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !specialty.name })} />
                    {submitted && !specialty.name && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="code" className="font-bold">
                        Code
                    </label>
                    <InputText id="code" value={specialty.code} onChange={(e) => onInputChange(e, 'code')} required autoFocus className={classNames({ 'p-invalid': submitted && !specialty.code })} />
                    {submitted && !specialty.name && <small className="p-error">Code is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="description" className="font-bold">
                        Description
                    </label>
                    <InputTextarea id="description" value={specialty.description} onChange={(e: any) => onInputChange(e, 'description')} required rows={3} cols={20} />
                </div>
            </Dialog>

            <Dialog visible={deleteSpecialtyDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteSpecialtyDialogFooter} onHide={hideDeleteSpecialtyDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {specialty && (
                        <span>
                            Are you sure you want to delete <b>{specialty.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteSpecialtiesDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteSpecialtiesDialogFooter} onHide={hideDeleteSpecialtiesDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {specialty && <span>Are you sure you want to delete the selected products?</span>}
                </div>
            </Dialog>
        </div>
    );
}
