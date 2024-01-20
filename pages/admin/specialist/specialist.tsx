import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton';
import { InputNumber, InputNumberChangeEvent } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { useRouter } from 'next/router';

interface Specialist {
    id: string | null;
    code: string;
    name: string;
    description: string;
    image: string | null;
    specialty: string | null;
    review: string;
    status: string;
}

export default function SpecialistTable() {
    let emptySpecialist: Specialist = {
        id: null,
        code: '',
        name: '',
        image: null,
        description: '',
        specialty: null,
        review: '',
        status: 'Active'
    };

    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    const specialties = [
        { name: 'Oncology', value: 'Oncology' },
        { name: 'Dermatologist', value: 'Dermatology' }
    ];

    const [specialists, setSpecialists] = useState<Specialist[]>([]);
    const [specialistDialog, setSpecialistDialog] = useState<boolean>(false);
    const [deleteSpecialistDialog, setDeleteSpecialistDialog] = useState<boolean>(false);
    const [deleteSpecialistsDialog, setDeleteSpecialistsDialog] = useState<boolean>(false);
    const [specialist, setSpecialist] = useState<Specialist>(emptySpecialist);
    const [selectedSpecialists, setSelectedSpecialists] = useState<Specialist[]>([]);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const toast = useRef<Toast>(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedSpeciality, setSelectedSpeciality] = useState(null);
    const dt = useRef<DataTable<Specialist[]>>(null);
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
        setSpecialist(emptySpecialist);
        setSubmitted(false);
        setFile('');
        setSpecialistDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setSpecialistDialog(false);
    };

    const hideDeleteSpecialistDialog = () => {
        setDeleteSpecialistDialog(false);
    };

    const hideDeleteSpecialistsDialog = () => {
        setDeleteSpecialistsDialog(false);
    };

    const saveSpecialist = () => {
        setSubmitted(true);

        if (specialist.name.trim()) {
            let _specialists = [...specialists];
            let _specialist = { ...specialist };

            if (specialist.id) {
                const index = findIndexById(specialist.id);

                _specialists[index] = _specialist;
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                _specialist.id = createId();
                _specialist.image = 'specialist-placeholder.svg';
                _specialists.push(_specialist);
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            setSpecialists(_specialists);
            setSpecialistDialog(false);
            setSpecialist(emptySpecialist);
        }
    };

    const editspecialist = (specialist: Specialist) => {
        setSpecialist({ ...specialist });
        setSpecialistDialog(true);
    };

    const confirmDeleteSpecialist = (specialist: Specialist) => {
        setSpecialist(specialist);
        setDeleteSpecialistDialog(true);
    };

    const deleteSpecialist = () => {
        let _specialists = specialists.filter((val) => val.id !== specialist.id);

        setSpecialists(_specialists);
        setDeleteSpecialistDialog(false);
        setSpecialist(emptySpecialist);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Specialist Deleted', life: 3000 });
    };

    const findIndexById = (id: string) => {
        let index = -1;

        for (let i = 0; i < specialists.length; i++) {
            if (specialists[i].id === id) {
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
        setDeleteSpecialistsDialog(true);
    };

    const deleteSelectedSpecialists = () => {
        let _specialists = specialists.filter((val) => !selectedSpecialists.includes(val));

        setSpecialists(_specialists);
        setDeleteSpecialistsDialog(false);
        setSelectedSpecialists([]);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Specialists Deleted', life: 3000 });
    };

    const onSpecialtyChange = (rowData: any, e: any) => {
        const updatedData = specialists.map((item: any) => (item.id === rowData.id ? { ...item, role: e.value } : item));
        setSpecialists(updatedData);
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _specialist = { ...specialist };

        // @ts-ignore
        _specialist[`${name}`] = val;

        setSpecialist(_specialist);
    };

    const onInputNumberChange = (e: InputNumberChangeEvent, name: string) => {
        const val = e.value || 0;
        let _specialist = { ...specialist };

        // @ts-ignore
        _specialist[`${name}`] = val;

        setSpecialist(_specialist);
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

    const imageBodyTemplate = (rowData: Specialist) => {
        return <img src={`https://primefaces.org/cdn/primereact/images/specialist/${rowData.image}`} alt={rowData.image!} className="shadow-2 border-round" style={{ width: '64px' }} />;
    };

    // const ratingBodyTemplate = (rowData: Product) => {
    //     return <Rating value={rowData.rating} readOnly cancel={false} />;
    // };

    const statusBodyTemplate = (rowData: Specialist) => {
        return <Tag value={rowData.status} severity={getSeverity(rowData)}></Tag>;
    };

    const actionBodyTemplate = (rowData: Specialist) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editspecialist(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteSpecialist(rowData)} />
            </React.Fragment>
        );
    };

    const getSeverity = (specialist: Specialist) => {
        switch (specialist.status) {
            case 'Active':
                return 'success';

            case 'Inactive':
                return 'danger';

            default:
                return null;
        }
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Specialist</h4>
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
    const specialistDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveSpecialist} />
        </React.Fragment>
    );
    const deleteSpecialistDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteSpecialistDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSpecialist} />
        </React.Fragment>
    );
    const deleteSpecialistsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteSpecialistsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedSpecialists} />
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable
                    ref={dt}
                    value={specialists}
                    selection={selectedSpecialists}
                    onSelectionChange={(e) => {
                        if (Array.isArray(e.value)) {
                            setSelectedSpecialists(e.value);
                        }
                    }}
                    dataKey="id"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} specialists"
                    globalFilter={globalFilter}
                    header={header}
                >
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="name" header="Name" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="code" header="Code" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="image" header="Image" body={imageBodyTemplate} style={{ minWidth: '10rem' }}></Column>
                    <Column field="specialty" header="Specialty" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="review" header="Reviews" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={specialistDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Specialist Details" modal className="p-fluid" footer={specialistDialogFooter} onHide={hideDialog}>
                {specialist.image && <img src={`${specialist.image}`} alt={specialist.image} className="specialist-image block m-auto pb-3" />}
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Name
                    </label>
                    <InputText id="name" value={specialist.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !specialist.name })} />
                    {submitted && !specialist.name && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="code" className="font-bold">
                        Code
                    </label>
                    <InputText id="code" value={specialist.code} onChange={(e) => onInputChange(e, 'code')} required autoFocus className={classNames({ 'p-invalid': submitted && !specialist.code })} />
                    {submitted && !specialist.name && <small className="p-error">Code is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="description" className="font-bold">
                        Description
                    </label>
                    <InputTextarea id="description" value={specialist.description} onChange={(e: any) => onInputChange(e, 'description')} required rows={3} cols={20} />
                </div>
                <div className=" field ">
                    <label htmlFor="image" className="font-bold">
                        Image
                    </label>
                    <div>
                        <img style={{ width: 100, height: 100 }} src={file} />
                    </div>
                    <input type="file" onChange={handleChange} />
                </div>

                <div className="field w-full">
                    <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" placeholder="Select a City" className=" field w-full md:w-14rem" />
                </div>
                <div className="field w-full">
                    <Dropdown id="specialty" value={specialist.specialty} onChange={(e) => onSpecialtyChange(specialist, e)} options={specialties} optionLabel="name" placeholder="Select a Specialty" className=" field w-full md:w-14rem" />
                </div>
                <div className="field">
                    <label htmlFor="review" className="font-bold">
                        review
                    </label>
                    <InputTextarea id="review" value={specialist.review} onChange={(e: any) => onInputChange(e, 'review')} required rows={3} cols={20} />
                </div>
            </Dialog>

            <Dialog visible={deleteSpecialistDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteSpecialistDialogFooter} onHide={hideDeleteSpecialistDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {specialist && (
                        <span>
                            Are you sure you want to delete <b>{specialist.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteSpecialistsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteSpecialistsDialogFooter} onHide={hideDeleteSpecialistsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {specialist && <span>Are you sure you want to delete the selected specialists?</span>}
                </div>
            </Dialog>
        </div>
    );
}
