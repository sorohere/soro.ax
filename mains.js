const baseURL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? ''  // Use empty base for localhost
  : '/soro.ax';  // Use /soro.ax for GitHub Pages

const pageNames = {
  '/': "home",
  '/posts/post.html': "posts",
  '/about/about.html': "about",
  '/posts/blog01.html': "wlcm",
  '/posts/blog02.html': "maths&ml",
  '/posts/blog03.html': "vad",
};

function generateBreadcrumbs() {
  const breadcrumbContainer = document.querySelector(".breadcrumbs");

  if (!breadcrumbContainer) {
    console.error("Breadcrumb container not found.");
    return;
  }

  // Remove baseURL from pathname to get the relative path
  const currentPath = window.location.pathname.replace(baseURL, '');
  const pathSegments = currentPath.split("/").filter(Boolean);
  let breadcrumbPath = `<a href="${baseURL}/">home</a>`;

  pathSegments.reduce((acc, segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const pageName = pageNames[path];

    if (pageName) {
      if (path.includes("/posts/blog")) {
        breadcrumbPath += `.<a href="${baseURL}/posts/post.html">posts</a>`;
      }
      breadcrumbPath += `.<a href="${baseURL}${path}">${pageName}</a>`;
    }
    return path;
  }, "");

  breadcrumbContainer.innerHTML = breadcrumbPath;
}

generateBreadcrumbs();
