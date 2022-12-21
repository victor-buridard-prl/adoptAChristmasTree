export const login = (username, password) => {
  return fetch("http://localhost:3000/users/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};
