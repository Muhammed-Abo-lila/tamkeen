import MemberCard from "./MemberCard";
import useLang from "../../../Utils/useLang";
import { Outlet, useOutletContext, useParams } from "react-router-dom";
const BoardTab = () => {
  const { id } = useParams();
  const { chairmanOfBoard, boardMembers } = useOutletContext();
  return (
    <>
      {!id ? (
        <div className="mt-4">
          <MemberCard
            link={`${chairmanOfBoard?.individualID}`}
            image={chairmanOfBoard?.profilePicURL}
            name={useLang(chairmanOfBoard?.nameEn, chairmanOfBoard?.nameAr)}
            position={useLang(
              chairmanOfBoard?.positionNameEn,
              chairmanOfBoard?.positionNameAr
            )}
          />
          <div className="members mt-5 row row-gap-5 justify-content-start">
            {boardMembers?.map((item, idx) => (
              <MemberCard
                key={idx}
                link={`${item?.individualID}`}
                image={item?.profilePicURL}
                name={useLang(item?.nameEn, item?.nameAr)}
                position={useLang(item?.positionNameEn, item?.positionNameAr)}
              />
            ))}
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default BoardTab;
