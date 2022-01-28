// $(document).ready(function() {
// 	async function getPriceBTC() {
// 		let response = await axios.get(
// 			'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,ADA,SOL,XRP,LUNA,DOT,DOGE,AVAX&tsyms=USD'
// 		);

// 		// console.log(response);
// 		return response;
// 	}

// 	async function showHTML() {
// 		const btcData = await getPriceBTC();
// 		// console.log(btcData);

// 		const list = document.getElementById('price-list');
// 		const listTop = document.createElement('tr');
// 		listTop.setAttribute('id', 'top-row');

// 		for (let y = 0; y < 10; y++) {
// 			const row = document.createElement('tr');

// 			for (let x = 0; x < 5; x++) {
// 				const cell = document.createElement('td');
// 				cell.setAttribute('id', `${y}-${x}`);
// 				if (x === 4) {
// 					cell.classList.add('far', 'fa-star', 'fav-star');
// 					cell.addEventListener('click', toggleFavorite);
// 				}
// 				row.append(cell);
// 			}
// 			list.append(row);
// 		}

// 		function toggleFavorite() {
// 			console.log('Its working!');
// 		}

// 		function insertData() {
// 			a0 = document.getElementById('0-0');
// 			a1 = document.getElementById('0-1');
// 			a2 = document.getElementById('0-2');
// 			a3 = document.getElementById('0-3');
// 			a4 = document.getElementById('0-4');
// 			a0.innerText = `${btcData.data.DISPLAY.BTC.USD.FROMSYMBOL} - Bitcoin`;
// 			a1.innerText = btcData.data.DISPLAY.BTC.USD.PRICE;
// 			a2.innerText = btcData.data.DISPLAY.BTC.USD.CHANGEPCTDAY;
// 			a3.innerText = btcData.data.DISPLAY.BTC.USD.MKTCAP;

// 			b0 = document.getElementById('1-0');
// 			b1 = document.getElementById('1-1');
// 			b2 = document.getElementById('1-2');
// 			b3 = document.getElementById('1-3');
// 			b4 = document.getElementById('1-4');
// 			b0.innerText = `${btcData.data.DISPLAY.ETH.USD.FROMSYMBOL} - Ethereum`;
// 			b1.innerText = btcData.data.DISPLAY.ETH.USD.PRICE;
// 			b2.innerText = btcData.data.DISPLAY.ETH.USD.CHANGEPCTDAY;
// 			b3.innerText = btcData.data.DISPLAY.ETH.USD.MKTCAP;

// 			c0 = document.getElementById('2-0');
// 			c1 = document.getElementById('2-1');
// 			c2 = document.getElementById('2-2');
// 			c3 = document.getElementById('2-3');
// 			c4 = document.getElementById('2-4');
// 			c0.innerText = `${btcData.data.DISPLAY.BNB.USD.FROMSYMBOL} - Binance Coin`;
// 			c1.innerText = btcData.data.DISPLAY.BNB.USD.PRICE;
// 			c2.innerText = btcData.data.DISPLAY.BNB.USD.CHANGEPCTDAY;
// 			c3.innerText = btcData.data.DISPLAY.BNB.USD.MKTCAP;

// 			d0 = document.getElementById('3-0');
// 			d1 = document.getElementById('3-1');
// 			d2 = document.getElementById('3-2');
// 			d3 = document.getElementById('3-3');
// 			d4 = document.getElementById('3-4');
// 			d0.innerText = `${btcData.data.DISPLAY.ADA.USD.FROMSYMBOL} - Cardano`;
// 			d1.innerText = btcData.data.DISPLAY.ADA.USD.PRICE;
// 			d2.innerText = btcData.data.DISPLAY.ADA.USD.CHANGEPCTDAY;
// 			d3.innerText = btcData.data.DISPLAY.ADA.USD.MKTCAP;

// 			e0 = document.getElementById('4-0');
// 			e1 = document.getElementById('4-1');
// 			e2 = document.getElementById('4-2');
// 			e3 = document.getElementById('4-3');
// 			e4 = document.getElementById('4-4');
// 			e0.innerText = `${btcData.data.DISPLAY.SOL.USD.FROMSYMBOL} - Solana`;
// 			e1.innerText = btcData.data.DISPLAY.SOL.USD.PRICE;
// 			e2.innerText = btcData.data.DISPLAY.SOL.USD.CHANGEPCTDAY;
// 			e3.innerText = btcData.data.DISPLAY.SOL.USD.MKTCAP;

// 			f0 = document.getElementById('5-0');
// 			f1 = document.getElementById('5-1');
// 			f2 = document.getElementById('5-2');
// 			f3 = document.getElementById('5-3');
// 			f4 = document.getElementById('5-4');
// 			f0.innerText = `${btcData.data.DISPLAY.XRP.USD.FROMSYMBOL} - XRP`;
// 			f1.innerText = btcData.data.DISPLAY.XRP.USD.PRICE;
// 			f2.innerText = btcData.data.DISPLAY.XRP.USD.CHANGEPCTDAY;
// 			f3.innerText = btcData.data.DISPLAY.XRP.USD.MKTCAP;

// 			g0 = document.getElementById('6-0');
// 			g1 = document.getElementById('6-1');
// 			g2 = document.getElementById('6-2');
// 			g3 = document.getElementById('6-3');
// 			g4 = document.getElementById('6-4');
// 			g0.innerText = `${btcData.data.DISPLAY.LUNA.USD.FROMSYMBOL} - LUNA`;
// 			g1.innerText = btcData.data.DISPLAY.LUNA.USD.PRICE;
// 			g2.innerText = btcData.data.DISPLAY.LUNA.USD.CHANGEPCTDAY;
// 			g3.innerText = btcData.data.DISPLAY.LUNA.USD.MKTCAP;

// 			h0 = document.getElementById('7-0');
// 			h1 = document.getElementById('7-1');
// 			h2 = document.getElementById('7-2');
// 			h3 = document.getElementById('7-3');
// 			h4 = document.getElementById('7-4');
// 			h0.innerText = `${btcData.data.DISPLAY.DOT.USD.FROMSYMBOL} - Polkadot`;
// 			h1.innerText = btcData.data.DISPLAY.DOT.USD.PRICE;
// 			h2.innerText = btcData.data.DISPLAY.DOT.USD.CHANGEPCTDAY;
// 			h3.innerText = btcData.data.DISPLAY.DOT.USD.MKTCAP;

// 			i0 = document.getElementById('8-0');
// 			i1 = document.getElementById('8-1');
// 			i2 = document.getElementById('8-2');
// 			i3 = document.getElementById('8-3');
// 			i4 = document.getElementById('8-4');
// 			i0.innerText = `${btcData.data.DISPLAY.DOGE.USD.FROMSYMBOL} - Dogecoin`;
// 			i1.innerText = btcData.data.DISPLAY.DOGE.USD.PRICE;
// 			i2.innerText = btcData.data.DISPLAY.DOGE.USD.CHANGEPCTDAY;
// 			i3.innerText = btcData.data.DISPLAY.DOGE.USD.MKTCAP;

// 			j0 = document.getElementById('9-0');
// 			j1 = document.getElementById('9-1');
// 			j2 = document.getElementById('9-2');
// 			j3 = document.getElementById('9-3');
// 			j4 = document.getElementById('9-4');
// 			j0.innerText = `${btcData.data.DISPLAY.AVAX.USD.FROMSYMBOL} - Avalanche`;
// 			j1.innerText = btcData.data.DISPLAY.AVAX.USD.PRICE;
// 			j2.innerText = btcData.data.DISPLAY.AVAX.USD.CHANGEPCTDAY;
// 			j3.innerText = btcData.data.DISPLAY.AVAX.USD.MKTCAP;
// 		}
// 		insertData();
// 	}
// 	showHTML();
// });

async function getPriceBTC() {
	let response = await axios.get(
		'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,ADA,SOL,XRP,LUNA,DOT,DOGE,AVAX&tsyms=USD'
	);

	// console.log(response);
	return response;
}

async function showHTML() {
	const btcData = await getPriceBTC();
	// console.log(btcData);

	const list = document.getElementById('price-list');
	const listTop = document.createElement('tr');
	listTop.setAttribute('id', 'top-row');

	for (let y = 0; y < 10; y++) {
		const row = document.createElement('tr');

		for (let x = 0; x < 5; x++) {
			const cell = document.createElement('td');
			cell.setAttribute('id', `${y}-${x}`);
			if (x === 4) {
				cell.classList.add('far', 'fa-star', 'fav-star');
				cell.addEventListener('click', toggleFavorite);
			}
			row.append(cell);
		}
		list.append(row);
	}

	function insertData() {
		a0 = document.getElementById('0-0');
		a1 = document.getElementById('0-1');
		a2 = document.getElementById('0-2');
		a3 = document.getElementById('0-3');
		a4 = document.getElementById('0-4');
		a0.innerText = `${btcData.data.DISPLAY.BTC.USD.FROMSYMBOL} - Bitcoin`;
		a1.innerText = btcData.data.DISPLAY.BTC.USD.PRICE;
		a2.innerText = btcData.data.DISPLAY.BTC.USD.CHANGEPCTDAY;
		a3.innerText = btcData.data.DISPLAY.BTC.USD.MKTCAP;

		b0 = document.getElementById('1-0');
		b1 = document.getElementById('1-1');
		b2 = document.getElementById('1-2');
		b3 = document.getElementById('1-3');
		b4 = document.getElementById('1-4');
		b0.innerText = `${btcData.data.DISPLAY.ETH.USD.FROMSYMBOL} - Ethereum`;
		b1.innerText = btcData.data.DISPLAY.ETH.USD.PRICE;
		b2.innerText = btcData.data.DISPLAY.ETH.USD.CHANGEPCTDAY;
		b3.innerText = btcData.data.DISPLAY.ETH.USD.MKTCAP;

		c0 = document.getElementById('2-0');
		c1 = document.getElementById('2-1');
		c2 = document.getElementById('2-2');
		c3 = document.getElementById('2-3');
		c4 = document.getElementById('2-4');
		c0.innerText = `${btcData.data.DISPLAY.BNB.USD.FROMSYMBOL} - Binance Coin`;
		c1.innerText = btcData.data.DISPLAY.BNB.USD.PRICE;
		c2.innerText = btcData.data.DISPLAY.BNB.USD.CHANGEPCTDAY;
		c3.innerText = btcData.data.DISPLAY.BNB.USD.MKTCAP;

		d0 = document.getElementById('3-0');
		d1 = document.getElementById('3-1');
		d2 = document.getElementById('3-2');
		d3 = document.getElementById('3-3');
		d4 = document.getElementById('3-4');
		d0.innerText = `${btcData.data.DISPLAY.ADA.USD.FROMSYMBOL} - Cardano`;
		d1.innerText = btcData.data.DISPLAY.ADA.USD.PRICE;
		d2.innerText = btcData.data.DISPLAY.ADA.USD.CHANGEPCTDAY;
		d3.innerText = btcData.data.DISPLAY.ADA.USD.MKTCAP;

		e0 = document.getElementById('4-0');
		e1 = document.getElementById('4-1');
		e2 = document.getElementById('4-2');
		e3 = document.getElementById('4-3');
		e4 = document.getElementById('4-4');
		e0.innerText = `${btcData.data.DISPLAY.SOL.USD.FROMSYMBOL} - Solana`;
		e1.innerText = btcData.data.DISPLAY.SOL.USD.PRICE;
		e2.innerText = btcData.data.DISPLAY.SOL.USD.CHANGEPCTDAY;
		e3.innerText = btcData.data.DISPLAY.SOL.USD.MKTCAP;

		f0 = document.getElementById('5-0');
		f1 = document.getElementById('5-1');
		f2 = document.getElementById('5-2');
		f3 = document.getElementById('5-3');
		f4 = document.getElementById('5-4');
		f0.innerText = `${btcData.data.DISPLAY.XRP.USD.FROMSYMBOL} - XRP`;
		f1.innerText = btcData.data.DISPLAY.XRP.USD.PRICE;
		f2.innerText = btcData.data.DISPLAY.XRP.USD.CHANGEPCTDAY;
		f3.innerText = btcData.data.DISPLAY.XRP.USD.MKTCAP;

		g0 = document.getElementById('6-0');
		g1 = document.getElementById('6-1');
		g2 = document.getElementById('6-2');
		g3 = document.getElementById('6-3');
		g4 = document.getElementById('6-4');
		g0.innerText = `${btcData.data.DISPLAY.LUNA.USD.FROMSYMBOL} - LUNA`;
		g1.innerText = btcData.data.DISPLAY.LUNA.USD.PRICE;
		g2.innerText = btcData.data.DISPLAY.LUNA.USD.CHANGEPCTDAY;
		g3.innerText = btcData.data.DISPLAY.LUNA.USD.MKTCAP;

		h0 = document.getElementById('7-0');
		h1 = document.getElementById('7-1');
		h2 = document.getElementById('7-2');
		h3 = document.getElementById('7-3');
		h4 = document.getElementById('7-4');
		h0.innerText = `${btcData.data.DISPLAY.DOT.USD.FROMSYMBOL} - Polkadot`;
		h1.innerText = btcData.data.DISPLAY.DOT.USD.PRICE;
		h2.innerText = btcData.data.DISPLAY.DOT.USD.CHANGEPCTDAY;
		h3.innerText = btcData.data.DISPLAY.DOT.USD.MKTCAP;

		i0 = document.getElementById('8-0');
		i1 = document.getElementById('8-1');
		i2 = document.getElementById('8-2');
		i3 = document.getElementById('8-3');
		i4 = document.getElementById('8-4');
		i0.innerText = `${btcData.data.DISPLAY.DOGE.USD.FROMSYMBOL} - Dogecoin`;
		i1.innerText = btcData.data.DISPLAY.DOGE.USD.PRICE;
		i2.innerText = btcData.data.DISPLAY.DOGE.USD.CHANGEPCTDAY;
		i3.innerText = btcData.data.DISPLAY.DOGE.USD.MKTCAP;

		j0 = document.getElementById('9-0');
		j1 = document.getElementById('9-1');
		j2 = document.getElementById('9-2');
		j3 = document.getElementById('9-3');
		j4 = document.getElementById('9-4');
		j0.innerText = `${btcData.data.DISPLAY.AVAX.USD.FROMSYMBOL} - Avalanche`;
		j1.innerText = btcData.data.DISPLAY.AVAX.USD.PRICE;
		j2.innerText = btcData.data.DISPLAY.AVAX.USD.CHANGEPCTDAY;
		j3.innerText = btcData.data.DISPLAY.AVAX.USD.MKTCAP;
	}
	insertData();
}
showHTML();

// function toggleFavorite() {
// 	console.log('Its working!');
// }

async function toggleFavorite() {
	await axios.get(
		'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,ADA,SOL,XRP,LUNA,DOT,DOGE,AVAX&tsyms=USD'
	);
	console.log('Its working!');
}
