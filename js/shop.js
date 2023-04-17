// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
var products = [
    {
        id: 1,
        name: 'Cooking Oil',
        price: 10.5,
        type: 'grocery',
        offer: {
            number: 3,
            percent: 20
        }
    },
    {
        id: 2,
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        id: 3,
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery',
        offer: {
            number: 10,
            percent: 30
        }
    },
    {
        id: 4,
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        id: 5,
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        id: 6,
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        id: 7,
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        id: 8,
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        id: 9,
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    }
]
// Array with products (objects) added directly with push(). Products in this array are repeated.
var cartList = [];

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];
var contador = 0;
var total = 0;


// Exercise 1

function buy(id) {
    // 1. Buscar el producto con el id proporcionado en el array de productos
    var item = products.find((product) => product.id === id);

    // 2. Agregar el producto encontrado al array cartList
    cartList.push(item);
    console.log(cartList);

    // Actualizar la cantidad de productos en el carrito en la página
    document.getElementById("count_product").innerHTML = cartList.length;

    // Generar el contenido del carrito en la página
    generateCart();
}



// Exercise 2

function cleanCart() {
    // Mientras el carrito tenga elementos, remuévelos con el método pop()
    while (cart.length > 0) {
        cart.pop();
        // Restablecer la variable total a cero
        total = 0;
        // Restablecer la variable contador a cero
        contador = 0;
    }
    // Imprimir el carrito vacío en la consola
    console.log(cart);
    // Actualizar el contenido del carrito en la página
    printCart();
}


// Exercise 3

function calculateTotal() {
    // Calcula el precio total del carrito usando la matriz "cartList"
    // Iteramos sobre la matriz "cartList" y sumamos los precios de cada elemento
    var total = 0; // Inicializamos la variable total en cero
    for (i = 0; i < cartList.length; i++) { // Iteramos sobre cada elemento de la matriz "cartList"
        var precio = cartList[i].price; // Obtenemos el precio del elemento actual y lo guardamos en la variable "precio"
        total += precio; // Agregamos el precio del elemento actual a la variable "total"
    }
    console.log(total); // Imprimimos el precio total en la consola
}


// Exercise 4

//Genera un nuevo arreglo "cart" a partir del arreglo "cartList"
//donde cada objeto representa un producto y su cantidad.

function generateCart() {
    // Usamos reduce para crear un objeto que contenga el id del item y la cantidad
    var itemIdQuantityMap = cartList.reduce((acc, item) => {
        if (acc[item.id] !== undefined) {
            // Si el id del item ya existe, incrementamos su cantidad en 1
            acc[item.id].quantity += 1;
        } else {
            // Si el id del item no existe, añadimos un nuevo objeto con el id, todas las propiedades del item y la cantidad en 1
            acc[item.id] = { ...item, quantity: 1 };
        }
        return acc;
    }, {});

    // Convertimos el objeto en un arreglo de objetos y lo asignamos a la variable "cart"
    cart = Object.values(itemIdQuantityMap);

    // Imprimimos el arreglo "cart" en la consola para verificar que se haya generado correctamente.
    console.log(cart);

    // Llamamos a la función "applyPromotionsCart" para aplicar promociones al carrito.
    applyPromotionsCart();

    // La función "generateCart" genera un nuevo arreglo "cart" a partir del arreglo "cartList".
    // Este arreglo no contiene items repetidos, en cambio, cada objeto del arreglo "cart" muestra la cantidad del producto.
}


// Exercise 5

function applyPromotionsCart() {

    // Recorremos cada elemento del arreglo cart
    for (let i = 0; i < cart.length; i++) {
        // Obtenemos el precio y la cantidad del producto actual
        const precio = cart[i].price;
        const cantidad = cart[i].quantity;

        // Calculamos el subtotal del producto actual y lo agregamos al objeto del producto
        cart[i].subtotal = precio * cantidad;

        // Si el producto actual tiene una oferta
        if (cart[i].offer !== undefined) {
            // Verificamos si se cumple el número mínimo de productos para aplicar la oferta
            if (cantidad >= cart[i].offer.number) {
                // Obtenemos el porcentaje de descuento de la oferta
                const oferta = cart[i].offer.percent;

                // Calculamos el subtotal con el descuento y lo agregamos al objeto del producto
                cart[i].subtotalWithDiscount = ((precio * cantidad) - precio * cantidad * oferta / 100);
            } else {
                // Si no se cumple el número mínimo de productos para aplicar la oferta, el subtotal con descuento es igual al subtotal sin descuento
                cart[i].subtotalWithDiscount = cart[i].subtotal;
            }
        } else {
            // Si el producto no tiene oferta, el subtotal con descuento es igual al subtotal sin descuento
            cart[i].subtotalWithDiscount = cart[i].subtotal;
        }
    }

    console.log(cart);

    // La función aplica las promociones a cada item en el arreglo cart
}


// Exercise 6

function printCart() {
    // Se inicializan las variables cartListHtml y total con valores vacíos
    var cartListHtml = "";
    var total = 0;

    // Se verifica si el carrito está vacío
    if (cart.length == 0) {
        // Si el carrito está vacío, se actualizan los elementos del DOM correspondientes
        document.getElementById("count_product").innerHTML = "0";
        document.getElementById("cart_list").innerHTML = `
        <td colspan="4" class=" text-center px-5 py-3">
            <h3>Your Cart Is Currently Empty!</h3>
        </td>`;
        document.getElementById("total_price").innerHTML = total;
    } else {
        // Si el carrito no está vacío, se recorre el array cart
        for (let i = 0; i < cart.length; i++) {
            // Se almacenan los valores del nombre, precio, cantidad y precio total con descuento del producto actual en variables
            var producto = cart[i].name;
            var precio = cart[i].price;
            var cantidad = cart[i].quantity;
            var totalDiscounted = cart[i].subtotalWithDiscount;

            // Se crea una fila de tabla HTML que contiene la información del producto actual y se agrega a cartListHtml
            cartListHtml += `
                <tr>
                    <th scope="row">${producto}</th>
                    <td>${precio}</td>
                    <td>${cantidad}</td>
                    <td>$${totalDiscounted}</td>
                    <td><svg role="button" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16" onclick="removeFromCart(${cart[i].id})">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                  </svg></td>
                </tr>
                `;

            total += totalDiscounted;

        }
        //Esta línea de código actualiza el contenido del elemento HTML con el id "cart_list" con la variable cartListHtml,
        //que contiene la lista de productos que se van a mostrar en el carrito de compras.
        document.getElementById("cart_list").innerHTML = cartListHtml;
        document.getElementById("total_price").innerHTML = total;
    }

}


// ** Nivell II **


// Exercise 7

function addToCart(id) {

    // Buscar el producto por su ID en el array de productos y guardarlo en la variable "item"
    var item = products.find((product) => product.id === id);

    // Comprobar si el carrito está vacío
    if (cart.length == 0) {
        // Si está vacío, agregar el producto al carrito con una cantidad de 1
        cart.push({ ...item, quantity: 1 });
        contador++;
    } else {
        // Si el carrito no está vacío, buscar el producto en el carrito
        var elemento = cart.find((product) => product.id === item.id);
        if (elemento != undefined) {
            // Si el producto ya está en el carrito, aumentar su cantidad
            elemento.quantity += 1;
            contador++;
        } else {
            // Si el producto no está en el carrito, agregarlo con una cantidad de 1
            cart.push({ ...item, quantity: 1 });
            contador++;
        }
    }

    // Aplicar promociones al carrito
    applyPromotionsCart();

    // Actualizar el contador de productos en el carrito en la interfaz
    document.getElementById("count_product").innerHTML = contador;


    console.log(cart);
}


// Exercise 8

// Esta función se encarga de remover un producto del carrito
function removeFromCart(id) {
    // Buscamos el producto a remover en el carrito
    const producto = cart.find(item => item.id === id);
    // Verificamos si el producto tiene más de una unidad en el carrito
    if (producto.quantity > 1) {
        // Si tiene más de una unidad, simplemente decrementamos la cantidad en 1
        producto.quantity--;
        contador--;
        // Aplicamos las promociones en caso de que corresponda
        applyPromotionsCart();
        // Actualizamos la vista del carrito
        printCart();
    } else {
        // Si el producto tiene una sola unidad en el carrito, lo eliminamos completamente
        cart.splice(producto, 1);
        contador--;
        // Aplicamos las promociones en caso de que corresponda
        applyPromotionsCart();
        // Actualizamos la vista del carrito
        printCart();
    }
    // Actualizamos el contador de productos en el carrito
    document.getElementById("count_product").innerHTML = contador;
}

// Esta función se encarga de abrir el modal que muestra el contenido del carrito
function open_modal() {
    console.log("Open Modal");
    // Imprimimos el contenido del carrito en el modal
    printCart();
}