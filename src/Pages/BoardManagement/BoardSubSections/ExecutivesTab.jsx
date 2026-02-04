import MemberCard from "./MemberCard";
import useLang from "../../../Utils/useLang";
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import { useState } from "react";
const ExecutivesTab = () => {
  const { id } = useParams();
  const { executives } = useOutletContext();
  return (
    <>
      {!id ? (
        <div className="members mt-4 row row-gap-5 justify-content-start">
          {executives?.map((item, idx) => (
            <MemberCard
              key={idx}
              link={`${item?.individualID}`}
              image={item?.profilePicURL}
              name={useLang(item?.nameEn, item?.nameAr)}
              position={useLang(item?.positionNameEn, item?.positionNameAr)}
            />
          ))}
        </div>
      ) : (
        <Outlet/>
      )}
    </>
  );
};

export default ExecutivesTab;
