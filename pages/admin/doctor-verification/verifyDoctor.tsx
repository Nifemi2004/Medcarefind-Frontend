import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputNumber, InputNumberChangeEvent } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { useRouter } from 'next/router';
import { InputMask } from 'primereact/inputmask';
import CertificateTable from './certificate';

interface VerifyDoctor {
    id?: string;
    name: string;
    memberId: number | null;
    specialty: string;
    registrationDate: string;
    phoneNumber: number | null;
}

export default function VerifyDoctorTable() {
    let emptyVerifyDoctor: VerifyDoctor = {
        id: '',
        name: '',
        memberId: null,
        specialty: '',
        registrationDate: '',
        phoneNumber: null
    };

    const [verifyDoctors, setVerifyDoctors] = useState<VerifyDoctor[]>([]);
    const [verifyDoctorDialog, setVerifyDoctorDialog] = useState<boolean>(false);
    const [deleteVerifyDoctorDialog, setDeleteVerifyDoctorDialog] = useState<boolean>(false);
    const [deleteVerifyDoctorsDialog, setDeleteVerifyDoctorsDialog] = useState<boolean>(false);
    const [verifyDoctor, setVerifyDoctor] = useState<VerifyDoctor>(emptyVerifyDoctor);
    const [selectedVerifyDoctors, setSelectedVerifyDoctors] = useState<VerifyDoctor[]>([]);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<VerifyDoctor[]>>(null);
    const [file, setFile] = useState<string>();

    const router = useRouter();

    const formatCurrency = (value: number) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    useEffect(() => {
        let demo: VerifyDoctor = {
            name: 'hello',
            memberId: 1234,
            specialty: 'oncology',
            registrationDate: '5th of May',
            phoneNumber: 8054312671
        };

        test(demo);
    }, []);

    const test = (demo: VerifyDoctor) => {
        let _verifyDoctor = { ...verifyDoctor };
        let _verifyDoctors = [...verifyDoctors];

        // @ts-ignore
        _verifyDoctor['name'] = demo.name;
        // @ts-ignore
        _verifyDoctor['memberId'] = demo.memberId;
        // @ts-ignore
        _verifyDoctor['specialty'] = demo.specialty;
        // @ts-ignore
        _verifyDoctor['registrationDate'] = demo.registrationDate;
        // @ts-ignore
        _verifyDoctor['phoneNumber'] = demo.phoneNumber;
        setVerifyDoctor(_verifyDoctor);

        _verifyDoctor.id = createId();
        _verifyDoctors.push(_verifyDoctor);

        setVerifyDoctors(_verifyDoctors);
        setVerifyDoctor(emptyVerifyDoctor);
    };

    function handleChange(e: any) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    const openNew = () => {
        setVerifyDoctor(emptyVerifyDoctor);
        setSubmitted(false);
        setFile('');
        setVerifyDoctorDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setVerifyDoctorDialog(false);
    };

    const hideDeleteVerifyDoctorDialog = () => {
        setDeleteVerifyDoctorDialog(false);
    };

    const hideDeleteVerifyDoctorsDialog = () => {
        setDeleteVerifyDoctorsDialog(false);
    };

    const saveVerifyDoctor = () => {
        setSubmitted(true);
        console.log(verifyDoctor);

        if (verifyDoctor.name.trim()) {
            let _verifyDoctors = [...verifyDoctors];
            let _verifyDoctor = { ...verifyDoctor };

            if (verifyDoctor.id) {
                const index = findIndexById(verifyDoctor.id);

                _verifyDoctors[index] = _verifyDoctor;
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'VerifyDoctor Updated', life: 3000 });
            } else {
                _verifyDoctor.id = createId();
                _verifyDoctors.push(_verifyDoctor);
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'VerifyDoctor Created', life: 3000 });
            }

            setVerifyDoctors(_verifyDoctors);
            setVerifyDoctorDialog(false);
            setVerifyDoctor(emptyVerifyDoctor);
        }
    };

    const editverifyDoctor = (verifyDoctor: VerifyDoctor) => {
        setVerifyDoctor({ ...verifyDoctor });
        setVerifyDoctorDialog(true);
    };

    const confirmDeleteVerifyDoctor = (verifyDoctor: VerifyDoctor) => {
        setVerifyDoctor(verifyDoctor);
        setDeleteVerifyDoctorDialog(true);
    };

    const deleteVerifyDoctor = () => {
        let _verifyDoctors = verifyDoctors.filter((val) => val.id !== verifyDoctor.id);

        setVerifyDoctors(_verifyDoctors);
        setDeleteVerifyDoctorDialog(false);
        setVerifyDoctor(emptyVerifyDoctor);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'VerifyDoctor Deleted', life: 3000 });
    };

    const findIndexById = (id: string) => {
        let index = -1;

        for (let i = 0; i < verifyDoctors.length; i++) {
            if (verifyDoctors[i].id === id) {
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
        setDeleteVerifyDoctorsDialog(true);
    };

    const deleteSelectedVerifyDoctors = () => {
        let _verifyDoctors = verifyDoctors.filter((val) => !selectedVerifyDoctors.includes(val));

        setVerifyDoctors(_verifyDoctors);
        setDeleteVerifyDoctorsDialog(false);
        setSelectedVerifyDoctors([]);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'VerifyDoctors Deleted', life: 3000 });
    };

    const onDropdownChange = (e: any, name: string) => {
        let _verifyDoctor = { ...verifyDoctor };

        // @ts-ignore
        _verifyDoctor[`${name}`] = e.value;
        setVerifyDoctor(_verifyDoctor);
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _verifyDoctor = { ...verifyDoctor };

        // @ts-ignore
        _verifyDoctor[`${name}`] = val;

        setVerifyDoctor(_verifyDoctor);
    };

    const onInputNumberChange = (e: InputNumberChangeEvent, name: string) => {
        const val = e.value || 0;
        let _verifyDoctor = { ...verifyDoctor };

        // @ts-ignore
        _verifyDoctor[`${name}`] = val;

        setVerifyDoctor(_verifyDoctor);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedVerifyDoctors || !selectedVerifyDoctors.length} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Back" icon="pi pi-arrow-left" onClick={() => router.push('/admin/clientManagement/doctorManagement')} />;
    };

    const actionBodyTemplate = (rowData: VerifyDoctor) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editverifyDoctor(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteVerifyDoctor(rowData)} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Verification</h4>
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
    // const verifyDoctorDialogFooter = (
    //     <React.Fragment>
    //         <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
    //         <Button label="Save" icon="pi pi-check" onClick={saveVerifyDoctor} />
    //     </React.Fragment>
    // );
    const deleteVerifyDoctorDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteVerifyDoctorDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteVerifyDoctor} />
        </React.Fragment>
    );
    const deleteVerifyDoctorsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteVerifyDoctorsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedVerifyDoctors} />
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable
                    ref={dt}
                    value={verifyDoctors}
                    selection={selectedVerifyDoctors}
                    onSelectionChange={(e) => {
                        if (Array.isArray(e.value)) {
                            setSelectedVerifyDoctors(e.value);
                        }
                    }}
                    dataKey="id"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} verifyDoctors"
                    globalFilter={globalFilter}
                    header={header}
                >
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="name" header="Name" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="memberId" header="Member Id" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="specialty" header="Specialty" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="registrationDate" header="Registration Date" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={verifyDoctorDialog} style={{ width: '80rem' }} maximizable breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Verify Certificates" modal onHide={hideDialog}>
                <div className="confirmation-content">
                    {verifyDoctor && (
                        <span className="flex flex-column">
                            <p>
                                Name: <b>{verifyDoctor.name}</b>
                            </p>
                            <p>
                                Specialty: <b>{verifyDoctor.specialty}</b>
                            </p>
                            <p>
                                Registration Date: <b>{verifyDoctor.registrationDate}</b>
                            </p>
                            <p>
                                Phone Number: <b>{verifyDoctor.phoneNumber}</b>
                            </p>
                        </span>
                    )}

                    <div>
                        <CertificateTable/>
                    </div>
                </div>
            </Dialog>

            <Dialog visible={deleteVerifyDoctorDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteVerifyDoctorDialogFooter} onHide={hideDeleteVerifyDoctorDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {verifyDoctor && (
                        <span>
                            Are you sure you want to delete <b>{verifyDoctor.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteVerifyDoctorsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteVerifyDoctorsDialogFooter} onHide={hideDeleteVerifyDoctorsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {verifyDoctor && <span>Are you sure you want to delete the selected verifyDoctors?</span>}
                </div>
            </Dialog>
        </div>
    );
}
