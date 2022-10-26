const BASE_URL = 'http://localhost:5000/api';
const BASE_URL = 'postgres://oqnqrnrwlqgmpn:c4d882dae4d55862315396e4e6edb18794936595ea8598173e126e7199660c2a@ec2-52-86-115-245.compute-1.amazonaws.com:5432/d3cqh84h8oub6o/api';

class Favorite {
	constructor({ favoriteId, userId, cryptoId }) {
		this.favoriteId = favoriteId;
		this.userId = userId;
		this.cryptoId = cryptoId;
	}
}

class User {
	constructor({ name, username, favorites = [] }, token) {
		this.name = name;
		this.username = username;

		this.favorites = favorites.map((s) => new Favorite(s));

		this.loginToken = token;
	}

	async addFavorite(crypto) {
		this.favorites.push(crypto);
		await this._addOrRemoveFavorite('add', crypto);
	}

	async removeFavorite(crypto) {
		this.favorites = this.favorites.filter((s) => s.cryptoId !== crypto.cryptoId);
		await this._addOrRemoveFavorite('remove', crypto);
	}

	async _addOrRemoveFavorite(newState, crypto) {
		const method = newState === 'add' ? 'POST' : 'DELETE';
		const token = this.loginToken;
		await axios({
			url: `${BASE_URL}/users/${this.username}/favorites/${crypto.cryptoId}`,
			method: method,
			data: { token }
		});
	}

	isFavorite(crypto) {
		return this.favorites.some((s) => s.cryptoId === crypto.cryptoId);
	}
}
