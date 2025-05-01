### Основные сущности базы данных:

#### 1. **Горы (Mountain)**
   - `mountain_id` (PK) — уникальный идентификатор  
   - `name` — название вершины  
   - `height` — высота (в метрах)  
   - `country` — страна расположения  
   - `region` — регион/район  

#### 2. **Альпинисты (Climber)**
   - `climber_id` (PK) — уникальный идентификатор  
   - `full_name` — имя и фамилия  
   - `address` — адрес проживания  

#### 3. **Группы восхождений (ClimbingGroup)**
   - `group_id` (PK) — уникальный идентификатор  
   - `group_name` — название группы  
   - `mountain_id` (FK → Mountain) — целевая вершина  
   - `start_date` — дата начала восхождения  
   - `end_date` — дата завершения  

#### 4. **Участники групп (GroupMember)**
   - `group_id` (FK → ClimbingGroup) + `climber_id` (FK → Climber) — составной PK  
   - (связь многие-ко-многим между группами и альпинистами)

---

### Пример структуры таблиц в SQL:

```sql
CREATE TABLE Mountain (
    mountain_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    height DECIMAL(10,2) NOT NULL,
    country VARCHAR(50) NOT NULL,
    region VARCHAR(50)
);

CREATE TABLE Climber (
    climber_id INT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    address VARCHAR(200)
);

CREATE TABLE ClimbingGroup (
    group_id INT PRIMARY KEY,
    group_name VARCHAR(50) NOT NULL,
    mountain_id INT REFERENCES Mountain(mountain_id),
    start_date DATE NOT NULL,
    end_date DATE
);

CREATE TABLE GroupMember (
    group_id INT REFERENCES ClimbingGroup(group_id) ON DELETE CASCADE,
    climber_id INT REFERENCES Climber(climber_id) ON DELETE CASCADE,
    PRIMARY KEY (group_id, climber_id)
);
```

---

### Примечания:
1. **Триггеры** потребуются для:
   - Автоматического удаления участников группы при удалении группы (`ON DELETE CASCADE` в `GroupMember`)
   - Проверки возможности изменения данных о вершине (если нет связанных записей в `ClimbingGroup`)
   - Обновления сводной статистики (например, количества восхождений)

2. **Индексы** рекомендуется добавить на:
   - `Mountain.name` для быстрого поиска по названиям
   - `ClimbingGroup.start_date` и `end_date` для фильтрации по датам
   - `Climber.full_name` для поиска альпинистов