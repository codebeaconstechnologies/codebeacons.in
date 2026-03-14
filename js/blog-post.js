/* Code Beacons – Dedicated blog post page: load by ?slug= or ?id= */

(function () {
    var params = new URLSearchParams(window.location.search);
    var slug = params.get('slug');
    var idParam = params.get('id');
    var blogPostEl = document.getElementById('blogPost');
    var blogNotFoundEl = document.getElementById('blogNotFound');

    function formatDate(iso) {
        try {
            var d = new Date(iso);
            return isNaN(d.getTime()) ? iso : d.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
        } catch (e) {
            return iso;
        }
    }

    function renderPost(blog) {
        if (!blogPostEl) return;
        var dateStr = blog.date || '';
        document.title = (blog.title || 'Blog') + ' | Code Beacons Technologies';
        document.getElementById('blogPostTitleBreadcrumb').textContent = blog.title || 'Post';
        document.getElementById('blogPostDate').textContent = formatDate(dateStr);
        document.getElementById('blogPostDate').setAttribute('datetime', dateStr);
        document.getElementById('blogPostTitle').textContent = blog.title || '';
        var imgEl = document.getElementById('blogPostImage');
        imgEl.src = blog.image || '';
        imgEl.alt = blog.title || 'Blog image';
        document.getElementById('blogPostDescription').textContent = blog.description || '';
        blogPostEl.style.display = 'block';
        if (blogNotFoundEl) blogNotFoundEl.style.display = 'none';
    }

    function showNotFound() {
        if (blogNotFoundEl) blogNotFoundEl.style.display = 'block';
        if (blogPostEl) blogPostEl.style.display = 'none';
    }

    function slugOrIdMatch(blog) {
        var s = (slug || '').toString().trim();
        var i = (idParam || '').toString().trim();
        if (s && (blog.slug || '').toString().trim() === s) return true;
        if (i && blog.id != null && String(blog.id).trim() === i) return true;
        return false;
    }

    function findBlog(list) {
        if (!Array.isArray(list)) return null;
        return list.find(slugOrIdMatch) || null;
    }

    function loadAndShow() {
        var blog = null;

        try {
            var current = sessionStorage.getItem('blogCurrent');
            if (current) {
                blog = JSON.parse(current);
                if (blog && slugOrIdMatch(blog)) {
                    renderPost(blog);
                    sessionStorage.removeItem('blogCurrent');
                    return;
                }
            }
        } catch (e) {}

        try {
            var cached = sessionStorage.getItem('blogsList');
            if (cached) {
                var list = JSON.parse(cached);
                blog = findBlog(list);
                if (blog) {
                    renderPost(blog);
                    return;
                }
            }
        } catch (e) {}

        var pathDir = window.location.pathname.replace(/\/[^/]*$/, '');
        var jsonUrl = pathDir ? (window.location.origin + pathDir + '/blogs.json') : (window.location.origin + '/blogs.json');

        fetch(jsonUrl)
            .then(function (res) {
                if (!res.ok) throw new Error('Not found');
                return res.json();
            })
            .then(function (data) {
                var list = Array.isArray(data) ? data : [];
                try { sessionStorage.setItem('blogsList', JSON.stringify(list)); } catch (e) {}
                blog = findBlog(list);
                if (blog) {
                    renderPost(blog);
                } else {
                    showNotFound();
                }
            })
            .catch(function () {
                showNotFound();
            });
    }

    if (slug || idParam) {
        loadAndShow();
    } else {
        showNotFound();
    }
})();
