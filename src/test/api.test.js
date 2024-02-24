const chai = require("chai");
const chaitHttp = require("chai-http");
const app = require("../app/app");
const global = require("../const/global");
const errors = require("../const/errors");
const { expect } = chai;
const BASE_URL = `${global.HOST}:${global.PORT}/api`;
let temp_data;

chai.use(chaitHttp);

/**
 * Pruebas para los metodos POST para los clientes
 */

// Prueba para el metodo de registro de clientes sin el dato nombre
describe("Registrar nuevo cliente sin el dato nombre", () => {
  it("Deberia regresar un objeto con un mensaje y los datos del usuario registrado", (done) => {
    chai
      .request(`${BASE_URL}`)
      .post("/users")
      .send({
        email: "emiliano@gmail.com",
      })
      .end((end, res) => {
        expect(res).to.have.status(400); // Bad request
        // expect(res.body).to.have.property('message').that.equals(errors.EmptyNameField);
        expect(res.body).to.be.an("object");
        done();
      })
  });
});

// Prueba para el metodo de registro de clientes sin el dato email
describe("Registrar nuevo cliente sin el dato email", () => {
  it("Deberia regresar un objeto con un mensaje y los datos del usuario registrado", (done) => {
    chai
      .request(`${BASE_URL}`)
      .post("/users")
      .send({
        name: "Emiliano",
      })
      .end((end, res) => {
        expect(res).to.have.status(400); // Bad request
        expect(res.body).to.be.an("object");
        done();
      });
  });
});

// Prueba para el metodo de registro de clientes con un correo no registrado
describe("Registrar nuevo cliente", () => {
  it("Deberia regresar un objeto con un mensaje y los datos del usuario registrado", (done) => {
    chai
      .request(`${BASE_URL}`)
      .post("/users")
      .send({
        name: "Emiliano",
        email: "emiliano@gmail.com",
      })
      .end((end, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        temp_data = res.body.data.id;
        done();
      });
  });
});

// Prueba donde se intenta registrar un cliente con un correo existente
describe("Registrar nuevo cliente con un correo ya existente", () => {
  it("Deberia regresar un objeto con un mensaje donde indique que el correo ya fue utilizado", (done) => {
    chai
      .request(`${BASE_URL}`)
      .post("/users")
      .send({
        name: "Emiliano",
        email: "emiliano@gmail.com",
      })
      .end((end, res) => {
        expect(res).to.have.status(409);
        expect(res.body).to.be.an("object");
        done();
      });
  });
});

/**
 * Pruebas para los metodos GET de clientes
 */

// Prueba para obtener todos los registros de los clientes
describe("Obtener todos los clientes", () => {
  it("Deberia traer todos los registros de clientes", (done) => {
    chai
      .request(`${BASE_URL}`)
      .get("/users")
      .end((end, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        done();
      });
  });
});

// Prueba para obtener por medio de un ID especifico el registro de un cliente
describe("Buscar un cliente por medio de un ID existente", () => {
  it("Deberia traer un objeto con los datos del cliente", (done) => {
    chai
      .request(`${BASE_URL}`)
      .get(`/users/${temp_data}`) // ID de un usuario existente
      .end((end, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        done();
      });
  });
});

// Prueba para el error para las busquedas con un IDs inexistentes
describe("Buscar un cliente por medio de un ID inexistente", () => {
  it("Deberia devolver un objeto con un mensaje de error", (done) => {
    chai
      .request(`${BASE_URL}`)
      .get("/users/05c45274-774f-4038-80c1-d49f08249d") // ID de un usuario inexistente
      .end((end, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an("object");
        done();
      });
  });
});

/**
 * Pruebas para los metodos PUT de clientes
 */

// Prueba para el endpoint que sirve para borrar el registro de clientes
describe("Actulizar información de los clientes", () => {
  it("Deberia devolver un objeto con un mensaje satisfacción y con los nuevos datos", (done) => {
    chai
      .request(`${BASE_URL}`)
      .put(`/users/${temp_data}`) // ID de un usuario inexistente
      .send({
        name: "Emiliano Fernández",
      })
      .end((end, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        done();
      });
  });
});

/**
 * Pruebas para los metodos DELETE de clientes
 */
// Prueba para el endpoint que sirve para borrar el registro de clientes
describe("Eliminar de forma logica el registro de un cliente", () => {
  it("Deberia devolver un objeto con un mensaje satisfacción", (done) => {
    chai
      .request(`${BASE_URL}`)
      .delete(`/users/${temp_data}`) // ID de un usuario inexistente
      .end((end, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        done();
      });
  });
});

// Prueba para el endpoint que sirve para borrar el registro de clientes, se ingresa un id
// invalido
describe("Eliminar de forma logica el registro de un cliente ya removido o inexistente", () => {
  it("Deberia devolver un objeto con un mensaje error", (done) => {
    chai
      .request(`${BASE_URL}`)
      .get(`/users/${temp_data}2`) // ID de un usuario inexistente
      .end((end, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an("object");
        done();
      });
  });
});

/**
 * Endpoint para registrar un usuario con un correo previamente registrado
 */
describe("Registrar cliente con un correo previamente registrado y eliminado de forma logica", () => {
  it("Deberia devolver un objeto con un mensaje que indique que el usuario ha sido restaurado", (done) => {
    chai
      .request(`${BASE_URL}`)
      .post(`/users`) // ID de un usuario inexistente
      .send({
        name: "Emilianooooooooo",
        email: "emiliano@gmail.com",
      })
      .end((end, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        done();
      });
  });
});
