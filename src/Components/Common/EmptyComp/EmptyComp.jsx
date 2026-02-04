const EmptyComp = ({text}) => {
  return (
    <div className="text-capitalize d-flex justify-content-center align-items-center w-full fs-4 "
    style={{ minHeight: "250px"}}
    >
      {text}
    </div>
  )
}

export default EmptyComp
