package com.example.Controller;

import com.example.Repository.ManufacturerRepository;
import com.example.model.Manufacturer;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/manufacturer")
public class ManufacturerController {
    private final ManufacturerRepository manufacturerRepository;

    public ManufacturerController(ManufacturerRepository manufacturerRepository) {
        this.manufacturerRepository = manufacturerRepository;
    }

    @PostMapping("/add")
    public Manufacturer addManufacturer(@RequestBody Manufacturer Manufacturer) {
        return manufacturerRepository.save(Manufacturer);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Manufacturer> getManufacturerById(@PathVariable Long id) {
        Optional<Manufacturer> Manufacturer = manufacturerRepository.findById(id);
        return Manufacturer.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/all")
    public List<Manufacturer> getAllManufacturer() {
        return manufacturerRepository.findAll();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Manufacturer> updateManufacturer(@PathVariable Long id, @RequestBody Manufacturer updatedManufacturer) {
        Optional<Manufacturer> existingManufacturerOptional = manufacturerRepository.findById(id);
        if (existingManufacturerOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Manufacturer existingManufacturer = existingManufacturerOptional.get();
        existingManufacturer.setName(updatedManufacturer.getName());
        Manufacturer savedManufacturer = manufacturerRepository.save(existingManufacturer);
        return ResponseEntity.ok(savedManufacturer);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteManufacturer(@PathVariable Long id) {
        if (!manufacturerRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        manufacturerRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
