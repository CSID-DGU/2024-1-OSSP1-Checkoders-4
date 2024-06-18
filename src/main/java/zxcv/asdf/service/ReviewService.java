package zxcv.asdf.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import zxcv.asdf.DTO.AssignmentDTO;
import zxcv.asdf.DTO.page6_review;
import zxcv.asdf.DTO.page7;
import zxcv.asdf.domain.Answer;
import zxcv.asdf.domain.LectureAssignment;
import zxcv.asdf.domain.LectureAssignmentMapping;
import zxcv.asdf.repository.LectureAssignmentMappingRepository;
import zxcv.asdf.repository.LectureAssignmentRepository;
import zxcv.asdf.repository.AnswerRepository;
import zxcv.asdf.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final LectureAssignmentMappingRepository lectureAssignmentMappingRepository;
    private final LectureAssignmentRepository lectureAssignmentRepository;
    private final AnswerRepository answerRepository;
    private final UserRepository userRepository;

    private AssignmentDTO convertToDTO(LectureAssignment assignment, String token) {
        Optional<Answer> answerOpt = answerRepository.findByUserAndAssignment(userRepository.findByToken(token).orElseThrow(()
                -> new RuntimeException("User not found")), assignment);

        Boolean correct = answerOpt.map(Answer::getCorrect).orElse(null);

        return AssignmentDTO.builder()
                .title(assignment.getTitle())
                .assignmentId(assignment.getId())
                .description(assignment.getDescription())
                .deadline(assignment.getDeadline())
                .problem(assignment.getProblem())
                .correct(correct)
                .build();
    }

    public page7 getReviewList(String token, Long lectureId) {
        List<LectureAssignmentMapping> allMappings = lectureAssignmentMappingRepository.findByLectureId(lectureId);

        List<Long> userAssignmentIds = allMappings.stream()
                .filter(mapping -> mapping.getUser().getToken().equals(token))
                .map(LectureAssignmentMapping::getLectureAssignmentId)
                .collect(Collectors.toList());

        List<Long> otherAssignmentIds = allMappings.stream()
                .filter(mapping -> !mapping.getUser().getToken().equals(token))
                .map(LectureAssignmentMapping::getLectureAssignmentId)
                .collect(Collectors.toList());

        List<LectureAssignment> userAssignments = lectureAssignmentRepository.findAllById(userAssignmentIds);
        List<LectureAssignment> otherAssignments = lectureAssignmentRepository.findAllById(otherAssignmentIds);

        List<AssignmentDTO> userAssignmentDTOs = userAssignments.stream()
                .map(assignment -> convertToDTO(assignment, token))
                .collect(Collectors.toList());

        List<AssignmentDTO> otherAssignmentDTOs = otherAssignments.stream()
                .map(assignment -> convertToDTO(assignment, token))
                .collect(Collectors.toList());

        return page7.builder()
                .list(userAssignmentDTOs)
                .build();
    }

    public Optional<page6_review> getReviewByAnswerId(Long answerId) {
        // 리뷰를 가져오는 로직을 여기에 추가합니다.
        // 현재는 Optional.empty()를 반환하도록 구현되어 있습니다.
        return Optional.empty();
    }
}
