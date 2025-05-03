# TODO: Система учета восхождений альпинистского клуба

## 1. Сервисы для работы с горами (Mountain)

- [ ] Добавление новой вершины
- [ ] Редактирование данных о вершине (с проверкой отсутствия восхождений)
- [ ] Получение списка групп для каждой горы в хронологическом порядке
- [ ] Подсчет количества альпинистов на каждой горе

### Файл:

- [mountain.service.ts](g:\Self_Improvement\Pet-Projects\mountain-managment\backend\src\mountain\mountain.service.ts)

---

## 2. Сервисы для работы с альпинистами (Climber)

- [ ] Получение списка альпинистов по интервалу дат
- [ ] Статистика восхождений каждого альпиниста на каждую гору

### Файл:

- [climber.service.ts](g:\Self_Improvement\Pet-Projects\mountain-managment\backend\src\climber\climber.service.ts)

---

## 3. Сервисы для работы с группами (ClimbingGroup)

- [ ] Создание новой группы
- [ ] Добавление альпиниста в группу
- [ ] Получение списка восхождений за указанный период

### Файл:

- [climbing-group.service.ts](g:\Self_Improvement\Pet-Projects\mountain-managment\backend\src\climbing-group\climbing-group.service.ts)

---

## 4. База данных

### Структура сущностей:

- [mountain.entity.ts](g:\Self_Improvement\Pet-Projects\mountain-managment\backend\src\mountain\entity\mountain.entity.ts)
- [climber.entity.ts](g:\Self_Improvement\Pet-Projects\mountain-managment\backend\src\climber\entity\climber.entity.ts)
- [climbing-group.entity.ts](g:\Self_Improvement\Pet-Projects\mountain-managment\backend\src\climbing-group\entity\climbing-group.entity.ts)
- [group-member.entity.ts](g:\Self_Improvement\Pet-Projects\mountain-managment\backend\src\climbing-group\entity\group-member.entity.ts)

### Необходимые изменения:

1. **Триггеры**:

    - [ ] Каскадное удаление участников при удалении группы
    - [ ] Проверка возможности изменения данных о вершине
    - [ ] Обновление статистики восхождений

2. **Индексы для оптимизации**:
    - [ ] По названию горы
    - [ ] По датам восхождений
    - [ ] По имени альпиниста

---

## Порядок реализации:

1. [ ] Базовые CRUD операции для каждого сервиса
2. [ ] Сложные запросы (статистика, фильтрация по датам)
3. [ ] Триггеры и хуки базы данных
4. [ ] Индексы
5. [ ] Тестирование
6. [ ] Документация API

---

## Примечания:

- **Триггеры**:

    - Автоматическое удаление участников группы при удалении группы (`ON DELETE CASCADE` в `GroupMember`)
    - Проверка возможности изменения данных о вершине (если нет связанных записей в `ClimbingGroup`)
    - Обновление сводной статистики (например, количества восхождений)

- **Индексы**:
    - `Mountain.name` для быстрого поиска по названиям
    - `ClimbingGroup.start_date` и `end_date` для фильтрации по датам
    - `Climber.full_name` для поиска альпинистов
