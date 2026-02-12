const API_URL = "http://localhost:3000";

// Fetch and display all posts
async function loadPosts() {
    try {
        const response = await fetch(`${API_URL}/posts`);
        const posts = await response.json();

        const postsList = document.getElementById("postsList");
        postsList.innerHTML = "";

        if (posts.length === 0) {
            postsList.innerHTML = "<p>No posts yet. Create your first post!</p>";
            return;
        }

        posts.forEach(post => {
            const postDiv = document.createElement("div");
            postDiv.className = "post";
            postDiv.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <div class="post-meta">
                    Author ID: ${post.authorId} | Category ID: ${post.categoryId}
                </div>
                <div class="post-buttons">
                    <button class="delete-btn" onclick="deletePost(${post.id})">Delete</button>
                </div>
            `;
            postsList.appendChild(postDiv);
        });
    } catch (error) {
        document.getElementById("postsList").innerHTML = `<p>Error loading posts: ${error.message}</p>`;
    }
}

// Add new post
document.getElementById("postForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const newPost = {
        title: document.getElementById("title").value,
        content: document.getElementById("content").value,
        authorId: parseInt(document.getElementById("authorId").value),
        categoryId: parseInt(document.getElementById("categoryId").value)
    };

    try {
        const response = await fetch(`${API_URL}/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPost)
        });

        if (!response.ok) throw new Error("Failed to add post");

        const result = await response.json();
        showMessage(`✓ Post added successfully! ID: ${result.id}`, "success");

        // Clear form
        document.getElementById("postForm").reset();

        // Reload posts
        loadPosts();
    } catch (error) {
        showMessage(`✗ Error: ${error.message}`, "error");
    }
});

// Delete post
async function deletePost(id) {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
        const response = await fetch(`${API_URL}/posts/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) throw new Error("Failed to delete post");

        showMessage("✓ Post deleted successfully!", "success");
        loadPosts();
    } catch (error) {
        showMessage(`✗ Error: ${error.message}`, "error");
    }
}

// Show message
function showMessage(text, type) {
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;

    setTimeout(() => {
        messageDiv.className = "message";
    }, 3000);
}

// Load posts on page load
loadPosts();
