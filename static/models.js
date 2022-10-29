const BASE_URL = 'postgres://zwmjwzvorpgvjb:6ba7262eca88075042223d650543f94962968ba8bfb6d6a88bf232a91c57f5bc@ec2-54-160-200-167.compute-1.amazonaws.com:5432/d4g5nalsb97atb/api';

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
