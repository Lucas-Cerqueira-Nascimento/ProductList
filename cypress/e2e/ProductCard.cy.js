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

    cy.get("input").eq(0).clear().type(produto);

    cy.get("input").eq(1).clear().type(price);

    cy.get("input").eq(2).clear().type(dFab);

    cy.get("input").eq(3).clear().type(dVal);

    const btnSalvarProduct = cy.get("button").eq(3).should("exist");

    btnSalvarProduct.click();

    const btnClosePopUp = cy.get("button").eq(2).should("exist");

    btnClosePopUp.click();

    const liProductAdded = cy.get("li").should("contain", produto);

    expect(liProductAdded, produto);
  });

  it("checking if there is a new product on the list", () => {
    cy.visit("http://localhost:5173/");

    // 1. Garante que o arroz está lá antes de começar
    cy.get("li").contains("arroz").should("be.visible");

    // 2. Realiza a busca
    // Dica: Use seletores mais específicos se puder, eq(0) é perigoso!
    cy.get("input").eq(0).clear().type("leite{enter}");

    // 3. Validação: O arroz NÃO deve estar visível ou não deve existir
    // Se o seu filtro remove o elemento do HTML:
    cy.contains("li", "arroz").should("not.exist");

    // Se o seu filtro apenas esconde o elemento com CSS (display: none):
    // cy.contains("li", "arroz").should("not.be.visible");

    cy.get("input").eq(0).clear();

    const btnSearch = cy.get("button").eq(2).should("exist");
    btnSearch.click();

    expect(cy.contains("li", "arroz").should("exist"));

    // Evento do Filter (Name)
    cy.get("#NameSearch").should("be.visible");

    const btnFilter = cy.get("#Filter").should("exist");
    btnFilter.click();

    cy.get("#NomeCheckBox").should("exist").uncheck();

    cy.get("#NameSearch").should("not.exist");

    // Evento do Filter (Price)
    cy.get("#PriceCheckBox").should("exist").check();

    cy.get("#PriceSearch").should("exist");

    btnFilter.click(); // fecha o filter

    // cy.get("#PriceSearch").should("exist").clear().type("4{enter}");

    // expect(cy.contains("li", "4,00").should("exist"));
  });
});

// ARRUMA ESSA MERDA PORQUE N SEI O Q ACONTECEU  NESSA MERDAAAA
