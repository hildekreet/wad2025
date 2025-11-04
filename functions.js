const endpoint = "https://jsonkeeper.com/b/3BI3A";
fetch(endpoint)
    .then(response => response.json())
    .then(data => {
        const posts = data.Posts;
        const container = document.getElementById("postsContainer");

        posts.forEach(post => {
            const postDiv = document.createElement("div");
            postDiv.classList.add("post");

            postDiv.innerHTML = `
            <h2>${post.title}</h2>
            <p><strong>Author:</strong> ${post.author}</p>
            <p>${post.content}</p>
            `;

            container.appendChild(postDiv);
        });
    })
    .catch(error => console.error("Viga andmete laadimisel:", error));


function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}