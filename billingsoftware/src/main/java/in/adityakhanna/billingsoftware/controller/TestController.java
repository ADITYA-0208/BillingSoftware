package in.adityakhanna.billingsoftware.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/test")
public class TestController {
    @GetMapping
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("Backend is working!");
    }
}
