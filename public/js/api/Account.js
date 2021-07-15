/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  /**
   * Получает информацию о счёте
   * */
  static url = "/account";

  static get(id = '', callback){
    createRequest({
      data,
      method: 'GET', 
      url: this.URL + '/' + account  + '/' + id,
      responseType: 'json',
      callback
    });
  }
}
