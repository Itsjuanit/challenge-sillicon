import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [carBrands, setCarBrands] = useState([]);
  const [carModels, setCarModels] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem("user");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUser(parsedData.user);
      setCarBrands(parsedData.carbrand);
      setCarModels(parsedData.carmodel);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const brandNameTemplate = (rowData) => {
    const brand = carBrands.find((brand) => brand.code === rowData.brand_code);
    return brand ? brand.name : "Desconocida";
  };

  // Función de filtro personalizado
  const filteredModels = carModels.filter((model) => {
    const brand = carBrands.find((brand) => brand.code === model.brand_code);
    const brandName = brand ? brand.name : "";
    const searchValue = globalFilter.toLowerCase();
    return model.name.toLowerCase().includes(searchValue) || brandName.toLowerCase().includes(searchValue);
  });

  return (
    <div style={{ padding: "20px" }}>
      <h1>
        Bienvenido, {user?.first_name} {user?.last_name}
      </h1>
      <Button label="Cerrar sesión" icon="pi pi-sign-out" onClick={handleLogout} className="p-button-danger" />

      <h2 style={{ marginTop: "20px" }}>Modelos de autos</h2>
      <div className="p-inputgroup" style={{ marginBottom: "20px" }}>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Buscar por modelo o marca..."
            style={{ width: "300px" }}
          />
        </span>
      </div>

      <DataTable
        value={filteredModels} // Usar la lista filtrada
        paginator
        rows={10}
        emptyMessage="No se encontraron resultados"
        header="Lista de Modelos"
      >
        <Column field="name" header="Modelo" sortable />
        <Column field="brand_code" header="Marca" body={brandNameTemplate} sortable />
      </DataTable>
    </div>
  );
};

export default Dashboard;
