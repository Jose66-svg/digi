// Datos globales de inventario
const globalMaterials = {
    tecnico1: {
        cable: 10,
        conectores: 20,
        cinta: 5,
        routers: ['12345', '67890'],
        onts: ['54321', '09876']
    },
    tecnico2: {
        cable: 15,
        conectores: 25,
        cinta: 7,
        routers: [],
        onts: []
    },
    tecnico3: {
        cable: 8,
        conectores: 18,
        cinta: 3,
        routers: [],
        onts: []
    }
};

// Función para mostrar el inventario global
function viewGlobalInventory() {
    const inventoryList = document.getElementById('material-list-view');
    inventoryList.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos

    // Agregar materiales básicos
    inventoryList.innerHTML += `
        <tr>
            <td>Cable de fibra óptica</td>
            <td>${globalMaterials.tecnico1.cable + globalMaterials.tecnico2.cable + globalMaterials.tecnico3.cable} unidades</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Conectores</td>
            <td>${globalMaterials.tecnico1.conectores + globalMaterials.tecnico2.conectores + globalMaterials.tecnico3.conectores} unidades</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Cinta aislante</td>
            <td>${globalMaterials.tecnico1.cinta + globalMaterials.tecnico2.cinta + globalMaterials.tecnico3.cinta} rollos</td>
            <td>-</td>
        </tr>
    `;

    // Agregar routers y mostrar sus seriales
    const totalRouters = globalMaterials.tecnico1.routers.length + globalMaterials.tecnico2.routers.length + globalMaterials.tecnico3.routers.length;
    const allRouters = [...globalMaterials.tecnico1.routers, ...globalMaterials.tecnico2.routers, ...globalMaterials.tecnico3.routers];

    inventoryList.innerHTML += `
        <tr>
            <td>Routers</td>
            <td>${totalRouters} unidades</td>
            <td>${allRouters.length > 0 ? allRouters.join(', ') : '-'}</td>
        </tr>
    `;

    // Agregar ONTs y mostrar sus seriales
    const totalOnts = globalMaterials.tecnico1.onts.length + globalMaterials.tecnico2.onts.length + globalMaterials.tecnico3.onts.length;
    const allOnts = [...globalMaterials.tecnico1.onts, ...globalMaterials.tecnico2.onts, ...globalMaterials.tecnico3.onts];

    inventoryList.innerHTML += `
        <tr>
            <td>ONT</td>
            <td>${totalOnts} unidades</td>
            <td>${allOnts.length > 0 ? allOnts.join(', ') : '-'}</td>
        </tr>
    `;
}

// Llamar a la función para mostrar el inventario al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    viewGlobalInventory(); // Mostrar el inventario global al cargar la página
});