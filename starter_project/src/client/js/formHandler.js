import { validateUrl } from './urlValidator';

const serverURL = "http://localhost:8000/api";

async function handleSubmit(event) {
    event.preventDefault();
    const urlInput = document.getElementById('urlInput').value.trim();

    if (!validateUrl(urlInput)) {
        alert('Please enter a valid URL starting with "http://" or "https://".');
        return;
    }

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<p>Loading analysis...</p>';

    try {
        const response = await fetch(`${serverURL}/analyze`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: urlInput }),
        });

        const data = await response.json();

        if (response.ok) {
            updateUI(data);
        } else {
            throw new Error(data.message || "Unknown server error");
        }
    } catch (error) {
        console.error("Error during API call:", error);
        resultsDiv.innerHTML = `<p class="error">Error: ${error.message}. Please try again later.</p>`;
    }
}

function updateUI(data) {
    const resultsDiv = document.getElementById('results');
    console.log("API Data Received:", data);

    const entities = data.entities.length ? data.entities.map(e => e.id).join(', ') : 'None';
    const topics = data.topics.length ? data.topics.map(t => t.label).join(', ') : 'None';
    const sentiment = data.sentiment && data.sentiment.type && data.sentiment.score
        ? `${data.sentiment.type} (${data.sentiment.score})`
        : 'Not Available';

    resultsDiv.innerHTML = `
        <h3>Analysis Results</h3>
        <p><strong>Entities:</strong> ${entities}</p>
        <p><strong>Topics:</strong> ${topics}</p>
        <p><strong>Sentiment:</strong> ${sentiment}</p>
    `;
}

export { handleSubmit };
