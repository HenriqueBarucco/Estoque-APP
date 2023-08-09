import Head from "next/head";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import EditProduct from "@/components/EditProduct";
import { useEffect, useState } from "react";
import AddProduct from "@/components/AddProduct";
import SaleProduct from "@/components/SaleProduct";
import { useSession } from "next-auth/react";

async function getProducts() {
    const res = await fetch(
        "https://estoque-api.henriquebarucco.com.br/products"
    );

    return await res
        .json()
        .then((data) => data)
        .catch((error) => []);
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
    return { props: { products: products || [] } };
}

export default function Products({ products }) {
    const [query, setQuery] = useState("");
    const [sortColumn, setSortColumn] = useState("id");
    const [sortDirection, setSortDirection] = useState("asc");
    const [localProducts, setLocalProducts] = useState(products);
    const [productUpdated, setProductUpdated] = useState(false);
    const { data: session } = useSession();

    function handleQueryChange(event) {
        setQuery(event.target.value);
    }

    function handleSort(column) {
        if (column === sortColumn) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
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
        product?.name.toLowerCase().includes(query.toLowerCase())
    );

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
            <div className="container table-responsive">
                <h1 className="text-center mb-4" style={{ color: "#184895" }}>
                    Estoque
                </h1>
                <div className="mb-4 d-flex justify-content-between">
                    <input
                        type="text"
                        className="form-control me-2"
                        placeholder="Digite o nome do produto para filtrar"
                        value={query}
                        onChange={handleQueryChange}
                    />
                    {session && (
                        <>
                            <AddProduct
                                setProductUpdated={() =>
                                    setProductUpdated(true)
                                }
                            />
                        </>
                    )}
                </div>
                <table className="table table-striped table-hover align-middle">
                    <thead>
                        <tr>
                            <th
                                className="col-3"
                                onClick={() => handleSort("name")}
                            >
                                Produto
                            </th>
                            <th onClick={() => handleSort("model")}>Marca</th>
                            <th onClick={() => handleSort("measure")}>
                                Medida
                            </th>
                            <th onClick={() => handleSort("price")}>Preço</th>
                            <th onClick={() => handleSort("available")}>
                                Quantidade
                            </th>
                            <th onClick={() => handleSort("total")}>
                                Valor total
                            </th>
                            {session && (
                                <>
                                    <th>Opções</th>
                                    <th></th>
                                    <th></th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedProducts.map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.model}</td>
                                <td>{product.measure}</td>
                                <td>
                                    {product.price.toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    })}
                                </td>
                                <td>{product.available}</td>
                                <td>
                                    {product.total.toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    })}
                                </td>
                                {session && (
                                    <>
                                        <td>
                                            <button
                                                className="btn btn-outline-danger me-2"
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
                                        </td>
                                        <td>
                                            <span className="grid me-2">
                                                <EditProduct
                                                    product={product}
                                                    setProductUpdated={() =>
                                                        setProductUpdated(true)
                                                    }
                                                />
                                            </span>
                                        </td>
                                        <td>
                                            {" "}
                                            <span className="grid me-2">
                                                <SaleProduct
                                                    product={product}
                                                    setProductUpdated={() =>
                                                        setProductUpdated(true)
                                                    }
                                                />
                                            </span>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
