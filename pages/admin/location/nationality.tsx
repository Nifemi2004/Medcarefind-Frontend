import React, { useState, useEffect, useRef } from 'react';
import { api, setAccessToken } from '../../../utils/api';
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

export interface Nationality {
    id: number | null
    name: string
    code: string
    description: string
    dateCreated: string
    createdBy: any
    _links: Links | undefined
  }
  
  export interface Links {
    self: Self
    collection: Collection
  }
  
  export interface Self {
    href: string
  }
  
  export interface Collection {
    href: string
  }

export default function NationalityTable() {
    useEffect(() => {
        // Set the access token when the component mounts
        const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJib290aWZ5IiwiaXNzIjoiYm9vdGlmeSIsImlhdCI6MTY5MDQ0Nzk4NiwiZXhwIjoyMjA4OTg4ODAwfQ.0OaM6dLotshUuIZwAJaXnGG2S8KRQOM31e-l2NlgBewmhExp0tS-NrFrz_YMCSlvseByHbv_eNu9HX7VasLbSw'; // Replace with your actual access token
        setAccessToken(accessToken);

        // Make an API call using axios
        api.get('/nationalitys')
            .then((response) => {
                const nationalityList = response.data._embedded.nationalityDTOList;
                console.log(nationalityList);
                setNationalities(nationalityList);
            })
            .catch((error) => {
                console.error('API Error:', error);
            });

        // Clear the access token when the component unmounts
        return () => {
            setAccessToken(null);
        };
    }, []);

    let emptyNationality: Nationality = {
        id: null,
        code: '',
        name: '',
        description: '',
        dateCreated: '',
        createdBy: undefined,
        _links: undefined
    };

    const [nationalities, setNationalities] = useState<Nationality[]>([]);
    const [nationalityDialog, setNationalityDialog] = useState<boolean>(false);
    const [deleteNationalityDialog, setDeleteNationalityDialog] = useState<boolean>(false);
    const [deleteNationalitiesDialog, setDeleteNationalitiesDialog] = useState<boolean>(false);
    const [nationality, setNationality] = useState<Nationality>(emptyNationality);
    const [selectedNationalities, setSelectedNationalities] = useState<Nationality[]>([]);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const toast = useRef<Toast>(null);

    const router = useRouter();

    const dt = useRef<DataTable<Nationality[]>>(null);
    const [file, setFile] = useState<string>();

    const formatCurrency = (value: number) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    function handleChange(e: any) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    const openNew = () => {
        setNationality(emptyNationality);
        setSubmitted(false);
        setFile('');
        setNationalityDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setNationalityDialog(false);
    };

    const hideDeleteNationalityDialog = () => {
        setDeleteNationalityDialog(false);
    };

    const hideDeleteNationalitiesDialog = () => {
        setDeleteNationalitiesDialog(false);
    };

    // const saveNationality = () => {
    //     setSubmitted(true);

    //     if (nationality.name.trim()) {
    //         let _nationalities = [...nationalities];
    //         let _nationality = { ...nationality };

    //         if (nationality.id) {
    //             const index = findIndexById(nationality.id);

    //             _nationalities[index] = _nationality;
    //             toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Nationality Updated', life: 3000 });
    //         } else {
    //             _nationality.id = createId();
    //             _nationalities.push(_nationality);
    //             toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Nationality Created', life: 3000 });
    //         }

    //         setNationalities(_nationalities);
    //         setNationalityDialog(false);
    //         setNationality(emptyNationality);
    //     }
    // };

    const editnationality = (nationality: Nationality) => {
        setNationality({ ...nationality });
        setNationalityDialog(true);
    };

    const confirmDeleteNationality = (nationality: Nationality) => {
        setNationality(nationality);
        setDeleteNationalityDialog(true);
    };

    const deleteNationality = () => {
        let _nationalities = nationalities.filter((val) => val.id !== nationality.id);

        setNationalities(_nationalities);
        setDeleteNationalityDialog(false);
        setNationality(emptyNationality);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Nationality Deleted', life: 3000 });
    };

    // const findIndexById = (id: string) => {
    //     let index = -1;

    //     for (let i = 0; i < nationalities.length; i++) {
    //         if (nationalities[i].id === id) {
    //             index = i;
    //             break;
    //         }
    //     }

    //     return index;
    // };

    // const createId = (): string => {
    //     let id = '';
    //     let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    //     for (let i = 0; i < 5; i++) {
    //         id += chars.charAt(Math.floor(Math.random() * chars.length));
    //     }

    //     return id;
    // };

    const exportCSV = () => {
        dt.current?.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteNationalitiesDialog(true);
    };

    const deleteSelectedNationalities = () => {
        let _nationalities = nationalities.filter((val) => !selectedNationalities.includes(val));

        setNationalities(_nationalities);
        setDeleteNationalitiesDialog(false);
        setSelectedNationalities([]);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Nationalities Deleted', life: 3000 });
    };

    const onSpecialtyChange = (rowData: any, e: any) => {
        const updatedData = nationalities.map((item: any) => (item.id === rowData.id ? { ...item, role: e.value } : item));
        setNationalities(updatedData);
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _nationality = { ...nationality };

        // @ts-ignore
        _nationality[`${name}`] = val;

        setNationality(_nationality);
    };

    const onInputNumberChange = (e: InputNumberChangeEvent, name: string) => {
        const val = e.value || 0;
        let _nationality = { ...nationality };

        // @ts-ignore
        _nationality[`${name}`] = val;

        setNationality(_nationality);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} />
                {/* disabled={!selectedNationalitys || !selectedNationalitys.length} use this if you want to use disabled */}
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Back" icon="pi pi-arrow-left" onClick={() => router.push('/admin/administration/metadata')} />;
    };

    const actionBodyTemplate = (rowData: Nationality) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editnationality(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteNationality(rowData)} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Nationality</h4>
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
    const nationalityDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            {/* <Button label="Save" icon="pi pi-check" onClick={saveNationality} /> */}
        </React.Fragment>
    );
    const deleteNationalityDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteNationalityDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteNationality} />
        </React.Fragment>
    );
    const deleteNationalitiesDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteNationalitiesDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedNationalities} />
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable
                    ref={dt}
                    value={nationalities}
                    selection={selectedNationalities}
                    onSelectionChange={(e) => {
                        if (Array.isArray(e.value)) {
                            setSelectedNationalities(e.value);
                        }
                    }}
                    dataKey="id"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} nationalities"
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

            <Dialog visible={nationalityDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Nationality Details" modal className="p-fluid" footer={nationalityDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Name
                    </label>
                    <InputText id="name" value={nationality.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !nationality.name })} />
                    {submitted && !nationality.name && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="code" className="font-bold">
                        Code
                    </label>
                    <InputText id="code" value={nationality.code} onChange={(e) => onInputChange(e, 'code')} required autoFocus className={classNames({ 'p-invalid': submitted && !nationality.code })} />
                    {submitted && !nationality.name && <small className="p-error">Code is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="description" className="font-bold">
                        Description
                    </label>
                    <InputTextarea id="description" value={nationality.description} onChange={(e: any) => onInputChange(e, 'description')} required rows={3} cols={20} />
                </div>
            </Dialog>

            <Dialog visible={deleteNationalityDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteNationalityDialogFooter} onHide={hideDeleteNationalityDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {nationality && (
                        <span>
                            Are you sure you want to delete <b>{nationality.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteNationalitiesDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteNationalitiesDialogFooter} onHide={hideDeleteNationalitiesDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {nationality && <span>Are you sure you want to delete the selected nationalities?</span>}
                </div>
            </Dialog>
        </div>
    );
}
