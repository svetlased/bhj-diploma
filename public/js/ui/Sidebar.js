/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    let sidebarToggle = document.querySelector('.sidebar-toggle');
    sidebarToggle.addEventListener("click", event => {
      event.preventDefault();
      document.querySelector('.sidebar-mini').classList.toggle("sidebar-open");
      document.querySelector('.sidebar-mini').classList.toggle("sidebar-collapse");
    })

  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {

    const itemRegister = document.querySelector(".menu-item_register a");
    const itemLogin = document.querySelector(".menu-item_login a");
    const itemLogout = document.querySelector(".menu-item_logout a");

    itemRegister.addEventListener("click", (event) => {
      event.preventDefault();
      const modal = App.getModal('register');
      modal.open();
    })
    itemLogin.addEventListener("click", (event) => {
      event.preventDefault();
      const modal = App.getModal('login');
      modal.open();
    })
    itemLogout.addEventListener("click", (event) => {
      event.preventDefault();
      User.logout(User.current(), (err, response) => {
        if (response.success === true) {
        App.setState( 'init' ) 
      }
      }
      );
      
    })
  }
}