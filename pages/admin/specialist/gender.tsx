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

interface Gender {
    id: string | null;
    code: string;
    name: string;
    description: string;
}

export default function GenderTable() {
    let emptyGender: Gender = {
        id: null,
        code: '',
        name: '',
        description: ''
    };

    const [genders, setGenders] = useState<Gender[]>([]);
    const [genderDialog, setGenderDialog] = useState<boolean>(false);
    const [deleteGenderDialog, setDeleteGenderDialog] = useState<boolean>(false);
    const [deleteGendersDialog, setDeleteGendersDialog] = useState<boolean>(false);
    const [gender, setGender] = useState<Gender>(emptyGender);
    const [selectedGenders, setSelectedGenders] = useState<Gender[]>([]);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<Gender[]>>(null);
    const [file, setFile] = useState<string>();

    const router = useRouter();

    function handleChange(e: any) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    const openNew = () => {
        setGender(emptyGender);
        setSubmitted(false);
        setFile('');
        setGenderDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setGenderDialog(false);
    };

    const hideDeleteGenderDialog = () => {
        setDeleteGenderDialog(false);
    };

    const hideDeleteGendersDialog = () => {
        setDeleteGendersDialog(false);
    };

    const saveGender = () => {
        setSubmitted(true);

        if (gender.name.trim()) {
            let _genders = [...genders];
            let _gender = { ...gender };

            if (gender.id) {
                const index = findIndexById(gender.id);

                _genders[index] = _gender;
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Gender Updated', life: 3000 });
            } else {
                _gender.id = createId();
                _genders.push(_gender);
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Gender Created', life: 3000 });
            }

            setGenders(_genders);
            setGenderDialog(false);
            setGender(emptyGender);
        }
    };

    const editgender = (gender: Gender) => {
        setGender({ ...gender });
        setGenderDialog(true);
    };

    const confirmDeleteGender = (gender: Gender) => {
        setGender(gender);
        setDeleteGenderDialog(true);
    };

    const deleteGender = () => {
        let _genders = genders.filter((val) => val.id !== gender.id);

        setGenders(_genders);
        setDeleteGenderDialog(false);
        setGender(emptyGender);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Gender Deleted', life: 3000 });
    };

    const findIndexById = (id: string) => {
        let index = -1;

        for (let i = 0; i < genders.length; i++) {
            if (genders[i].id === id) {
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
        setDeleteGendersDialog(true);
    };

    const deleteSelectedGenders = () => {
        let _genders = genders.filter((val) => !selectedGenders.includes(val));

        setGenders(_genders);
        setDeleteGendersDialog(false);
        setSelectedGenders([]);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Genders Deleted', life: 3000 });
    };

    const onSpecialtyChange = (rowData: any, e: any) => {
        const updatedData = genders.map((item: any) => (item.id === rowData.id ? { ...item, role: e.value } : item));
        setGenders(updatedData);
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _gender = { ...gender };

        // @ts-ignore
        _gender[`${name}`] = val;

        setGender(_gender);
    };

    const onInputNumberChange = (e: InputNumberChangeEvent, name: string) => {
        const val = e.value || 0;
        let _gender = { ...gender };

        // @ts-ignore
        _gender[`${name}`] = val;

        setGender(_gender);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} />
                {/* disabled={!selectedGenders || !selectedGenders.length} use this if you want to use disabled */}
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Back" icon="pi pi-arrow-left" onClick={() => router.push('/admin/administration/metadata')} />;
    };

    const actionBodyTemplate = (rowData: Gender) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editgender(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteGender(rowData)} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Genders</h4>
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
    const genderDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveGender} />
        </React.Fragment>
    );
    const deleteGenderDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteGenderDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteGender} />
        </React.Fragment>
    );
    const deleteGendersDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteGendersDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedGenders} />
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable
                    ref={dt}
                    value={genders}
                    selection={selectedGenders}
                    onSelectionChange={(e) => {
                        if (Array.isArray(e.value)) {
                            setSelectedGenders(e.value);
                        }
                    }}
                    dataKey="id"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} genders"
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

            <Dialog visible={genderDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Gender Details" modal className="p-fluid" footer={genderDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Name
                    </label>
                    <InputText id="name" value={gender.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !gender.name })} />
                    {submitted && !gender.name && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="code" className="font-bold">
                        Code
                    </label>
                    <InputText id="code" value={gender.code} onChange={(e) => onInputChange(e, 'code')} required autoFocus className={classNames({ 'p-invalid': submitted && !gender.code })} />
                    {submitted && !gender.name && <small className="p-error">Code is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="description" className="font-bold">
                        Description
                    </label>
                    <InputTextarea id="description" value={gender.description} onChange={(e: any) => onInputChange(e, 'description')} required rows={3} cols={20} />
                </div>
            </Dialog>

            <Dialog visible={deleteGenderDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteGenderDialogFooter} onHide={hideDeleteGenderDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {gender && (
                        <span>
                            Are you sure you want to delete <b>{gender.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteGendersDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteGendersDialogFooter} onHide={hideDeleteGendersDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {gender && <span>Are you sure you want to delete the selected genders?</span>}
                </div>
            </Dialog>
        </div>
    );
}
