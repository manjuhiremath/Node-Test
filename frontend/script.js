async function getAll() {
    try {
      const response = await axios.get("http://localhost:3000/blog");
      const blogs = response.data;
      const blogsContainer = document.getElementById("blogs-container");
  
      let blogsHtml = blogs
        .map((blog) => {
          return `
          <div class="card mb-3">
            <div class="card-header" id="heading-${blog.id}">
              <h2 class="mb-0">
                <button
                  class="btn btn-link"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse-${blog.id}"
                  aria-expanded="false"
                  aria-controls="collapse-${blog.id}"
                >
                  ${blog.title} - ${blog.author}
                </button>
              </h2>
            </div>
            <div
              id="collapse-${blog.id}"
              class="collapse"
              data-bs-parent="#blogs-container"
            >
              <div class="card-body">
                <p>${blog.content}</p>
                <!-- Comment Section -->
                <div>
                  <label for="comment-${blog.id}">Add a comment:</label>
                  <input
                    type="text"
                    id="comment-${blog.id}"
                    class="form-control"
                    placeholder="Enter your comment here"
                  />
                  <button
                    class="btn btn-success mt-2"
                    onclick="handleAddComment(${blog.id})"
                  >
                    Add Comment
                  </button>
                </div>
                <!-- Display Comments -->
                <div id="commentsDisplay-${blog.id}" class="mt-3">
                  <!-- Comments will be displayed here -->
                </div>
              </div>
            </div>
          </div>
        `;
        })
        .join("");
      blogsContainer.innerHTML = blogsHtml;
      blogs.forEach((blog) => {
        getComments(blog.id);
      });
    } catch (error) {
      console.error("There was an error fetching the blogs:", error);
    }
  }
  getAll();
  
  async function handleAddComment(blogId) {
    const comment = document.getElementById(`comment-${blogId}`).value;
    if (!comment) {
      alert("Please enter a comment!");
      return;
    }
  
    try {
      await axios.post(`http://localhost:3000/blog/comment/${blogId}`, {
        comment,
        blogId
      });
      document.getElementById(`comment-${blogId}`).value = '';
      getComments(blogId);
    } catch (err) {
      console.error(err);
    }
  }
  
  async function getComments(blogId) {
    try {
      const commentsDisplay = document.getElementById(`commentsDisplay-${blogId}`);
      
      // Fetch comments for the specific blog
      const response = await axios.get(`http://localhost:3000/blog/comment/${blogId}`);
      const comments = response.data;
  
      // Check if there are comments
      if (comments && comments.length > 0) {
        let displayComment = comments
          .map((comment) => {
            return `
              <div class="alert alert-secondary">
                ${comment.comment} 
                <button class='btn btn-danger' onclick='handleDelete(${comment.id}, ${blogId})'>Delete</button>
              </div>
            `;
          })
          .join("");
        commentsDisplay.innerHTML = displayComment;
      } else {
        let displayNoComment = `
          <div class="alert alert-secondary">
            No comments for this Blog
          </div>
        `;
        commentsDisplay.innerHTML = displayNoComment;
      }
  
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  }
  
  async function handleDelete(id){
    try{
        await axios.delete(`http://localhost:3000/blog/comment/${id}`);
        getAll()
    }catch(err){
        console.log(err)
    }
  }

  async function handleBlogSubmit(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const content = document.getElementById('content').value;
    console.log(title);
    try{
        await axios.post(`http://localhost:3000/blog`,{
            title,
            author,
            content
        })
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('content').value = '';
        getAll();
    }catch(err){
        console.log(err);
    }
  }