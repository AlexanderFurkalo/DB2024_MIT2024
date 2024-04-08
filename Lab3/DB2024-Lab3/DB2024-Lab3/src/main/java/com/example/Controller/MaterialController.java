package com.example.Controller;

import com.example.Repository.MaterialRepository;
import com.example.model.Material;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/material")
public class MaterialController {
    private final MaterialRepository materialRepository;

    public MaterialController(MaterialRepository materialRepository) {
        this.materialRepository = materialRepository;
    }

    @PostMapping("/add")
    public Material addMaterial(@RequestBody Material Material) {
        return materialRepository.save(Material);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Material> getMaterialById(@PathVariable Long id) {
        Optional<Material> Material = materialRepository.findById(id);
        return Material.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/all")
    public List<Material> getAllMaterial() {
        return materialRepository.findAll();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Material> updateMaterial(@PathVariable Long id, @RequestBody Material updatedMaterial) {
        Optional<Material> existingMaterialOptional = materialRepository.findById(id);
        if (existingMaterialOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Material existingMaterial = existingMaterialOptional.get();
        existingMaterial.setName(updatedMaterial.getName());
        Material savedMaterial = materialRepository.save(existingMaterial);
        return ResponseEntity.ok(savedMaterial);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMaterial(@PathVariable Long id) {
        if (!materialRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        materialRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
