package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.example.Repository", "com.example.Controller", "com.example.model"})
public class App {
    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }
}
