import * as React from "react";
import { useState } from "react";
import { useAppDispatch } from "common/hooks";
import { cardsThunks } from "features/cards/cards.slice";
import { useFormik } from "formik";
import { EditCardModal } from "features/cards/EditCardModal";
import { DeleteCardModal } from "features/cards/DeleteCardModal";
import { CardsTableContainer } from "features/cards/CardsTableContainer";
import { CardsTablePagination } from "features/cards/CardsTablePagination";

export const CardsTable = (props: CardsTablePropsType) => {
  const dispatch = useAppDispatch();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [idForDeleteCard, setIdForDeleteCard] = useState("");
  const [cardName, setCardName] = useState("");
  const [idForEditCard, setIdForEditCard] = useState("");
  const [openEditModal, setOpenEditModal] = useState(false);

  const formik = useFormik({
    validate: (values) => {},
    initialValues: {
      question: "",
      answer: "",
    },
    onSubmit: async (values, formikHelpers) => {
      console.log(values);
      const valuesForThunk = { ...values, _id: idForEditCard };
      await dispatch(cardsThunks.editCard(valuesForThunk));
      dispatch(cardsThunks.getCards({ packId: props.packId }));
      formikHelpers.resetForm();
      setOpenEditModal(false);
    },
  });

  return (
    <div>
      <CardsTableContainer
        setIdForDeleteCard={setIdForDeleteCard}
        setOpenDeleteDialog={setOpenDeleteDialog}
        packId={props.packId}
        formik={formik}
        setCardName={setCardName}
        cardsRows={props.cardsRows}
        setOpenEditModal={setOpenEditModal}
        setIdForEditCard={setIdForEditCard}
      />
      <CardsTablePagination packId={props.packId} />
      <DeleteCardModal
        cardName={cardName}
        idForDeleteCard={idForDeleteCard}
        openDeleteDialog={openDeleteDialog}
        setIdForDeleteCard={setIdForDeleteCard}
        setOpenDeleteDialog={setOpenDeleteDialog}
        packId={props.packId}
      />
      <EditCardModal openEditModal={openEditModal} setOpenEditModal={setOpenEditModal} formik={formik} />
    </div>
  );
};

//types
type CardsTablePropsType = {
  cardsRows: Array<CardsRowType>;
  packId: string;
};

export type CardsRowType = {
  question: string;
  answer: string;
  updated: string;
  grade: number;
  cardId: string;
};
