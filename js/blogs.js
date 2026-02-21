/* Code Beacons – Blogs page: load blogs.json + submit form */

(function () {
    const blogListEl = document.getElementById('blogList');
    const blogEmptyEl = document.getElementById('blogEmpty');
    const blogForm = document.getElementById('blogForm');
    const blogPublishInstructions = document.getElementById('blogPublishInstructions');
    const blogJsonOutput = document.getElementById('blogJsonOutput');
    const copyBlogJsonBtn = document.getElementById('copyBlogJson');

    let blogs = [];

    function renderBlogs() {
        if (!blogListEl) return;
        blogListEl.innerHTML = '';
        if (blogs.length === 0) {
            if (blogEmptyEl) blogEmptyEl.style.display = 'block';
            return;
        }
        if (blogEmptyEl) blogEmptyEl.style.display = 'none';
        blogs.forEach(function (blog) {
            const card = document.createElement('article');
            card.className = 'blog-card fade-up';
            card.setAttribute('itemscope', '');
            card.setAttribute('itemtype', 'https://schema.org/BlogPosting');
            var dateStr = blog.date || '';
            card.innerHTML =
                '<div class="blog-card-image">' +
                '<img src="' + escapeHtml(blog.image) + '" alt="' + escapeHtml(blog.title) + '" loading="lazy">' +
                '</div>' +
                '<div class="blog-card-body">' +
                (dateStr ? '<time class="blog-card-date" datetime="' + dateStr + '">' + formatDate(dateStr) + '</time>' : '') +
                '<h3 class="blog-card-title" itemprop="headline">' + escapeHtml(blog.title) + '</h3>' +
                '<p class="blog-card-description" itemprop="description">' + escapeHtml(blog.description) + '</p>' +
                '</div>';
            blogListEl.appendChild(card);
        });
    }

    function escapeHtml(s) {
        if (!s) return '';
        var div = document.createElement('div');
        div.textContent = s;
        return div.innerHTML;
    }

    function formatDate(iso) {
        try {
            var d = new Date(iso);
            return isNaN(d.getTime()) ? iso : d.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
        } catch (e) {
            return iso;
        }
    }

    function loadBlogs() {
        fetch('blogs.json')
            .then(function (res) { return res.ok ? res.json() : []; })
            .then(function (data) {
                blogs = Array.isArray(data) ? data : [];
                renderBlogs();
            })
            .catch(function () {
                blogs = [];
                renderBlogs();
            });
    }

    if (blogForm) {
        blogForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var title = document.getElementById('blogTitle').value.trim();
            var image = document.getElementById('blogImage').value.trim();
            var description = document.getElementById('blogDescription').value.trim();
            if (!title || !image || !description) return;

            var newBlog = {
                id: String(Date.now()),
                title: title,
                image: image,
                description: description,
                date: new Date().toISOString().slice(0, 10)
            };

            blogs.unshift(newBlog);
            renderBlogs();

            var jsonEntry = JSON.stringify(newBlog, null, 2);
            if (blogJsonOutput) blogJsonOutput.textContent = jsonEntry;
            if (blogPublishInstructions) blogPublishInstructions.style.display = 'block';

            blogForm.reset();

            if (copyBlogJsonBtn) {
                copyBlogJsonBtn.onclick = function () {
                    navigator.clipboard.writeText(jsonEntry).then(function () {
                        copyBlogJsonBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                        setTimeout(function () {
                            copyBlogJsonBtn.innerHTML = '<i class="fas fa-copy"></i> Copy to clipboard';
                        }, 2000);
                    });
                };
            }
        });
    }

    loadBlogs();
})();
