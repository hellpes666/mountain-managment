Вот структура REST API эндпоинтов для вашей системы альпинистского клуба:

---

### **1. Таблицы базы данных**
1. **mountains** 
   - `mountain_id` (PK)
   - `name` 
   - `height`
   - `country`
   - `region`

2. **climbers** 
   - `climber_id` (PK)
   - `full_name`
   - `address`

3. **groups** 
   - `group_id` (PK)
   - `group_name`
   - `mountain_id` (FK)
   - `start_date`
   - `end_date`

4. **group_climbers** (связующая таблица)
   - `group_id` (FK)
   - `climber_id` (FK)

5. **expeditions** 
   - `expedition_id` (PK)
   - `group_id` (FK)
   - `mountain_id` (FK)
   - `status` (planned/completed/cancelled)

---

### **2. Основные эндпоинты API**

#### **Горные вершины**
- `GET /mountains`  
  Получить список всех гор с фильтрацией по стране/региону  
  Параметры: `?country=...&region=...`

- `POST /mountains`  
  Добавить новую вершину  
  Тело: `{ "name": "...", "height": ..., "country": "...", "region": "..." }`

- `PUT /mountains/{id}`  
  Обновить данные о вершине (только если нет связанных восхождений)  
  Тело: `{ "height": ..., "country": "...", ... }`

#### **Группы восхождений**
- `GET /groups`  
  Получить список всех групп с фильтрацией по дате  
  Параметры: `?start_date=...&end_date=...`

- `POST /groups`  
  Создать новую группу  
  Тело: `{ "group_name": "...", "mountain_id": ..., "start_date": "..." }`

- `POST /groups/{groupId}/climbers`  
  Добавить альпиниста в группу  
  Тело: `{ "climber_id": ... }`

#### **Альпинисты**
- `GET /climbers`  
  Поиск альпинистов по имени/адресу  
  Параметры: `?name=...&address=...`

- `POST /climbers`  
  Зарегистрировать нового альпиниста  
  Тело: `{ "full_name": "...", "address": "..." }`

---

### **3. Специализированные эндпоинты**

#### **Отчеты и статистика**
- `GET /mountains/{id}/expeditions`  
  Список групп по горе в хронологическом порядке

- `GET /statistics/climber-activity`  
  Количество восхождений каждого альпиниста на каждую гору  
  Параметры: `?climber_id=...&mountain_id=...`

- `GET /statistics/mountain-participants`  
  Количество альпинистов на каждой горе

- `GET /reports/period-expeditions`  
  Список восхождений за период  
  Параметры: `?start_date=...&end_date=...`

---

### **4. Триггеры**
1. **ON DELETE для таблицы mountains**  
   ```sql
   CREATE TRIGGER prevent_mountain_deletion
   BEFORE DELETE ON mountains
   FOR EACH ROW
   BEGIN
       IF EXISTS (SELECT 1 FROM expeditions WHERE mountain_id = OLD.mountain_id) THEN
           SIGNAL SQLSTATE '45000' 
           SET MESSAGE_TEXT = 'Cannot delete mountain with existing expeditions';
       END IF;
   END;
   ```

2. **ON UPDATE для таблицы groups**  
   ```sql
   CREATE TRIGGER update_expedition_status
   AFTER UPDATE ON groups
   FOR EACH ROW
   BEGIN
       IF NEW.end_date IS NOT NULL THEN
           UPDATE expeditions 
           SET status = 'completed'
           WHERE group_id = NEW.group_id;
       END IF;
   END;
   ```

---

### **5. Пример запроса**
**Получение списка альпинистов за период:**
```http
GET /climbers?start_date=2025-01-01&end_date=2025-12-31
```

**Ответ:**
```json
[
  {
    "climber_id": 1,
    "full_name": "Иван Петров",
    "expeditions_count": 3,
    "mountains": ["Эльбрус", "Монблан"]
  }
]
```

Эта структура обеспечивает:
- Полноту данных для хроники восхождений
- Гибкость запросов через параметры URL
- Защиту целостности данных через триггеры
- Простоту расширения функционала