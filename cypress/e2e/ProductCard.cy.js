describe("Adicinando um produto", () => {
  it("Add new Product", () => {
    cy.visit("http://localhost:5173/");

    const btnAddProduct = cy.get("#AddnewProduct").should("exist");

    btnAddProduct.click();

    cy.get(".FormAddproduct").should("exist");

    const produto = "oleo";
    const price = "10,00";
    const dFab = "2026-03-13";
    const dVal = "2026-06-13";

    cy.get("input").eq(0).type(produto);

    cy.get("input").eq(1).type(price);

    cy.get("input").eq(2).type(dFab);

    cy.get("input").eq(3).type(dVal);

    const btnSalvarProduct = cy.get("button").eq(3).should("exist");

    btnSalvarProduct.click();

    const btnClosePopUp = cy.get("button").eq(2).should("exist");

    btnClosePopUp.click();

    const liProductAdded = cy.get("li").should("contain", produto);

    expect(liProductAdded, produto);
  });

  it("checking if there is a new product on the list", () => {
    cy.visit("http://localhost:5173/");

    const listProduct = cy.get("li").should("exist");

    listProduct.contains("arroz");

    cy.get("button").eq(2).should("exist");
  });
});
