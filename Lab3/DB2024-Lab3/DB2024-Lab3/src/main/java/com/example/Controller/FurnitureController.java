package com.example.Controller;

import com.example.Repository.FurnitureRepository;
import com.example.model.Furniture;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/furniture")
public class FurnitureController {
    private final FurnitureRepository furnitureRepository;

    public FurnitureController(FurnitureRepository furnitureRepository) {
        this.furnitureRepository = furnitureRepository;
    }

    @PostMapping("/add")
    public Furniture addFurniture(@RequestBody Furniture furniture) {
        return furnitureRepository.save(furniture);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Furniture> getFurnitureById(@PathVariable Long id) {
        Optional<Furniture> furniture = furnitureRepository.findById(id);
        return furniture.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/all")
    public List<Furniture> getAllFurniture() {
        return furnitureRepository.findAll();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Furniture> updateFurniture(@PathVariable Long id, @RequestBody Furniture updatedFurniture) {
        Optional<Furniture> existingFurnitureOptional = furnitureRepository.findById(id);
        if (existingFurnitureOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Furniture existingFurniture = existingFurnitureOptional.get();
        existingFurniture.setName(updatedFurniture.getName());
        Furniture savedFurniture = furnitureRepository.save(existingFurniture);
        return ResponseEntity.ok(savedFurniture);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFurniture(@PathVariable Long id) {
        if (!furnitureRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        furnitureRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
