// script.js
document.getElementById('generateTree').addEventListener('click', generateTree);

let tree = [];
let currentStep = 0;

// Genera un árbol de ejemplo
function generateTree() {
    const depth = parseInt(document.getElementById('depth').value, 10);
    tree = createTree(depth);
    renderTree(tree);
}

// Crear un árbol básico
function createTree(depth, maxChildren = 2) {
    const tree = [];
    let id = 0;

    function buildTree(level) {
        if (level === 0) return { id: id++, value: Math.floor(Math.random() * 20) };

        const children = [];
        for (let i = 0; i < maxChildren; i++) {
            children.push(buildTree(level - 1));
        }

        return { id: id++, children };
    }

    tree.push(buildTree(depth));
    console.log(tree)
    return tree;
}

function renderTree(tree) {
    const container = document.getElementById('tree-container');
    container.innerHTML = ''; // Limpia el contenedor

    function renderNodeRecursively(node, parentElement, depth) {
        // Crea el nodo visual
        const nodeElement = document.createElement('div');
        nodeElement.className = 'node';
        nodeElement.textContent = node.value !== undefined ? node.value : 'N/A';

        // Crea el nivel del nodo
        const levelContainer = parentElement || container;
        levelContainer.appendChild(nodeElement);

        // Conexión visual entre padres e hijos
        if (node.children) {
            const childContainer = document.createElement('div');
            childContainer.className = 'tree-level';
            childContainer.style.marginTop = '30px';
            container.appendChild(childContainer);

            node.children.forEach(child => {
                renderNodeRecursively(child, childContainer);
            });
        }
    }

    // Inicia la renderización del árbol
    renderNodeRecursively(tree[0]);
}

// Añadir líneas entre padres e hijos
function renderNodeRecursively(node, parentElement, depth) {
    const nodeElement = document.createElement('div');
    nodeElement.className = 'node';
    nodeElement.textContent = node.value !== undefined ? node.value : 'N/A';

    // Añadir línea si es un nodo hijo
    if (parentElement) {
        const line = document.createElement('div');
        line.className = 'line';
        parentElement.appendChild(line);
    }

    const levelContainer = parentElement || container;
    levelContainer.appendChild(nodeElement);

    // Renderizar hijos
    if (node.children) {
        const childContainer = document.createElement('div');
        childContainer.className = 'tree-level';
        container.appendChild(childContainer);

        node.children.forEach(child => {
            renderNodeRecursively(child, childContainer);
        });
    }
}


// Algoritmo Minimax (básico)
function minimax(node, depth, isMaximizingPlayer) {
    if (!node.children) return node.value;

    if (isMaximizingPlayer) {
        let bestValue = -Infinity;
        node.children.forEach(child => {
            const val = minimax(child, depth - 1, false);
            bestValue = Math.max(bestValue, val);
        });
        node.value = bestValue;
        return bestValue;
    } else {
        let bestValue = Infinity;
        node.children.forEach(child => {
            const val = minimax(child, depth - 1, true);
            bestValue = Math.min(bestValue, val);
        });
        node.value = bestValue;
        return bestValue;
    }
}

// Inicialización del cálculo paso a paso
document.getElementById('nextStep').addEventListener('click', () => {
    if (tree.length === 0) return alert('¡Genera un árbol primero!');
    // Lógica para calcular paso a paso (se implementará dinámicamente).
});
