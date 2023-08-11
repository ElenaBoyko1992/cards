import * as React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useAppDispatch } from "common/hooks";
import { packsThunks } from "features/packs/packs.slice";

export const DeletePackModal = (props: DeletePackModalType) => {
  const dispatch = useAppDispatch();

  const handleCloseDeleteDialog = () => {
    props.setOpenDeleteDialog(false);
    props.setIdForDeletePack("");
  };
  const deletePackHandler = async () => {
    await dispatch(packsThunks.deletePack({ id: props.idForDeletePack }));
    dispatch(packsThunks.getPacks());
    props.setOpenDeleteDialog(false);
  };

  return (
    <div>
      <Dialog open={props.openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>{"Delete Pack"}</DialogTitle>
        <DialogContent>
          <DialogContentText>{`Do you really want to remove '${props.packName}'? All cards will be deleted.`}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCloseDeleteDialog}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={deletePackHandler} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

//types
type DeletePackModalType = {
  openDeleteDialog: boolean;
  setOpenDeleteDialog: (value: boolean) => void;
  packName: string;
  setIdForDeletePack: (id: string) => void;
  idForDeletePack: string;
};

/*{
  openDeleteDialog: boolean;
  setOpenDeleteDialog: (open: boolean) => void;
  idForDeleteCard: string;
  setIdForDeleteCard: (id: string) => void;
  cardName: string;
  packId: string;
};*/
