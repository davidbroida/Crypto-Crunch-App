async function getNews() {
	let res = await axios.get('https://min-api.cryptocompare.com/data/v2/news/?lang=EN');
	return res;
}

function generateHTML(story) {
	return `
    <hr>
    <div class="news-block">
    <img class="news-image" src="${story.imageurl}" alt="story-image">
    <h3><b><a class="story-title" href="${story.url}">${story.title}</a></b></h3>
    <p><b>${story.body}</b></p>
    <p> Tags: ${story.tags}</p>
    <p> Source: ${story.source}</p>

    </div>`;
}

async function showNewsHTML() {
	const response = await getNews();
	let news = response.data.Data;

	for (let x = 0; x < 5; x++) {
		let newStory = generateHTML(news[x]);
		$('#news-section').append(newStory);
	}
}
showNewsHTML();
