package zxcv.asdf.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import zxcv.asdf.DTO.page6_review;
import zxcv.asdf.repository.ReviewRepository;
import zxcv.asdf.domain.Answer;
import zxcv.asdf.domain.LectureAssignment;
import zxcv.asdf.domain.User;

import java.util.Optional;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    public Optional<page6_review> getReviewByAnswerId(Long answerId) {
        Optional<Answer> answerOptional = reviewRepository.findById(answerId);

        if (answerOptional.isPresent()) {
            Answer answer = answerOptional.get();
            LectureAssignment assignment = answer.getAssignment();
            User user = answer.getUser();

            page6_review review = page6_review.builder()
                    .description(assignment.getDescription())
                    .hw_test1(assignment.getHwTest1())
                    .hw_test_answer1(assignment.getHwTestAnswer1())
                    .answer_text(answer.getAnswerText())
                    .assignment_id(assignment.getId())
                    .user_token(user.getToken())
                    .gpt_feedback(answer.getGptFeedback())
                    .result(answer.getCorrect() ? "Correct" : "Incorrect")
                    .build();

            return Optional.of(review);
        } else {
            return Optional.empty();
        }
    }
}
