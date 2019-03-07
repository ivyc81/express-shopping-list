process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");

let items = require("../fakeDb")

let item = {name: "chocolate", price: 10000}

beforeEach(() => {
  items.push(item)
  console.log("before each", items)
});

afterEach(() => {
  items.length = 0
  console.log("after each", items)
});

describe("GET /items", function() {
  test("Gets a list of items", async function() {
    console.log("WHAT IS ITEMS BEFORE?", items)
    const resp = await request(app).get('/items');
    console.log("WHAT IS ITEMS?", items)
    const { shoppingItems } = resp.body;
    console.log("WHAT IS resp.body?", resp.body)

    expect(resp.statusCode).toBe(200);
    expect(shoppingItems).toHaveLength(2);
  })
})

describe("POST /items", function() {
  test("Adds an item", async function() {
    const resp = await request(app)
      .post('/items')
      .send({
        name: "ice cream",
        price: 20
      });
    
    expect(resp.statusCode).toBe(200);
    expect(resp.body.shoppingItems).toHaveLength(2);
    expect(resp.body.shoppingItems[1].name).toEqual("ice cream")
    expect(resp.body.shoppingItems[1].price).toEqual(20)
  })
})

describe("GET /items/:name", function() {
  test("Gets an item", async function() {
    const resp = await request(app).get('/items/chocolate');
    const item = resp.body;
    
    expect(resp.statusCode).toBe(200);
    expect(item.name).toEqual("chocolate");
    expect(item.name).toEqual(10000);
  })
})