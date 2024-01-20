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
import { InputMask } from 'primereact/inputmask';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';

interface Hospital {
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

export default function HospitalTable() {
    let emptyHospital: Hospital = {
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

    const cities = [
        { name: 'New York', value: 'New York' },
        { name: 'Rome', value: 'Rome' },
        { name: 'London', value: 'London' },
        { name: 'Istanbul', value: 'Istanbul' },
        { name: 'Paris', value: 'Paris' }
    ];

    const specialties = [
        { name: 'Oncology', value: 'Oncology' },
        { name: 'Dermatologist', value: 'Dermatology' }
    ];

    const facilities: facility[] = [
        { name: 'Ambulatory surgical centers', value: 'Ambulatory surgical centers' },
        { name: 'Birth centers', value: 'Birth centers' },
        { name: 'Blood banks', value: 'Blood banks' },
        { name: 'Diabetes education centers', value: 'Diabetes education centers' },
        { name: 'Dialysis Centers', value: 'Dialysis Centers' }
    ];

    const [hospitals, setHospitals] = useState<Hospital[]>([]);
    const [hospitalDialog, setHospitalDialog] = useState<boolean>(false);
    const [deleteHospitalDialog, setDeleteHospitalDialog] = useState<boolean>(false);
    const [deleteHospitalsDialog, setDeleteHospitalsDialog] = useState<boolean>(false);
    const [hospital, setHospital] = useState<Hospital>(emptyHospital);
    const [selectedHospitals, setSelectedHospitals] = useState<Hospital[]>([]);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<Hospital[]>>(null);
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
        setHospital(emptyHospital);
        setSubmitted(false);
        setFile('');
        setHospitalDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setHospitalDialog(false);
    };

    const hideDeleteHospitalDialog = () => {
        setDeleteHospitalDialog(false);
    };

    const hideDeleteHospitalsDialog = () => {
        setDeleteHospitalsDialog(false);
    };

    const saveHospital = () => {
        setSubmitted(true);
        console.log(hospital);

        if (hospital.name.trim()) {
            let _hospitals = [...hospitals];
            let _hospital = { ...hospital };

            if (hospital.id) {
                const index = findIndexById(hospital.id);

                _hospitals[index] = _hospital;
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Hospital Updated', life: 3000 });
            } else {
                _hospital.id = createId();
                _hospital.image = 'hospital-placeholder.svg';
                _hospitals.push(_hospital);
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Hospital Created', life: 3000 });
            }

            setHospitals(_hospitals);
            setHospitalDialog(false);
            setHospital(emptyHospital);
        }
    };

    const edithospital = (hospital: Hospital) => {
        setHospital({ ...hospital });
        setHospitalDialog(true);
    };

    const confirmDeleteHospital = (hospital: Hospital) => {
        setHospital(hospital);
        setDeleteHospitalDialog(true);
    };

    const deleteHospital = () => {
        let _hospitals = hospitals.filter((val) => val.id !== hospital.id);

        setHospitals(_hospitals);
        setDeleteHospitalDialog(false);
        setHospital(emptyHospital);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Hospital Deleted', life: 3000 });
    };

    const findIndexById = (id: string) => {
        let index = -1;

        for (let i = 0; i < hospitals.length; i++) {
            if (hospitals[i].id === id) {
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
        setDeleteHospitalsDialog(true);
    };

    const deleteSelectedHospitals = () => {
        let _hospitals = hospitals.filter((val) => !selectedHospitals.includes(val));

        setHospitals(_hospitals);
        setDeleteHospitalsDialog(false);
        setSelectedHospitals([]);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Hospitals Deleted', life: 3000 });
    };

    // const onSpecialtyChange = (e: any) => {
    //     let _hospital = { ...hospital };

    //     _hospital['specialty'] = e.value;
    //     setSelectedSpeciality(e.value);
    //     setHospital(_hospital);
    // };

    // const onCityChange = (e: any) => {
    //     let _hospital = { ...hospital };

    //     _hospital['city'] = e.value;
    //     setSelectedCity(e.value);
    //     setHospital(_hospital);
    // };

    const onDropdownChange = (e: any, name: string) => {
        let _hospital = { ...hospital };

        // @ts-ignore
        _hospital[`${name}`] = e.value;
        setHospital(_hospital);
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _hospital = { ...hospital };

        // @ts-ignore
        _hospital[`${name}`] = val;

        setHospital(_hospital);
    };

    const onInputNumberChange = (e: InputNumberChangeEvent, name: string) => {
        const val = e.value || 0;
        let _hospital = { ...hospital };

        // @ts-ignore
        _hospital[`${name}`] = val;

        setHospital(_hospital);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedHospitals || !selectedHospitals.length} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Back" icon="pi pi-arrow-left" onClick={() => router.push('/admin/administration/metadata')} />;
    };

    const imageBodyTemplate = (rowData: Hospital) => {
        return <img src={`https://primefaces.org/cdn/primereact/images/hospital/${rowData.image}`} alt={rowData.image!} className="shadow-2 border-round" style={{ width: '64px' }} />;
    };

    // const ratingBodyTemplate = (rowData: Hospital) => {
    //     return <Rating value={rowData.rating} readOnly cancel={false} />;
    // };

    const statusBodyTemplate = (rowData: Hospital) => {
        return <Tag value={rowData.status} severity={getSeverity(rowData)}></Tag>;
    };

    const actionBodyTemplate = (rowData: Hospital) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => edithospital(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteHospital(rowData)} />
            </React.Fragment>
        );
    };

    const getSeverity = (hospital: Hospital) => {
        switch (hospital.status) {
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
            <h4 className="m-0">Manage Hospital</h4>
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
    const hospitalDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveHospital} />
        </React.Fragment>
    );
    const deleteHospitalDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteHospitalDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteHospital} />
        </React.Fragment>
    );
    const deleteHospitalsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteHospitalsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedHospitals} />
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable
                    ref={dt}
                    value={hospitals}
                    selection={selectedHospitals}
                    onSelectionChange={(e) => {
                        if (Array.isArray(e.value)) {
                            setSelectedHospitals(e.value);
                        }
                    }}
                    dataKey="id"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} hospitals"
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

            <Dialog visible={hospitalDialog} style={{ width: '70vw' }} maximizable breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Hospital Details" modal className="p-fluid" footer={hospitalDialogFooter} onHide={hideDialog}>
                {hospital.image && <img src={`${hospital.image}`} alt={hospital.image} className="hospital-image block m-auto pb-3" />}
                <div className="flex flex-column gap-2">
                    <label className="font-bold">Personal Information</label>
                    <div className="flex gap-3">
                        <div className="field">
                            <InputText id="name" value={hospital.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus placeholder="Name" className={classNames({ 'p-invalid': submitted && !hospital.name })} />
                            {submitted && !hospital.name && <small className="p-error">Name is required.</small>}
                        </div>
                        <div className="field">
                            <InputText id="code" value={hospital.code} onChange={(e) => onInputChange(e, 'code')} required autoFocus placeholder="Code" className={classNames({ 'p-invalid': submitted && !hospital.code })} />
                            {submitted && !hospital.name && <small className="p-error">Code is required.</small>}
                        </div>
                        <div className="field">
                            <Dropdown id="specialty" value={hospital.specialty} onChange={(e) => onDropdownChange(e, 'specialty')} options={specialties} optionLabel="name" placeholder="Select a Specialty" className=" field w-full md:w-14rem" />
                        </div>
                        <div className="field flex-auto">
                            <InputNumber inputId="integeronly" value={hospital.yearOfEstablishment} placeholder="Year of Establishment" onChange={(e: any) => onInputNumberChange(e, 'yearOfEstablishment')} />
                        </div>
                    </div>
                    <div className="field">
                        <InputTextarea id="description" value={hospital.description} onChange={(e: any) => onInputChange(e, 'description')} placeholder="Description" required rows={3} cols={20} />
                    </div>
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

                <div className="flex flex-column gap-2">
                    <label className="font-bold">Location</label>
                    <div className="flex gap-3">
                        <div className="field">
                            <Dropdown id="nationality" value={hospital.nationality} onChange={(e) => onDropdownChange(e, 'nationality')} options={cities} optionLabel="name" placeholder="Select a Nationality" className=" field w-full md:w-14rem" />
                        </div>
                        <div className="field">
                            <Dropdown id="city" value={hospital.city} onChange={(e) => onDropdownChange(e, 'city')} options={cities} optionLabel="name" placeholder="Select a City" className=" field w-full md:w-14rem" />
                        </div>
                        <div className="field">
                            <InputText id="name" value={hospital.streetName} onChange={(e) => onInputChange(e, 'streetName')} autoFocus placeholder="Street Name" />
                        </div>
                        <div className="field flex-auto">
                            <InputNumber inputId="integeronly" value={hospital.buildingNumber} placeholder="Building Number" onChange={(e: any) => onInputNumberChange(e, 'buildingNumber')} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-column gap-2">
                    <label className="font-bold">Contact Information</label>
                    <div className="flex gap-3">
                        <div className="field">
                            <InputText id="name" value={hospital.contactName} onChange={(e) => onInputChange(e, 'contactName')} required placeholder="Contact Name" autoFocus />
                            {submitted && !hospital.contactName && <small className="p-error">Contact Name is required.</small>}
                        </div>
                        <div className="field">
                            <InputMask id="phone" mask="(999) 999-9999" placeholder="(123) 456-7890" onChange={(e: any) => onInputNumberChange(e, 'phoneNumber')}></InputMask>
                            {submitted && hospital.phoneNumber === 0 && <small className="p-error">Phone Number is required.</small>}
                        </div>
                        <div className="field">
                            <InputText id="name" value={hospital.emailAddress} onChange={(e) => onInputChange(e, 'emailAddress')} required placeholder="Email Address" autoFocus />
                            {submitted && !hospital.emailAddress && <small className="p-error">Email Address is required.</small>}
                        </div>
                        <div className="field">
                            <InputText id="name" value={hospital.website} onChange={(e) => onInputChange(e, 'website')} required placeholder="Website(optional)" autoFocus />
                        </div>
                    </div>
                </div>
                {/* <div className="flex flex-column gap-2">
                    <label className="font-bold">Facilities and Services</label>
                    <div className="flex gap-3">
                            <MultiSelect
                                value={hospital.facility}
                                onChange={(e:any) => console.log(e)} 
                                options={facilities}
                                optionLabel="name"
                                placeholder="Select Facility"
                                maxSelectedLabels={3}
                                className="w-full md:w-20rem"
                            />
                    </div>
                </div> */}
            </Dialog>

            <Dialog visible={deleteHospitalDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteHospitalDialogFooter} onHide={hideDeleteHospitalDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {hospital && (
                        <span>
                            Are you sure you want to delete <b>{hospital.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteHospitalsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteHospitalsDialogFooter} onHide={hideDeleteHospitalsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {hospital && <span>Are you sure you want to delete the selected hospitals?</span>}
                </div>
            </Dialog>
        </div>
    );
}
