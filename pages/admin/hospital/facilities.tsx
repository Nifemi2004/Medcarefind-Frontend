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

interface Facility {
    id: string | null;
    code: string;
    name: string;
    description: string;
    image: string;
}

export default function FacilityTable() {
    let emptyFacility: Facility = {
        id: null,       
        code: '',
        name: '',
        description: '',
        image: ''
    };

    const [facilities, setFacilities] = useState<Facility[]>([]);
    const [facilityDialog, setFacilityDialog] = useState<boolean>(false);
    const [deleteFacilityDialog, setDeleteFacilityDialog] = useState<boolean>(false);
    const [deleteFacilitiesDialog, setDeleteFacilitiesDialog] = useState<boolean>(false);
    const [facility, setFacility] = useState<Facility>(emptyFacility);
    const [selectedFacilities, setSelectedFacilities] = useState<Facility[]>([]);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const toast = useRef<Toast>(null);

    const router = useRouter();

    const dt = useRef<DataTable<Facility[]>>(null);
    const [file, setFile] = useState<string>();

    const formatCurrency = (value: number) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    function handleChange(e: any) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    const openNew = () => {
        setFacility(emptyFacility);
        setSubmitted(false);
        setFile('');
        setFacilityDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setFacilityDialog(false);
    };

    const hideDeleteFacilityDialog = () => {
        setDeleteFacilityDialog(false);
    };

    const hideDeleteFacilitiesDialog = () => {
        setDeleteFacilitiesDialog(false);
    };

    const saveFacility = () => {
        setSubmitted(true);

        if (facility.name.trim()) {
            let _facilities = [...facilities];
            let _facility = { ...facility };

            if (facility.id) {
                const index = findIndexById(facility.id);

                _facilities[index] = _facility;
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Facility Updated', life: 3000 });
            } else {
                _facility.id = createId();
                _facilities.push(_facility);
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Facility Created', life: 3000 });
            }

            setFacilities(_facilities);
            setFacilityDialog(false);
            setFacility(emptyFacility);
        }
    };

    const editfacility = (facility: Facility) => {
        setFacility({ ...facility });
        setFacilityDialog(true);
    };

    const confirmDeleteFacility = (facility: Facility) => {
        setFacility(facility);
        setDeleteFacilityDialog(true);
    };

    const deleteFacility = () => {
        let _facilities = facilities.filter((val) => val.id !== facility.id);

        setFacilities(_facilities);
        setDeleteFacilityDialog(false);
        setFacility(emptyFacility);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Facility Deleted', life: 3000 });
    };

    const findIndexById = (id: string) => {
        let index = -1;

        for (let i = 0; i < facilities.length; i++) {
            if (facilities[i].id === id) {
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
        setDeleteFacilitiesDialog(true);
    };

    const deleteSelectedFacilities = () => {
        let _facilities = facilities.filter((val) => !selectedFacilities.includes(val));

        setFacilities(_facilities);
        setDeleteFacilitiesDialog(false);
        setSelectedFacilities([]);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Facilities Deleted', life: 3000 });
    };

    const onSpecialtyChange = (rowData: any, e: any) => {
        const updatedData = facilities.map((item: any) => (item.id === rowData.id ? { ...item, role: e.value } : item));
        setFacilities(updatedData);
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _facility = { ...facility };

        // @ts-ignore
        _facility[`${name}`] = val;

        setFacility(_facility);
    };

    const onInputNumberChange = (e: InputNumberChangeEvent, name: string) => {
        const val = e.value || 0;
        let _facility = { ...facility };

        // @ts-ignore
        _facility[`${name}`] = val;

        setFacility(_facility);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedFacilities || !selectedFacilities.length} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Back" icon="pi pi-arrow-left" onClick={() => router.push('/admin/administration/metadata')} />;
    };

    const imageBodyTemplate = (rowData: Facility) => {
        return <img src={`https://primefaces.org/cdn/primereact/images/facility/${rowData.image}`} alt={rowData.image!} className="shadow-2 border-round" style={{ width: '64px' }} />;
    };

    const actionBodyTemplate = (rowData: Facility) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editfacility(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteFacility(rowData)} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Facility</h4>
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
    const facilityDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveFacility} />
        </React.Fragment>
    );
    const deleteFacilityDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteFacilityDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteFacility} />
        </React.Fragment>
    );
    const deleteFacilitiesDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteFacilitiesDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedFacilities} />
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable
                    ref={dt}
                    value={facilities}
                    selection={selectedFacilities}
                    onSelectionChange={(e) => {
                        if (Array.isArray(e.value)) {
                            setSelectedFacilities(e.value);
                        }
                    }}
                    dataKey="id"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} facilities"
                    globalFilter={globalFilter}
                    header={header}
                >
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="name" header="Name" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="code" header="Code" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="description" header="Description" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="image" header="Image" body={imageBodyTemplate} style={{ minWidth: '10rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={facilityDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Facility Details" modal className="p-fluid" footer={facilityDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Name
                    </label>
                    <InputText id="name" value={facility.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !facility.name })} />
                    {submitted && !facility.name && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="code" className="font-bold">
                        Code
                    </label>
                    <InputText id="code" value={facility.code} onChange={(e) => onInputChange(e, 'code')} required autoFocus className={classNames({ 'p-invalid': submitted && !facility.code })} />
                    {submitted && !facility.name && <small className="p-error">Code is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="description" className="font-bold">
                        Description
                    </label>
                    <InputTextarea id="description" value={facility.description} onChange={(e: any) => onInputChange(e, 'description')} required rows={3} cols={20} />
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
            </Dialog>

            <Dialog visible={deleteFacilityDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteFacilityDialogFooter} onHide={hideDeleteFacilityDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {facility && (
                        <span>
                            Are you sure you want to delete <b>{facility.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteFacilitiesDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteFacilitiesDialogFooter} onHide={hideDeleteFacilitiesDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {facility && <span>Are you sure you want to delete the selected facilities?</span>}
                </div>
            </Dialog>
        </div>
    );
}
