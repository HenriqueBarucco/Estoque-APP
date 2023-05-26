import Head from "next/head";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

async function getSales() {
  const res = await fetch("https://estoque-api.henriquebarucco.com.br/sales");
  const data = await res.json();
  return data;
}

export async function getServerSideProps() {
  const sales = await getSales();
  return { props: { sales } };
}

export default function Sales({ sales }) {
  const [query, setQuery] = useState("");
  const [sortColumn, setSortColumn] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");

  function handleQueryChange(event) {
    setQuery(event.target.value);
  }

  function handleSort(column) {
    if (column === sortColumn) {
      // Toggle sort direction
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set new sort column and ascending direction
      setSortColumn(column);
      setSortDirection("asc");
    }
  }

  const filteredSales = sales.filter((sale) =>
    sale.id.toString().toLowerCase().includes(query.toLowerCase())
  );

  // Sort products by current sort column and direction
  const sortedSales = filteredSales.sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    if (aValue < bValue) {
      return sortDirection === "asc" ? -1 : 1;
    } else if (aValue > bValue) {
      return sortDirection === "asc" ? 1 : -1;
    } else {
      return 0;
    }
  });

  return (
    <div>
      <Head>
        <title>Lista de Vendas</title>
      </Head>
      <div className="container table-responsive">
        <h1 className="text-center mb-4" style={{ color: "#184895" }}>
          Vendas
        </h1>
        <div className="mb-4 d-flex justify-content-between">
          {/* <input
            type="text"
            className="form-control me-2"
            placeholder="Digite o nome do produto para filtrar"
            value={query}
            onChange={handleQueryChange}
          /> */}
        </div>
        <table className="table table-striped table-hover align-middle">
          <thead>
            <tr>
              <th onClick={() => handleSort("name")}>Produto</th>
              <th onClick={() => handleSort("quantity")}>Quantidade</th>
              <th onClick={() => handleSort("years")}>Anos</th>
              <th onClick={() => handleSort("bruto")}>Valor Bruto</th>
              <th onClick={() => handleSort("custo")}>Valor de Custo</th>
              <th onClick={() => handleSort("profit")}>Lucro</th>
            </tr>
          </thead>
          <tbody>
            {sortedSales.map((sale) => (
              <tr key={sale.id}>
                <td>
                  {sale.name} - {sale.measure}
                </td>
                <td>{sale.sale.quantitySold}</td>
                <td class="d-flex gap-1">
                  {" "}
                  {sale.years.map((item) => (
                    <>
                      <h6>
                        <span class="badge bg-secondary ">{item}</span>
                      </h6>
                    </>
                  ))}
                </td>

                <td>
                  {sale.sale.totalValue.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td>
                  {sale.sale.totalCost.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td>
                  {sale.sale.profit.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
