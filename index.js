(async function bootstrap() {
  let immutableData = [];

  async function getData() {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/posts/?_start=0&_limit=7"
    );
    return res.json();
  }

  function box(title, body) {
    return `<div class="boxWrapper">
              <input type="checkbox" id="checkboxInput"> 
              <div class=container> 
                <div class="titleTxt">${title}</div>
                <div>${body}</div>
              </div>
            </div>`;
  }

  function getLayout(values) {
    return values
      .map((e) => {
        return box(e.title, e.body);
      })
      .join("");
  }

  function updateQuery(value) {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("filter", value);
    history.replaceState(null, null, "?" + queryParams.toString());
  }

  immutableData = await getData();
  wrapper.innerHTML = getLayout(immutableData);

  function filterData() {
    const input = document.getElementById("input");
    const searchValue = input.value;
    const regExp = new RegExp(searchValue);

    const filteredData = immutableData.filter((e) => regExp.test(e.title));

    wrapper.innerHTML = "";
    wrapper.innerHTML = getLayout(filteredData);

    updateQuery(searchValue);
  }
  const button = document.getElementById("button");
  button.addEventListener("click", filterData);
})();
