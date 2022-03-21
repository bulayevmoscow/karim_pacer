# Pacer for Pool

### Установка

> При разработке был использована node v16 \
>  Установите yarn `npm -g install yarn` в случае если yarn не установлен

1.`yarn` # установка зависимостей

- `yarn run start:front` # Запуск dev сервера фронта
- `yarn run start:back` # Запуск stub сервера,эмитирующей backend
- `yarn run build:front` # Сборка проекта в папку ./packages/front/dist
- `yarn run preview:front` # Запуск сервера с последней сборкой
  - Возможность запуска на кастомном порту `yarn run preview:front --port {port}` где {port}
