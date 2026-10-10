package com.example.factory;

import com.example.factory.entity.*;
import com.example.factory.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(MachineRepository machineRepo,
                                   WorkerRepository workerRepo,
                                   ProductRepository productRepo,
                                   OrderRepository orderRepo) {
        return args -> {
            if (machineRepo.count() == 0) {
                Machine m1 = new Machine();
                m1.setName("CNC Router A");
                m1.setType("CNC");
                m1.setDepartment("Fabrication");
                m1.setLocation("Zone 1");
                m1.setStatus("Running");
                m1.setTemperature(65.5);
                m1.setOperatingHours(1200);
                m1.setProductionCount(5000);
                machineRepo.save(m1);

                Machine m2 = new Machine();
                m2.setName("Laser Cutter B");
                m2.setType("Cutter");
                m2.setDepartment("Fabrication");
                m2.setLocation("Zone 2");
                m2.setStatus("Stopped");
                m2.setTemperature(85.0); // Will trigger alert
                m2.setOperatingHours(800);
                machineRepo.save(m2);
            }
            
            if (workerRepo.count() == 0) {
                Worker w1 = new Worker();
                w1.setName("John Doe");
                w1.setRole("Technician");
                w1.setDepartment("Maintenance");
                w1.setAttendanceStatus("Present");
                w1.setShift("Morning");
                workerRepo.save(w1);
            }

            if (productRepo.count() == 0) {
                Product p1 = new Product();
                p1.setName("Steel Widget");
                p1.setCategory("Hardware");
                p1.setUnitPrice(12.50);
                p1.setStockQuantity(50);
                p1.setMinStockLevel(100); // Will trigger alert
                productRepo.save(p1);
            }
        };
    }
}
