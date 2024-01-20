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

interface Certificate {
    id: string | null;
    code: string;
    name: string;
    description: string;
    yearOfCertification: string;
    image: string;
}

export default function CertificateTable() {
    let emptyCertificate: Certificate = {
        id: null,       
        code: '',
        name: '',
        description: '',
        yearOfCertification: '',
        image: ''
    };

    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [certificateDialog, setCertificateDialog] = useState<boolean>(false);
    const [deleteCertificateDialog, setDeleteCertificateDialog] = useState<boolean>(false);
    const [deleteCertificatesDialog, setDeleteCertificatesDialog] = useState<boolean>(false);
    const [certificate, setCertificate] = useState<Certificate>(emptyCertificate);
    const [selectedCertificates, setSelectedCertificates] = useState<Certificate[]>([]);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const toast = useRef<Toast>(null);

    const router = useRouter();

    const dt = useRef<DataTable<Certificate[]>>(null);
    const [file, setFile] = useState<string>();

    const formatCurrency = (value: number) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    function handleChange(e: any) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    const openNew = () => {
        setCertificate(emptyCertificate);
        setSubmitted(false);
        setFile('');
        setCertificateDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setCertificateDialog(false);
    };

    const hideDeleteCertificateDialog = () => {
        setDeleteCertificateDialog(false);
    };

    const hideDeleteCertificatesDialog = () => {
        setDeleteCertificatesDialog(false);
    };

    const saveCertificate = () => {
        setSubmitted(true);

        if (certificate.name.trim()) {
            let _certificates = [...certificates];
            let _certificate = { ...certificate };

            if (certificate.id) {
                const index = findIndexById(certificate.id);

                _certificates[index] = _certificate;
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Certificate Updated', life: 3000 });
            } else {
                _certificate.id = createId();
                _certificates.push(_certificate);
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Certificate Created', life: 3000 });
            }

            setCertificates(_certificates);
            setCertificateDialog(false);
            setCertificate(emptyCertificate);
        }
    };

    const editcertificate = (certificate: Certificate) => {
        setCertificate({ ...certificate });
        setCertificateDialog(true);
    };

    const confirmDeleteCertificate = (certificate: Certificate) => {
        setCertificate(certificate);
        setDeleteCertificateDialog(true);
    };

    const deleteCertificate = () => {
        let _certificates = certificates.filter((val) => val.id !== certificate.id);

        setCertificates(_certificates);
        setDeleteCertificateDialog(false);
        setCertificate(emptyCertificate);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Certificate Deleted', life: 3000 });
    };

    const findIndexById = (id: string) => {
        let index = -1;

        for (let i = 0; i < certificates.length; i++) {
            if (certificates[i].id === id) {
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
        setDeleteCertificatesDialog(true);
    };

    const deleteSelectedCertificates = () => {
        let _certificates = certificates.filter((val) => !selectedCertificates.includes(val));

        setCertificates(_certificates);
        setDeleteCertificatesDialog(false);
        setSelectedCertificates([]);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Certificates Deleted', life: 3000 });
    };

    const onSpecialtyChange = (rowData: any, e: any) => {
        const updatedData = certificates.map((item: any) => (item.id === rowData.id ? { ...item, role: e.value } : item));
        setCertificates(updatedData);
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _certificate = { ...certificate };

        // @ts-ignore
        _certificate[`${name}`] = val;

        setCertificate(_certificate);
    };

    const onInputNumberChange = (e: InputNumberChangeEvent, name: string) => {
        const val = e.value || 0;
        let _certificate = { ...certificate };

        // @ts-ignore
        _certificate[`${name}`] = val;

        setCertificate(_certificate);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedCertificates || !selectedCertificates.length} />
            </div>
        );
    };

    const imageBodyTemplate = (rowData: Certificate) => {
        return <img src={`https://primefaces.org/cdn/primereact/images/certificate/${rowData.image}`} alt={rowData.image!} className="shadow-2 border-round" style={{ width: '64px' }} />;
    };

    const actionBodyTemplate = (rowData: Certificate) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editcertificate(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteCertificate(rowData)} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Certificate</h4>
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
    const certificateDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveCertificate} />
        </React.Fragment>
    );
    const deleteCertificateDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteCertificateDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteCertificate} />
        </React.Fragment>
    );
    const deleteCertificatesDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteCertificatesDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedCertificates} />
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

                <DataTable
                    ref={dt}
                    value={certificates}
                    selection={selectedCertificates}
                    onSelectionChange={(e) => {
                        if (Array.isArray(e.value)) {
                            setSelectedCertificates(e.value);
                        }
                    }}
                    dataKey="id"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} certificates"
                    globalFilter={globalFilter}
                    header={header}
                >
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="name" header="Certification Name" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="code" header="Code" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="yearOfCertification" header="Year of Certification" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="description" header="Description" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="image" header="Image" body={imageBodyTemplate} style={{ minWidth: '10rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={deleteCertificateDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteCertificateDialogFooter} onHide={hideDeleteCertificateDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {certificate && (
                        <span>
                            Are you sure you want to delete <b>{certificate.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteCertificatesDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteCertificatesDialogFooter} onHide={hideDeleteCertificatesDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {certificate && <span>Are you sure you want to delete the selected certificates?</span>}
                </div>
            </Dialog>
        </div>
    );
}
