import Head from "next/head";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import EditProduct from "@/components/EditProduct";
import { useEffect, useState } from "react";
import AddProduct from "@/components/AddProduct";
import SaleProduct from "@/components/SaleProduct";

async function getProducts() {
  const res = await fetch(
    "https://estoque-api.henriquebarucco.com.br/products"
  );
  const data = await res.json();
  return data;
}

function removeProduct(id, setProducts, products) {
  fetch(`https://estoque-api.henriquebarucco.com.br/products/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.status === 204) {
        setProducts(products.filter((product) => product.id !== id));
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function confirmRemoveProduct(id, setProducts, products) {
  confirmAlert({
    title: "Confirmar remoção",
    message: "Tem certeza que deseja remover este produto?",
    buttons: [
      {
        label: "Sim",
        onClick: () => removeProduct(id, setProducts, products),
      },
      {
        label: "Não",
      },
    ],
  });
}

export async function getServerSideProps() {
  const products = await getProducts();
  return { props: { products } };
}

export default function Products({ products }) {
  const [query, setQuery] = useState("");
  const [sortColumn, setSortColumn] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");
  const [localProducts, setLocalProducts] = useState(products);
  const [productUpdated, setProductUpdated] = useState(false);

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

  useEffect(() => {
    if (productUpdated) {
      getProducts().then((data) => {
        setLocalProducts(data);
        setProductUpdated(false);
      });
    }
  }, [productUpdated]);

  const filteredProducts = localProducts.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  // Sort products by current sort column and direction
  const sortedProducts = filteredProducts.sort((a, b) => {
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
        <title>Lista de Produtos</title>
      </Head>
      <div className="container">
        <h1 className="text-center mb-4">Estoque</h1>
        <div className="mb-4 d-flex justify-content-between">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Digite o nome do produto para filtrar"
            value={query}
            onChange={handleQueryChange}
          />
          <AddProduct setProductUpdated={() => setProductUpdated(true)} />
        </div>
        <table className="table table-striped table-hover align-middle">
          <thead>
            <tr>
              <th onClick={() => handleSort("id")}>ID</th>
              <th onClick={() => handleSort("name")}>Nome</th>
              <th onClick={() => handleSort("description")}>Descrição</th>
              <th onClick={() => handleSort("price")}>Preço</th>
              <th onClick={() => handleSort("available")}>Quantidade</th>
              <th onClick={() => handleSort("total")}>Valor total</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.available}</td>
                <td>{product.total}</td>
                <td>
                  <button
                    className="btn btn-danger me-2"
                    onClick={() =>
                      confirmRemoveProduct(
                        product.id,
                        setLocalProducts,
                        localProducts
                      )
                    }
                  >
                    Excluir
                  </button>
                  <span className="grid me-2">
                    <EditProduct
                      product={product}
                      setProductUpdated={() => setProductUpdated(true)}
                    />
                  </span>
                  <span className="grid me-2">
                    <SaleProduct
                      product={product}
                      setProductUpdated={() => setProductUpdated(true)}
                    />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
