import { useEffect, useState } from "react";
import axios from "axios";
import { PriceTable, DateRange } from "./components";
import { Button, Wrapper } from "./App.styles";

function App() {
  const [rows, setRows] = useState([]);
  const [filters, setFilters] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    axios
      .get("/price")
      .then(({ data }) => {
        setRows(data);
      })
      .catch(() => {
        setRows([]);
      });
  }, []);

  const submitFilter = () => {
    const filtersList = [fromDate, toDate];
    setFilters(filtersList);
  };

  const resetFilter = () => {
    setFromDate("");
    setToDate("");
    if (filters.length === 2) {
      setFilters([]);
    }
  };

  return (
    <>
      <Wrapper>
        <DateRange
          fromDate={fromDate}
          toDate={toDate}
          onFromDateChange={(e) => setFromDate(e.target.value)}
          onToDateChange={(e) => setToDate(e.target.value)}
        />
        <Button disabled={!(fromDate && toDate)} onClick={submitFilter}>
          Submit
        </Button>
        <Button onClick={resetFilter}>Reset</Button>
      </Wrapper>
      <PriceTable data={rows} filters={filters} />
    </>
  );
}

export default App;
