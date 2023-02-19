describe("Page authorization test", () => {
  beforeEach(() => {
    cy.visit("/booksNode");
  });

  it("Should be visible", () => {
    cy.contains("Books list").should("be.visible");
    cy.get("a > span > span").should("have.class", "ml-2");
  });

  it("Should successfully login", () => {
    cy.login("bropet@mail.ru", "123");
    cy.contains("Добро пожаловать bropet@mail.ru").should("be.visible");
  });

  it("Should not login with empty login", () => {
    cy.contains("Log in").click();
    cy.get("#mail").type(" ");
    cy.get("#pass").type("123");
    cy.contains("Submit").click();
    cy.get("#mail")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
    cy.get("#mail")
      .then(($el) => $el[0].validationMessage)
      .should("contain", "Заполните это поле.");
  });

  it("Should not login with empty password", () => {
    cy.loginOnly("bropet@mail.ru");
    cy.get("#pass")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
    cy.get("#pass")
      .then(($el) => $el[0].validationMessage)
      .should("contain", "Заполните это поле.");
  });
});

describe.skip("Testing favorite book list", () => {
  beforeEach(() => {
    cy.visit("/booksNode");
    cy.login("bropet@mail.ru", "123");
  });

  it("Add new favorite book", () => {
    cy.contains("Books list").click();
    cy.contains("Add new").click();
    cy.typing("#title", "Идиот");
    cy.typing(
      "#description.form-control",
      "Роман Ф.М.Достоевского.  Впервые был опубликован в номерах журнала «Русский вестник» за 1868 год."
    );
    cy.typing("#authors", "Фёдор Михайлович Достоевский");
    cy.get("#favorite").click();
    cy.get("form > .ml-2").click();
    cy.get("h4").click();
    cy.contains(".card-text", "Фёдор Михайлович Достоевский").should(
      "be.visible"
    );
  });

  it("Should delete from favorite", () => {
    cy.get("h4").click();
    cy.get(".card-footer > .btn").click();
    cy.contains(
      ".btn > a",
      "Please add some book to favorit on home page!"
    ).should("be.visible");
  });

  it("Should add book to favorite from BookList", () => {
    cy.contains("Books list").click();
    cy.contains("Add to favorite").click();
    cy.get("h4").click();
    cy.contains(".card-text", "Фёдор Михайлович Достоевский").should(
      "be.visible"
    );
  });
});
