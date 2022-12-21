export function fetchTree(selectedTreeId) {
  const token = localStorage.getItem("token");
  return fetch(`http://localhost:3000/trees/${selectedTreeId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.status === 401) {
      window.location.href = "http://localhost:8080/#/login";
    }
    return res.json();
  });
}
