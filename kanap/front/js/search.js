let productData = [];

async function loadData()
{
	fetch("http://localhost:3000/api/products/")
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			return data;
		});
        return productData
}

window.onload = async function()
{
	let productData = await loadData();
    console.log("data:", productData);
};