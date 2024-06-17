package zxcv.asdf.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import zxcv.asdf.domain.LectureAssignment;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface LectureAssignmentRepository extends JpaRepository<LectureAssignment, Long> {
    Optional<LectureAssignment> findByLectureId(Long lectureId);

    @Query("SELECT la.deadline FROM LectureAssignment la WHERE la.lecture.id IN :lectureIds")
    List<LocalDateTime> findDeadlinesByLectureIds(@Param("lectureIds") List<Long> lectureIds);

}
