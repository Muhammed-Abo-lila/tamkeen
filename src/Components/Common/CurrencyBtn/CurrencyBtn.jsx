import "./currencyBtn.css";
import useLang from "../../../Utils/useLang";
function CurrencyBtn({activeCurrency, setActiveCurrency }) {
  const currencies = [
    { value: "usd",label:useLang("USD","دولار أمريكي") },
    { value: "sar",label:useLang("Riyal","ريال") },
  ];
  return (
    <ul className="currencies-list d-flex list-unstyled m-0 rounded-5 custom-fs-6">
      {currencies.map((item, idx) => (
        <li
          onClick={() => setActiveCurrency(item)}
          key={idx}
          className={`currency-btn cursor-pointer w-50 rounded-4 word-nowrap px-3 py-1 ${
            activeCurrency?.value === item?.value && "active-currency-btn"
          }`}
        >
          {item?.label}
        </li>
      ))}
    </ul>
  );
}

export default CurrencyBtn;
