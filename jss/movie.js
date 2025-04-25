// 渲染电影列表
function renderMovieList(movies) {
  const movieListContainer = document.querySelector("#movieList");
  movieListContainer.innerHTML = ""; // 清空容器
  movies.forEach((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");
    const movieA = document.createElement("a");
    movieA.href = `/videos/?name=${movie.detailPage}`;
    movieA.innerHTML = `
                <h3>${movie.title}</h3>
                <img src="${movie.poster}" alt="${movie.title}">
                <p>${movie.description}</p>
        `;
    movieDiv.appendChild(movieA);
    movieListContainer.appendChild(movieDiv);
    // 监听动态生成的链接
    movieA.addEventListener("click", function (e) {
      e.preventDefault(); // 阻止默认跳转
      pjax.loadUrl(movieA.href); // 使用 PJAX 进行页面加载
    });
  });
}
// 发起请求获取媒体文件
fetch(`${window.location.protocol}//${window.location.host}/videoData`)
  .then((response) => response.json())
  .then((data) => {
    // 调用函数渲染电影列表
    renderMovieList(data);
  })
  .catch((error) => {
    console.error("请求失败:", error);
  });
