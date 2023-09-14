export const products = [
  {
    id: 1,
    name: "Product 1",
    thumbnail:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2798&q=80",
    price: 100,
    reviews: [
      {
        id: 1,
        author: "John Doe",
        rating: 5,
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
        createdAt: new Date(),
      },
      {
        id: 2,
        author: "Jane Doe",
        rating: 4,
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
        createdAt: new Date(),
      },
    ],
  },
  {
    id: 2,
    name: "Product 2",
    thumbnail:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    price: 200,
    reviews: [
      {
        id: 3,
        author: "James Gunn",
        rating: 5,
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
        createdAt: new Date(),
      },
    ],
  },
  {
    id: 3,
    name: "Product 3",
    thumbnail:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    price: 300,
    reviews: [],
  },
];