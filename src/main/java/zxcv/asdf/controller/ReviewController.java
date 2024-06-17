package zxcv.asdf.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zxcv.asdf.DTO.page6_review;
import zxcv.asdf.domain.Answer;
import zxcv.asdf.service.AnswerService;
import zxcv.asdf.service.ReviewService;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/review")
public class ReviewController {


    private final ReviewService reviewService;
    private final AnswerService answerService;

    @GetMapping("/{token}/{lectureassignmentId}")
    public ResponseEntity<page6_review> getReviewByAnswerId(@PathVariable String token,
                                                            @PathVariable Long lectureassignmentId) {
        Answer answer = answerService.findAnswerByUserTokenAndAssignmentId(token, lectureassignmentId)
                .orElseThrow(() -> new IllegalArgumentException("해당하는 답변이 없습니다."));
        Optional<page6_review> reviewOptional = reviewService.getReviewByAnswerId(answer.getId());
        return reviewOptional.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
