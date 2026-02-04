import useLang from "../../Utils/useLang";
import useRequest from "../../Utils/useRequest";
import APIS from "../../services/APIS";
import { useMemo } from "react";
import SkeletonTable from "../../Components/UI/SkeletonTable/SkeletonTable";
import { Outlet, useParams } from "react-router-dom";
import "./board.css";
import NestedNavs from "../../Components/Common/nestedNavs/NestedNavs";
const Board = () => {
  const{id}=useParams()
  const { data, isLoading } = useRequest([APIS?.BOARD?.KEY], APIS?.BOARD?.URL);

  const { chairmanOfBoard, boardMembers, executives } = useMemo(() => {
    if (!data?.individuals) {
      return {
        chairmanOfBoard: null,
        boardMembers: [],
        executives: [],
      };
    }

    const chairman = data.individuals.find(
      (item) =>
        item?.companyPositionTypeNameEn === "Board Member" &&
        item?.positionNameEn?.includes("Chairman of the Board")
    );

    const board = data.individuals.filter(
      (item) =>
        item?.companyPositionTypeNameEn === "Board Member" &&
        !item?.positionNameEn?.includes("Chairman of the Board")
    );

    const executives = data.individuals.filter(
      (item) => item?.companyPositionTypeNameEn === "Executive"
    );

    return {
      chairmanOfBoard: chairman,
      boardMembers: board,
      executives: executives,
    };
  }, [data?.individuals]);

  const nestedRoutes = [
    {
      path: "board",
      title: useLang("board & management", "المديرين"),
    },
    {
      path: "executive",
      title: useLang("executives", "المديرون التنفيذيون"),
    },
    {
      path: "salaries",
      title: useLang("salaries & bonuses", "الرواتب والمكافآت"),
    },
  ];

  return (
    <>
      {!id&&<NestedNavs routes={nestedRoutes} />}
      {isLoading ? (
        <SkeletonTable columns={1} rows={8} />
      ) : (
        <Outlet
          context={{
            chairmanOfBoard,
            boardMembers,
            executives,
            salaries: data?.salaries,
          }}
        />
      )}
    </>
  );
};

export default Board;
