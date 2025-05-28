const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/books.js", "./routes/members.js"]; // Changed from users.js to members.js

const doc = {
  openapi: "3.0.0",
  info: {
    title: "Library Management API",
    description: "API for managing books and library members",
    version: "1.0.0"
  },
  servers: [
    {
      url: process.env.HOST || "http://localhost:3000",
      description: "Development server"
    }
  ],
  tags: [
    {
      name: "Books",
      description: "Book management endpoints"
    },
    {
      name: "Members",
      description: "Library member management"
    }
  ],
  components: {
    schemas: {
      Book: {
        type: "object",
        properties: {
          title: { type: "string", example: "The Great Gatsby" },
          author: { type: "string", example: "F. Scott Fitzgerald" },
          ISBN: { type: "string", example: "9780743273565" },
          genre: { type: "string", example: "Classic" },
          publicationYear: { type: "integer", example: 1925 },
          pageCount: { type: "integer", example: 218 },
          availability: { type: "boolean", example: true }
        },
        required: ["title", "author", "ISBN"]
      },
      Member: {
        // Changed from User to Member
        type: "object",
        properties: {
          firstname: { type: "string", example: "John" },
          lastname: { type: "string", example: "Doe" },
          email: {
            type: "string",
            format: "email",
            example: "john@example.com"
          },
          membershipDate: { type: "string", format: "date-time" }
        },
        required: ["firstname", "lastname", "email"]
      }
    },
    securitySchemes: {
      sessionAuth: {
        type: "apiKey",
        in: "cookie",
        name: "connect.sid",
        description: "Session cookie authentication"
      }
    }
  },
  security: [
    {
      sessionAuth: []
    }
  ]
};

// Add route specific security overrides
doc.paths = {
  "/books": {
    get: { security: [] } // Public access
  },
  "/books/{id}": {
    get: { security: [] } // Public access
  },
  "/members": {
    get: { security: [] } // Public access
  },
  "/members/{id}": {
    get: { security: [] } // Public access
  }
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log("Swagger documentation generated successfully");
});
