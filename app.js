const materials = {
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

// Lógica para ver el inventario del técnico seleccionado
function viewInventory() {
    const technician = document.getElementById('technician-view').value;
    const inventoryList = document.getElementById('material-list-view');
    const techMaterials = materials[technician];

    // Actualizar el nombre del técnico
    document.getElementById('technician-name').innerText = technician.charAt(0).toUpperCase() + technician.slice(1);

    // Limpiar la tabla antes de agregar los nuevos materiales
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

// Función para descontar material del inventario
function quitarMaterial() {
    const technician = document.getElementById('technician-storekeeper').value;
    const material = document.getElementById('material-storekeeper').value;
    const quantity = parseInt(document.getElementById('quantity-storekeeper').value);
    const serial = document.getElementById('serial-storekeeper').value;

    if (material === 'routers' || material === 'onts') {
        for (let i = 0; i < quantity; i++) {
            const serialIndex = materials[technician][material].indexOf(serial);
            if (serialIndex !== -1) {
                materials[technician][material].splice(serialIndex, 1);
                updateInventory();
            } else {
                alert('Número de serie no encontrado.');
            }
        }
    } else {
        if (materials[technician][material] >= quantity) {
            materials[technician][material] -= quantity;
            updateInventory();
        } else {
            alert('No hay suficiente cantidad en el inventario.');
        }
    }
}

// Función para agregar material al inventario
function agregarMaterial() {
    const technician = document.getElementById('technician-storekeeper').value;
    const material = document.getElementById('material-storekeeper').value;
    const quantity = parseInt(document.getElementById('quantity-storekeeper').value);
    const serial = document.getElementById('serial-storekeeper').value;

    if (material === 'routers' || material === 'onts') {
        for (let i = 0; i < quantity; i++) {
            materials[technician][material].push(serial);
            updateInventory();
        }
    } else {
        materials[technician][material] += quantity;
        updateInventory();
    }
}

// Función para alternar la visibilidad del campo de número de serie
function toggleSerialInputStorekeeper() {
    const material = document.getElementById('material-storekeeper').value;
    const serialInput = document.getElementById('serial-input-storekeeper');

    if (material === 'routers' || material === 'onts') {
        serialInput.style.display = 'block';  // Mostrar el campo de número de serie
    } else {
        serialInput.style.display = 'none';   // Ocultar el campo de número de serie
    }
}

// Llamar la función de ver inventario cuando la página cargue
document.addEventListener('DOMContentLoaded', () => {
    viewInventory(); // Mostrar el inventario al cargar la página
});
// Función para mostrar el inventario con seriales agrupados
function viewInventory() {
    const technician = document.getElementById('technician-view').value;
    const inventoryList = document.getElementById('material-list-view');
    const techMaterials = materials[technician];

    // Actualizar el nombre del técnico
    document.getElementById('technician-name').innerText = technician.charAt(0).toUpperCase() + technician.slice(1);

    // Limpiar la tabla antes de agregar los nuevos materiales
    inventoryList.innerHTML = '';

    // Crear la lista de materiales
    const serialFormatter = (serialArray) => {
        if (serialArray.length === 0) return '-';
        return `<div class="serial-list">
                    ${serialArray.map(serial => `<span class="serial-list-item">${serial}</span>`).join('')}
                </div>`;
    };

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
            <td>${serialFormatter(techMaterials.routers)}</td>
        </tr>
        <tr>
            <td>ONT</td>
            <td>${techMaterials.onts.length} unidades</td>
            <td>${serialFormatter(techMaterials.onts)}</td>
        </tr>
    `;
}