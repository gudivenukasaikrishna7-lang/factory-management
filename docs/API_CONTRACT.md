# API Contract and Schema for Factory Management System

## Entities

1. **Machine**: id, name, type, department, location, status (Running, Stopped, Maintenance), temperature, operatingHours, productionCount, lastMaintenanceDate, nextMaintenanceDate.
2. **Worker**: id, name, role, department, contact, shift, attendanceStatus (Present, Absent), joiningDate.
3. **Product**: id, name, category, description, unitPrice, stockQuantity, minStockLevel.
4. **Order**: id, customerName, contact, orderDate, deliveryDate, status (Pending, Processing, Completed, Cancelled), totalAmount. (Keep it simple: skip OrderItems for now, just associate an Order with a Product ID or just assume simple 1 Order = 1 Product type, OR implement simple OrderItems). Let's do: `Order` has a many-to-one with `Product`, plus `quantity`.
5. **ProductionRecord**: id, date, targetQuantity, actualQuantity, rejectedQuantity, (ManyToOne) machine, (ManyToOne) product.
6. **MaintenanceRecord**: id, type, description, date, cost, status (Pending, Completed), (ManyToOne) machine, (ManyToOne) worker.

## Endpoints (Base `/api`)
- `/dashboard`: GET summary stats (totals for cards).
- `/machines`: GET, POST, PUT `/{id}`, DELETE `/{id}`
- `/workers`: GET, POST, PUT `/{id}`, DELETE `/{id}`
- `/products`: GET, POST, PUT `/{id}`, DELETE `/{id}`
- `/orders`: GET, POST, PUT `/{id}`, DELETE `/{id}`
- `/production`: GET, POST, PUT `/{id}`, DELETE `/{id}`
- `/maintenance`: GET, POST, PUT `/{id}`, DELETE `/{id}`
- `/alerts`: GET rule-based alerts based on machine temps, low stock, etc.

## Notes for Backend Agent
- Implement these entities with standard JPA annotations.
- Create Repositories and RestControllers.
- Create a `DataSeeder` (CommandLineRunner) to insert sample data for all entities.
- Ensure CORS is configured.
- Include logic in the Order controller to deduct stock when order is Completed.

## Notes for Frontend Agent
- Read this contract.
- Use `react-router-dom`, `axios`, `recharts` for charts.
- Build Sidebar and layout.
- Build CRUD pages for all modules.
- Dashboard with charts and summary.
- AI Monitoring page (fetches `/api/alerts` and displays).
