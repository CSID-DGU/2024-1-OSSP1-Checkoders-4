package zxcv.asdf.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import zxcv.asdf.DTO.AssignmentDTO;
import zxcv.asdf.DTO.page6;
import zxcv.asdf.DTO.page6_chat;
import zxcv.asdf.DTO.page7;
import zxcv.asdf.domain.*;
import zxcv.asdf.repository.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {


    private final ChattingService chattingService;
    private final AnswerRepository answerRepository;
    private final TeamRepository teamRepository;
    private final ChattingRepository chattingRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;
    private final LectureAssignmentRepository lectureAssignmentRepository;
    private final LectureAssignmentMappingRepository lectureAssignmentMappingRepository;
    private final LectureRepository lectureRepository;
    private final UserService userService;

    public page6_chat convertToPage6Chat(Chatting chatting) {
        return page6_chat.builder()
                .senderToken(chatting.getSender().getToken())
                .senderName(chatting.getSenderName())
                .lectureId(chatting.getTeam().getLecture().getId())
                .lectureassignmentId(chatting.getAnswer().getAssignment().getId())
                .content(chatting.getContent())
                .timestamp(chatting.getTimestamp())
                .build();
    }
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

    public page6 getPage6(String token,Long lectureassignmentId) {

        User user = userService.getUser(token);
        Lecture lecture = lectureRepository
                .getById(lectureAssignmentMappingRepository.findLectureIdByLectureAssignmentId(lectureassignmentId));
        LectureAssignment assignment = lectureAssignmentRepository.findById(lectureassignmentId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid lecture assignment ID"));
        Team t = teamRepository.findByUserTokenAndLectureId(token, lecture.getId());

        Answer answer = answerRepository.findByUserTokenAndAssignmentId(token, lectureassignmentId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user token"));

        List<page6_chat> allChats = new ArrayList<>();

        List<Chatting> chats = chattingRepository.findByTeam_IdAndAnswer_Id(t.getTeam_id(), answer.getId());

        List<page6_chat> page6Chats = chats.stream()
                .map(this::convertToPage6Chat)
                .collect(Collectors.toList());
        allChats.addAll(page6Chats);

        page6 p = page6.builder()
                .description(assignment.getDescription())
                .hw_test1(assignment.getHwTest1())
                .hw_test_answer1(assignment.getHwTestAnswer1())
                .answer_text(answer.getAnswerText())
                .assignment_id(assignment.getId())
                .user_token(user.getToken())
                .chats(allChats)
                .gpt_feedback(answer.getGptFeedback())
                .correct(answer.getCorrect())
                .build();

        return p;
    }

    public page7 getReviewList(String token, Long lectureId) {
        List<LectureAssignmentMapping> allMappings = lectureAssignmentMappingRepository.findByLectureId(lectureId);

        List<Long> otherAssignmentIds = allMappings.stream()
                .filter(mapping -> !mapping.getUser().getToken().equals(token))
                .map(LectureAssignmentMapping::getLectureAssignmentId)
                .collect(Collectors.toList());

        List<LectureAssignment> otherAssignments = lectureAssignmentRepository.findAllById(otherAssignmentIds);


        List<AssignmentDTO> otherAssignmentDTOs = otherAssignments.stream()
                .map(assignment -> convertToDTO(assignment, token))
                .collect(Collectors.toList());

        return page7.builder()
                .list(otherAssignmentDTOs)
                .build();
    }
}

