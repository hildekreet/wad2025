const endpoint = "https://jsonkeeper.com/b/XNJR3";
fetch(endpoint)
    .then(response => response.json())
    .then(data => {
        const posts = data.Posts;
        const container = document.getElementById("postsContainer");

        posts.forEach(post => {
            const postDiv = document.createElement("div");
            postDiv.classList.add("post");

            let imageHTML = "";
            if (post.image_base64) {
                imageHTML = `<img src="${post.image_base64}" alt="Post image" class="post-image">`;
            }

            const date = new Date(post.created_at);
            const formattedDate = date.toLocaleDateString("en-GB", {
                year: "numeric",
                month: "short",
                day: "2-digit",
            });
            const formattedTime = date.toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            });
            const dateTime = `${formattedDate} ${formattedTime}`;

            postDiv.innerHTML = `
            <p><strong>Author:</strong> ${post.author}</p>
            <p><strong>Date:</strong> ${dateTime}</p>
            ${imageHTML}
            <p>${post.content}</p>
            `;

            container.appendChild(postDiv);
        });
    })
    .catch(error => console.error("Viga andmete laadimisel:", error));


function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

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