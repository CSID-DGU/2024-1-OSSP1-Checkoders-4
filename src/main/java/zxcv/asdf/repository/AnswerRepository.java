package zxcv.asdf.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import zxcv.asdf.domain.Answer;
import zxcv.asdf.domain.LectureAssignment;
import zxcv.asdf.domain.User;

import java.util.Optional;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
    Optional<Answer> findByUserAndAssignment(User user, LectureAssignment assignment);

    Optional<Answer> findByUserTokenAndAssignmentId(String userToken, Long assignmentId);

}
