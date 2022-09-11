const email = document.getElementsByTagName("input")[0];
const username = document.getElementsByTagName("input")[1];
const form = document.getElementById("sub_form");
const span_message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const response = await fetch(new URL("http://localhost:3333/sub"), {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:4000",
    },
    body: JSON.stringify({ name: username.value, email: email.value }),
  });

  if (response.status === 400)
    span_message.innerText = (await response.json()).message;
  else span_message.innerText = "cadastrado com sucesso";
});
