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

interface Service {
    id: string | null;
    code: string;
    name: string;
    description: string;
}

export default function ServiceTable() {
    let emptyService: Service = {
        id: null,
        code: '',
        name: '',
        description: ''
    };

    const [services, setServices] = useState<Service[]>([]);
    const [serviceDialog, setServiceDialog] = useState<boolean>(false);
    const [deleteServiceDialog, setDeleteServiceDialog] = useState<boolean>(false);
    const [deleteServicesDialog, setDeleteServicesDialog] = useState<boolean>(false);
    const [service, setService] = useState<Service>(emptyService);
    const [selectedServices, setSelectedServices] = useState<Service[]>([]);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<Service[]>>(null);
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
        setService(emptyService);
        setSubmitted(false);
        setFile('');
        setServiceDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setServiceDialog(false);
    };

    const hideDeleteServiceDialog = () => {
        setDeleteServiceDialog(false);
    };

    const hideDeleteServicesDialog = () => {
        setDeleteServicesDialog(false);
    };

    const saveService = () => {
        setSubmitted(true);

        if (service.name.trim()) {
            let _services = [...services];
            let _service = { ...service };

            if (service.id) {
                const index = findIndexById(service.id);

                _services[index] = _service;
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Service Updated', life: 3000 });
            } else {
                _service.id = createId();
                _services.push(_service);
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Service Created', life: 3000 });
            }

            setServices(_services);
            setServiceDialog(false);
            setService(emptyService);
        }
    };

    const editservice = (service: Service) => {
        setService({ ...service });
        setServiceDialog(true);
    };

    const confirmDeleteService = (service: Service) => {
        setService(service);
        setDeleteServiceDialog(true);
    };

    const deleteService = () => {
        let _services = services.filter((val) => val.id !== service.id);

        setServices(_services);
        setDeleteServiceDialog(false);
        setService(emptyService);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Service Deleted', life: 3000 });
    };

    const findIndexById = (id: string) => {
        let index = -1;

        for (let i = 0; i < services.length; i++) {
            if (services[i].id === id) {
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
        setDeleteServicesDialog(true);
    };

    const deleteSelectedServices = () => {
        let _services = services.filter((val) => !selectedServices.includes(val));

        setServices(_services);
        setDeleteServicesDialog(false);
        setSelectedServices([]);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Services Deleted', life: 3000 });
    };

    const onSpecialtyChange = (rowData: any, e: any) => {
        const updatedData = services.map((item: any) => (item.id === rowData.id ? { ...item, role: e.value } : item));
        setServices(updatedData);
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _service = { ...service };

        // @ts-ignore
        _service[`${name}`] = val;

        setService(_service);
    };

    const onInputNumberChange = (e: InputNumberChangeEvent, name: string) => {
        const val = e.value || 0;
        let _service = { ...service };

        // @ts-ignore
        _service[`${name}`] = val;

        setService(_service);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedServices || !selectedServices.length} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Back" icon="pi pi-arrow-left" onClick={() => router.push('/admin/administration/metadata')} />;
    };

    const actionBodyTemplate = (rowData: Service) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editservice(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteService(rowData)} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Services</h4>
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
    const serviceDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveService} />
        </React.Fragment>
    );
    const deleteServiceDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteServiceDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteService} />
        </React.Fragment>
    );
    const deleteServicesDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteServicesDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedServices} />
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable
                    ref={dt}
                    value={services}
                    selection={selectedServices}
                    onSelectionChange={(e) => {
                        if (Array.isArray(e.value)) {
                            setSelectedServices(e.value);
                        }
                    }}
                    dataKey="id"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} services"
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

            <Dialog visible={serviceDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Service Details" modal className="p-fluid" footer={serviceDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Name
                    </label>
                    <InputText id="name" value={service.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !service.name })} />
                    {submitted && !service.name && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="code" className="font-bold">
                        Code
                    </label>
                    <InputText id="code" value={service.code} onChange={(e) => onInputChange(e, 'code')} required autoFocus className={classNames({ 'p-invalid': submitted && !service.code })} />
                    {submitted && !service.name && <small className="p-error">Code is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="description" className="font-bold">
                        Description
                    </label>
                    <InputTextarea id="description" value={service.description} onChange={(e: any) => onInputChange(e, 'description')} required rows={3} cols={20} />
                </div>
            </Dialog>

            <Dialog visible={deleteServiceDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteServiceDialogFooter} onHide={hideDeleteServiceDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {service && (
                        <span>
                            Are you sure you want to delete <b>{service.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteServicesDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteServicesDialogFooter} onHide={hideDeleteServicesDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {service && <span>Are you sure you want to delete the selected services?</span>}
                </div>
            </Dialog>
        </div>
    );
}
