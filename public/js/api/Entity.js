/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list(data, callback){
    if (data) {
      createRequest({
          url: this.url,
          method: 'GET',
          responseType: 'json',
          data,
          callback
      });
  }
  }
  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback) {
    createRequest({
      url: this.url,
      method: 'POST',
      responseType: 'json',
      data: Object.assign({ _method: "PUT" }, data),
      callback
  });
}

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(data, callback ) {
    createRequest({
      url: this.url,
      method: 'POST',
      data: Object.assign({ _method: "DELETE" }, data),
      callback
  });
  }
}
