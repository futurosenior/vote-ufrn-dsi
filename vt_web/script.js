function createVoteCard(vote) {
    return `
      <div class="vote-card">
        <p>Nome: ${vote.userName}</p>
        <p>Melhor Sistema Operacional: ${vote.os}</p>
        <p>Melhor Linguagem de Programação: ${vote.language}</p>
        <p>Melhor Framework: ${vote.framework}</p>
        <p>Melhor Banco de Dados: ${vote.database}</p>
        <p>Melhor Serviço de Armazenamento em Nuvem: ${vote.cloud}</p>
      </div>
    `;
}

async function fetchVotes() {
    try {
        const response = await fetch("http://localhost:3000/votes");

        if (!response.ok) {
            throw new Error("Erro ao buscar os votos.");
        }

        const votes = await response.json();
        const voteCards = votes.map(createVoteCard).join('');
        document.querySelector("#results").innerHTML = voteCards;

        const voteCount = votes.length;
        const voteCountMessage = `Já temos ${voteCount} voto(s)! Participe e vote também!`;
        document.querySelector("#vote-count-message").textContent = voteCountMessage;

    } catch (error) {
        console.error("Erro ao buscar os votos:", error);
    }
}

fetchVotes();

document.getElementById("voting-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const userName = document.getElementById("userName").value;
    const os = document.querySelector('input[name="os"]:checked').value;
    const language = document.querySelector('input[name="language"]:checked').value;
    const framework = document.querySelector('input[name="framework"]:checked').value;
    const database = document.querySelector('input[name="database"]:checked').value;
    const cloud = document.querySelector('input[name="cloud"]:checked').value;

    if (!userName || !os || !language || !framework || !database || !cloud) {
        alert("Campo obrigatório!");
        return;
    }

    const data = {
        userName,
        os,
        language,
        framework,
        database,
        cloud,
    };

    try {
        const response = await fetch("http://localhost:3000/vote", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Erro ao enviar os dados.");
        }

        await response.json();
        console.log("Dados enviados com sucesso");

        clearFormFields();

        fetchVotes();

    } catch (error) {
        console.error("Erro ao enviar os dados:", error);
    }
});

function clearFormFields() {
    document.getElementById("userName").value = "";
    document.querySelectorAll('input[name="os"]').forEach(input => input.checked = false);
    document.querySelectorAll('input[name="language"]').forEach(input => input.checked = false);
    document.querySelectorAll('input[name="framework"]').forEach(input => input.checked = false);
    document.querySelectorAll('input[name="database"]').forEach(input => input.checked = false);
    document.querySelectorAll('input[name="cloud"]').forEach(input => input.checked = false);
}
