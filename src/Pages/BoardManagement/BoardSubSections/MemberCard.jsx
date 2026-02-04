import { Link } from "react-router-dom";
const MemberCard = ({ link, image, name, position }) => {
  return (
    <div className="col-10 col-md-6 member-card">
      <Link to={link}>
        <div className="d-flex flex-column flex-sm-row align-items-center justify-content-start gap-3" >
          <div
            className="img-container"
            style={{ width: "160px", height: "180px" }}
          >
            <img
              src={image}
              alt="argaam IR Tamkeen"
              loading="lazy"
              className="w-100 h-100"
            />
          </div>
          <div className="content">
            <h3 className="custom-fs-5 fw-bold">{name}</h3>
            <h4 className="custom-fs-6">{position}</h4>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MemberCard;
