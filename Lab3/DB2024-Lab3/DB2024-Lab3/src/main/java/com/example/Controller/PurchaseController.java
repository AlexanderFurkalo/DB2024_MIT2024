package com.example.Controller;

import com.example.Repository.PurchaseRepository;
import com.example.model.Purchase;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/purchase")
public class PurchaseController {
    private final PurchaseRepository purchaseRepository;

    public PurchaseController(PurchaseRepository purchaseRepository) {
        this.purchaseRepository = purchaseRepository;
    }

    @PostMapping("/add")
    public Purchase addPurchase(@RequestBody Purchase Purchase) {
        return purchaseRepository.save(Purchase);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Purchase> getPurchaseById(@PathVariable Long id) {
        Optional<Purchase> Purchase = purchaseRepository.findById(id);
        return Purchase.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/all")
    public List<Purchase> getAllPurchase() {
        return purchaseRepository.findAll();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Purchase> updatePurchase(@PathVariable Long id, @RequestBody Purchase updatedPurchase) {
        Optional<Purchase> existingPurchaseOptional = purchaseRepository.findById(id);
        if (existingPurchaseOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Purchase existingPurchase = existingPurchaseOptional.get();
        existingPurchase.setCustomer(updatedPurchase.getCustomer());
        existingPurchase.setFurniture(updatedPurchase.getFurniture());
        existingPurchase.setPurchaseDate(updatedPurchase.getPurchaseDate());
        existingPurchase.setQuantity(updatedPurchase.getQuantity());
        existingPurchase.setTotalPrice(updatedPurchase.getTotalPrice());
        Purchase savedPurchase = purchaseRepository.save(existingPurchase);
        return ResponseEntity.ok(savedPurchase);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePurchase(@PathVariable Long id) {
        if (!purchaseRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        purchaseRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}