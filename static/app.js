let BASE_URL = 'http://localhost:5000/api';
BASE_URL = "https://cryptocrunch2.herokuapp.com/api"

// if (process.env.BASE_URL) {
// 	BASE_URL = process.env.BASE_URL
// }

console.log(BASE_URL)

const $star = $('fas fa-star');

async function getPriceBTC() {
	let response = await axios.get(
		'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,ADA,SOL,XRP,LUNA,DOT,DOGE,AVAX&tsyms=USD'
	);
	console.log('RESPONSE:', response)
	return response;

}

async function showHomeHTML() {
	const btcData = await getPriceBTC();
	const favorites = await axios.get(`${BASE_URL}/favorites`);
	const dbCryptos = await axios.get(`${BASE_URL}/cryptos`);
	const cryptos = Object.entries(btcData.data.DISPLAY);
	let cryptoIds = dbCryptos.data.cryptos;
	let favoritesArray = favorites.data.favorites;

	let favoriteIds = favoritesArray.map((val) => {
		return val.crypto_id;
	})

	let favoriteList = []
	for (let i = 0; i < favoriteIds.length; i++) {
		for (let j = 0; j < cryptoIds.length; j++) {
			if (favoriteIds[i] === cryptoIds[j].id) favoriteList.push(cryptoIds[j].crypto_name);
		}
	}

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
				if (favoriteList.includes(crypto[0])) {
					cell.classList.add('fas', 'fa-star', 'clickable-field');
					cell.addEventListener('click', () => toggleFavorite(crypto, cell));
				} else {
					cell.classList.add('far', 'fa-star', 'clickable-field');
					cell.addEventListener('click', () => toggleFavorite(crypto, cell));
				}

			}
			row.append(cell);
		}
		list.append(row);
	});
}
showHomeHTML();



function viewDetails(crypto) {

	window.location.href = `/info/${crypto[0]}/
								${crypto[1].USD.PRICE}/
								${crypto[1].USD.CHANGEPCTDAY}/
								${crypto[1].USD.MKTCAP}
								`;
}

async function toggleFavorite(crypto, targetCell) {
	const dbCryptos = await axios.get(`${BASE_URL}/cryptos`);
	let cryptoIds = dbCryptos.data.cryptos;

	const $target = $(targetCell);

	if ($target.hasClass('far')) {
		$target.closest('td').toggleClass('far fas');

		addFavorite(crypto[0]);
	} else if ($target.hasClass('fas')) {
		$target.closest('td').toggleClass('fas far');
		let symbol = $target.closest('tr')[0].id
		let result = [];

		cryptoIds.forEach((val) => {
			if (val.crypto_name === symbol) result.push(val.id);
		})
		deleteFavorite(result[0]);
	}
}


async function addFavorite(crypto) {
	let symbol = crypto;

	let res = await axios.get(`${BASE_URL}/cryptos`);
	let array = res.data.cryptos;

	for (let x = 0; x < array.length; x++) {
		if (array[x].crypto_name === symbol) {
			postFavorite(array[x].id);
		}
	}
	window.location.href = `/`;
}


async function getCryptos(correct_id) {
	let id = correct_id;

	const res = await axios.get('postgresql://bgsqezwevwkfde:cea636a3441094a66d7e15bdad100e38c81cb92e7c208f856dc4c56038bea46a@ec2-44-208-236-253.compute-1.amazonaws.com:5432/d2aaihl67gif0h/api/cryptos');
	let array = res.data.cryptos;

	for (let x = 0; x < array.length; x++) {

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

	const newFavoriteResponse = await axios.post(`${BASE_URL}/favorites/${user_id}`, {
		user_id,
		crypto_id
	});
	return newFavoriteResponse;
}

async function deleteFavorite(id) {
	const crypto_id = id;

	const deleteFavoriteResponse = await axios.delete(`${BASE_URL}/favorites/${crypto_id}`, {
		user_id,
		crypto_id
	});
	location.reload();
	return deleteFavoriteResponse;
}

// ####### CALL THE DB TO SEE IF THE COIN CLICKED IS A FAVORITE ##############

async function isFavorite(crypto) {
	let symbol = crypto;

	let cryptosRes = await axios.get(`${BASE_URL}/cryptos`);
	let array = cryptosRes.data.cryptos;

	for (x = 0; x < array.length; x++) {
		if (array[x].crypto_name === symbol) {
			checkFavorite(array[x].id);
		}
	}
}

// ############# Update Cryptos Table In DataBase ##########################

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