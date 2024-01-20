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

interface Language {
    id: string | null;
    code: string;
    name: string;
    description: string;
}

export default function LanguageTable() {
    let emptyLanguage: Language = {
        id: null,
        code: '',
        name: '',
        description: ''
    };

    const [languages, setLanguages] = useState<Language[]>([]);
    const [languageDialog, setLanguageDialog] = useState<boolean>(false);
    const [deleteLanguageDialog, setDeleteLanguageDialog] = useState<boolean>(false);
    const [deleteLanguagesDialog, setDeleteLanguagesDialog] = useState<boolean>(false);
    const [language, setLanguage] = useState<Language>(emptyLanguage);
    const [selectedLanguages, setSelectedLanguages] = useState<Language[]>([]);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<Language[]>>(null);
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
        setLanguage(emptyLanguage);
        setSubmitted(false);
        setFile('');
        setLanguageDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setLanguageDialog(false);
    };

    const hideDeleteLanguageDialog = () => {
        setDeleteLanguageDialog(false);
    };

    const hideDeleteLanguagesDialog = () => {
        setDeleteLanguagesDialog(false);
    };

    const saveLanguage = () => {
        setSubmitted(true);

        if (language.name.trim()) {
            let _languages = [...languages];
            let _language = { ...language };

            if (language.id) {
                const index = findIndexById(language.id);

                _languages[index] = _language;
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Language Updated', life: 3000 });
            } else {
                _language.id = createId();
                _languages.push(_language);
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Language Created', life: 3000 });
            }

            setLanguages(_languages);
            setLanguageDialog(false);
            setLanguage(emptyLanguage);
        }
    };

    const editlanguage = (language: Language) => {
        setLanguage({ ...language });
        setLanguageDialog(true);
    };

    const confirmDeleteLanguage = (language: Language) => {
        setLanguage(language);
        setDeleteLanguageDialog(true);
    };

    const deleteLanguage = () => {
        let _languages = languages.filter((val) => val.id !== language.id);

        setLanguages(_languages);
        setDeleteLanguageDialog(false);
        setLanguage(emptyLanguage);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Language Deleted', life: 3000 });
    };

    const findIndexById = (id: string) => {
        let index = -1;

        for (let i = 0; i < languages.length; i++) {
            if (languages[i].id === id) {
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
        setDeleteLanguagesDialog(true);
    };

    const deleteSelectedLanguages = () => {
        let _languages = languages.filter((val) => !selectedLanguages.includes(val));

        setLanguages(_languages);
        setDeleteLanguagesDialog(false);
        setSelectedLanguages([]);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Languages Deleted', life: 3000 });
    };

    const onSpecialtyChange = (rowData: any, e: any) => {
        const updatedData = languages.map((item: any) => (item.id === rowData.id ? { ...item, role: e.value } : item));
        setLanguages(updatedData);
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _language = { ...language };

        // @ts-ignore
        _language[`${name}`] = val;

        setLanguage(_language);
    };

    const onInputNumberChange = (e: InputNumberChangeEvent, name: string) => {
        const val = e.value || 0;
        let _language = { ...language };

        // @ts-ignore
        _language[`${name}`] = val;

        setLanguage(_language);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} />
                {/* disabled={!selectedLanguages || !selectedLanguages.length} use this if you want to use disabled */}
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Back" icon="pi pi-arrow-left" onClick={() => router.push('/admin/administration/metadata')} />;
    };

    const actionBodyTemplate = (rowData: Language) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editlanguage(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteLanguage(rowData)} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Languages</h4>
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
    const languageDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveLanguage} />
        </React.Fragment>
    );
    const deleteLanguageDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteLanguageDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteLanguage} />
        </React.Fragment>
    );
    const deleteLanguagesDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteLanguagesDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedLanguages} />
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable
                    ref={dt}
                    value={languages}
                    selection={selectedLanguages}
                    onSelectionChange={(e) => {
                        if (Array.isArray(e.value)) {
                            setSelectedLanguages(e.value);
                        }
                    }}
                    dataKey="id"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} languages"
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

            <Dialog visible={languageDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Language Details" modal className="p-fluid" footer={languageDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Name
                    </label>
                    <InputText id="name" value={language.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !language.name })} />
                    {submitted && !language.name && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="code" className="font-bold">
                        Code
                    </label>
                    <InputText id="code" value={language.code} onChange={(e) => onInputChange(e, 'code')} required autoFocus className={classNames({ 'p-invalid': submitted && !language.code })} />
                    {submitted && !language.name && <small className="p-error">Code is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="description" className="font-bold">
                        Description
                    </label>
                    <InputTextarea id="description" value={language.description} onChange={(e: any) => onInputChange(e, 'description')} required rows={3} cols={20} />
                </div>
            </Dialog>

            <Dialog visible={deleteLanguageDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteLanguageDialogFooter} onHide={hideDeleteLanguageDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {language && (
                        <span>
                            Are you sure you want to delete <b>{language.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteLanguagesDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteLanguagesDialogFooter} onHide={hideDeleteLanguagesDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {language && <span>Are you sure you want to delete the selected languages?</span>}
                </div>
            </Dialog>
        </div>
    );
}
