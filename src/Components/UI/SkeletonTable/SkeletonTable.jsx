import "./SkeletonTable.css";
const SkeletonTable = ({ columns = 1, rows = 4 }) => {
  const cols = Array.from({ length: columns });
  const rowsArr = Array.from({ length: rows });
  return (
    <div className="skeleton-table" aria-busy="true" aria-live="polite">
      <div className="skeleton-header">
        {cols.map((_, idx) => (
          <div key={idx} className="skeleton-header-cell" />
        ))}
      </div>
      <div className="skeleton-body">
        {rowsArr.map((_, idx) => (
          <div key={idx} className="skeleton-row">
            {cols.map((_, idx) => (
              <div key={idx} className="skeleton-cell" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonTable;