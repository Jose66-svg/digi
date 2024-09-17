// Función para ver el inventario del técnico
function viewTechnicianInventory() {
    const technician = document.getElementById('technician-view').value;
    const inventoryList = document.getElementById('material-list-technician');
    const techMaterials = globalMaterials[technician];

    // Actualizar el nombre del técnico
    document.getElementById('technician-name').innerText = technician.charAt(0).toUpperCase() + technician.slice(1);

    // Limpiar la tabla antes de agregar nuevos materiales
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

// Llamar a la función cuando la página cargue
document.addEventListener('DOMContentLoaded', () => {
    viewTechnicianInventory(); // Mostrar inventario al cargar la página
});

let globalMaterials = {
    tecnico1: {
        cable: 10,
        conectores: 20,
        cinta: 5,
        routers: [],
        onts: []
    },
    tecnico2: {
        cable: 15,
        conectores: 25,
        cinta: 10,
        routers: [],
        onts: []
    },
    tecnico3: {
        cable: 5,
        conectores: 10,
        cinta: 2,
        routers: [],
        onts: []
    }
};

// Actualiza el inventario del técnico seleccionado
function updateInventory() {
    const technician = document.getElementById('technician').value;
    const inventoryList = document.getElementById('material-list-technician');
    const techMaterials = globalMaterials[technician];

    // Limpiar la tabla antes de actualizarla
    inventoryList.innerHTML = '';

    // Agregar el inventario del técnico seleccionado a la tabla
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

// Función para mostrar/ocultar el campo de serial según el material seleccionado
function toggleSerialInput() {
    const material = document.getElementById('material').value;
    const serialInput = document.getElementById('serial-input');
    if (material === 'routers' || material === 'onts') {
        serialInput.style.display = 'block';
    } else {
        serialInput.style.display = 'none';
    }
}

// Función para descontar material del inventario
function descontarMaterial() {
    const technician = document.getElementById('technician').value;
    const material = document.getElementById('material').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const serial = document.getElementById('serial').value;

    const techMaterials = globalMaterials[technician];

    // Descontar materiales
    if (material === 'routers' || material === 'onts') {
        const index = techMaterials[material].indexOf(serial);
        if (index !== -1) {
            techMaterials[material].splice(index, 1);
        } else {
            alert('El número de serie no existe.');
            return;
        }
    } else {
        if (techMaterials[material] >= quantity) {
            techMaterials[material] -= quantity;
        } else {
            alert('No hay suficiente material para descontar.');
            return;
        }
    }

    // Actualizar el inventario
    updateInventory();
    alert('Material descontado con éxito.');
}

// Llamar a la función de ver inventario cuando la página cargue
document.addEventListener('DOMContentLoaded', () => {
    updateInventory();
});