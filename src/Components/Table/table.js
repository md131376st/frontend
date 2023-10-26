import * as React from 'react';
import {useCallback, useEffect, useState} from "react";
import MessageBox from "../MessageBox/MessageBox";
import {getAllBooks, deleteBook, updateBook, createBook} from "../../Api/bookApi";
import MaterialReactTable from "material-react-table";
import { Delete, Edit,} from "@mui/icons-material";
import {
    Box,
    Button, Chip,
    IconButton, Link,
    Tooltip
} from '@mui/material';
import {CreateNewAccountModal} from "./CreateNewAccountModal";
export default function FullFeaturedCrudGrid() {
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tableData, setTableData] = React.useState([]);
    const [rowModesModel, setRowModesModel] = React.useState({});
    const [validationErrors, setValidationErrors] = useState({});
    const getBooks = async () => {
        try{
            const data = await getAllBooks();
            setTableData(data);
            setLoading(false);
        }catch (e) {
            MessageBox({
                type: "error",
                text: e
            });
            setLoading(false);
        }

    }
    useEffect(() => {
        getBooks().catch(() => {
            MessageBox({
                type: "error",
                text: "server not available"
            });

        });
        setLoading(true);
    }, []);

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setTableData(tableData.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;

    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };
    const handleCreateNewRow = (values) => {
        try {
            createBook(values).then(
                res => {
                    if (res.status === 201) {
                        MessageBox({
                            type: "success",
                            text: "book successfully created"
                        });
                        values.id = res.data.id
                        tableData.push(values);
                        setTableData([...tableData]);

                    }
                }

            ).catch((error)=>{
                MessageBox({
                    type: "error",
                    text: error
                });
            });
        }catch (e){
            MessageBox({
                type: "error",
                text: e
            });
        }

    };

    const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
        if (!Object.keys(validationErrors).length) {

            try {
                updateBook(values).then(
                    res =>{
                        if (res.status===200){
                            MessageBox({
                                type: "success",
                                text: "Data successfully updated"
                            });
                            tableData[row.index] = values;
                            setTableData([...tableData]);
                            exitEditingMode(); //required to exit editing mode and close modal
                        }
                    }
                ).catch((error)=>{
                     if (error.response && error.response.status === 404) {
                        MessageBox({
                            type: "error",
                            text: "book doesn't exist"
                        });
                    } else {
                         MessageBox({
                             type: "error",
                             text: error.code
                         });
                    }

                });
            }catch (e){
                MessageBox({
                    type: "error",
                    text: e
                });
            }

        }
    };

    const handleCancelRowEdits = () => {
         setValidationErrors({});
    };

    const handleDeleteRow = useCallback(
        (row) => {
            try {
                deleteBook(row.original.id).then(
                    res =>{
                        if (res.status===200){
                            MessageBox({
                                type: "success",
                                text: "Data successfully deleted"
                            });
                            tableData.splice(row.index, 1);
                            setTableData([...tableData]);
                        }

                    }
                ).catch((error)=>{
                    if (error.response && error.response.status === 400) {
                        MessageBox({
                            type: "error",
                            text: "book Request"
                        });
                    } else {
                        MessageBox({
                            type: "error",
                            text: error.code
                        });

                    }
                    });

            }catch (e){
                    MessageBox({
                        type: "error",
                        text: e
                    });
                }

        },
        [tableData],
    );
    const validateRequired = (value) => !!value.length;

    const validatePrice = (price) =>price >= 0;
    const validateYear = (year) => year <= new Date().getFullYear();

    const getCommonEditTextFieldProps = useCallback(
        (cell) => {
            return {
                error: !!validationErrors[cell.id],
                helperText: validationErrors[cell.id],
                onBlur: (event) => {
                    const isValid =
                        cell.column.id === 'price'
                            ? validatePrice(event.target.value)
                            : cell.column.id === 'year'
                                ? validateYear(+event.target.value)
                                : validateRequired(event.target.value);
                    if (!isValid) {
                        //set validation error for cell if invalid
                        setValidationErrors({
                            ...validationErrors,
                            [cell.id]: `${cell.column.columnDef.header} is required`,
                        });
                    } else {
                        //remove validation error for cell if valid
                        delete validationErrors[cell.id];
                        setValidationErrors({
                            ...validationErrors,
                        });
                    }
                },
            };
        },
        [validationErrors],
    );

    const columns = [
        { accessorKey: 'id',
            header: 'ID',
            width: 180,
            enableColumnOrdering: false,
            enableEditing: false, //disable editing on this column
            enableSorting: false,
            Cell: ({ cell }) => (
                <Link href={cell.getValue()}>
                    {cell.getValue()}
                </Link>
            ),
            muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                ...getCommonEditTextFieldProps(cell),
            }),
        },
        {
            accessorKey: 'title',
            header: 'Title',
            type: 'string',
            width: 256,
            align: 'center',
            headerAlign: 'center',
            editable: true,
            muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                ...getCommonEditTextFieldProps(cell),
            }),
        }, {
            accessorKey: 'authors',
            header: 'Authors',
            type: 'string',
            width: 256,
            align: 'center',
            headerAlign: 'center',
            editable: true,
            Cell: ({ cell, row }) => (
                cell.getValue().split(",").map( (author)=>
                    <Chip label={author} />
                )
            ),
            muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                ...getCommonEditTextFieldProps(cell),
            }),
        },
        {
            accessorKey: 'year',
            header: 'year of publication',
            type: 'number',
            width: 180,
            editable: true,
            muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                ...getCommonEditTextFieldProps(cell),
                type: 'number',
            }),
        },
        {
            accessorKey: 'price',
            header: 'Price',
            Cell: ({ cell }) =>(
                cell.getValue().toLocaleString('en-US', { style: 'currency', currency: 'USD' })
            ),
            muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                ...getCommonEditTextFieldProps(cell),
                type: 'number',
            }),


        },

    ];

    return (
        <Box
            sx={{
                height: '100%',
                width: '100%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
            }}
        >
            { !loading &&
                <MaterialReactTable
                    columns={columns}
                    data={tableData}
                    enableColumnFilterModes
                    enableColumnOrdering
                    enableGrouping
                    enablePinning
                    enableRowActions
                    editingMode="modal" //default
                    enableEditing
                    onEditingRowSave={handleSaveRowEdits}
                    onEditingRowCancel={handleCancelRowEdits}
                    initialState={{  showColumnFilters: true }}
                    positionToolbarAlertBanner="bottom"
                    renderRowActions={({ row, table }) => (
                        <Box sx={{ display: 'flex', gap: '1rem' }}>
                            <Tooltip arrow placement="left" title="Edit">
                                <IconButton onClick={() => table.setEditingRow(row)}>
                                    <Edit />
                                </IconButton>
                            </Tooltip>
                            <Tooltip arrow placement="left" title="Delete">
                                <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                                    <Delete />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    )}

                    renderBottomToolbarCustomActions={() => (
                        <Button
                            color="secondary"
                            onClick={() => setCreateModalOpen(true)}
                            variant="contained"
                        >
                            Create New Book
                        </Button>
                    )}
                />
            }
                <CreateNewAccountModal
                    columns={columns}
                    open={createModalOpen}
                    onClose={() => setCreateModalOpen(false)}
                    onSubmit={handleCreateNewRow}
            />
        </Box>
    );
}





