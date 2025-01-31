const baseURL = '/soro.ax'; // Add base URL for GitHub Pages

const pageNames = {
  [`${baseURL}/`]: "home",
  [`${baseURL}/posts/post.html`]: "posts",
  [`${baseURL}/about/about.html`]: "about",
  [`${baseURL}/posts/blog01.html`]: "wlcm",
  [`${baseURL}/posts/blog02.html`]: "maths&ml",
};

function generateBreadcrumbs() {
  const breadcrumbContainer = document.querySelector(".breadcrumbs");

  if (!breadcrumbContainer) {
    console.error("Breadcrumb container not found.");
    return;
  }

  const currentPage = window.location.pathname;
  const pathSegments = currentPage.split("/").filter(Boolean);
  let breadcrumbPath = `<a href="${baseURL}/">home</a>`;

  pathSegments.reduce((acc, segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const fullPath = path === '/' ? baseURL + path : baseURL + path;
    const pageName = pageNames[fullPath];

    if (pageName) {
      if (path.includes("/posts/blog")) {
        breadcrumbPath += `.<a href="${baseURL}/posts/post.html">posts</a>`;
      }
      breadcrumbPath += `.<a href="${fullPath}">${pageName}</a>`;
    }
    return path;
  }, "");

  breadcrumbContainer.innerHTML = breadcrumbPath;
}

generateBreadcrumbs();
