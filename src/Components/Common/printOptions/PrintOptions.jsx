const PrintOptions = ({link, onClick}) => {
  return (
    <div className="d-flex gap-2">
      {link ? (
        <a href={link}>
          <i
            className="bi bi-file-earmark-excel"
            style={{
              color: "var(--main-color)",
              fontSize: "28px",
              cursor: "pointer",
            }}
          ></i>
        </a>
      ) : (
        <i
          className="bi bi-file-earmark-excel"
          style={{
            color: "var(--main-color)",
            fontSize: "28px",
            cursor: "pointer",
          }}
          onClick={() => onClick()}
        ></i>
      )}

      <i
        className="bi bi-printer"
        style={{
          color: "var(--main-color)",
          fontSize: "28px",
          cursor: "pointer",
        }}
        onClick={() => window.print()}
        title="Print"
      ></i>
    </div>
  );
};

export default PrintOptions;
