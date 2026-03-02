import './scss/styles.scss';

import { ProductCatalog } from './components/models/ProductCatalog';
import { Cart } from './components/models/Cart';
import { Buyer } from './components/models/Buyer';
import { ShopApi } from './components/api/ShopApi';
import { Api } from './components/base/Api';
import { API_URL } from './utils/constants';

// --- Создаём модели ---
const catalog = new ProductCatalog();
const cart = new Cart();
const buyer = new Buyer();

// --- Подключаем API ---
// Используем готовый API_URL из utils/constants.ts
const baseApi = new Api(API_URL);
const shopApi = new ShopApi(baseApi);

console.log('Старт приложения');
console.log('API_URL:', API_URL);

// --- Получаем каталог с сервера и тестируем модели ---
(async () => {
  try {
    console.log('Запрос каталога...');

    const products = await shopApi.getProducts();

    console.log('Каталог получен с сервера. Количество товаров:', products.length);

    // ProductCatalog: set/get/getById/selected
    catalog.setProducts(products);
    console.log('Каталог сохранён в модель:', catalog.getProducts());

    const first = catalog.getProducts()[0];

    if (first) {
      console.log('Каталог: товар по id первого:', catalog.getProductById(first.id));

      catalog.setSelectedProduct(first);
      console.log('Каталог: выбранный товар:', catalog.getSelectedProduct());
    }

    // Cart: add/has/count/total/remove/clear
    if (first) {
      console.log('Корзина: изначально пустая, count:', cart.getCount(), 'total:', cart.getTotal());

      console.log('Корзина: hasItem(first.id) до добавления:', cart.hasItem(first.id));

      cart.addItem(first);
      console.log('Корзина: после addItem:', cart.getItems());
      console.log('Корзина: count:', cart.getCount(), 'total:', cart.getTotal());
      console.log('Корзина: hasItem(first.id) после добавления:', cart.hasItem(first.id));

      cart.removeItem(first);
      console.log('Корзина: после removeItem:', cart.getItems());
      console.log('Корзина: hasItem(first.id) после удаления:', cart.hasItem(first.id));

      // Проверка clear
      cart.addItem(first);
      console.log('Корзина: снова добавили товар, count:', cart.getCount());
      cart.clear();
      console.log('Корзина: после clear, items:', cart.getItems(), 'count:', cart.getCount(), 'total:', cart.getTotal());
    }

  } catch (error) {
    console.error('Ошибка загрузки каталога:', error);
  }
})();

// Buyer: validate/setData/getData/clear
console.log('Buyer validate (пусто):', buyer.validate());

buyer.setData({
  payment: 'online',
  email: 'test@test.ru',
  phone: '+79990000000',
  address: 'Berlin',
});

console.log('Buyer data:', buyer.getData());
console.log('Buyer validate (заполнено):', buyer.validate());

buyer.clear();
console.log('Buyer после очистки:', buyer.getData(), buyer.validate());