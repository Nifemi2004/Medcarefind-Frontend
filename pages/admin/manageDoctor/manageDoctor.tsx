import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber, InputNumberChangeEvent } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { useRouter } from 'next/router';
import { InputMask } from 'primereact/inputmask';

interface Doctor {
    id: string | null;
    code: string;
    name: string;
    yearOfEstablishment: number | null;
    description: string;
    image: string | null;
    city: string | null;
    nationality: string | null;
    specialty: string | null;
    status: string;
    contactName: string;
    phoneNumber: number | null;
    streetName: string;
    buildingNumber: number | null;
    emailAddress: string;
    website: string;
    facility: {};
    service: {};
}

interface facility {
    name: string;
    value: string;
}

export default function DoctorTable() {
    let emptyDoctor: Doctor = {
        id: null,
        code: '',
        name: '',
        yearOfEstablishment: null,
        image: null,
        nationality: '',
        city: '',
        description: '',
        specialty: null,
        status: 'Active',
        contactName: '',
        phoneNumber: null,
        streetName: '',
        buildingNumber: null,
        emailAddress: '',
        website: '',
        facility: {},
        service: {}
    };


    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [doctorDialog, setDoctorDialog] = useState<boolean>(false);
    const [deleteDoctorDialog, setDeleteDoctorDialog] = useState<boolean>(false);
    const [deleteDoctorsDialog, setDeleteDoctorsDialog] = useState<boolean>(false);
    const [doctor, setDoctor] = useState<Doctor>(emptyDoctor);
    const [selectedDoctors, setSelectedDoctors] = useState<Doctor[]>([]);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<Doctor[]>>(null);
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
        setDoctor(emptyDoctor);
        setSubmitted(false);
        setFile('');
        setDoctorDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setDoctorDialog(false);
    };

    const hideDeleteDoctorDialog = () => {
        setDeleteDoctorDialog(false);
    };

    const hideDeleteDoctorsDialog = () => {
        setDeleteDoctorsDialog(false);
    };

    const saveDoctor = () => {
        setSubmitted(true);
        console.log(doctor);

        if (doctor.name.trim()) {
            let _doctors = [...doctors];
            let _doctor = { ...doctor };

            if (doctor.id) {
                const index = findIndexById(doctor.id);

                _doctors[index] = _doctor;
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Doctor Updated', life: 3000 });
            } else {
                _doctor.id = createId();
                _doctor.image = 'doctor-placeholder.svg';
                _doctors.push(_doctor);
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Doctor Created', life: 3000 });
            }

            setDoctors(_doctors);
            setDoctorDialog(false);
            setDoctor(emptyDoctor);
        }
    };

    const editdoctor = (doctor: Doctor) => {
        setDoctor({ ...doctor });
        setDoctorDialog(true);
    };

    const confirmDeleteDoctor = (doctor: Doctor) => {
        setDoctor(doctor);
        setDeleteDoctorDialog(true);
    };

    const deleteDoctor = () => {
        let _doctors = doctors.filter((val) => val.id !== doctor.id);

        setDoctors(_doctors);
        setDeleteDoctorDialog(false);
        setDoctor(emptyDoctor);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Doctor Deleted', life: 3000 });
    };

    const findIndexById = (id: string) => {
        let index = -1;

        for (let i = 0; i < doctors.length; i++) {
            if (doctors[i].id === id) {
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

    const confirmDeleteSelected = () => {
        setDeleteDoctorsDialog(true);
    };

    const deleteSelectedDoctors = () => {
        let _doctors = doctors.filter((val) => !selectedDoctors.includes(val));

        setDoctors(_doctors);
        setDeleteDoctorsDialog(false);
        setSelectedDoctors([]);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Doctors Deleted', life: 3000 });
    };


    const onDropdownChange = (e: any, name: string) => {
        let _doctor = { ...doctor };

        // @ts-ignore
        _doctor[`${name}`] = e.value;
        setDoctor(_doctor);
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _doctor = { ...doctor };

        // @ts-ignore
        _doctor[`${name}`] = val;

        setDoctor(_doctor);
    };

    const onInputNumberChange = (e: InputNumberChangeEvent, name: string) => {
        const val = e.value || 0;
        let _doctor = { ...doctor };

        // @ts-ignore
        _doctor[`${name}`] = val;

        setDoctor(_doctor);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedDoctors || !selectedDoctors.length} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Back" icon="pi pi-arrow-left" onClick={() => router.push('/admin/clientManagement/doctorManagement')} />;
    };

    const imageBodyTemplate = (rowData: Doctor) => {
        return <img src={`https://primefaces.org/cdn/primereact/images/doctor/${rowData.image}`} alt={rowData.image!} className="shadow-2 border-round" style={{ width: '64px' }} />;
    };


    const statusBodyTemplate = (rowData: Doctor) => {
        return <Tag value={rowData.status} severity={getSeverity(rowData)}></Tag>;
    };

    const actionBodyTemplate = (rowData: Doctor) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editdoctor(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteDoctor(rowData)} />
            </React.Fragment>
        );
    };

    const getSeverity = (doctor: Doctor) => {
        switch (doctor.status) {
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
            <h4 className="m-0">Manage Doctor</h4>
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
    const doctorDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveDoctor} />
        </React.Fragment>
    );
    const deleteDoctorDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteDoctorDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteDoctor} />
        </React.Fragment>
    );
    const deleteDoctorsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteDoctorsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedDoctors} />
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable
                    ref={dt}
                    value={doctors}
                    selection={selectedDoctors}
                    onSelectionChange={(e) => {
                        if (Array.isArray(e.value)) {
                            setSelectedDoctors(e.value);
                        }
                    }}
                    dataKey="id"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} doctors"
                    globalFilter={globalFilter}
                    header={header}
                >
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="name" header="Name" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="code" header="Code" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="image" header="Image" body={imageBodyTemplate} style={{ minWidth: '10rem' }}></Column>
                    <Column field="city" header="City" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

                        <Dialog visible={deleteDoctorDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteDoctorDialogFooter} onHide={hideDeleteDoctorDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {doctor && (
                        <span>
                            Are you sure you want to delete <b>{doctor.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteDoctorsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteDoctorsDialogFooter} onHide={hideDeleteDoctorsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {doctor && <span>Are you sure you want to delete the selected doctors?</span>}
                </div>
            </Dialog>
        </div>
    );
}
