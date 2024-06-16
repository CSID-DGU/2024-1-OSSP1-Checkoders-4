package zxcv.asdf.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zxcv.asdf.DTO.page6_review;
import zxcv.asdf.service.ReviewService;

import java.util.Optional;

@RestController
@RequestMapping("/api/review")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping("/{answerId}")
    public ResponseEntity<page6_review> getReviewByAnswerId(@PathVariable Long answerId) {
        Optional<page6_review> reviewOptional = reviewService.getReviewByAnswerId(answerId);
        return reviewOptional.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
