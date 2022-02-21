const BASE_URL = 'http://localhost:5000/api';

const $star = $('fas fa-star');

async function getPriceBTC() {
	let response = await axios.get(
		'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,ADA,SOL,XRP,LUNA,DOT,DOGE,AVAX&tsyms=USD'
	);
	return response;
}

async function showHomeHTML() {
	const btcData = await getPriceBTC();
	const cryptos = Object.entries(btcData.data.DISPLAY);
	// console.log(cryptos);

	const list = document.getElementById('price-list');
	const listTop = document.createElement('tr');
	listTop.setAttribute('id', 'top-row');

	cryptos.forEach((crypto) => {
		const row = document.createElement('tr');
		row.setAttribute('id', crypto[0]);

		for (let x = 0; x < 5; x++) {
			const cell = document.createElement('td');

			if (x === 0) {
				cell.addEventListener('click', () => viewDetails(crypto));
				console.log(crypto);
				cell.classList.add('clickable-field');
				cell.innerText = `$${crypto[0]}`;
			}
			if (x === 1) {
				cell.innerText = crypto[1].USD.PRICE;
				cell.addEventListener('click', () => viewDetails(crypto));
				cell.classList.add('clickable-field');
			}
			if (x === 2) {
				cell.innerText = crypto[1].USD.CHANGEPCTDAY;
				cell.addEventListener('click', () => viewDetails(crypto));
				cell.classList.add('clickable-field');
			}
			if (x === 3) {
				cell.addEventListener('click', () => viewDetails(crypto));
				cell.classList.add('clickable-field');
				cell.innerText = crypto[1].USD.MKTCAP;
			}
			if (x === 4) {
				cell.classList.add('far', 'fa-star', 'clickable-field');
				cell.addEventListener('click', () => toggleFavorite(crypto, cell));
			}
			row.append(cell);
		}
		list.append(row);
	});
}
showHomeHTML();

// function favoritesToDetails(id){

// }

function viewDetails(crypto) {
	// window.location.href = `/info/${crypto[0]}/`;

	window.location.href = `/info/${crypto[0]}/
								${crypto[1].USD.PRICE}/
								${crypto[1].USD.CHANGEPCTDAY}/
								${crypto[1].USD.MKTCAP}
								`;
	// console.log(crypto[1].USD);
	getInfo(crypto[0]);
}

// far fa-star = blank
// fas fa-star = yellow
// let favorited = localStorage.getItem("favorited")

async function toggleFavorite(crypto, targetCell) {
	const $target = $(targetCell);

	if ($target.hasClass('far')) {
		$target.closest('td').toggleClass('far fas');
		// localStorage.setItem('favorited', 'true');

		addFavorite(crypto[0]);
	} else if ($target.hasClass('fas')) {
		$target.closest('td').toggleClass('fas far');
		// localStorage.setItem('favorited', null);

		removeFavorite(crypto[1].USD.FROMSYMBOL);
	}
}

async function addFavorite(crypto) {
	let symbol = crypto;
	let user_id = 1;

	let res = await axios.get(`${BASE_URL}/cryptos`);
	let array = res.data.cryptos;

	for (let x = 0; x < array.length; x++) {
		if (array[x].crypto_name === symbol) {
			console.log('ADDED TO FAVORITES!');
			postFavorite(array[x].id);
		}
	}
	window.location.href = `/users/${user_id}`;
}

async function getCryptos(correct_id) {
	let id = correct_id;
	console.log(id);

	const res = await axios.get('http://localhost:5000/api/cryptos');
	let array = res.data.cryptos;
	console.log(id);

	for (let x = 0; x < array.length; x++) {
		// console.log(array[x].id);
		// console.log(array[x].crypto_name);
		if (array[x].id == id) {
			let name = array[x].crypto_name;
			let mc = array[x].marketcap;
			let percent = array[x].percent;
			let price = array[x].price;
			console.log(name, mc, percent, price);
			window.location.href = `/info/${name}/
								${price}/
								${percent}/
								${mc}
								`;
		}
	}
}

async function removeFavorite(crypto) {
	let symbol = crypto;
	user_id = 1;

	let res = await axios.get(`${BASE_URL}/cryptos`);
	let array = res.data.cryptos;

	for (let x = 0; x < array.length; x++) {
		if (array[x].crypto_name === symbol) {
			deleteFavorite(array[x].id);
		}
	}
}

async function postFavorite(id) {
	const crypto_id = id;
	let user_id = 1;

	const newFavoriteResponse = await axios.post(`${BASE_URL}/favorites/${user_id}`, {
		user_id,
		crypto_id
	});
	return newFavoriteResponse;
}

async function deleteFavorite(id) {
	const crypto_id = id;
	let user_id = 1;

	const deleteFavoriteResponse = await axios.delete(`${BASE_URL}/favorites/${crypto_id}`, {
		user_id,
		crypto_id
	});
	console.log('DELETED FROM FAVORITES!');
	window.location.href = `/users/${user_id}`;
	return deleteFavoriteResponse;
}

// ####### CALL THE DB TO SEE IF THE COIN CLICKED IS A FAVORITE ##############

async function isFavorite(crypto) {
	let symbol = crypto;
	// console.log(symbol);

	let cryptosRes = await axios.get(`${BASE_URL}/cryptos`);
	let array = cryptosRes.data.cryptos;
	// console.log(array);

	for (x = 0; x < array.length; x++) {
		if (array[x].crypto_name === symbol) {
			// console.log(array[x].id);
			checkFavorite(array[x].id);
		}
	}
}

// async function checkFavorite(id) {
// 	const res = await axios.get(`${BASE_URL}/favorites`);
// 	let array = res.data.favorites;

// 	for (let x = 0; x < array.length; x++) {
// 		if (array[x].crypto_id === id) {
// 			return true;
// 		} else return false;
// 	}
// }

// ############# Update Cryptos Table In DataBase ############################

async function updateDatabase() {
	const btcData = await getPriceBTC();
	const cryptos = Object.entries(btcData.data.DISPLAY);

	cryptos.forEach((crypto) => {
		for (let x = 0; x < 5; x++) {
			if (x === 0) symbol = crypto[0];
			if (x === 1) price = crypto[1].USD.PRICE;
			if (x === 2) percent = crypto[1].USD.CHANGEPCTDAY;
			if (x === 3) marketcap = crypto[1].USD.MKTCAP;
		}
		addToDatabase(symbol, price, percent, marketcap);
	});
}

async function addToDatabase(crypto_name, price, percent, marketcap) {
	const databaseUpdate = await axios.post(`${BASE_URL}/cryptos`, {
		crypto_name,
		price,
		percent,
		marketcap
	});
	return databaseUpdate;
}
