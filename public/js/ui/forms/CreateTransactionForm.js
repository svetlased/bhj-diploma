const { response } = require("express");

/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list(User.current(), (err, response)=>{
      response.data.array.forEach(element => { //<option value="${id}">${name}</option>
        this.element.getElementById("expense-accounts-list").insertAdjcentHTML("beforeend", `<option value="${element.id}">${element.name}</option>`)
      });
      
    })
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transactions.create(data, (err, response) => {
      if (response.success) {
        this.element.reset(); // как если в конструкторе не было объявления? из-за AsyncForm 
        App.getModal('newExpense').close(); // надо ли this.element = element и что значит super(element)
        App.getModal('newIncome').close();
        App.update();
      }
    })
  }
}