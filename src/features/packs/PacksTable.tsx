import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { SelectChangeEvent, TableSortLabel } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import s from "features/packs/Packs.module.css";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { TablePagination } from "components/TablePagination/TablePagination";
import * as React from "react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { packsThunks, setPage, setRowsPerPage, sortBy } from "features/packs/packs.slice";
import { NavLink } from "react-router-dom";
import { DeletePackModal } from "features/packs/DeletePackModal";
import { useFormik } from "formik";
import { EditPackModal } from "features/packs/EditPackModal";

export const PacksTable = (props: PacksTablePropsType) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => (state.auth.profile ? state.auth.profile._id : ""));
  const orderBy = useAppSelector((state) => state.packs.orderBy);
  const nameSortIsActive = useAppSelector((state) => state.packs.nameSortIsActive);
  const cardsCountSortIsActive = useAppSelector((state) => state.packs.cardsCountSortIsActive);
  const lastUpdatedSortIsActive = useAppSelector((state) => state.packs.lastUpdatedSortIsActive);
  const createdSortIsActive = useAppSelector((state) => state.packs.createdSortIsActive);
  const packName = useAppSelector((state) => state.cards.packName);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [idForDeletePack, setIdForDeletePack] = useState("");
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [idForEditPack, setIdForEditPack] = useState("");

  const sortByNameHandler = async () => {
    await dispatch(sortBy({ sortType: "name" }));
    dispatch(packsThunks.getPacks());
  };

  const sortByCardsCountHandler = async () => {
    await dispatch(sortBy({ sortType: "cardsCount" }));
    dispatch(packsThunks.getPacks());
  };

  const sortByLastUpdatedHandler = async () => {
    await dispatch(sortBy({ sortType: "updated" }));
    dispatch(packsThunks.getPacks());
  };

  const sortByCreatedHandler = async () => {
    await dispatch(sortBy({ sortType: "created" }));
    dispatch(packsThunks.getPacks());
  };

  const handleClickOpenDeletePackModal = (packId: string) => {
    setOpenDeleteDialog(true);
    setIdForDeletePack(packId);
  };

  const handleClickOpenEditPackModal = (packId: string) => {
    setOpenEditDialog(true);
    setIdForEditPack(packId);
  };
  //for pagination
  const page = useAppSelector((state) => state.packs.page);
  const rowsPerPage = useAppSelector((state) => state.packs.rowsPerPage);
  const cardPacksTotalCount = useAppSelector((state) => state.packs.cardPacksTotalCount);

  const handleChangeRowsPerPage = async (event: SelectChangeEvent) => {
    await dispatch(setRowsPerPage({ rowsPerPage: parseInt(event.target.value, 10) as number }));
    dispatch(packsThunks.getPacks());
  };

  const paginationChangedHandler = async (event: React.ChangeEvent<unknown>, page: number) => {
    await dispatch(setPage({ pageNumber: page }));
    dispatch(packsThunks.getPacks());
  };

  const formik = useFormik({
    validate: (values) => {},
    initialValues: {
      namePack: "",
    },
    onSubmit: async (values, formikHelpers) => {
      const valuesForThunk = { name: values.namePack, _id: idForEditPack };
      await dispatch(packsThunks.editPack(valuesForThunk));
      dispatch(packsThunks.getPacks());
      formikHelpers.resetForm();
      setOpenEditDialog(false);
    },
  });

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                Name
                <TableSortLabel
                  active={nameSortIsActive}
                  direction={orderBy}
                  onClick={sortByNameHandler}
                ></TableSortLabel>
              </TableCell>
              <TableCell>
                Cards
                <TableSortLabel
                  active={cardsCountSortIsActive}
                  direction={orderBy}
                  onClick={sortByCardsCountHandler}
                ></TableSortLabel>
              </TableCell>
              <TableCell>
                Last Updated
                <TableSortLabel
                  active={lastUpdatedSortIsActive}
                  direction={orderBy}
                  onClick={sortByLastUpdatedHandler}
                ></TableSortLabel>
              </TableCell>
              <TableCell>
                Created by
                <TableSortLabel
                  active={createdSortIsActive}
                  direction={orderBy}
                  onClick={sortByCreatedHandler}
                ></TableSortLabel>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.map((row) => (
              <TableRow key={row.packId}>
                <TableCell>
                  <NavLink to={`/cards/${row.packId}`}>{row.name}</NavLink>
                </TableCell>
                <TableCell>{row.cardsCount}</TableCell>
                <TableCell>{row.updated}</TableCell>
                <TableCell>{row.created}</TableCell>
                <TableCell>
                  <div className={s.tableSellActions}>
                    {row.userId === userId ? (
                      <div className={s.tableSellIcons}>
                        <button disabled={!row.cardsCount}>
                          <SchoolOutlinedIcon />
                        </button>
                        <button onClick={() => handleClickOpenEditPackModal(row.packId)}>
                          <BorderColorOutlinedIcon />
                        </button>
                        <button onClick={() => handleClickOpenDeletePackModal(row.packId)}>
                          <DeleteOutlineOutlinedIcon />
                        </button>
                      </div>
                    ) : (
                      <div className={s.tableSellIcons}>
                        <button disabled={!row.cardsCount}>
                          <SchoolOutlinedIcon />
                        </button>
                      </div>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        cardTotalCount={cardPacksTotalCount}
        paginationChangedHandler={paginationChangedHandler}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
      />
      <DeletePackModal
        setOpenDeleteDialog={setOpenDeleteDialog}
        openDeleteDialog={openDeleteDialog}
        packName={packName}
        setIdForDeletePack={setIdForDeletePack}
        idForDeletePack={idForDeletePack}
      />
      <EditPackModal setOpenEditModal={setOpenEditDialog} openEditModal={openEditDialog} formik={formik} />
    </div>
  );
};

//types
type PacksTablePropsType = {
  rows: Array<RowType>;
};

type RowType = {
  cardsCount: number;
  created: string;
  name: string;
  packId: string;
  updated: string;
  userId: string;
};
