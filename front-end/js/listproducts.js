class ListProducts {
    list = [];

    constructor() { }

    //Requete réseau exécutée à l'aide d'une promesse (resolve) ou rejetée (dans le cas échéant)
    // Chargement de tous les produits dans le tableau

    loadingProducts() {
        return new Promise((resolve, reject) => {
            fetch("/api/teddies/")
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                })
                .then(data => {
                    for (const product of data) {

                        // Si ce n'est pas un produit, erreur
                        if (!Product.check(product)) {
                            console.error("Erreur", product, "Ce n'est pas un produit!");
                            alert("Erreur au chargement du produit, voir la console pour plus de détails");
                            reject();
                        }
                        for (const color of product.colors) {
                            this.list.push(new Product(
                                product._id,
                                color,
                                product.name,
                                product.description,
                                product.price,
                                product.imageUrl
                            ));
                        }
                    }
                    resolve();
                })
                .catch(function (err) {
                    console.error("Erreur", error);
                    reject();
                });
        })
    }

    //Requete réseau exécutéé à l'aide d'une promesse (resolve) ou rejetée (dans le cas echéant)
    //Pour un seul produit (id)

    loadingProduct(id) {
        return new Promise((resolve, reject) => {
            fetch("/api/teddies/" + id)
                .then(function (res) {
                    if (res.ok) {
                        return res.json();
                    }
                })
                .then(function (data) {
                    // Si ce n'est pas un produit, erreur
                    if (!Product.check(data)) {
                        console.error("Erreur", data, "Ce n'est pas un produit!");
                        alert("Erreur au chargement du produit, voir la console pour plus de détails");
                        reject();
                    }
                    resolve(data);
                })
                .catch(function (err) {
                    console.error("Erreur", error);
                    reject();
                });
        });
    }

    //On génère la liste des produits sans leur couleurs au choix pour ne pas avoir de produits doublons
    getProductsWithColorsNotUnique() {

        //Nouveau tableau où l'on mettra les objets sans leurs coloris au choix
        //C'est donc la liste des produits qu'on veut faire apparaitre sans les dérivés de couleur
        const newList = [];

        //Tableau qui vérifie les id des produits afin de les regrouper dans les objets adéquats
        const idList = [];

        //Pour les produits de cette liste :
        for (const product of this.list) {
            if (!idList.includes(product.id)) {
                idList.push(product.id);
                newList.push(product);
            }
        }

        //Notre nouvelle liste de produits sans dérivés de couleur est retournée 
        return newList;
    }
}