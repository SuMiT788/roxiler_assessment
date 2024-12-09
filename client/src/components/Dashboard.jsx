import { useEffect, useState } from "react";

import Loader from "./Loader";
import { useMonth } from "../context/MonthContext";
import { fetchTransactions } from "../http";
import {
  formatDate,
  capitalizeFirstLetter,
  formatToIndianCurrency,
} from "../utils";

export default function Dashboard() {
  const { month } = useMonth();
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState({
    data: null,
    totalCount: 0,
    page: 1,
    limit: 5,
  });

  // Reset page to 1 when the month changes
  useEffect(() => {
    setTransactions((prev) => ({
      ...prev,
      page: 1,
    }));
  }, [month]);

  useEffect(() => {
    async function fetchTransactionData() {
      setIsLoading(true);

      const response = await fetchTransactions(
        month,
        transactions.page,
        transactions.limit
      );

      setTransactions((prev) => ({
        ...prev,
        data: response.result.data,
        totalCount: response.result.totalCount,
      }));

      // setTimeout added just so loader will be visibles
      setTimeout(() => {
        setIsLoading(false);
      }, 100);

      // setIsLoading(false);
    }

    fetchTransactionData();
  }, [month, transactions.page, transactions.limit]);

  function onPageChange(pageNo) {
    setTransactions((prev) => ({
      ...prev,
      page: pageNo,
    }));
  }

  const isFirstPage = transactions.page === 1;
  const isLastPage =
    transactions.page * transactions.limit >= transactions.totalCount;

  const tableHeaderCssString = "text-xs uppercase px-2 py-2";
  const tableDataCssString = "text-sm px-2";

  return (
    <div>
      {isLoading && <Loader loading={isLoading} />}
      {!isLoading && (
        <div>
          <div>
            <table className="min-w-full text-left">
              <thead>
                <tr className="bg-gray-200">
                  <th className={tableHeaderCssString}>ID</th>
                  <th className={tableHeaderCssString}>Title</th>
                  <th className={tableHeaderCssString}>Price</th>
                  <th className={tableHeaderCssString}>Description</th>
                  <th className={tableHeaderCssString}>Category</th>
                  <th className={tableHeaderCssString}>Preview</th>
                  <th className={tableHeaderCssString}>Is Sold?</th>
                  <th className={tableHeaderCssString}>Date of sale</th>
                </tr>
              </thead>
              <tbody>
                {transactions.data &&
                  transactions.data.map((row, index) => (
                    <tr
                      key={index}
                      className="odd:bg-slate-300 even:bg-white border-b"
                    >
                      <td
                        key="id"
                        className={`${tableDataCssString} font-medium`}
                      >
                        {index + 1}
                      </td>
                      <td
                        key="title"
                        className={`${tableDataCssString} max-w-40`}
                      >
                        {row["title"]}
                      </td>
                      <td key="price" className={tableDataCssString}>
                        {formatToIndianCurrency(row["price"])}
                      </td>
                      <td
                        key="description"
                        className={`${tableDataCssString} max-w-sm`}
                      >
                        {row["description"]}
                      </td>
                      <td key="category" className={tableDataCssString}>
                        {capitalizeFirstLetter(row["name"])}
                      </td>
                      <td key="image" className={tableDataCssString}>
                        <img
                          src={row["image"]}
                          alt={`Product image for index ${index}`}
                          style={{ width: "50px" }}
                        />
                      </td>
                      <td key="sold" className={tableDataCssString}>
                        {row["sold"] ? "Yes" : "No"}
                      </td>
                      <td key="date_of_sale" className={tableDataCssString}>
                        {formatDate(row["date_of_sale"])}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="pagination-container">
            <span className="ml-2 text-xs text-gray-700">{`Showing ${
              (transactions.page - 1) * transactions.limit + 1
            }-${
              transactions.page * transactions.limit < transactions.totalCount
                ? transactions.page * transactions.limit
                : transactions.totalCount
            } of ${transactions.totalCount} item(s)`}</span>
            <div className="pagination-buttons">
              <button
                onClick={() => onPageChange(transactions.page - 1)}
                disabled={isFirstPage}
                className="hover:bg-green-400 disabled:bg-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => onPageChange(transactions.page + 1)}
                disabled={isLastPage}
                className="hover:bg-green-400 disabled:bg-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
