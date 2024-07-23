
import {revalidateTag} from 'next/cache'
interface Product {
    id: number
    title: string
    price: number
}
async function Shop() {

    const response = await fetch('http://localhost:4000/products'
     , {
        cache: 'no-cache',
        next: {
            tags: ['products']
        }
     })
     
    let products: Product[] = await response.json();

    async function addProduct(e: FormData) {
       'use server' 

       const title = e.get('title')
       const price = e.get('price')

       const newProduct = {
          title: title ,
          price: price 
       }

       await fetch('http://localhost:4000/products', {
           method: 'POST',
           body: JSON.stringify(newProduct),
           headers: {
               'Content-Type': 'application/json'

           }
       })

       revalidateTag('products')
    }

    return (
        <div>
            <form className="flex flex-col gap-5 max-w-xl bg-slate-800 rounded-md p-5 mx-auto" action={addProduct}>
                <input 
                type="text"
                name="title"
                placeholder="title"
                className="p-2 bg-slate-700 rounded-md outline-none" 
                />
                <input 
                type="text"
                name="price"
                placeholder="price"
                className="p-2 bg-slate-700 rounded-md outline-none"
                />
                <button className="p-2 bg-slate-900">Add Product</button>
            </form>
            <div className="flex flex-wrap gap-5 max-w-xl justify-center rounded-md p-5 mx-auto">
                {products.map((product) => (
                    <div key={product.id} className="p-5 bg-slate-700 rounded-md text-center">
                        <p>{product.title}</p>
                        <p>{product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}    
export default Shop