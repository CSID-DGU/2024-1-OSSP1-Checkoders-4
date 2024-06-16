package zxcv.asdf.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import zxcv.asdf.DTO.page6_chat;
import zxcv.asdf.domain.Answer;
import zxcv.asdf.domain.Chatting;
import zxcv.asdf.domain.Team;
import zxcv.asdf.domain.User;
import zxcv.asdf.repository.ChattingRepository;
import zxcv.asdf.repository.AnswerRepository;
import zxcv.asdf.repository.TeamRepository;
import zxcv.asdf.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ChattingService {

    @Autowired
    private ChattingRepository chattingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private AnswerRepository answerRepository;

    public List<Chatting> getAllChats() {
        return chattingRepository.findAll();
    }

    public Optional<Chatting> getChatById(Long id) {
        return chattingRepository.findById(id);
    }

    public List<Chatting> getChatsBySenderToken(String senderToken) {
        return chattingRepository.findBySenderToken(senderToken);
    }

    public List<Chatting> getChatsByTeamAndAnswer(Long teamId, Long answerId) {
        return chattingRepository.findByTeamIdAndAnswerId(teamId, answerId);
    }

    public Chatting saveChat(page6_chat chatDto) {
        User sender = userRepository.findByToken(chatDto.getSenderToken()).orElseThrow(() -> new IllegalArgumentException("Sender not found"));
        Team team = teamRepository.findById(chatDto.getTeamId()).orElseThrow(() -> new IllegalArgumentException("Team not found"));
        Answer answer = answerRepository.findById(chatDto.getAnswerId()).orElseThrow(() -> new IllegalArgumentException("Answer not found"));

        Chatting chatting = Chatting.builder()
                .sender(sender)
                .team(team)
                .answer(answer)
                .content(chatDto.getContent())
                .timestamp(chatDto.getTimestamp())
                .build();

        return chattingRepository.save(chatting);
    }

    public void deleteChat(Long id) {
        chattingRepository.deleteById(id);
    }
}
