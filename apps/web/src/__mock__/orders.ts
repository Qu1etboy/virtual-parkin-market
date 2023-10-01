export const orders = [
  {
    id: 1,
    user: {
      id: 1,
      name: "John Doe",
    },
    price: 100,
    createdAt: "2021-01-01T00:00:00.000Z",
    status: "delivered",
  },
  {
    id: 2,
    user: {
      id: 1,
      name: "Minny Jane",
    },
    price: 500,
    createdAt: "2021-02-01T00:00:00.000Z",
    status: "shipped",
  },
  {
    id: 3,
    user: {
      id: 1,
      name: "Kong Kong",
    },
    price: 1000,
    createdAt: "2021-03-01T00:00:00.000Z",
    status: "pending",
  },
];

export const orderItems = [
  {
    id: 1,
    product: {
      name: "Apple AirPods Pro",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    },
    price: 100,
    quantity: 5,
  },
  {
    id: 2,
    product: {
      name: "Nike Air Max 270",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    },
    price: 10,
    quantity: 3,
  },
];

export type Order = (typeof orders)[0];

export type OrderItem = (typeof orderItems)[0];
