export const fetchReservation = () => {
  const token = localStorage.getItem("token");
  return fetch(`http://localhost:3000/payments/reservations`, {
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
};

export const postReservation = (selectedTreeId) => {
  const token = localStorage.getItem("token");
  return fetch(`http://localhost:3000/payments/reservations`, {
    method: "POST",
    body: JSON.stringify({ treeId: selectedTreeId }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.status === 401) {
      window.location.href = "http://localhost:8080/#/login";
    }
    return;
  });
};

export const cancelReservation = (treeId) => {
  const token = localStorage.getItem("token");
  return fetch(`http://localhost:3000/payments/reservations/status`, {
    method: "PATCH",
    body: JSON.stringify({ status: "CANCELLED", treeId }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.status === 401) {
      window.location.href = "http://localhost:8080/#/login";
    }
    return;
  });
};
