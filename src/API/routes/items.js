const { Router } = require('express');
const router = Router();

const fetch = require('node-fetch');

// endpoint para recibir query de búsqueda
router.get('/', async (req, res) => {

    const tosearch = req.query.q;
    const responseListItems = await fetch('https://api.mercadolibre.com/sites/MLA/search?q=' + tosearch);
    const listItems = await responseListItems.json();

    const max = (listItems.results.length > 4) ? 4 : listItems.results.length;
    const decimals = 2;

    if (listItems.results.length == 0)
        res.json({ "msj": "No results found" });
    else {

        const categories = [];
        const result = {
            "author": {
                "name": "Luis E.",
                "lastname": "Caiazzo Gonzalez"
            },
            "categories": [],
            "items": []
        };

        if (listItems.filters.length > 0) {
            for (const filter in listItems.filters) {
                if (listItems.filters[filter].id == 'category') {
                    if (listItems.filters[filter].values.length > 0) {
                        for (const value in listItems.filters[filter].values) {
                            if (listItems.filters[filter].values[value].path_from_root.length > 0) {
                                for (const path in listItems.filters[filter].values[value].path_from_root) {
                                    categories.push(listItems.filters[filter].values[value].path_from_root[path].name);
                                }
                            }
                        }
                    }
                }
            }
        }

        result.categories = categories;

        for (var i = 0; i < max; i++) {
            var item = {
                "id": listItems.results[i].id,
                "title": listItems.results[i].title,
                "price": {
                    "currency": listItems.results[i].currency_id,
                    "amount": listItems.results[i].available_quantity,//available_quantity denimals
                    "decimals": listItems.results[i].price.toFixed(decimals)
                },
                "picture": listItems.results[i].thumbnail,
                "condition": listItems.results[i].condition,
                "free_shipping": listItems.results[i].shipping.free_shipping,
                "state": listItems.results[i].seller_address.state.name
            };
            result.items.push(item);
        }

        res.json(result);
    }

});


// endpoint para recibir id de item para descripción
router.get('/:id', async (req, res) => {
    console.log("/:id")
    const decimals = 2;

    // Sección de Items Data
    const { id } = req.params;
    const responseItem = await fetch('https://api.mercadolibre.com/items/' + id);
    const item = await responseItem.json();

    if (item.status == '404') {
        res.json({ "msj": "No results found" });
    } else {
        // Sección de Descripción 
        const responseDescripcion = await fetch('https://api.mercadolibre.com/items/' + id + '/description');
        const descripcion = await responseDescripcion.json();

        // Sección de Categorías 
        const category_id = item.category_id;
        const categoriesResult = await fetch('https://api.mercadolibre.com/categories/' + category_id);
        const categories = await categoriesResult.json();

        const categorias = [];

        if (categories.path_from_root.length > 0) {
            for (const path in categories.path_from_root) {
                categorias.push(categories.path_from_root[path].name);
            }
        }

        console.log(categorias);
        //res.send('ok');
        const result = {
            "author": {
                "name": "Luis E.",
                "lastname": "Caiazzo Gonzalez"
            },
            "item": {
                "id": id,
                "title": item.title,
                "price": {
                    "currency": item.currency_id,
                    "amount": item.available_quantity,
                    "decimals": item.price
                },
                "picture": item.pictures[0].url,
                "condition": item.condition,
                "free_shipping": item.shipping.free_shipping,
                "sold_quantity": item.sold_quantity,
                "description": descripcion.plain_text
            },
            categories: categorias
        };

        res.json(result);
    }
});


module.exports = router;