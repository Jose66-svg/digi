// Función para agregar material al inventario desde el almacenero
function agregarMaterialStorekeeper() {
    const technician = document.getElementById('technician-storekeeper').value;
    const material = document.getElementById('material-storekeeper').value;
    const quantity = parseInt(document.getElementById('quantity-storekeeper').value);
    const serial = document.getElementById('serial-storekeeper').value;

    // Actualizamos los materiales globales según el técnico seleccionado
    if (material === 'routers' || material === 'onts') {
        for (let i = 0; i < quantity; i++) {
            globalMaterials[technician][material].push(serial);
        }
    } else {
        globalMaterials[technician][material] += quantity;
    }

    alert('Material añadido con éxito');
    updateStorekeeperInventory();  // Actualizamos la vista del inventario del almacenero
}

// Función para actualizar la vista de inventario del almacenero
function updateStorekeeperInventory() {
    const technician = document.getElementById('technician-storekeeper').value;
    const inventoryList = document.getElementById('material-list-storekeeper');
    const techMaterials = globalMaterials[technician];

    // Limpiar la tabla antes de agregar nuevos datos
    inventoryList.innerHTML = '';

    // Actualizar la tabla con los materiales del técnico seleccionado
    inventoryList.innerHTML = `
        <tr>
            <td>Cable de fibra óptica</td>
            <td>${techMaterials.cable} unidades</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Conectores</td>
            <td>${techMaterials.conectores} unidades</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Cinta aislante</td>
            <td>${techMaterials.cinta} rollos</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Routers</td>
            <td>${techMaterials.routers.length} unidades</td>
            <td>${techMaterials.routers.join(', ') || '-'}</td>
        </tr>
        <tr>
            <td>ONT</td>
            <td>${techMaterials.onts.length} unidades</td>
            <td>${techMaterials.onts.join(', ') || '-'}</td>
        </tr>
    `;
}

// Llamar la función de ver inventario cuando la página cargue
document.addEventListener('DOMContentLoaded', () => {
    updateStorekeeperInventory(); // Mostrar el inventario del técnico al cargar la página
});

function toggleSerialInputStorekeeper() {
    const material = document.getElementById('material-storekeeper').value;
    const serialInput = document.getElementById('serial-input-storekeeper');

    if (material === 'routers' || material === 'onts') {
        serialInput.style.display = 'block';
    } else {
        serialInput.style.display = 'none';
    }
}