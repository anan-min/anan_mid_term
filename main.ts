class Product {
    name: string;
    price: number;
    category: string; 
    static total_product: number = 0;

    // search chatgpt for static method and attribute but not asking it to generate code
    constructor(name: string, price: number, category: string) {
        this.name = name;
        this.price = price;
        this.category = category;
        Product.total_product += 1;
    }
    
    public updatePrice(newPrice: number) {
        this.price = newPrice;
    }
    public getProductInfo(): string {
        return `Product Info:\n 
                name: ${this.name}\n
                price: ${this.price}
                \n category: ${this.category}`
    }

    public totalProducts():number {
        return Product.total_product;
    }

}


class DiscountedProduct extends Product {
    discountRate: number 

    // search slide for polymorph and super
    constructor(name: string, price: number, category: string, discountRate: number) {
        super(name, price, category)
        this.discountRate = discountRate
    }

    public getProductInfo(): string {
        const finalPrice: number = this.price * (1 - this.discountRate);
        return `Product Info:\n 
                name: ${this.name}\n 
                discountRate: ${this.discountRate}\n 
                price: ${this.price}\n 
                final price: ${finalPrice}\n  
                category: ${this.category}`
    }
}


const product1: Product = new Product("productA", 100, "box");
product1.updatePrice(120);
const productInfo1 = product1.getProductInfo();
console.log(productInfo1);


const discount_product1: DiscountedProduct = new DiscountedProduct("productB", 100, "box", 0.10)
discount_product1.updatePrice(120);
const productInfo2 = discount_product1.getProductInfo();
console.log(productInfo2);


interface Customer {
    name: string; 
    email: string; 
    orders: Array<Product>;
    getCustomerInfo(): string
}


class  CustomerExample implements Customer{
    name: string; 
    email: string; 
    orders: Array<Product>;

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
        this.orders = [];
    }
    // search chatgpt for method to find size of array 
    public getCustomerInfo(): string {
        return `Customer Info:\n 
        name: ${this.name}\n 
        email: ${this.email}\n 
        number of orders: ${this.orders.length}\n`;
    }
}


function getCustomerInfo(customer: Customer): string {
    return customer.getCustomerInfo();
}

// search for generic type checking 
class Inventory<T extends Product> {
    items: Array<T>;

    constructor() { 
        this.items = [];
    }

    public addItem(newItem: T) {
        this.items.push(newItem);
    }

    public listItems() {
        return this.items;
    }
}


function createPriceMultiplier(multiplier: number): (product: Product) => number {
    return function(product: Product): number {
        return product.price * multiplier;
    }
}


const tax: number = 0.07;
const applyTax: (product: Product) => number = createPriceMultiplier(1 + tax);




async function fetchProductData(): Promise<Product | undefined>{ 
    try {
        const fail_rate = Math.random();

        const response = await new Promise<Product>((resolve, reject) => {
            setTimeout(() => {
                const product = new Product("ProductA", 100, "A");
                if(fail_rate > 0.8) {
                    resolve(product)
                } else {
                    reject(new Error("404 Failed to fecth Product"))
                } 
            }, 200)
        });
        return response;
    } catch(error) {
        console.error(`error: can't fetching data ${error}`);
        return undefined;
    }
}

async function testAsync() {
    for (let i = 0; i < 10; i++) {
        console.log(`Fetching product #${i}`);
        let product: Product | undefined = await fetchProductData(); // Use await here
        console.log(product);
    }
}


testAsync();


function generateProducts(): Array<Product> {
    const products: Product[] = [];
    products.push(new Product("productA", 10, "A"));
    products.push(new Product("productB", 30, "B"));
    products.push(new Product("productC", 50, "C"));
    products.push(new Product("productD", 70, "D"));
    products.push(new Product("productE", 90, "E"));
    products.push(new Product("productF", 110, "F"));
    products.push(new Product("productG", 130, "G"));
    products.push(new Product("productH", 150, "H"));
    products.push(new Product("productJ", 170, "J"));
    products.push(new Product("productK", 190, "K"));
    
    return products;
}


const productsList: Array<Product> = generateProducts();
const productOver100: Array<Product> = productsList.filter(product => product.price > 100);
const productNames: Array<string> = productsList.map(product => product.name);
const totalCost: number = productsList.reduce((totalPrice, product) => totalPrice + product.price, 0);



console.log(`Product Over 100:\n`);
for (let i = 0; i < productOver100.length; i++) {
    const product = productOver100[i];
    console.log(product.getProductInfo());
}
console.log(`Product Names: ${productNames}`);
console.log(`Total Cost: ${totalCost}`);



function parseProductData(jsonData: string) {
    try {
        return JSON.parse(jsonData);
    } catch(err) {
        console.log(`Product data parsing failed error: ${err}`);
    }
}


console.log("start parsing");


// correct and incorrect json generated from chatgpt 
const correctJson: string =  `{
    "name": "ProductA",
    "price": 100,
    "category": "A"
}`;
const incorrectJson: string = '{"name": "ProductA", "price": 100, "category": "A"';

for (let i = 0; i < 10; i++) {
    const failRate: number = Math.random();
    if (failRate > 0.8) {
        parseProductData(incorrectJson);
    } else {
        parseProductData(correctJson);
        console.log("parsed successfully");
    }
}


