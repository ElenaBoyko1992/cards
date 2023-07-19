import * as React from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { packsThunks } from "features/packs/packs.slice";
import s from "./Packs.module.css";
import { useDebounce } from "common/hooks/useDebounce";
import { TableFilters } from "features/packs/TableFilters";
import { PacksTable } from "features/packs/PacksTable";
import { createDataForPacksTable } from "common/utils/createData";

export default function BasicTable() {
  console.log("перерисовка BasicTable");
  const dispatch = useAppDispatch();
  const packs = useAppSelector((state) => state.packs.packsItems);
  const valueForSlider = useAppSelector((state) => state.packs.valueForSlider);
  const searchValue = useAppSelector((state) => state.packs.searchValue);

  const rows = packs.map((pack) => {
    return createDataForPacksTable(pack.name, pack.cardsCount, pack.updated, pack.user_name, pack._id, pack.user_id);
  });

  const debouncedValueForSlider = useDebounce<Array<number>>(valueForSlider, 1000);
  const debouncedSearchValue = useDebounce<string>(searchValue, 1000);

  useEffect(() => {
    dispatch(packsThunks.getPacks());
  }, [debouncedValueForSlider, debouncedSearchValue]);

  return (
    <>
      <TableFilters />
      {rows.length ? (
        <PacksTable rows={rows} />
      ) : (
        <div className={s.packsNotFound}>Колоды не найдены. Измените параметры запроса.</div>
      )}
    </>
  );
}
