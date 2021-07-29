const { response } = require("express");

/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if (!element) {
      throw new Error("Элемент не существует");
   }
   this.element = element;
   this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render(this.lastOpions);
//?? В случае, если метод render() был ранее вызван с какими-то опциями, при вызове update() эти опции необходимо передать повторно 
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    this.element.addEventListener("click", event =>{
      event.preventDefault();
      const buttonRemoveAccount = event.target.closest(".remove-account");
      const buttonRemoveTransaction = event.target.closest(".transaction__remove");
      if(buttonRemoveAccount){
        this.removeAccount();
      }
      if(buttonRemoveTransaction){
        this.removeTransaction(buttonRemoveTransaction.dataset.id);
      }
    })
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets(),
   * либо обновляйте только виджет со счетами
   * для обновления приложения
   * */
  removeAccount() {
    if(!this.lastOptions){
      return
    }
    Account.remove(this.lastOpions, (err, response) =>{
      if(response.success) {
        App.updateWidgets();
      }
    let confirmationQuest = confirm("Вы действительно хотите удалить счёт?");
    if(confirmationQuest){
      this.clear();
    }
    })
}

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction( id ) {
    Transaction.remove({id}, (err, response) =>{
      if (response.success) {
        App.updateWidgets();
        let confirmationQuest = confirm("Вы действительно хотите удалить транзакцию?");
        if(confirmationQuest){
          this.clear();
        }
        }
      })
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options){
    if (!options) {
      return
    }
    this.lastOpions = options;
    Account.get(options, (err, response) => {
      if(response.success){
        TransactionsPage.renderTitle(response.data.name);
      }
    })
    Transaction.list(options, (err, response) => {
      if(response.success){
        TransactionsPage.renderTransactions(response.data);
      }
    })
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([]);
    this.renderTitle("Название счёта");
    this.lastOpions =null;
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name){
    this.element.querySelector(".content-title").textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date){
    //const monthsNames = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
    //var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    //console.log(date.toLocaleDateString("en-US", options)); 


    return `${new Date(date).toLocaleString('ru', { day: '2-digit', month: 'long', year: 'numeric' })} в ${new Date(date).toLocaleString('ru', {hour: '2-digit', minute: '2-digit'})} `
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item){
    return `<div class="transaction transaction_${item.type} row">
    <div class="col-md-7 transaction__details">
      <div class="transaction__icon">
          <span class="fa fa-money fa-2x"></span>
      </div>
      <div class="transaction__info">
          <h4 class="transaction__title">${item.name}</h4>
          <!-- дата -->
          <div class="transaction__date">${this.formatDate(item.created_at)}</div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="transaction__summ">
      <!--  сумма -->
          200 <span class="currency">₽</span>
      </div>
    </div>
    <div class="col-md-2 transaction__controls">
        <!-- в data-id нужно поместить id -->
        <button class="btn btn-danger transaction__remove" data-id="${item.id}">
            <i class="fa fa-trash"></i>  
        </button>
    </div>
</div>`
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data){
    this.element.querySelector(".content").innerHTML = "";
    data.forEach(item => {
      this.element.querySelector(".content").insertAdjacentHTML("beforeend", this.getTransactionHTML(item));
    })
  }
}